import { ColumnDef } from "@tanstack/react-table";
import { Service } from "@/hooks/useGetServices";

export const columns: ColumnDef<Service>[] = [
    {
        accessorKey: "branch",
        header: () => (
            <span className="font-bold text-primary tracking-wide">BRANCH</span>
        ),
    },
    {
        accessorKey: "part.type",
        header: () => (
            <span className="font-bold text-primary tracking-wide">TYPE</span>
        ),
    },
    {
        accessorKey: "part.model",
        header: () => (
            <span className="font-bold text-primary tracking-wide">MODEL</span>
        ),
    },
    {
        accessorKey: "part.serial",
        header: () => (
            <span className="font-bold text-primary tracking-wide">SERIAL</span>
        ),
    },
    {
        accessorKey: "customer.firstname",
        header: () => (
            <span className="font-bold text-primary tracking-wide">NAME</span>
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
        accessorKey: "status",
        header: () => (
            <span className="font-bold text-primary tracking-wide">STATUS</span>
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
                hour = hour ? hour : 12
                return `${year}-${month}-${day} ${hour}:${minute}${ampm}`
            }

            return (
                <span>{formatDate(new Date(createdAt))}</span>
            )
        }
    },
]
