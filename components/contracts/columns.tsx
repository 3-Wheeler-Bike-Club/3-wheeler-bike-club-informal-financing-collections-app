import { ColumnDef } from "@tanstack/react-table";
import { Contract } from "@/hooks/useGetContracts";
import { CreditCard, MoreHorizontal, UserLock } from "lucide-react" 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { AddContractDriver } from "./addContractDriver";
import { AddContractPayment } from "./addContractPayment";

export const columns: ColumnDef<Contract>[] = [
    {
        accessorKey: "branch",
        header: "Branch",
    },
    {
        accessorKey: "vehicle.type",
        header: "Type",
    },
    {
        accessorKey: "vehicle.model",
        header: "Model",
    },
    {
        accessorKey: "vehicle.color",
        header: "Color",
    },
    {
        accessorKey: "vehicle.vin",
        header: "VIN",
    },
    {
        accessorKey: "vehicle.license",
        header: "License",
    },
    {
        accessorKey: "owner.firstname",
        header: "First Name",
    },
    {
        accessorKey: "owner.lastname",
        header: "Last Name",
    },
    {
        accessorKey: "owner.phone",
        header: "Phone",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const contract = row.original

          const [openAddContractDriver, setOpenAddContractDriver] = useState(false)
          const [openAddContractPayment, setOpenAddContractPayment] = useState(false)
          
          const handleOpenAddContractDriver = () => {
            setOpenAddContractDriver(true)
          }

          const handleOpenAddContractPayment = () => {
            setOpenAddContractPayment(true)
          }
     
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={handleOpenAddContractDriver}>
                  <UserLock /> Assign Driver
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={handleOpenAddContractPayment}>
                    <CreditCard /> Add Payment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AddContractDriver open={openAddContractDriver} onOpenChange={setOpenAddContractDriver} contract={contract} />
              <AddContractPayment open={openAddContractPayment} onOpenChange={setOpenAddContractPayment} />
            </>
          )
        },
      },
]