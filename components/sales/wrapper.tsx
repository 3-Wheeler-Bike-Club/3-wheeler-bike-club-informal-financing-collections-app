"use client";

import { ShoppingCart, Plus, TriangleAlert } from "lucide-react";
import { Menu } from "@/components/top/menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { useGetSales } from "@/hooks/useGetSales";
import { AddSale } from "./addSale";

export function Wrapper() {


    const { sales, loading, error, getBackSales } = useGetSales()

    
    return (
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
            <Menu/>

            <div className="flex flex-col w-full gap-6">
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-[66rem]">
                        <Alert>
                            <ShoppingCart className="h-4 w-4" />
                            <AlertTitle className="font-bold text-yellow-600">
                                Sales
                            </AlertTitle>
                            <AlertDescription className="text-xs italic">
                                <p className="max-md:text-[11px]">{"Record & manage all sales transactions of all vehicles sold"}</p>
                            </AlertDescription>
                        </Alert>
                    </div>
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
                        sales && sales.length === 0 && (
                            <>
                                <Empty className="bg-muted/30 h-full flex items-center justify-center">
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <TriangleAlert className="h-4 w-4 text-yellow-600" />
                                        </EmptyMedia>
                                        <EmptyTitle>No Sales Recorded</EmptyTitle>
                                        <EmptyDescription className="max-w-xs text-pretty">
                                            We can&apos;t find any sales records. New sales records will appear here.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <AddSale />
                                    </EmptyContent>
                                </Empty>
                            </>
                        )
                    }
                    {
                        sales && sales.length >= 1 && (
                            <>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}   