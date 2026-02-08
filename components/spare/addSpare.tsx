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
import { CirclePile, Loader2, Plus } from "lucide-react"
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
} from "@/components/ui/field"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { postSpareAction } from "@/app/actions/spares/postSpareAction"
import { formatNumberWithCommas } from "@/utils/helpers"
import { BRANCHES, MODELS, VEHICLE_TYPES } from "@/utils/constants"

const addSpareFormSchema = z.object({
  branch: z.string().min(1, "Branch is required"),
  partType: z.string().min(1, "Part type is required"),
  partModel: z.string().min(1, "Part model is required"),
  partNo: z.string().min(1, "Part number is required"),
  partSerial: z.string().min(1, "Serial is required"),
  cost: z.string().min(1, "Cost is required"),
  msrp: z.string().min(1, "MSRP is required"),
  waybill: z.string().min(1, "Waybill is required"),
})

export interface AddSpareProps {
  getSpares: () => void
}

export function AddSpare({ getSpares }: AddSpareProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const addSpareForm = useForm({
    defaultValues: {
      branch: "",
      partType: "",
      partModel: "",
      partNo: "",
      partSerial: "",
      cost: "",
      msrp: "",
      waybill: "",
    },
    validators: {
      onSubmit: addSpareFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        const result = await postSpareAction(
          value.branch,
          {
            type: value.partType,
            model: value.partModel,
            no: value.partNo,
            serial: value.partSerial,
          },
          Number(value.cost),
          Number(value.msrp),
          value.waybill,
        )
        if (result) {
          toast.success("Spare Part Added to Inventory", {
            description: "You can now add another part or close this dialog",
          })
          setIsSubmitting(false)
          addSpareForm.reset()
          getSpares()
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
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add Spare Part
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="mx-auto w-full max-w-sm pb-6">
          <DialogHeader>
            <DialogTitle>Add Spare Part</DialogTitle>
            <DialogDescription className="mb-4">
              Log a new spare part to the inventory.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col p-4 no-scrollbar -mx-4 h-[50vh] overflow-y-auto">
            <form
              className="space-y-6"
              id="add-spare-form"
              onSubmit={(e) => {
                e.preventDefault()
                addSpareForm.handleSubmit()
              }}
            >
              <FieldGroup>
                <addSpareForm.Field
                  name="branch"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
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
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </div>
                      </Field>
                    )
                  }}
                />
                <addSpareForm.Field
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
                              addSpareForm.resetField("partModel")
                            }}
                            disabled={isSubmitting}
                          >
                            {VEHICLE_TYPES.map((vehicleType) => (
                              <FieldLabel htmlFor={`spare-${vehicleType.value}`} key={vehicleType.value}>
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> {vehicleType.icon} {vehicleType.name} </FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem value={vehicleType.value} id={`spare-${vehicleType.value}`} />
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
                <addSpareForm.Subscribe selector={(state) => state.values.partType}>
                  {(partType) => (
                    <addSpareForm.Field
                      name="partModel"
                      children={(field) => {
                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                              <FieldLabel className="text-primary">Model</FieldLabel>
                              <Select
                                value={field.state.value}
                                onValueChange={(value) => field.handleChange(value)}
                                disabled={isSubmitting}
                              >
                                <SelectTrigger className="w-full" disabled={isSubmitting}>
                                  <SelectValue placeholder="Select a model" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      Available {partType && partType.replace(/^\w/, c => c.toUpperCase())} Models
                                    </SelectLabel>
                                    <SelectSeparator />
                                    {MODELS.filter((model) => model.type === partType).map((model) => (
                                      <SelectItem key={model.value} value={model.value}>{model.name}</SelectItem>
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
                  )}
                </addSpareForm.Subscribe>
                <addSpareForm.Field
                  name="partNo"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                          <FieldLabel htmlFor={field.name} className="text-primary">Part No</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Part number"
                            autoComplete="off"
                            disabled={isSubmitting}
                          />
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </div>
                      </Field>
                    )
                  }}
                />
                <addSpareForm.Field
                  name="partSerial"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
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
                              const v = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
                              field.handleChange(v)
                            }}
                            aria-invalid={isInvalid}
                            placeholder="Serial number"
                            autoComplete="off"
                            style={{ textTransform: "uppercase" }}
                            disabled={isSubmitting}
                          />
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </div>
                      </Field>
                    )
                  }}
                />
                <addSpareForm.Field
                  name="cost"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
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
                            placeholder="1,000"
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
                <addSpareForm.Field
                  name="msrp"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
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
                <addSpareForm.Field
                  name="waybill"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
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
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </div>
                      </Field>
                    )
                  }}
                />
              </FieldGroup>
            </form>
          </div>
          <DialogFooter>
            <Field orientation="horizontal" className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => addSpareForm.reset()} disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" form="add-spare-form" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CirclePile className="h-4 w-4" />}
                Submit
              </Button>
            </Field>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
