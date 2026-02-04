import { ColumnDef } from "@tanstack/react-table";
import { Sale } from "@/hooks/useGetSales";

export const columns: ColumnDef<Sale>[] = [
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
        accessorKey: "vehicle.model",
        header: () => (
            <span className="font-bold text-primary tracking-wide">MODEL</span>
        ),
    },
    {
        accessorKey: "vehicle.vin",
        header: () => (
            <span className="font-bold text-primary tracking-wide">VIN</span>
        ),
        cell: ({ row }) => {
            const vin = row.original.vehicle?.vin
            const color = row.original.vehicle?.color
            return (
                <div>
                    <span style={{ backgroundColor: color, display: 'inline-block' }} className="w-2 h-2 rounded-full mr-2"></span>
                    <span>{vin}</span>
                </div>
            )
        }
    },
    {
        accessorKey: "vehicle.engine",
        header: () => (
            <span className="font-bold text-primary tracking-wide">ENGINE</span>
        ),
    },
    {
        accessorKey: "customer.firstname",
        header: () => (
            <span className="font-bold text-primary tracking-wide">FIRST NAME</span>
        ),
    },
    {
        accessorKey: "customer.phone",
        header: () => (
            <span className="font-bold text-primary tracking-wide">PHONE</span>
        ),
    },
    {
        accessorKey: "amount",
        header: () => (
            <span className="font-bold text-primary tracking-wide">AMOUNT</span>
        ),
    },
    {
        accessorKey: "createdAt",
        header: () => (
            <span className="font-bold text-primary tracking-wide">CREATED AT</span>
        ),
        cell: ({ row }) => {
            const createdAt = row.original.createdAt
            const formatDate = (date: Date) => {
                const pad = (n: number) => n < 10 ? `0${n}` : n
                const year = date.getFullYear()
                const month = pad(date.getMonth() + 1)
                const day = pad(date.getDate())
                let hour = date.getHours()
                const minute = pad(date.getMinutes())
                const ampm = hour >= 12 ? 'PM' : 'AM'
                hour = hour % 12
                hour = hour ? hour : 12 // the hour '0' should be '12'
                return `${year}-${month}-${day} ${hour}:${minute}${ampm}`
            }

            return (
                <span>{formatDate(new Date(createdAt))}</span>
            )
        }
    },
]