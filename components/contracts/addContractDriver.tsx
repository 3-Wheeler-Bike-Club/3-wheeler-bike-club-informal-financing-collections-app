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
import { Contract } from "@/hooks/useGetContracts"
import { useContractsContext } from "./contractsContext"
import * as z from "zod"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { useState, useEffect } from "react"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { useUploadThing } from "@/hooks/useUploadThing"
import { CirclePile, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { FileUploader, FileUploaderContent, FileUploaderItem, FileInput

 } from "@/components/ui/file-upload"
import { CloudUpload, Paperclip } from "lucide-react"
import { formatNumberWithCommas, shortenTxt } from "@/utils/helpers"
import { PhoneInput } from "@/components/ui/phone-input"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { updateContractDriverPlusGuarantorAction } from "@/app/actions/contracts/updateContractDriverPlusGuarantorAction"
import { calculateEndDate } from "@/utils/helpers"



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
    .date(),
    // No minimum date requirement, accept any date
  duration: z
    .string()
    .min(1, "Duration in weeks is required"),
  amount: z
    .string()
    .min(1, "Amount is required"),
})

interface AddContractDriverProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  contract: Contract
}

export function AddContractDriver({ open, onOpenChange, contract }: AddContractDriverProps) {

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)
  const [endDate, setEndDate] = useState<Date | null>(null)
  console.log(endDate)
  const [installment, setInstallment] = useState<number | null>(null)
  console.log(installment)

  const contractsContext = useContractsContext()

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
      start: undefined as Date | undefined,
      duration: "",
      amount: "",
    },
    validators: {
      onSubmit: addContractDriverFormSchema,
    },
    onSubmit: async ({ value }) => {
      setIsSubmitting(true)
      console.log(value)
      try {
        if (endDate && installment) {
          const uploadDriverHeadshotFiles = await startUploadHeadshot(value.driverHeadshot);
          const uploadDriverNationalFiles = await startUploadNational(value.driverNational);
          const uploadGuarantorHeadshotFiles = await startUploadHeadshot(value.guarantorHeadshot);
          const uploadGuarantorNationalFiles = await startUploadNational(value.guarantorNational);
          if (uploadDriverHeadshotFiles && uploadDriverNationalFiles && uploadGuarantorHeadshotFiles && uploadGuarantorNationalFiles) {
            const updateContractDriverPlusGuarantor = await updateContractDriverPlusGuarantorAction(
              contract._id,
              {
                firstname: value.driverFirstName,
                othername: value.driverOtherName,
                lastname: value.driverLastName,
                phone: value.driverPhone,
                location: value.driverLocation,
                headshot: uploadDriverHeadshotFiles.map((file) => file.ufsUrl),
                national: uploadDriverNationalFiles.map((file) => file.ufsUrl),
              },
              {
                firstname: value.guarantorFirstName,
                othername: value.guarantorOtherName,
                lastname: value.guarantorLastName,
                phone: value.guarantorPhone,
                location: value.guarantorLocation,
                headshot: uploadGuarantorHeadshotFiles.map((file) => file.ufsUrl),
                national: uploadGuarantorNationalFiles.map((file) => file.ufsUrl),
              },
              Number(value.deposit),
              value.start!,
              endDate,
              Number(value.duration),
              Number(value.amount),
              installment,
            )
            if (updateContractDriverPlusGuarantor) {
              toast.success("Contract driver plus guarantor updated successfully", {
                description: "You can now add another contract driver plus guarantor or close this dialog",
              })
              setIsSubmitting(false)
              addContractDriverForm.reset()
              setEndDate(null)
              setInstallment(null)
              setStep(1)
              await contractsContext?.getBackContracts?.()
              onOpenChange(false)

            } else {
              toast.error("Failed to update contract driver plus guarantor", {
                description: "Something went wrong, please try again",
              })
              setIsSubmitting(false)
            }
          } else {
            toast.error("Failed to upload files.", {
              description: `Something went wrong, please try again`,
            })
            setIsSubmitting(false)
          }
        } else {
          toast.error("End date and installment are required", {
            description: "Please make sure these details apply to your contract before submitting",
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          
          <div className="mx-auto w-full max-w-sm pb-6">
            <DialogHeader>
              <DialogTitle>Assign Driver</DialogTitle>
              <DialogDescription className="flex flex-row items-center justify-between mb-4">
                <div className="flex flex-col gap-2">
                  {step === 1 && "Step 1/3: Driver Information"}
                  {step === 2 && "Step 2/3: Guarantor Information"}
                  {step === 3 && "Step 3/3: Contract Details"}
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-12 rounded-full transition-colors ${step === 1 ? 'bg-primary' : step > 1 ? 'bg-primary/50' : 'bg-gray-300'}`} />
                    <span className={`h-2 w-12 rounded-full transition-colors ${step === 2 ? 'bg-primary' : step > 2 ? 'bg-primary/50' : 'bg-gray-300'}`} />
                    <span className={`h-2 w-12 rounded-full transition-colors ${step === 3 ? 'bg-primary' : 'bg-gray-300'}`} />
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
                    disabled={step === 3 || isSubmitting}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </DialogDescription>
              
            </DialogHeader>
            <div className="flex flex-col p-4 no-scrollbar -mx-4 h-[50vh] overflow-y-auto">
                <form
                  className="space-y-6"
                  id="add-contract-driver-form"
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
                                        placeholder="Blue Top Vila, Kosoa"
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
                                        placeholder="Blue Top Vila, Kasoa"
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
                                  <Popover>
                                    <PopoverTrigger disabled={isSubmitting} asChild>
                                      <Button
                                        variant="outline"
                                        id="date-picker-simple"
                                        className="justify-start font-normal"
                                      >
                                        {field.state.value ? format(field.state.value, "PPP") : <span>Pick a date</span>}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                      <Calendar
                                        mode="single"
                                        selected={field.state.value}
                                        onSelect={(date) => {
                                          field.handleChange(date || new Date())
                                          if (date) {
                                            setEndDate(calculateEndDate(date as Date, Number(addContractDriverForm.getFieldValue("duration"))))
                                          }
                                          if (date === undefined) {
                                            setEndDate(null)
                                          }
                                          if (addContractDriverForm.getFieldValue("duration") === '') {
                                            setEndDate(null)
                                          }
                                        }}
                                        defaultMonth={ field.state.value }
                                      />
                                    </PopoverContent>
                                  </Popover>
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
                                          let rawValue = e.target.value.replace(/\D/g, '');
                                          if (rawValue.length > 0) {
                                            rawValue = (Math.min(Number(rawValue), 300)).toString();
                                          }
                                          // Store raw numeric value (without commas) in form state
                                          field.handleChange(rawValue)
                                          // Calculate installment
                                          if (addContractDriverForm.getFieldValue("amount") !== '' ) {
                                            if (Number(rawValue) > Number(addContractDriverForm.getFieldValue("amount"))) {
                                              setInstallment(null)
                                            } else {
                                              setInstallment(Math.round(Number(addContractDriverForm.getFieldValue("amount")) / Number(rawValue)))
                                            }
                                          }
                                          if (addContractDriverForm.getFieldValue("amount") === '') {
                                            setInstallment(null)
                                          }
                                          if (addContractDriverForm.getFieldValue("duration") === '') {
                                            setInstallment(null)
                                          }
                                          // Calculate end date
                                          if (addContractDriverForm.getFieldValue("start") !== undefined && addContractDriverForm.getFieldValue("duration") !== '') {
                                            setEndDate(calculateEndDate(addContractDriverForm.getFieldValue("start") as Date, Number(rawValue)))
                                          }
                                          if (addContractDriverForm.getFieldValue("start") === undefined) {
                                            setEndDate(null)
                                          }
                                          if (addContractDriverForm.getFieldValue("duration") === '') {
                                            setEndDate(null)
                                          }
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
                                          if (addContractDriverForm.getFieldValue("duration") !== '' ) {
                                            if (Number(rawValue) < Number(addContractDriverForm.getFieldValue("duration"))) {
                                              setInstallment(null)
                                            } else {
                                              setInstallment(Math.round(Number(rawValue) / Number(addContractDriverForm.getFieldValue("duration"))))
                                            }
                                          }
                                          if (addContractDriverForm.getFieldValue("duration") === '') {
                                            setInstallment(null)
                                          }
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
                          <div>
                            {installment != null && endDate && (
                              <div className="mt-4 rounded-lg border bg-muted/30 px-4 py-3">
                                <div className="flex flex-col gap-2 text-sm">
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">Installment</span>
                                    <span className="font-medium tabular-nums">
                                      GHS {installment.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">End date</span>
                                    <span className="font-medium">
                                      {format(endDate, "PPP")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )
                    }
                  </FieldGroup>
                </form>  
            </div>
          </div>
          <DialogFooter>
            <Field orientation="horizontal" className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => {addContractDriverForm.reset(); setStep(1); setEndDate(null); setInstallment(null)}} disabled={isSubmitting}>
                Reset
              </Button>
              <Button type="submit" form="add-contract-driver-form" disabled={step !== 3 || isSubmitting}>
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
