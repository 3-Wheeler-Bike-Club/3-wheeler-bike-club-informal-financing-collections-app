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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CirclePile, Loader2, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useForm } from "@tanstack/react-form"
import { Motor } from "@/hooks/useGetMotors"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { PhoneInput } from "../ui/phone-input"
import { useEffect, useRef, useState } from "react"
import { postSaleAction } from "@/app/actions/sales/postSaleAction"
import { toast } from "sonner"
import { updateMotorAction } from "@/app/actions/motors/updateMotorAction"
import { BRANCHES, VEHICLE_TYPES } from "@/utils/constants"


const addSaleFormSchema = z.object({
  branch: z
    .string()
    .min(1, "Branch is required"),
    vehicleType: z
    .string()
    .min(1, "Vehicle type is required"),
  vehicleVin: z
    .string()
    .min(1, "VIN is required"),
  customerFirstName: z
    .string()
    .min(1, "First name is required"),
  customerOtherName: z
    .string(),
  customerLastName: z
    .string()
    .min(1, "Last name is required"),
  customerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  status: z.enum(["paid in full", "paid in installments"]),
})

export interface AddSaleProps {
  motor: Motor[]
  getSales: () => void
}

interface MotorByVehicleTypeForCombobox {
  model: string
  color: string
  value: string
}

