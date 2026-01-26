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
import { useForm } from "@tanstack/react-form"
import { Inventory } from "@/hooks/useGetInventory"
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


const addSaleFormSchema = z.object({
  branch: z
    .string(),
  vehicleType: z
    .string(),
  vehicleVin: z
    .string(),
  customerFirstName: z
    .string(),
  customerOtherName: z
    .string(),
  customerLastName: z
    .string(),
  customerPhone: z
    .string(),
})

export interface AddSaleProps {
  inventory: Inventory[] | null
}

export function AddSale({ inventory }: AddSaleProps) {


  const addSaleForm = useForm({
    defaultValues: {
      branch: "",
      vehicleType: "",
      vehicleVin: "",
      customerFirstName: "",
      customerOtherName: "",
      customerLastName: "",
      customerPhone: "",

    },
    validators: {
      onSubmit: addSaleFormSchema,
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
                Add Sales
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <div className="mx-auto w-full max-w-sm pb-6">
          <DialogHeader>
            <DialogTitle>Add Sales</DialogTitle>
            <DialogDescription>
                Record a new sale transaction of a vehicle sold.
            </DialogDescription>
          </DialogHeader>
            <div className="flex flex-col p-4 no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto">
                <form
                  className="space-y-6"
                  id="add-sale-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    addSaleForm.handleSubmit()
                  }}
                >
                  <FieldGroup>
                    <addSaleForm.Field
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
                    <addSaleForm.Field
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
                                    <FieldTitle> <Motorbike className="h-4 w-4 text-primary" /> Motorcycle </FieldTitle>
                                  </FieldContent>
                                  <RadioGroupItem value="motorcycle" id="motorcycle" />
                                </Field>
                              </FieldLabel>
                              <FieldLabel htmlFor="tricycle">
                                <Field orientation="horizontal">
                                  <FieldContent>
                                    <FieldTitle> <Caravan className="h-4 w-4 text-primary" /> Tricycle </FieldTitle>
                                      
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
                    <addSaleForm.Field
                      name="vehicleVin"
                      children={(field) => {
                        const isInvalid =
                          field.state.meta.isTouched && !field.state.meta.isValid
                        return (
                          <Field data-invalid={isInvalid}>
                            <div className="flex flex-col gap-1 w-full max-w-sm space-x-2">
                            <FieldLabel htmlFor={field.name} className="text-primary">Vin</FieldLabel>
                            <Combobox
                              items={inventory!.filter((inventory) => inventory.vehicle.vin !== "")}
                              itemToStringValue={(inventory: Inventory) => inventory.vehicle.vin}
                              value={
                                inventory!.find((inv) => inv.vehicle.vin === field.state.value) || null
                              }
                              onValueChange={(selectedInventory: Inventory | null) => {
                                if (selectedInventory) {
                                  field.handleChange(selectedInventory.vehicle.vin)
                                } else {
                                  field.handleChange("")
                                }
                              }}
                            >
                              <ComboboxInput placeholder="Search vehicles..." />
                              <ComboboxContent>
                                <ComboboxEmpty>No vehicles found.</ComboboxEmpty>
                                <ComboboxList>
                                  {(inventory) => (
                                    <ComboboxItem key={inventory._id} value={inventory}>
                                      <Item size="sm" className="p-0">
                                        <ItemContent>
                                          <ItemTitle className="whitespace-nowrap">
                                            {inventory.vehicle.model}
                                          </ItemTitle>
                                          <ItemDescription>
                                            {inventory.vehicle.vin}
                                          </ItemDescription>
                                        </ItemContent>
                                      </Item>
                                    </ComboboxItem>
                                  )}
                                </ComboboxList>
                              </ComboboxContent>
                            </Combobox>
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="customerFirstName"
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
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="customerOtherName"
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
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="customerLastName"
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
                                />
                                {isInvalid && (
                                  <FieldError errors={field.state.meta.errors} />
                                )}
                            </div>
                          </Field>
                        )
                      }}
                    />
                    <addSaleForm.Field
                      name="customerPhone"
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
                    <Button type="button" variant="outline" onClick={() => addSaleForm.reset()}>
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
