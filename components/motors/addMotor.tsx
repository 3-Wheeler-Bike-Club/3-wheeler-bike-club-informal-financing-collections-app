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
import { Caravan, CirclePile, Loader2, Motorbike, Paperclip, Plus, Save } from "lucide-react"
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
import { useState } from "react"
import { postMotorAction } from "@/app/actions/motors/postMotorAction"
import { formatNumberWithCommas } from "@/utils/helpers"
import { BRANCHES, MODELS, VEHICLE_COLORS, VEHICLE_TYPES } from "@/utils/constants"



const addMotorFormSchema = z.object({
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
  vehicleEngine: z
    .string()
    .min(1, "Engine is required"),
  cost: z.string().min(1, "Cost is required"),
  msrp: z.string().min(1, "MSRP is required"),
  waybill: z.string().min(1, "Waybill is required"),
})

export interface AddMotorProps {
  getMotors: () => void
}

export function AddMotor({ getMotors }: AddMotorProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)


  const addMotorForm = useForm({
    defaultValues: {
      branch: "",
      vehicleType: "",
      vehicleModel: "",
      vehicleColor: "",
      vehicleVin: "",
      vehicleEngine: "",
      cost: "",
      msrp: "",
      waybill: "",
    },
    validators: {
      onSubmit: addMotorFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      console.log(value)
      try {
        const postMotor = await postMotorAction(
          value.branch,
          {
            type: value.vehicleType,
            model: value.vehicleModel,
            color: value.vehicleColor,
            vin: value.vehicleVin,
            engine: value.vehicleEngine,
          },
          Number(value.cost),
          Number(value.msrp),
          value.waybill,
        );
        if (postMotor) {
          toast.success("Vehicle Stock Added to Inventory", {
            description: "You can now add another vehicle to the inventory or close this dialog",
          })
          setIsSubmitting(false);
          addMotorForm.reset();
          getMotors();
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
              <DialogDescription className="mb-4">
                  Log a new vehicle arrival to the inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col p-4 no-scrollbar -mx-4 h-[50vh] overflow-y-auto">
                <form
                  className="space-y-6"
                  id="add-motor-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    addMotorForm.handleSubmit()
                  }}
                >
                  <FieldGroup>
                    <addMotorForm.Field
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
                    <addMotorForm.Field
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
                                addMotorForm.resetField("vehicleModel")
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
                    <addMotorForm.Subscribe
                      selector={(state) => state.values.vehicleType}
                    >
                      {(vehicleType) => (
                        <addMotorForm.Field
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
                    </addMotorForm.Subscribe>
                    <addMotorForm.Field
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
                    <addMotorForm.Field
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
                    <addMotorForm.Field
                      name="vehicleEngine"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Engine</FieldLabel>
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
                                  placeholder="AG125CC"
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
                    <addMotorForm.Field
                      name="cost"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FieldLabel htmlFor={field.name} className="text-primary">Cost (GHS)</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value ? formatNumberWithCommas(field.state.value) : ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                                aria-invalid={isInvalid}
                                placeholder="35,000"
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
                    <addMotorForm.Field
                      name="msrp"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FieldLabel htmlFor={field.name} className="text-primary">MSRP (GHS)</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value ? formatNumberWithCommas(field.state.value) : ""}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
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
                    <addMotorForm.Field
                      name="waybill"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FieldLabel htmlFor={field.name} className="text-primary">Waybill</FieldLabel>
                              <Input
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={(e) => field.handleChange(e.target.value)}
                                aria-invalid={isInvalid}
                                placeholder="Waybill reference"
                                autoComplete="off"
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
              <Button type="button" variant="outline" onClick={() => addMotorForm.reset()} disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" form="add-motor-form" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CirclePile className="h-4 w-4" />}
                Submit
              </Button>
            </Field>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
