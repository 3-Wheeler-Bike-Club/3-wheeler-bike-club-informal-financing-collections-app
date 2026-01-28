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
import { Contract } from "@/hooks/useGetContracts"
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
import React, { useState, useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { useUploadThing } from "@/hooks/useUploadThing"
import { CirclePile, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { FileUploader, FileUploaderContent, FileUploaderItem, FileInput

 } from "@/components/ui/file-upload"
import { CloudUpload, Paperclip } from "lucide-react"
import { shortenTxt } from "@/utils/shorten"
import { PhoneInput } from "../ui/phone-input"

// Helper function to format number with commas
const formatNumberWithCommas = (value: string): string => {
  // Remove all non-numeric characters
  const numericValue = value.replace(/\D/g, '')
  if (!numericValue) return ''
  // Format with commas
  return parseInt(numericValue, 10).toLocaleString('en-US')
}

const addContractDriverFormSchema = z.object({
  driverFirstName: z
    .string()
    .min(1, "First name is required"),
  driverOtherName: z
    .string(),
  driverLastName: z
    .string()
    .min(1, "Last name is required"),
  driverPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  driverLocation: z
    .string()
    .min(1, "Location is required"),
  driverHeadshot: z
    .array(z.instanceof(File))
    .length(1, "Upload all required files"),
  driverNational: z
    .array(z.instanceof(File))
    .length(2, "Upload all required files"),
  guarantorFirstName: z
    .string()
    .min(1, "First name is required"),
  guarantorOtherName: z
    .string(),
  guarantorLastName: z
    .string()
    .min(1, "Last name is required"),
  guarantorPhone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),
  guarantorLocation: z
    .string()
    .min(1, "Location is required"),
  guarantorHeadshot: z
    .array(z.instanceof(File))
    .length(1, "Upload all required files"),
  guarantorNational: z
    .array(z.instanceof(File))
    .length(2, "Upload all required files"),
  deposit: z
    .string()
    .min(1, "Deposit is required"),
  start: z
    .string()
    .min(1, "Start date is required"),
  duration: z
    .string()
    .min(1, "Duration in weeks is required"),
  amount: z
    .string()
    .min(1, "Amount is required"),
  installment: z
    .string()
    .min(1, "Installment is required"),
})

interface AddContractDriverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contract: Contract
}

