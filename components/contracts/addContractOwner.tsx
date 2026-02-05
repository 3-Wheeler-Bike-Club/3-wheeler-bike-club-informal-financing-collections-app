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
import { Caravan, CirclePile, Loader2, Motorbike, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PhoneInput } from "../ui/phone-input"
import { useState } from "react"
import { toast } from "sonner"
import { postContractOwnerPlusVehicleAction } from "@/app/actions/contracts/postContractOwnerPlusVehicleAction"
import { BRANCHES, MODELS, VEHICLE_COLORS, VEHICLE_TYPES } from "@/utils/constants"

const addContractOwnerFormSchema = z.object({
  branch: z
    .string()
    .min(1, "Branch is required"),
  serial: z
    .string()
    .min(1, "Serial is required"),
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
  vehicleLicense: z
    .string()
    .min(1, "License is required"),
  ownerFirstName: z
    .string()
    .min(1, "First name is required"),
  ownerOtherName: z
    .string(),
  ownerLastName: z
    .string()
    .min(1, "Last name is required"),
  ownerPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
})


interface AddContractOwnerProps {
  getContracts: () => void
}

export function AddContractOwner({ getContracts }: AddContractOwnerProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const addContractOwnerForm = useForm({
    defaultValues: {
      branch: "",
      serial: "",
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
      setIsSubmitting(true)
      console.log(value)
      try {
        const postContractOwnerPlusVehicle = await postContractOwnerPlusVehicleAction(
          value.branch,
          value.serial,
          {
            type: value.vehicleType,
            model: value.vehicleModel,
            color: value.vehicleColor,
            vin: value.vehicleVin,
            license: value.vehicleLicense,
          },
          {
            firstname: value.ownerFirstName,
            othername: value.ownerOtherName,
            lastname: value.ownerLastName,
            phone: value.ownerPhone,
          },
        )
        if (postContractOwnerPlusVehicle) {
          toast.success("Contract owner plus vehicle posted successfully", {
            description: "You can now add another contract owner plus vehicle or close this dialog",
          })
          setIsSubmitting(false)
          addContractOwnerForm.reset()
          getContracts()
        } else {
          toast.error("Failed to post contract owner plus vehicle", {
            description: "Something went wrong, please try again",
          })
          setIsSubmitting(false)
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
                Add Work Contract
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm pb-6">
          <DialogHeader>
            <DialogTitle>Add Work Contract</DialogTitle>
            <DialogDescription className="mb-4">
                Create a new work contract pending driver assignment.
            </DialogDescription>
          </DialogHeader>
            <div className="flex flex-col p-4 no-scrollbar -mx-4 h-[50vh] overflow-y-auto">
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
                                <Select
                                  value={field.state.value}
                                  onValueChange={(value) => field.handleChange(value)}
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
                    <addContractOwnerForm.Field
                      name="serial"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Serial</FieldLabel>
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
                                  placeholder="PKS 10"
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
                    <addContractOwnerForm.Field
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
                              onValueChange={(value) => field.handleChange(value)}
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
                    <addContractOwnerForm.Subscribe
                      selector={(state) => state.values.vehicleType}
                    >
                      {(vehicleType) => (
                        <addContractOwnerForm.Field
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
                                      <SelectLabel>
                                        Available {vehicleType && vehicleType.replace(/^\w/, c => c.toUpperCase())} Models
                                      </SelectLabel>
                                      <SelectSeparator />
                                      {MODELS.filter((model) => model.type === vehicleType).map((model) => (
                                        <SelectItem key={model.value} value={model.value}>{model.name}</SelectItem>
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
                      )}
                    </addContractOwnerForm.Subscribe>
                    <addContractOwnerForm.Field
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
                                  <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select a color" />
                                  </SelectTrigger>
                                  <SelectContent
                                    //position={alignItemWithTrigger ? "item-aligned" : "popper"}
                                  >
                                    <SelectGroup>
                                      {VEHICLE_COLORS.map((color) => (
                                        <SelectItem key={color.value} value={color.value}>{color.name}</SelectItem>
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
                                  onChange={(e) => {
                                    // Convert to uppercase
                                    const uppercaseValue = e.target.value.toUpperCase()
                                    field.handleChange(uppercaseValue)
                                  }}
                                  aria-invalid={isInvalid}
                                  placeholder="GH-1234567890"
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
                                  onChange={(e) => {
                                    // Convert to uppercase
                                    const uppercaseValue = e.target.value.toUpperCase()
                                    field.handleChange(uppercaseValue)
                                  }}
                                  aria-invalid={isInvalid}
                                  placeholder="John"
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
                                  onChange={(e) => {
                                    // Convert to uppercase
                                    const uppercaseValue = e.target.value.toUpperCase()
                                    field.handleChange(uppercaseValue)
                                  }}
                                  aria-invalid={isInvalid}
                                  placeholder="Doe"
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
                                  onChange={(e) => {
                                    // Convert to uppercase
                                    const uppercaseValue = e.target.value.toUpperCase()
                                    field.handleChange(uppercaseValue)
                                  }}
                                  aria-invalid={isInvalid}
                                  placeholder="Smith"
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
                </form>  
            </div>
          </div>
          <DialogFooter>
            <Field orientation="horizontal" className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => addContractOwnerForm.reset()} disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" form="add-sale-form" disabled={isSubmitting}>
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
