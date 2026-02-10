import { ColumnDef } from "@tanstack/react-table";
import { Spare } from "@/hooks/useGetSpares";

export const columns: ColumnDef<Spare>[] = [
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
        accessorKey: "part.no",
        header: () => (
            <span className="font-bold text-primary tracking-wide">NO</span>
        ),
    },
    {
        accessorKey: "part.description",
        header: () => (
            <span className="font-bold text-primary tracking-wide">DESCRIPTION</span>
        ),
    },
    {
        accessorKey: "quantity",
        header: () => (
            <span className="font-bold text-primary tracking-wide">QTY</span>
        ),
    },
    {
        accessorKey: "cost",
        header: () => (
            <span className="font-bold text-primary tracking-wide">COST</span>
        ),
    },
    {
        accessorKey: "msrp",
        header: () => (
            <span className="font-bold text-primary tracking-wide">MSRP</span>
        ),
    },
    {
        accessorKey: "waybill",
        header: () => (
            <span className="font-bold text-primary tracking-wide">WAYBILL</span>
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
