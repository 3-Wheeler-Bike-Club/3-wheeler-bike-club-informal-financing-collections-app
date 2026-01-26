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
import { Caravan, CloudUpload, Motorbike, Paperclip, Plus } from "lucide-react"
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
    .string(),
  vehicleType: z
    .string(),
  vehicleModel: z
    .string(),
  vehicleColor: z
    .string(),
  vehicleVin: z
    .string(),
  vehiclePapers: z
    .array(z.instanceof(File))
    .nullable(),
  amount: z
    .string(),
})

export function AddInventory() {

  const addInventoryForm = useForm({
    defaultValues: {
      branch: "",
      vehicleType: "",
      vehicleModel: "",
      vehicleColor: "",
      vehicleVin: "",
      vehiclePapers: null as File[] | null,
      amount: "",

    },
    validators: {
      onSubmit: addInventoryFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
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
                                >
                                  <SelectTrigger className="w-full">
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
                            >
                              <SelectTrigger className="w-full">
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
                                >
                                  <SelectTrigger className="w-full">
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
                      name="vehiclePapers"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Papers</FieldLabel>
                                <FileUploader
                                    value={field.state.value || null}
                                    onValueChange={(files) => field.handleChange(files)}
                                    dropzoneOptions={{
                                        maxFiles: 4,
                                        maxSize: 1024 * 1024 * 4,
                                        multiple: true,
                                        accept: {
                                            "application/*": [".pdf"],
                                        },
                                    }}
                                    className="relative bg-background rounded-lg p-2"
                                >
                                    <FileInput
                                        id="national-fileInput"
                                        className="outline-dashed outline-1 outline-slate-500"
                                    >
                                        <div className="flex items-center justify-center flex-col py-2 w-full ">
                                            <CloudUpload className='text-gray-500 w-10 h-10' />
                                            <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload </span>
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                PDF
                                            </p>
                                        </div>
                                    </FileInput>
                                    <FileUploaderContent>
                                        {field.state.value &&
                                            field.state.value.length > 0 &&
                                            field.state.value.map((file, i) => (
                                                <FileUploaderItem key={i} index={i}>
                                                    <Paperclip className="h-4 w-4 stroke-current" />
                                                    <span>{shortenTxt(file.name)}</span>
                                                </FileUploaderItem>
                                            ))}
                                    </FileUploaderContent>
                                </FileUploader>
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
                    <Button type="button" variant="outline" onClick={() => addInventoryForm.reset()}>
                      Reset
                    </Button>
                    <Button type="submit" form="add-inventory-form">
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