export function AddContractDriver({ open, onOpenChange, contract }: AddContractDriverProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ step, setStep ] = useState(1)

  // Reset to step 1 when dialog opens
  useEffect(() => {
    if (open) {
      setStep(1)
    }
  }, [open])

  const { startUpload: startUploadHeadshot, routeConfig: routeConfigHeadshot } = useUploadThing("headshotUploader", {
    onClientUploadComplete: () => {
      toast.info("Headshot Uploaded", {
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

  const { startUpload: startUploadNational, routeConfig: routeConfigNational } = useUploadThing("nationalUploader", {
    onClientUploadComplete: () => {
      toast.info("National Documents Uploaded", {
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

  const addContractDriverForm = useForm({
    defaultValues: {
      driverFirstName: "",
      driverOtherName: "",
      driverLastName: "",
      driverPhone: "",
      driverLocation: "",
      driverHeadshot: [] as File[],
      driverNational: [] as File[],
      guarantorFirstName: "",
      guarantorOtherName: "",
      guarantorLastName: "",
      guarantorPhone: "",
      guarantorLocation: "",
      guarantorHeadshot: [] as File[],
      guarantorNational: [] as File[],
      deposit: "",
      start: "",
      duration: "",
      amount: "",
      installment: "",
    },
    validators: {
      onSubmit: addContractDriverFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      console.log(value)
      try {
        
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          
          <div className="mx-auto w-full max-w-sm pb-6">
            <DialogHeader>
              <DialogTitle>Assign Driver</DialogTitle>
              <DialogDescription>
                {step === 1 && "Step 1: Driver Information"}
                {step === 2 && "Step 2: Guarantor Information"}
                {step === 3 && "Step 3: Contract Details"}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col p-4 no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto">
                <form
                  className="space-y-6"
                  id="add-inventory-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    addContractDriverForm.handleSubmit()
                  }}
                >
                  <FieldGroup>
                    {
                      step === 1 && (
                        <>
                          <addContractDriverForm.Field
                            name="driverFirstName"
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
                          <addContractDriverForm.Field
                            name="driverOtherName"
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
                          <addContractDriverForm.Field
                            name="driverLastName"
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
                          <addContractDriverForm.Field
                            name="driverPhone"
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
                          <addContractDriverForm.Field
                            name="driverLocation"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Location</FieldLabel>
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
                          <addContractDriverForm.Field
                            name="driverHeadshot"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Headshot</FieldLabel>
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
                          <addContractDriverForm.Field
                            name="driverNational"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">National ID</FieldLabel>
                                      <FileUploader
                                          value={field.state.value}
                                          onValueChange={(files) => {
                                            if (!isSubmitting) {
                                              field.handleChange(files || [])
                                            }
                                          }}
                                          dropzoneOptions={{
                                              maxFiles: 2,
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
                                                      PNG, JPG, or JPEG (Exactly 2 files required)
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
                        </>
                      )
                    }
                    {
                      step === 2 && (
                        <>
                          <addContractDriverForm.Field
                            name="guarantorFirstName"
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
                          <addContractDriverForm.Field
                            name="guarantorOtherName"
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
                          <addContractDriverForm.Field
                            name="guarantorLastName"
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
                          <addContractDriverForm.Field
                            name="guarantorPhone"
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
                          <addContractDriverForm.Field
                            name="guarantorLocation"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Location</FieldLabel>
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
                          <addContractDriverForm.Field
                            name="guarantorHeadshot"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Headshot</FieldLabel>
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
                                              multiple: false,
                                              accept: {
                                                  "image/*": [".png", ".jpg", ".jpeg"],
                                              },
                                              disabled: isSubmitting,
                                          }}
                                          className={`relative bg-background rounded-lg p-2 ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
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
                          <addContractDriverForm.Field
                            name="guarantorNational"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">National ID</FieldLabel>
                                      <FileUploader
                                          value={field.state.value}
                                          onValueChange={(files) => {
                                            if (!isSubmitting) {
                                              field.handleChange(files || [])
                                            }
                                          }}
                                          dropzoneOptions={{
                                              maxFiles: 2,
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
                                                      PNG, JPG, or JPEG (Exactly 2 files required)
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
                        </>
                      )
                    }
                    {
                      step === 3 && (
                        <>
                          <addContractDriverForm.Field
                            name="deposit"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Deposit(GHS)</FieldLabel>
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
                                        placeholder="5,000"
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
                          <addContractDriverForm.Field
                            name="start"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Start Date</FieldLabel>
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
                                        placeholder="2026-01-01"
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
                          <addContractDriverForm.Field
                            name="duration"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Duration(Weeks)</FieldLabel>
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
                                        placeholder="93"
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
                          <addContractDriverForm.Field
                            name="amount"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Total Amount(GHS)</FieldLabel>
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
                                        placeholder="93,000"
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
                          <addContractDriverForm.Field
                            name="installment"
                            children={(field) => {
                              const isInvalid =
                                field.state.meta.isTouched && !field.state.meta.isValid
                              return (
                                <Field data-invalid={isInvalid}>
                                  <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                                  <FieldLabel htmlFor={field.name} className="text-primary">Installment Amount(GHS)</FieldLabel>
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
                                        placeholder="1,000"
                                        autoComplete="off"
                                        type="number"
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
                      )
                    }
                  </FieldGroup>
                  
                  {/* Step Navigation Footer */}
                  <div className="flex flex-col gap-6 mt-12 pt-6 border-t">
                    {/* Step Indicator */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? 'bg-primary' : step > 1 ? 'bg-primary/50' : 'bg-muted'}`} />
                        <div className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? 'bg-primary' : step > 2 ? 'bg-primary/50' : 'bg-muted'}`} />
                        <div className={`h-2 w-12 rounded-full transition-colors ${step === 3 ? 'bg-primary' : 'bg-muted'}`} />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        Step {step} of 3
                      </span>
                    </div>
                    
                    {/* Navigation Buttons */}
                    <div className="flex items-center justify-between gap-3">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          addContractDriverForm.reset()
                          setStep(1)
                        }} 
                        disabled={isSubmitting}
                        className="min-w-[80px]"
                      >
                        Reset
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setStep(step - 1)}
                          disabled={step === 1 || isSubmitting}
                          className="min-w-[100px]"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        {step < 3 ? (
                          <Button
                            type="button"
                            onClick={() => setStep(step + 1)}
                            disabled={isSubmitting}
                            className="w-[120px]"
                          >
                            Next
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button 
                            type="submit" 
                            form="add-inventory-form" 
                            disabled={isSubmitting}
                            className="w-[120px]"
                          >
                            {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <CirclePile className="h-4 w-4" />}
                            Submit
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </form>  
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  )
}
