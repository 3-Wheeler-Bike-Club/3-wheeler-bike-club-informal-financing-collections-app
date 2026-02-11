import { Button } from "@/components/ui/button"
import {
  Dialog,
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
} from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CirclePile, Loader2, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useForm } from "@tanstack/react-form"
import { Spare } from "@/hooks/useGetSpares"
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
import { postServiceAction } from "@/app/actions/services/postServiceAction"
import { toast } from "sonner"
import { updateSpareAction } from "@/app/actions/spares/updateSpareAction"
import { BRANCHES, VEHICLE_TYPES } from "@/utils/constants"
import { formatNumberWithCommas } from "@/utils/helpers"

const addServiceFormSchema = z.object({
  branch: z.string().min(1, "Branch is required"),
  partType: z.string().min(1, "Part type is required"),
  selectedSpareId: z.string().min(1, "Select a part"),
  customerFirstName: z.string().min(1, "First name is required"),
  customerOtherName: z.string(),
  customerLastName: z.string().min(1, "Last name is required"),
  customerPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  amount: z.string().min(1, "Amount is required"),
  status: z.enum(["paid in full", "paid in installments"]),
})

export interface AddServiceProps {
  spares: Spare[]
  getServices: () => void
  getSpares: () => void
}

interface SpareForCombobox {
  description: string
  no: string
  value: string // spare._id
}

