"use client";

import { Package, Plus, TriangleAlert } from "lucide-react";
import { Menu } from "@/components/top/menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";

export function Wrapper() {
    return (
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                
                <div className="flex flex-col h-full w-full gap-6">
                    <div className="flex w-full justify-center">
                        <div className="w-full max-w-[66rem]">
                            <Alert>
                                <Package className="h-4 w-4" />
                                <AlertTitle className="font-bold text-yellow-600">
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
                            <Empty className="bg-muted/30 h-full flex items-center justify-center">
                                <EmptyHeader>
                                    <EmptyMedia variant="icon">
                                        <TriangleAlert className="h-4 w-4 text-yellow-600" />
                                    </EmptyMedia>
                                    <EmptyTitle>No Vehicles in Stock</EmptyTitle>
                                    <EmptyDescription className="max-w-xs text-pretty">
                                        We can&apos;t find any vehicles in stock. New vehicles will appear here.
                                    </EmptyDescription>
                                </EmptyHeader>
                                <EmptyContent>
                                    <Button variant="outline">
                                        <Plus />
                                        Add Vehicle
                                    </Button>
                                </EmptyContent>
                            </Empty>
                        </div>
                    </div>


                </div>
                
                
            </div>
    )
}