export function AddSale({ motor, getSales }: AddSaleProps) {
  console.log(motor)

  useEffect(() => {
    if (motor && motor.length > 0) {
      const formatted = motor.filter((item) => item.status === "in stock")
      setMotorInStock(formatted)
    } else {
      setMotorInStock([])
    }
  }, [motor])

  const [motorInStock, setMotorInStock] = useState<Motor[]>([])
  console.log(motorInStock)
  const [motorByBranch, setMotorByBranch] = useState<Motor[]>([])  
  console.log(motorByBranch)
  const [motorByVehicleType, setMotorByVehicleType] = useState<Motor[]>([])
  console.log(motorByVehicleType)
  const [motorByVehicleTypeForCombobox, setMotorByVehicleTypeForCombobox] = useState<MotorByVehicleTypeForCombobox[]>([])
  console.log(motorByVehicleTypeForCombobox)



  useEffect(() => {
    if (motorByVehicleType && motorByVehicleType.length ) {
      const formatted = motorByVehicleType.map((item) => ({
        model: item.vehicle.model,
        color: item.vehicle.color,
        value: item.vehicle.vin,
      }))
      setMotorByVehicleTypeForCombobox(formatted)
    } else {
      setMotorByVehicleTypeForCombobox([])
    }
  }, [motorByVehicleType])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const dialogContentRef = useRef<HTMLDivElement>(null)

  const addSaleForm = useForm({
    defaultValues: {
      branch: "",
      vehicleType: "",
      vehicleVin: "",
      customerFirstName: "",
      customerOtherName: "",
      customerLastName: "",
      customerPhone: "",
      status: "paid in full" as "paid in full" | "paid in installments",
    },
    validators: {
      onSubmit: addSaleFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      console.log(value)
      try {
        const sale = motorByVehicleType!.find((motorByVehicleType) => motorByVehicleType.vehicle.vin === value.vehicleVin)
        if (sale) {
          const postSale = await postSaleAction(
            value.branch,
            {
              type: sale?.vehicle.type,
              model: sale?.vehicle.model,
              color: sale?.vehicle.color,
              vin: sale?.vehicle.vin,
              engine: sale?.vehicle.engine,
            },
            {
              firstname: value.customerFirstName,
              othername: value.customerOtherName,
              lastname: value.customerLastName,
              phone: value.customerPhone,
            },
            Number(sale?.msrp),
            value.status,
          )
          if (postSale) {
            const updateMotor = await updateMotorAction(sale?._id)
            if (updateMotor) {
              toast.success("Sale Recorded Successfully", {
                description: "You can now add another sale or close this dialog",
              })
              setIsSubmitting(false);
              addSaleForm.reset();
              getSales()
            } else {
              toast.error("Failed to update motor.", {
                description: "Something went wrong, please try again",
              })
              setIsSubmitting(false);
            }
          } else {
            toast.error("Failed to post sale.", {
              description: "Something went wrong, please try again",
            })
            setIsSubmitting(false);
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
    <Dialog>
      <form>
        <DialogTrigger asChild>
            <Button variant="outline">
                <Plus />
                Add Sales
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm pb-6">
          <DialogHeader>
            <DialogTitle>Add Sales</DialogTitle>
            <DialogDescription className="flex flex-row items-center justify-between mb-4">
              <div className="flex flex-col gap-2">
                {step === 1 && "Step 1/2: Vehicle Selection"}
                {step === 2 && "Step 2/2: Customer Details"}
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? 'bg-primary' : 'bg-primary/50'}`} />
                  <span className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? 'bg-primary' : 'bg-gray-300'}`} />
                </div>
              </div>
              <div className="flex flex-row items-center gap-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  disabled={step === 1 || isSubmitting}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={step === 2 || isSubmitting}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
            <div ref={dialogContentRef} className="flex flex-col p-4 no-scrollbar -mx-4 h-[50vh] overflow-y-auto">
                <form
                  className="space-y-6"
                  id="add-sale-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    addSaleForm.handleSubmit()
                  }}
                >
                  <FieldGroup>
                    {step === 1 && (
                      <>
                    <addSaleForm.Field
                      name="branch"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Branch</FieldLabel>
                                <Select
                                  value={field.state.value}
                                  onValueChange={
                                    (value) => {
                                      field.handleChange(value)
                                      if (motorInStock && motorInStock?.length > 0){
                                        const filteredMotorByBranch = motorInStock.filter((motorInStock) => motorInStock.branch === value)
                                        setMotorByBranch(filteredMotorByBranch)
                                        if (addSaleForm.state.values.vehicleType.length > 0) {
                                          const filteredMotorByVehicleType = filteredMotorByBranch.filter((motorByBranch) => motorByBranch.vehicle.type === addSaleForm.state.values.vehicleType)
                                          setMotorByVehicleType(filteredMotorByVehicleType)
                                        }
                                      }
                                    }
                                  }
                                  disabled={isSubmitting}
                                >
                                  <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a branch" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {BRANCHES.map((branch) => (
                                        <SelectItem key={branch.value} value={branch.value}>{branch.name}</SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="vehicleType"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Type</FieldLabel>
                            <RadioGroup 
                              className="grid max-w-full grid-cols-2 gap-2"
                              value={field.state.value}
                              onValueChange={(value) => {
                                field.handleChange(value)
                                if (motorByBranch && motorByBranch?.length > 0){
                                  const filteredMotorByVehicleType = motorByBranch.filter((motorByBranch) => motorByBranch.vehicle.type === value)
                                  setMotorByVehicleType(filteredMotorByVehicleType)
                                }
                              }}
                              disabled={isSubmitting}
                            >
                              {VEHICLE_TYPES.map((vehicleType) => (
                                <FieldLabel htmlFor={vehicleType.value} key={vehicleType.value}>
                                  <Field orientation="horizontal">
                                    <FieldContent>
                                      <FieldTitle> {vehicleType.icon} {vehicleType.name} </FieldTitle>
                                    </FieldContent>
                                    <RadioGroupItem value={vehicleType.value} id={vehicleType.value} />
                                  </Field>
                                </FieldLabel>
                              ))}
                            </RadioGroup>
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="vehicleVin"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Vin</FieldLabel>
                            <Combobox
                              items={motorByVehicleTypeForCombobox}
                              itemToStringValue={(motorByVehicleType: MotorByVehicleTypeForCombobox) => motorByVehicleType.value}
                              value={motorByVehicleTypeForCombobox.find((item) => item.value === field.state.value) || null}
                              onValueChange={(selectedItem: MotorByVehicleTypeForCombobox | null) => {
                                if (selectedItem) {
                                  field.handleChange(selectedItem.value)
                                } else {
                                  field.handleChange("")
                                }
                              }}
                              disabled={isSubmitting}
                            >
                              <ComboboxInput placeholder="Search vehicles..." />
                              <ComboboxContent container={dialogContentRef}>
                                <ComboboxEmpty>No vehicles found.</ComboboxEmpty>
                                <ComboboxList>
                                  {(motorByVehicleTypeForCombobox) => (
                                    <ComboboxItem key={motorByVehicleTypeForCombobox.value} value={motorByVehicleTypeForCombobox}>
                                      <Item size="sm" className="p-0">
                                        <ItemContent>
                                          <ItemTitle className="whitespace-nowrap">
                                            <div
                                              className="w-4 h-4 rounded-sm"
                                              style={{
                                                backgroundColor: motorByVehicleTypeForCombobox.color,
                                              }}
                                            />
                                            {motorByVehicleTypeForCombobox.model}
                                          </ItemTitle>
                                          <ItemDescription>
                                            {motorByVehicleTypeForCombobox.value}
                                          </ItemDescription>
                                        </ItemContent>
                                      </Item>
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                      </>
                    )}
                    {step === 2 && (
                      <>
                    <addSaleForm.Field
                      name="customerFirstName"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">First Name</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => {
                                    // Convert to uppercase
                                    const uppercaseValue = e.target.value.toUpperCase()
                                    field.handleChange(uppercaseValue)
                                  }}
                                  disabled={isSubmitting}
                                  aria-invalid={isInvalid}
                                  placeholder="John"
                                  autoComplete="off"
                                  style={{ textTransform: 'uppercase' }}
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="customerOtherName"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Other Name</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => {
                                    // Convert to uppercase
                                    const uppercaseValue = e.target.value.toUpperCase()
                                    field.handleChange(uppercaseValue)
                                  }}
                                  disabled={isSubmitting}
                                  aria-invalid={isInvalid}
                                  placeholder="Doe"
                                  autoComplete="off"
                                  style={{ textTransform: 'uppercase' }}
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="customerLastName"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Last Name</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => {
                                    // Convert to uppercase
                                    const uppercaseValue = e.target.value.toUpperCase()
                                    field.handleChange(uppercaseValue)
                                  }}
                                  disabled={isSubmitting}
                                  aria-invalid={isInvalid}
                                  placeholder="Smith"
                                  autoComplete="off"
                                  style={{ textTransform: 'uppercase' }}
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="customerPhone"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Phone #</FieldLabel>
                                  <PhoneInput
                                    autoComplete="off"
                                    placeholder="Enter customer's phone number"
                                    className="col-span-3"
                                    defaultCountry="GH"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(value) => field.handleChange(value)}
                                    aria-invalid={isInvalid}
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
                    <addSaleForm.Field
                      name="status"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FieldLabel htmlFor={field.name} className="text-primary">Payment Status</FieldLabel>
                              <Select
                                value={field.state.value}
                                onValueChange={(v) => field.handleChange(v as "paid in full" | "paid in installments")}
                                disabled={isSubmitting}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="paid in full">Paid in full</SelectItem>
                                  <SelectItem value="paid in installments">Paid in installments</SelectItem>
                                </SelectContent>
                              </Select>
                              {isInvalid && (
                                <FieldError errors={field.state.meta.errors} />
                              )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                      </>
                    )}
                  </FieldGroup>
                </form>  
            </div>
          </div>
          <DialogFooter>
            <Field orientation="horizontal" className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                    addSaleForm.reset()
                    setStep(1)
                    setMotorByVehicleTypeForCombobox([])
                    setMotorByVehicleType([])
                    setMotorByBranch([])
                }}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button type="submit" form="add-sale-form" disabled={step !== 2 || isSubmitting}>
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
