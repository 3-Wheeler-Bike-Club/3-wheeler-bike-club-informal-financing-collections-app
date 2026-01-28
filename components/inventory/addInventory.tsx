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
import { Caravan, CirclePile, CloudUpload, Loader2, Motorbike, Paperclip, Plus, Save } from "lucide-react"
import { useForm } from "@tanstack/react-form"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FileUploader, FileUploaderContent, FileUploaderItem, FileInput } from "@/components/ui/file-upload"
import { shortenTxt } from "@/utils/shorten"
import { useState } from "react"
import { useUploadThing } from "@/hooks/useUploadThing"
import { postInventoryAction } from "@/app/actions/inventory/postInventoryAction"

// Helper function to format number with commas
const formatNumberWithCommas = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '')
  if (!numericValue) return ''
  // Format with commas
  return parseInt(numericValue, 10).toLocaleString('en-US')
}

const addInventoryFormSchema = z.object({
  branch: z
    .string()
    .min(1, "Branch is required"),
  vehicleType: z
  .string()
  .min(1, "Vehicle type is required"),
  vehicleModel: z
    .string()
    .min(1, "Vehicle model is required"),
  vehicleColor: z
    .string()
    .min(1, "Vehicle color is required"),
  vehicleVin: z
    .string()
    .min(1, "VIN is required"),
  amount: z
    .string()
    .min(1, "Amount is required"),
})

export interface AddInventoryProps {
  getInventory: () => void
}

export function AddInventory({ getInventory }: AddInventoryProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)


  const addInventoryForm = useForm({
    defaultValues: {
      branch: "",
      vehicleType: "",
      vehicleModel: "",
      vehicleColor: "",
      vehicleVin: "",
      amount: "",

    },
    validators: {
      onSubmit: addInventoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      console.log(value)
      try {
        const postInventory = await postInventoryAction(
          value.branch,
          {
            type: value.vehicleType as "motorcycle" | "tricycle",
            model: value.vehicleModel,
            color: value.vehicleColor,
            vin: value.vehicleVin,
          },
          Number(value.amount),
        );
        if (postInventory) {
          toast.success("Vehicle Stock Added to Inventory", {
            description: "You can now add another vehicle to the inventory or close this dialog",
          })
          setIsSubmitting(false);
          addInventoryForm.reset();
          getInventory();
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
        <DialogTrigger asChild>
            <Button variant="outline">
                <Plus />
                Add Vehicle
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm pb-6">
            <DialogHeader>
              <DialogTitle>Add Vehicle</DialogTitle>
              <DialogDescription>
                  Log a new vehicle arrival to the inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col p-4 no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto">
                <form
                  className="space-y-6"
                  id="add-inventory-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    addInventoryForm.handleSubmit()
                  }}
                >
                  <FieldGroup>
                    <addInventoryForm.Field
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
                                  onValueChange={(value) => field.handleChange(value)}
                                  disabled={isSubmitting}
                                >
                                  <SelectTrigger className="w-full" disabled={isSubmitting}>
                                  <SelectValue placeholder="Select a branch" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      <SelectItem value="kasoa">Kasoa</SelectItem>
                                      <SelectItem value="kumasi">Kumasi</SelectItem>
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
                    <addInventoryForm.Field
                      name="vehicleType"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Type</FieldLabel>
                            <RadioGroup 
                              className="max-w-full"
                              value={field.state.value}
                              onValueChange={(value) => field.handleChange(value)}
                              disabled={isSubmitting}
                            >
                              <FieldLabel htmlFor="motorcycle">
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> <Motorbike className="h-4 w-4 text-primary" /> Motorcycle</FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem value="motorcycle" id="motorcycle" />
                                </Field>
                              </FieldLabel>
                              <FieldLabel htmlFor="tricycle">
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> <Caravan className="h-4 w-4 text-primary" /> Tricycle</FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem value="tricycle" id="tricycle" />
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
                    <addInventoryForm.Field
                      name="vehicleModel"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Model</FieldLabel>
                            <Select
                              value={field.state.value}
                              onValueChange={(value) => field.handleChange(value)}
                              disabled={isSubmitting}
                            >
                              <SelectTrigger className="w-full" disabled={isSubmitting}>
                                <SelectValue placeholder="Select a vehicle model" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Motorcycle Models</SelectLabel>
                                  <SelectItem value="tvs-hlx-125-5g">TVS HLX 125 5G</SelectItem>
                                  <SelectItem value="tvs-apache-rtr-200-4v">TVS Apache RTR 200 4V</SelectItem>
                                </SelectGroup>
                                <SelectSeparator />
                                <SelectGroup>
                                  <SelectLabel>Tricycle Models</SelectLabel>
                                  <SelectItem value="tvs-king-deluxe-plus">TVS King Deluxe Plus</SelectItem>
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
                    <addInventoryForm.Field
                      name="vehicleColor"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Color</FieldLabel>
                                <Select
                                  value={field.state.value}
                                  onValueChange={(value) => field.handleChange(value)}
                                  disabled={isSubmitting}
                                >
                                  <SelectTrigger className="w-full" disabled={isSubmitting}>
                                  <SelectValue placeholder="Select a color" />
                                  </SelectTrigger>
                                  <SelectContent
                                    //position={alignItemWithTrigger ? "item-aligned" : "popper"}
                                  >
                                    <SelectGroup>
                                      <SelectItem value="black">Black</SelectItem>
                                      <SelectItem value="red">Red</SelectItem>
                                      <SelectItem value="blue">Blue</SelectItem>
                                      <SelectItem value="green">Green</SelectItem>
                                      <SelectItem value="yellow">Yellow</SelectItem>
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
                    <addInventoryForm.Field
                      name="vehicleVin"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Vin</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => {
                                    // Convert to uppercase and only allow alphanumeric characters
                                    const uppercaseValue = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
                                    field.handleChange(uppercaseValue)
                                  }}
                                  aria-invalid={isInvalid}
                                  placeholder="MD6M14PA2R4NO1944"
                                  autoComplete="off"
                                  style={{ textTransform: 'uppercase' }}
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
                    <addInventoryForm.Field
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
                                  placeholder="40,000"
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
                    
                  </FieldGroup>
                  <Field orientation="horizontal" className="flex justify-end gap-2 mt-12">
                    <Button type="button" variant="outline" onClick={() => addInventoryForm.reset()} disabled={isSubmitting}>
                      Reset
                    </Button>
                    <Button type="submit" form="add-inventory-form" disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CirclePile className="h-4 w-4" />}
                      Submit
                    </Button>
                  </Field>
                </form>  
            </div>
          </div>
          
        </DialogContent>
    </Dialog>
  )
}
