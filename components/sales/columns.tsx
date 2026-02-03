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
        accessorKey: "customer.firstname",
        header: () => (
            <span className="font-bold text-primary tracking-wide">FIRST NAME</span>
        ),
    },
    {   
        accessorKey: "customer.lastname",
        header: () => (
            <span className="font-bold text-primary tracking-wide">LAST NAME</span>
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
    },
]