export function AddService({ spares, getServices, getSpares }: AddServiceProps) {

  useEffect(() => {
    if (spares && spares.length > 0) {
      const inStock = spares.filter((s) => (s.quantity ?? 0) > 0)
      setSparesInStock(inStock)
    } else {
      setSparesInStock([])
    }
  }, [spares])

  const [sparesInStock, setSparesInStock] = useState<Spare[]>([])
  const [sparesByBranch, setSparesByBranch] = useState<Spare[]>([])
  const [sparesByPartType, setSparesByPartType] = useState<Spare[]>([])
  const [sparesForCombobox, setSparesForCombobox] = useState<SpareForCombobox[]>([])

  useEffect(() => {
    if (sparesByPartType && sparesByPartType.length > 0) {
      const formatted = sparesByPartType.map((item) => ({
        description: item.part.description ?? item.part.no,
        no: item.part.no,
        value: item._id,
      }))
      setSparesForCombobox(formatted)
    } else {
      setSparesForCombobox([])
    }
  }, [sparesByPartType])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const dialogContentRef = useRef<HTMLDivElement>(null)

  const addServiceForm = useForm({
    defaultValues: {
      branch: "",
      partType: "",
      selectedSpareId: "",
      customerFirstName: "",
      customerOtherName: "",
      customerLastName: "",
      customerPhone: "",
      amount: "",
      status: "paid in full" as "paid in full" | "paid in installments",
    },
    validators: {
      onSubmit: addServiceFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        const selectedSpare = sparesByPartType.find((s) => s._id === value.selectedSpareId)
        if (selectedSpare) {
          const result = await postServiceAction(
            value.branch,
            {
              type: selectedSpare.part.type,
              model: selectedSpare.part.description ?? selectedSpare.part.no,
              no: selectedSpare.part.no,
              serial: selectedSpare._id,
            },
            {
              firstname: value.customerFirstName,
              othername: value.customerOtherName,
              lastname: value.customerLastName,
              phone: value.customerPhone,
            },
            Number(value.amount),
            value.status,
          )
          if (result) {
            const updated = await updateSpareAction(selectedSpare._id)
            if (updated) {
              toast.success("Service Recorded Successfully", {
                description: "You can now add another service or close this dialog",
              })
              setIsSubmitting(false)
              addServiceForm.reset()
              getServices()
              getSpares()
            } else {
              toast.error("Failed to update spare.", {
                description: "Something went wrong, please try again",
              })
              setIsSubmitting(false)
            }
          } else {
            toast.error("Failed to post service.", {
              description: "Something went wrong, please try again",
            })
            setIsSubmitting(false)
          }
        } else {
          toast.error("Spare part not found.", {
            description: "Please select a part again.",
          })
          setIsSubmitting(false)
        }
      } catch (error) {
        console.error("Form submission error", error)
        toast.error("Failed to submit the form.", {
          description: "Something went wrong, please try again",
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
            Add Service
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm pb-6">
            <DialogHeader>
              <DialogTitle>Add Service</DialogTitle>
              <DialogDescription className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-col gap-2">
                  {step === 1 && "Step 1/2: Part Selection"}
                  {step === 2 && "Step 2/2: Customer & Payment"}
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? "bg-primary" : "bg-primary/50"}`} />
                    <span className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? "bg-primary" : "bg-gray-300"}`} />
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
                id="add-service-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  addServiceForm.handleSubmit()
                }}
              >
                <FieldGroup>
                  {step === 1 && (
                    <>
                      <addServiceForm.Field
                        name="branch"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel htmlFor={field.name} className="text-primary">Branch</FieldLabel>
                                <Select
                                  value={field.state.value}
                                  onValueChange={(value) => {
                                    field.handleChange(value)
                                    if (sparesInStock && sparesInStock.length > 0) {
                                      const byBranch = sparesInStock.filter((s) => s.branch === value)
                                      setSparesByBranch(byBranch)
                                      if (addServiceForm.state.values.partType.length > 0) {
                                        const byType = byBranch.filter((s) => s.part.type === addServiceForm.state.values.partType)
                                        setSparesByPartType(byType)
                                      }
                                    }
                                  }}
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
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </div>
                            </Field>
                          )
                        }}
                      />
                      <addServiceForm.Field
                        name="partType"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel className="text-primary">Part Type</FieldLabel>
                                <RadioGroup
                                  className="grid max-w-full grid-cols-2 gap-2"
                                  value={field.state.value}
                                  onValueChange={(value) => {
                                    field.handleChange(value)
                                    if (sparesByBranch && sparesByBranch.length > 0) {
                                      const byType = sparesByBranch.filter((s) => s.part.type === value)
                                      setSparesByPartType(byType)
                                    }
                                  }}
                                  disabled={isSubmitting}
                                >
                                  {VEHICLE_TYPES.map((vehicleType) => (
                                    <FieldLabel htmlFor={`service-${vehicleType.value}`} key={vehicleType.value}>
                                      <Field orientation="horizontal">
                                        <FieldContent>
                                          <FieldTitle> {vehicleType.icon} {vehicleType.name} </FieldTitle>
                                        </FieldContent>
                                        <RadioGroupItem value={vehicleType.value} id={`service-${vehicleType.value}`} />
                                      </Field>
                                    </FieldLabel>
                                  ))}
                                </RadioGroup>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </div>
                            </Field>
                          )
                        }}
                      />
                      <addServiceForm.Field
                        name="selectedSpareId"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel className="text-primary">Part</FieldLabel>
                                <Combobox
                                  items={sparesForCombobox}
                                  itemToStringValue={(item: SpareForCombobox) => item.value}
                                  value={sparesForCombobox.find((item) => item.value === field.state.value) || null}
                                  onValueChange={(selected: SpareForCombobox | null) => {
                                    if (selected) {
                                      field.handleChange(selected.value)
                                    } else {
                                      field.handleChange("")
                                    }
                                  }}
                                  disabled={isSubmitting}
                                >
                                  <ComboboxInput placeholder="Search parts by description or no..." />
                                  <ComboboxContent container={dialogContentRef}>
                                    <ComboboxEmpty>No parts found.</ComboboxEmpty>
                                    <ComboboxList>
                                      {(item) => (
                                        <ComboboxItem key={item.value} value={item}>
                                          <Item size="sm" className="p-0">
                                            <ItemContent>
                                              <ItemTitle className="whitespace-nowrap">{item.description}</ItemTitle>
                                              <ItemDescription>{item.no}</ItemDescription>
                                            </ItemContent>
                                          </Item>
                                        </ComboboxItem>
                                      )}
                                    </ComboboxList>
                                  </ComboboxContent>
                                </Combobox>
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </div>
                            </Field>
                          )
                        }}
                      />
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <addServiceForm.Field
                        name="customerFirstName"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel className="text-primary">First Name</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                                  disabled={isSubmitting}
                                  aria-invalid={isInvalid}
                                  placeholder="John"
                                  autoComplete="off"
                                  style={{ textTransform: "uppercase" }}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </div>
                            </Field>
                          )
                        }}
                      />
                      <addServiceForm.Field
                        name="customerOtherName"
                        children={(field) => (
                          <Field>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FieldLabel className="text-primary">Other Name</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                                disabled={isSubmitting}
                                placeholder="Doe"
                                autoComplete="off"
                                style={{ textTransform: "uppercase" }}
                              />
                            </div>
                          </Field>
                        )}
                      />
                      <addServiceForm.Field
                        name="customerLastName"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel className="text-primary">Last Name</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                                  disabled={isSubmitting}
                                  aria-invalid={isInvalid}
                                  placeholder="Smith"
                                  autoComplete="off"
                                  style={{ textTransform: "uppercase" }}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </div>
                            </Field>
                          )
                        }}
                      />
                      <addServiceForm.Field
                        name="customerPhone"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel className="text-primary">Phone #</FieldLabel>
                                <PhoneInput
                                  autoComplete="off"
                                  placeholder="Enter customer's phone number"
                                  className="col-span-3"
                                  defaultCountry="GH"
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(value) => field.handleChange(value ?? "")}
                                  aria-invalid={isInvalid}
                                  disabled={isSubmitting}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </div>
                            </Field>
                          )
                        }}
                      />
                      <addServiceForm.Field
                        name="amount"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel className="text-primary">Amount (GHS)</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value ? formatNumberWithCommas(field.state.value) : ""}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                                  aria-invalid={isInvalid}
                                  placeholder="1,500"
                                  autoComplete="off"
                                  type="text"
                                  inputMode="numeric"
                                  disabled={isSubmitting}
                                />
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                              </div>
                            </Field>
                          )
                        }}
                      />
                      <addServiceForm.Field
                        name="status"
                        children={(field) => {
                          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                          return (
                            <Field data-invalid={isInvalid}>
                              <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                <FieldLabel className="text-primary">Payment Status</FieldLabel>
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
                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  addServiceForm.reset()
                  setStep(1)
                  setSparesForCombobox([])
                  setSparesByPartType([])
                  setSparesByBranch([])
                }}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button type="submit" form="add-service-form" disabled={step !== 2 || isSubmitting}>
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
