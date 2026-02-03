import { ColumnDef } from "@tanstack/react-table";
import { Inventory } from "@/hooks/useGetInventory";

export const columns: ColumnDef<Inventory>[] = [
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
        accessorKey: "vehicle.color",
        header: () => (
            <span className="font-bold text-primary tracking-wide">COLOR</span>
        ),
    },
    {
        accessorKey: "vehicle.vin",
        header: () => (
            <span className="font-bold text-primary tracking-wide">VIN</span>
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