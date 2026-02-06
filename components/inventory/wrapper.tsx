"use client";

import { Package, Plus, TriangleAlert } from "lucide-react";
import { Menu } from "@/components/top/menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { Inventory, useGetInventory } from "@/hooks/useGetInventory";
import { AddInventory } from "@/components/inventory/addInventory";
import { columns } from "@/components/inventory/columns";
import { DataTable } from "@/components/inventory/dataTable";
import { useEffect, useState } from "react";

export function Wrapper() {

    const { inventory, loading, error, getBackInventory } = useGetInventory()
    const [inStockInventory, setInStockInventory] = useState<Inventory[]>([])

    useEffect(() => {
        if (inventory) {
            const filteredInventory = inventory.filter((filteringInventory) => filteringInventory.status === "in stock")
            setInStockInventory(filteredInventory)
        }
    }, [inventory])
    console.log(inStockInventory)
    return (
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                
                <div className="flex flex-col h-full w-full gap-12">
                    <div className="flex w-full justify-center">
                        <div className="w-full max-w-[66rem]">
                            <Alert>
                                <Package className="h-4 w-4" />
                                <AlertTitle className="font-bold text-primary">
                                   Inventory
                                </AlertTitle>
                                <AlertDescription className="text-xs italic">
                                    <p className="max-md:text-[11px]">{"Track & manage the inventory of all vehicles in stock"}</p>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>

                    <div className="flex w-full h-full justify-center">
                        <div className="flex w-full h-full max-w-[66rem]">
                            {
                                loading && (
                                    <>
                                        <div className="flex h-full w-full justify-center items-center text-2xl font-bold">
                                            <p>Loading...</p>
                                        </div>
                                    </>
                                )
                            }
                            {
                                inventory && inventory.length === 0 && (
                                    <>
                                        <Empty className="bg-muted/30 h-full flex items-center justify-center">
                                            <EmptyHeader>
                                                <EmptyMedia variant="icon">
                                                    <TriangleAlert className="h-4 w-4 text-primary" />
                                                </EmptyMedia>
                                                <EmptyTitle>No Vehicles in Stock</EmptyTitle>
                                                <EmptyDescription className="max-w-xs text-pretty">
                                                    We can&apos;t find any vehicles in stock. New vehicles will appear here.
                                                </EmptyDescription>
                                            </EmptyHeader>
                                            <EmptyContent>
                                                <AddInventory getInventory={getBackInventory} />
                                            </EmptyContent>
                                        </Empty>
                                    </>
                                )
                            }
                            {
                                inventory && inventory.length >= 1 && (
                                    <>
                                        <div className="flex flex-col w-full gap-4">
                                            <div className="flex justify-end">
                                                <AddInventory getInventory={getBackInventory} />
                                            </div>
                                            <DataTable columns={columns} data={inStockInventory} />
                                        </div>
                                    </>
                                )
                            }
                            
                        </div>
                    </div>


                </div>
                
                
            </div>
    )
}