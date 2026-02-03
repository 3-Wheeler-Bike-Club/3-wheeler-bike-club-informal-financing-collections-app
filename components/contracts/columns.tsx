import { ColumnDef } from "@tanstack/react-table";
import { CreditCard, File, MoreHorizontal, Signature, UserLock } from "lucide-react" 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { AddContractDriver } from "@/components/contracts/addContractDriver";
import { AddContractPayment } from "@/components/contracts/addContractPayment";
import { ContractForTable } from "@/components/contracts/wrapper";

export const columns: ColumnDef<ContractForTable>[] = [
    {
        accessorKey: "branch",
        header: () => (
            <span className="font-bold text-primary tracking-wide">BRANCH</span>
        ),
    },
    {
        accessorKey: "vehicle.type",
        header: () => (
            <span className="font-bold text-primary tracking-wide">TYPE</span>
        ),
    },
    {
        accessorKey: "vehicleLicense",
        header: () => (
            <span className="font-bold text-primary tracking-wide">LICENSE</span>
        ),
        cell: ({ row }) => {
            const license = row.original.vehicleLicense
            const color = row.original.vehicle?.color
            return (
              <div>
                <span style={{ backgroundColor: color, display: 'inline-block' }} className="w-2 h-2 rounded-full mr-2"></span>
                <span>{license}</span>
              </div>
            )
        }
    },
    {
        accessorKey: "owner.firstname",
        header: () => (
            <span className="font-bold text-primary tracking-wide ">OWNER NAME</span>
        ),
    },
    {
        accessorKey: "owner.phone",
        header: () => (
            <span className="font-bold text-primary tracking-wide">OWNER PHONE</span>
        ),
    },
    {
        accessorKey: "driver.firstname",
        header: () => (
            <span className="font-bold text-primary tracking-wide">DRIVER NAME</span>
        ),
        cell: ({ row }) => {
            const status = row.original.status
            const driver = row.original.driver?.firstname
            if (status === "active") {
                return <span>{driver}</span>
            } else {
                return <span className="text-muted-foreground italic">N/A</span>
            }
        }
    },
    {
        accessorKey: "driver.phone",
        header: () => (
            <span className="font-bold text-primary tracking-wide">DRIVER PHONE</span>
        ),
        cell: ({ row }) => {
            const status = row.original.status
            const driver = row.original.driver?.phone
            if (status === "active") {
                return <span>{driver}</span>
            } else {
                return <span className="text-muted-foreground italic">N/A</span>
            }
        }
    },
    /*
    {
      accessorKey: "installment",
      header: "Installment",
      cell: ({ row }) => {
        const status = row.original.status
        const installment = row.original.installment
        if (status === "active") {
            return <span>{installment}</span>
        } else {
            return <span className="text-muted-foreground italic">N/A</span>
        }
      }
    },
    */
    {
      accessorKey: "dueAmountFromStart",
      header: () => (
        <span className="font-bold text-primary tracking-wide">DUE(GHS)</span>
      ),
      cell: ({ row }) => {
        const status = row.original.status
        const dueAmountFromStart = row.original.dueAmountFromStart
        if (status === "active") {
            return <span className={`font-bold ${dueAmountFromStart > 0 ? "text-red-500" : "text-green-500"}`}>{dueAmountFromStart}</span>
        } else {
            return <span className="text-muted-foreground italic">N/A</span>
        }
      }
    },
    {
      accessorKey: "duration",
      header: () => (
        <span className="font-bold text-primary tracking-wide">WEEKS</span>
      ),
      cell: ({ row }) => {
        const status = row.original.status
        const duration = row.original.duration

        // Current week from start, with start week counting as week 1
        const currentWeek = row.original.weeksFromStart

        if (status === "active") {
            return <span>{currentWeek}/{duration}</span>
        } else {
            return <span className="text-muted-foreground italic">N/A</span>
        }
      }
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const contract = row.original
          const status = row.original.status

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
                  {
                    status === "pending" && (
                      <DropdownMenuItem onSelect={handleOpenAddContractDriver}>
                        <UserLock /> Assign Driver
                      </DropdownMenuItem>
                    )
                  }
                  {
                    status === "active" && (
                      <DropdownMenuItem onSelect={handleOpenAddContractPayment}>
                        <CreditCard /> Add Payment
                      </DropdownMenuItem>
                    )
                  }
                  <DropdownMenuItem>
                  <Signature /> View Contract
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AddContractDriver open={openAddContractDriver} onOpenChange={setOpenAddContractDriver} contract={contract} />
              <AddContractPayment open={openAddContractPayment} onOpenChange={setOpenAddContractPayment} contract={contract} />
            </>
          )
        },
      },
]