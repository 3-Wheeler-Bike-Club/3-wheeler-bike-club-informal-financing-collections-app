import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Contract } from "@/hooks/useGetContracts"
import { useForm } from "@tanstack/react-form"
import { CirclePile, Loader2, Wallet } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import * as z from "zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldContent,
  FieldTitle,
  FieldDescription,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { formatNumberWithCommas } from "@/utils/helpers"
import { updateContractPaymentAction } from "@/app/actions/contracts/updateContractPayment"
import { useContractsContext } from "./contractsContext"

const addContractPaymentFormSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required"),
  method: z
    .string()
    .min(1, "Method is required"),
})

interface AddContractPaymentProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contract: Contract
}


export function AddContractPayment({ open, onOpenChange, contract }: AddContractPaymentProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const contractsContext = useContractsContext()

  function getLastPaidWeek () {
    const payments = contract.payments
    if (!payments || payments.length === 0) {
      return 0;
    }
    if (payments.length >= 1) {
      const lastPayment = payments[payments.length - 1];
      return lastPayment.week
    }
    
  }
  function getDuePaymentFromLastPaidWeek (){
    const payments = contract.payments
    if (!payments || payments.length === 0) {
      return 0;
    }
    const lastPayment = payments[payments.length - 1];
    if (lastPayment.status === "full") {
      return 0;
    } else if (lastPayment.status === "partial") {
    // Get the week of the last payment
    const lastPaymentWeek = lastPayment.week;
    // Sum the amounts for all payments from the last payment week
    const partialPaymentsWithLastPaymentWeek = payments.filter(p => p.week === lastPaymentWeek);
    // Convert string/number amounts to number before summing
    const totalPaid = partialPaymentsWithLastPaymentWeek.reduce((sum, p) => sum + Number(p.amount), 0);
    // Subtract from contract.installment to get due payment
    return contract.installment - totalPaid;
    } 
  }
  function getStatus (amount: number){
    if(amount === contract.installment){
      return "full"
    } else {
      return "partial"
    }
  }

  // This function breaks the input amount into an array where each element is at most the installment value,
  // and if the last remaining value is less than installment, it will be the last element.
  function getPaymentsForAmount(amount: number, installment: number) {
    const payments: number[] = [];
    let remaining = amount;

    while (remaining >= installment) {
      payments.push(installment);
      remaining -= installment;
    }

    if (remaining > 0) {
      payments.push(remaining);
    }

    return payments;
  }

  const addContractPaymentForm = useForm({
    defaultValues: {
      amount: "",
      method: "",
    },
    validators: {
      onSubmit: addContractPaymentFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      console.log(value)
      
      try {
        // If the contract has payments, we need to check if the amount is greater than the installment
        if (contract.payments && contract.payments.length >= 1) {
          if (Number(value.amount) >= contract.installment) {
            const duePaymentFromLastPaidWeek = getDuePaymentFromLastPaidWeek()
            const lastPaidWeek = getLastPaidWeek()
            let week = lastPaidWeek!
            if (duePaymentFromLastPaidWeek && duePaymentFromLastPaidWeek >= 1) {
              const updateContractPayment = await updateContractPaymentAction(
                contract._id,
                week,
                duePaymentFromLastPaidWeek,
                value.method as "mobile-money" | "cash",
                new Date,
                "partial"
              )
              if (updateContractPayment) {
                const remainingAmount = Number(value.amount) - duePaymentFromLastPaidWeek
                const payments = getPaymentsForAmount(remainingAmount, contract.installment)
                
                for (const payment of payments) {
                  const updateContractPayment = await updateContractPaymentAction(
                    contract._id,
                    week + 1,
                    payment,
                    value.method as "mobile-money" | "cash",
                    new Date(),
                    getStatus(payment)
                  )
                  if (updateContractPayment) {
                    week += 1
                  }
                }
                toast.success("Payments recorded successfully", {
                  description: "You can now add another payment or close this dialog",
                })
                setIsSubmitting(false)
                addContractPaymentForm.reset()
                onOpenChange(false)
                await contractsContext?.getBackContracts?.()
              }
            } else {
              const payments = getPaymentsForAmount(Number(value.amount), contract.installment)
              
              for (const payment of payments) {
                const updateContractPayment = await updateContractPaymentAction(
                  contract._id,
                  week + 1,
                  payment,
                  value.method as "mobile-money" | "cash",
                  new Date(),
                  getStatus(payment)
                )
                if (updateContractPayment) {
                  week += 1
                }
              }
              toast.success("Payments recorded successfully", {
                description: "You can now add another payment or close this dialog",
              })
              setIsSubmitting(false)
              addContractPaymentForm.reset()
              onOpenChange(false)
              await contractsContext?.getBackContracts?.()
            }
          } else {
            const duePaymentFromLastPaidWeek = getDuePaymentFromLastPaidWeek()
            const lastPaidWeek = getLastPaidWeek()
            if (duePaymentFromLastPaidWeek && duePaymentFromLastPaidWeek >= 1) {
              if (Number(value.amount) <= duePaymentFromLastPaidWeek) {
                const updateContractPayment = await updateContractPaymentAction(
                  contract._id,
                  lastPaidWeek!,
                  Number(value.amount),
                  value.method as "mobile-money" | "cash",
                  new Date,
                  "partial"
                )
                if (updateContractPayment) {
                  toast.success("Payment recorded successfully", {
                    description: "You can now add another payment or close this dialog",
                  })
                  setIsSubmitting(false)
                  addContractPaymentForm.reset()
                  onOpenChange(false)
                  await contractsContext?.getBackContracts?.()
                } else {
                  toast.error("Failed to record payment", {
                    description: "Something went wrong, please try again",
                  })
                  setIsSubmitting(false)
                }
              } else {
                const lastPaidWeek = getLastPaidWeek()
                let week = lastPaidWeek!
                const updateContractPayment = await updateContractPaymentAction(
                  contract._id,
                  week,
                  duePaymentFromLastPaidWeek,
                  value.method as "mobile-money" | "cash",
                  new Date,
                  "partial"
                )
                if (updateContractPayment) {
                  const remainingAmount = Number(value.amount) - duePaymentFromLastPaidWeek
                  const payments = getPaymentsForAmount(remainingAmount, contract.installment)
                  
                  for (const payment of payments) {
                    const updateContractPayment = await updateContractPaymentAction(
                      contract._id,
                      week + 1,
                      payment,
                      value.method as "mobile-money" | "cash",
                      new Date(),
                      getStatus(payment)
                    )
                    if (updateContractPayment) {
                      week += 1
                    }
                  }
                  toast.success("Payments recorded successfully", {
                    description: "You can now add another payment or close this dialog",
                  })
                  setIsSubmitting(false)
                  addContractPaymentForm.reset()
                  onOpenChange(false)
                  await contractsContext?.getBackContracts?.()
                }   
              }
            } else {
              //const lastPaidWeek = getLastPaidWeek()
              const updateContractPayment = await updateContractPaymentAction(
                contract._id,
                lastPaidWeek! + 1,
                Number(value.amount),
                value.method as "mobile-money" | "cash",
                new Date,
                "partial"
              )
              if (updateContractPayment) {
                toast.success("Payment recorded successfully", {
                  description: "You can now add another payment or close this dialog",
                })
                setIsSubmitting(false)
                addContractPaymentForm.reset()
                onOpenChange(false) 
                await contractsContext?.getBackContracts?.()
              } else {
                toast.error("Failed to record payment", {
                  description: "Something went wrong, please try again",
                })
                setIsSubmitting(false)
              }
            }
          }
        // If the contract has no payments, we need to record the payment
        } else {

          // If the amount is greater than the installment, we need to record the payments
          if (Number(value.amount) >= contract.installment) {
            const payments = getPaymentsForAmount(Number(value.amount), contract.installment)
            let lastPaidWeek = 0
            for (const payment of payments) {
              const updateContractPayment = await updateContractPaymentAction(
                contract._id,
                lastPaidWeek + 1,
                payment,
                value.method as "mobile-money" | "cash",
                new Date(),
                getStatus(payment)
              )
              if (updateContractPayment) {
                lastPaidWeek += 1
              }
            }
            toast.success("Payments recorded successfully", {
              description: "You can now add another payment or close this dialog",
            })
            setIsSubmitting(false)
            addContractPaymentForm.reset()
            onOpenChange(false)
          // If the amount is less than the installment, we need to record the payment
          } else {
            const updateContractPayment = await updateContractPaymentAction(
              contract._id,
              1,
              Number(value.amount),
              value.method as "mobile-money" | "cash",
              new Date,
              "partial"
            )
            if (updateContractPayment) {
              toast.success("Payment recorded successfully", {
                description: "You can now add another payment or close this dialog",
              })
              setIsSubmitting(false)
              addContractPaymentForm.reset()
              onOpenChange(false)
              await contractsContext?.getBackContracts?.()
            } else {
              toast.error("Failed to record payment", {
                description: "Something went wrong, please try again",
              })
              setIsSubmitting(false)
            }
          }
        }
      } catch (error) {
        console.error("Form submission error", error);
        toast.error("Failed to submit the form.", {
          description: `Something went wrong, please try again`,
        })
        setIsSubmitting(false)
      }
    },
  })


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          
          <div className="mx-auto w-full max-w-sm pb-6">
            <DialogHeader>
              <DialogTitle>Add Payment</DialogTitle>
              <DialogDescription className="mb-4">
                  Record a new contract payment transaction.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col p-4 no-scrollbar -mx-4 h-[50vh] overflow-y-auto">
                <form
                  className="space-y-6"
                  id="add-contract-payment-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    addContractPaymentForm.handleSubmit()
                  }}
                >
                  <FieldGroup>
                    <addContractPaymentForm.Field
                      name="amount"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Amount(GHS)</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value ? formatNumberWithCommas(field.state.value) : ''}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => {
                                    // Remove all non-numeric characters
                                    const rawValue = e.target.value.replace(/\D/g, '')
                                    // Store raw numeric value (without commas) in form state
                                    field.handleChange(rawValue)
                                  }}
                                  aria-invalid={isInvalid}
                                  placeholder="1,000"
                                  autoComplete="off"
                                  type="text"
                                  inputMode="numeric"
                                  disabled={isSubmitting}
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addContractPaymentForm.Field
                      name="method"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Payment Method</FieldLabel>
                            <RadioGroup 
                              className="max-w-full"
                              value={field.state.value}
                              onValueChange={(value) => field.handleChange(value)}
                              disabled={isSubmitting}
                            >
                              <FieldLabel htmlFor="mobile-money">
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> <Wallet className="h-4 w-4 text-primary" />Mobile Money</FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem value="mobile-money" id="mobile-money" />
                                </Field>
                              </FieldLabel>
                              <FieldLabel htmlFor="cash">
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> <Wallet className="h-4 w-4 text-primary" />Cash</FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem value="cash" id="cash" />
                                </Field>
                              </FieldLabel>
                            </RadioGroup>
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    
                  </FieldGroup>
                  
                </form>  
            </div>
          </div>
          <DialogFooter>
            <Field orientation="horizontal" className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => addContractPaymentForm.reset()} disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" form="add-contract-payment-form" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CirclePile className="h-4 w-4" />}
                Submit
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

