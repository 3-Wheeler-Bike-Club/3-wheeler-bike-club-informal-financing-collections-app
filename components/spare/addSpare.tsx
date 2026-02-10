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
import { CirclePile, CloudUpload, Loader2, Paperclip, Plus } from "lucide-react"
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useState } from "react"
import { formatNumberWithCommas, shortenTxt } from "@/utils/helpers"
import { BRANCHES, VEHICLE_TYPES } from "@/utils/constants"
import { postSpareAction } from "@/app/actions/spares/postSpareAction"
import { useUploadThing } from "@/hooks/useUploadThing"
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from "../ui/file-upload"

// Schema order matches Spare model: branch, part (type, no, description), quantity, cost, msrp, waybill
const addSpareFormSchema = z.object({
  branch: z.string().min(1, "Branch is required"),
  partType: z.string().min(1, "Part type is required"),
  partNo: z.string().min(1, "Part number is required"),
  description: z.string().min(1, "Description is required"),
  quantity: z.string().min(1, "Quantity is required"),
  cost: z.string().min(1, "Cost is required"),
  msrp: z.string().min(1, "MSRP is required"),
  waybill: z.array(z.instanceof(File)).min(1, "Upload at least one waybill file (PDF or image)"),
})

export interface AddSpareProps {
  getSpares: () => void
}

export function AddSpare({ getSpares }: AddSpareProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { startUpload: startUploadWaybill, routeConfig: routeConfigWaybill } = useUploadThing("waybillUploader", {
    onClientUploadComplete: () => {
      toast.info("Waybill Uploaded", {
        description: "Please wait while we save the rest of your details",
      })
    },
    onUploadError: () => {
      toast.error("Failed to upload files.", {
        description: `Something went wrong, please try again`,
      })
      setIsSubmitting(false);
    },
    onUploadBegin: (file: string) => {
      console.log("upload has begun for", file);
    },
  });

  const addSpareForm = useForm({
    defaultValues: {
      branch: "",
      partType: "",
      partNo: "",
      description: "",
      quantity: "",
      cost: "",
      msrp: "",
      waybill: [] as File[],
    },
    validators: {
      onSubmit: addSpareFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      try {
        const uploadWaybillFiles = await startUploadWaybill(value.waybill)
        const waybillUrls = uploadWaybillFiles?.map((file) => file.ufsUrl) ?? []
        if (waybillUrls.length === 0) {
          toast.error("Waybill upload failed.", {
            description: "Please upload at least one file and try again.",
          })
          setIsSubmitting(false)
          return
        }
        const result = await postSpareAction(
          value.branch,
          {
            type: value.partType,
            no: value.partNo,
            description: value.description || undefined,
          },
          Number(value.quantity),
          Number(value.cost),
          Number(value.msrp),
          waybillUrls,
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
                            onValueChange={(value) => field.handleChange(value)}
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
                <addSpareForm.Field
                  name="partNo"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                          <FieldLabel htmlFor={field.name} className="text-primary">Part No.</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="G4080260"
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
                  name="description"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                          <FieldLabel className="text-primary">Description</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="PIVOT PIN FRONT KIT"
                            autoComplete="off"
                            disabled={isSubmitting}
                          />
                          {isInvalid && <FieldError errors={field.state.meta.errors} />}
                        </div>
                      </Field>
                    )
                  }}
                />
                {/* quantity (per-branch inventory) */}
                <addSpareForm.Field
                  name="quantity"
                  children={(field) => {
                    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                          <FieldLabel htmlFor={field.name} className="text-primary">Quantity</FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value.replace(/\D/g, ""))}
                            aria-invalid={isInvalid}
                            placeholder="0"
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
                {/* no serial field in Spare model; serial removed */}
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
                            placeholder="25"
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
                            placeholder="28"
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
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid
                    return (
                      <Field data-invalid={isInvalid}>
                        <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                        <FieldLabel htmlFor={field.name} className="text-primary">Waybill</FieldLabel>
                            <FileUploader
                                value={field.state.value}
                                onValueChange={(files) => {
                                  if (!isSubmitting) {
                                    field.handleChange(files || [])
                                  }
                                }}
                                dropzoneOptions={{
                                    maxFiles: 1,
                                    maxSize: 1024 * 1024 * 4,
                                    multiple: true,
                                    accept: {
                                        "image/*": [".png", ".jpg", ".jpeg"],
                                    },
                                    disabled: isSubmitting,
                                }}
                                className={`relative bg-background rounded-lg p-2 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                <FileInput
                                    id="waybill-fileInput"
                                    className="outline-dashed outline-1 outline-slate-500"
                                >
                                    <div className="flex items-center justify-center flex-col py-2 w-full ">
                                        <CloudUpload className='text-gray-500 w-10 h-10' />
                                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                            <span className="font-semibold">Click to upload </span>
                                            or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG, or JPEG (Exactly 1 file required)
                                        </p>
                                    </div>
                                </FileInput>
                                <FileUploaderContent>
                                    {field.state.value.length > 0 &&
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
