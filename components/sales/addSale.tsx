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
import { Inventory } from "@/hooks/useGetInventory"
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
import { updateInventoryAction } from "@/app/actions/inventory/updateInventoryAction"
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
})

export interface AddSaleProps {
  inventory: Inventory[]
  getSales: () => void
}

interface InventoryByVehicleTypeForCombobox {
  model: string
  color: string
  value: string
}

export function AddSale({ inventory, getSales }: AddSaleProps) {
  console.log(inventory)

  useEffect(() => {
    if (inventory && inventory.length > 0) {
      const formatted = inventory.filter((item) => item.status === "in stock")
      setInventoryInStock(formatted)
    } else {
      setInventoryInStock([])
    }
  }, [inventory])

  const [inventoryInStock, setInventoryInStock] = useState<Inventory[]>([])
  console.log(inventoryInStock)
  const [inventoryByBranch, setInventoryByBranch] = useState<Inventory[]>([])  
  console.log(inventoryByBranch)
  const [inventoryByVehicleType, setInventoryByVehicleType] = useState<Inventory[]>([])
  console.log(inventoryByVehicleType)
  const [inventoryByVehicleTypeForCombobox, setInventoryByVehicleTypeForCombobox] = useState<InventoryByVehicleTypeForCombobox[]>([])
  console.log(inventoryByVehicleTypeForCombobox)



  useEffect(() => {
    if (inventoryByVehicleType && inventoryByVehicleType.length ) {
      const formatted = inventoryByVehicleType.map((item) => ({
        model: item.vehicle.model,
        color: item.vehicle.color,
        value: item.vehicle.vin,
      }))
      setInventoryByVehicleTypeForCombobox(formatted)
    } else {
      setInventoryByVehicleTypeForCombobox([])
    }
  }, [inventoryByVehicleType])

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

    },
    validators: {
      onSubmit: addSaleFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      console.log(value)
      try {
        const sale = inventoryByVehicleType!.find((inventoryByVehicleType) => inventoryByVehicleType.vehicle.vin === value.vehicleVin)
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
            Number(sale?.amount),
          )
          if (postSale) {
            const updateInventory = await updateInventoryAction(sale?._id)
            if (updateInventory) {
              toast.success("Sale Recorded Successfully", {
                description: "You can now add another sale or close this dialog",
              })
              setIsSubmitting(false);
              addSaleForm.reset();
              getSales()
            } else {
              toast.error("Failed to update inventory.", {
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
                                      if (inventoryInStock && inventoryInStock?.length > 0){
                                        const filteredInventoryByBranch = inventoryInStock.filter((inventoryInStock) => inventoryInStock.branch === value)
                                        setInventoryByBranch(filteredInventoryByBranch)
                                        if (addSaleForm.state.values.vehicleType.length > 0) {
                                          const filteredInventoryByVehicleType = filteredInventoryByBranch.filter((inventoryByBranch) => inventoryByBranch.vehicle.type === addSaleForm.state.values.vehicleType)
                                          setInventoryByVehicleType(filteredInventoryByVehicleType)
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
                                if (inventoryByBranch && inventoryByBranch?.length > 0){
                                  const filteredInventoryByVehicleType = inventoryByBranch.filter((inventoryByBranch) => inventoryByBranch.vehicle.type === value)
                                  setInventoryByVehicleType(filteredInventoryByVehicleType)
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
                              items={inventoryByVehicleTypeForCombobox}
                              itemToStringValue={(inventoryByVehicleType: InventoryByVehicleTypeForCombobox) => inventoryByVehicleType.value}
                              value={inventoryByVehicleTypeForCombobox.find((item) => item.value === field.state.value) || null}
                              onValueChange={(selectedItem: InventoryByVehicleTypeForCombobox | null) => {
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
                                  {(inventoryByVehicleTypeForCombobox) => (
                                    <ComboboxItem key={inventoryByVehicleTypeForCombobox.value} value={inventoryByVehicleTypeForCombobox}>
                                      <Item size="sm" className="p-0">
                                        <ItemContent>
                                          <ItemTitle className="whitespace-nowrap">
                                            <div
                                              className="w-4 h-4 rounded-sm"
                                              style={{
                                                backgroundColor: inventoryByVehicleTypeForCombobox.color,
                                              }}
                                            />
                                            {inventoryByVehicleTypeForCombobox.model}
                                          </ItemTitle>
                                          <ItemDescription>
                                            {inventoryByVehicleTypeForCombobox.value}
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
                    setInventoryByVehicleTypeForCombobox([])
                    setInventoryByVehicleType([])
                    setInventoryByBranch([])
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
