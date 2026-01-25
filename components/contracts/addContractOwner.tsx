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
import { useForm } from "@tanstack/react-form"
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
import { Caravan, Motorbike, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PhoneInput } from "../ui/phone-input"

const addContractOwnerFormSchema = z.object({
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
  vehicleLicense: z
    .string(),
  ownerFirstName: z
    .string(),
  ownerOtherName: z
    .string(),
  ownerLastName: z
    .string(),
  ownerPhone: z
    .string(),
})

export function AddContractOwner() {

  const addContractOwnerForm = useForm({
    defaultValues: {
      branch: "",
      vehicleType: "",
      vehicleModel: "",
      vehicleColor: "",
      vehicleVin: "",
      vehicleLicense: "",
      ownerFirstName: "",
      ownerOtherName: "",
      ownerLastName: "",
      ownerPhone: "",

    },
    validators: {
      onSubmit: addContractOwnerFormSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
    },
  })

  
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
            <Button variant="outline">
                <Plus />
                Add Work Contract
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm pb-6">
          <DialogHeader>
            <DialogTitle>Add Work Contract</DialogTitle>
            <DialogDescription>
                Create a new work contract pending driver assignment.
            </DialogDescription>
          </DialogHeader>
            <div className="flex flex-col p-4">
                <form
                  className="space-y-6"
                  id="add-sale-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    addContractOwnerForm.handleSubmit()
                  }}
                >
                  <FieldGroup>
                    <addContractOwnerForm.Field
                      name="branch"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Branch</FieldLabel>
                                <Select>
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
                    <addContractOwnerForm.Field
                      name="vehicleType"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Type</FieldLabel>
                            <RadioGroup className="max-w-full">
                              <FieldLabel htmlFor="plus-plan">
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> <Motorbike className="h-4 w-4 text-primary" /> Motorcycle </FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem value="plus" id="plus-plan" />
                                </Field>
                              </FieldLabel>
                              <FieldLabel htmlFor="pro-plan">
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> <Caravan className="h-4 w-4 text-primary" /> Tricycle </FieldTitle>
                                      
                                  </FieldContent>
                                  <RadioGroupItem value="pro" id="pro-plan" />
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
                    <addContractOwnerForm.Field
                      name="vehicleModel"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Model</FieldLabel>
                            <Select>
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
                    <addContractOwnerForm.Field
                      name="vehicleColor"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Color</FieldLabel>
                                <Select>
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
                    <addContractOwnerForm.Field
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
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  aria-invalid={isInvalid}
                                  placeholder="MD6M14PA2R4NO1944"
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addContractOwnerForm.Field
                      name="vehicleLicense"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">License</FieldLabel>
                                <Input
                                  id={field.name}
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  aria-invalid={isInvalid}
                                  placeholder="GH-1234567890"
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addContractOwnerForm.Field
                      name="ownerFirstName"
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
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  aria-invalid={isInvalid}
                                  placeholder="John"
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addContractOwnerForm.Field
                      name="ownerOtherName"
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
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  aria-invalid={isInvalid}
                                  placeholder="Doe"
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addContractOwnerForm.Field
                      name="ownerLastName"
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
                                  onChange={(e) => field.handleChange(e.target.value)}
                                  aria-invalid={isInvalid}
                                  placeholder="Smith"
                                  autoComplete="off"
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addContractOwnerForm.Field
                      name="ownerPhone"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Phone #</FieldLabel>
                                  <PhoneInput
                                    autoComplete="off"
                                    placeholder="Enter owner's phone number"
                                    className="col-span-3"
                                    defaultCountry="GH"
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(value) => field.handleChange(value)}
                                    aria-invalid={isInvalid}
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
                    <Button type="button" variant="outline" onClick={() => addContractOwnerForm.reset()}>
                      Reset
                    </Button>
                    <Button type="submit" form="add-sale-form">
                      Submit
                    </Button>
                  </Field>
                </form>  
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
