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
              <Button type="submit" form="add-inventory-form" disabled={isSubmitting}>
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
