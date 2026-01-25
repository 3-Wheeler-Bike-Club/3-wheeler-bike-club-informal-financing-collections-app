"use client";

import { FileText, Plus, TriangleAlert } from "lucide-react";
import { Menu } from "@/components/top/menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { useGetContracts } from "@/hooks/useGetContracts";
import { AddContractOwner } from "./addContractOwner";

export function Wrapper() {


    const { contracts, loading, error, getBackContracts } = useGetContracts()

    
    return (
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
            <Menu/>

            <div className="flex flex-col h-full w-full gap-6">
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-[66rem]">
                        <Alert>
                            <FileText className="h-4 w-4" />
                            <AlertTitle className="font-bold text-yellow-600">
                                Contracts
                            </AlertTitle>
                            <AlertDescription className="text-xs italic">
                                <p className="max-md:text-[11px]">{"Create & manage contracts for buy now, pay later or work & pay"}</p>
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
                            contracts && contracts.length === 0 && (
                                <>
                                    <Empty className="bg-muted/30 h-full flex items-center justify-center">
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon">
                                                <TriangleAlert className="h-4 w-4 text-yellow-600" />
                                            </EmptyMedia>
                                            <EmptyTitle>No Contracts Found</EmptyTitle>
                                            <EmptyDescription className="max-w-xs text-pretty">
                                                We can&apos;t find any work & pay contracts. New contracts will appear here.
                                            </EmptyDescription>
                                        </EmptyHeader>
                                        <EmptyContent>
                                            <AddContractOwner />
                                        </EmptyContent>
                                    </Empty>
                                </>
                            )
                        }
                        {
                            contracts && contracts.length >= 1 && (
                                <>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div> 
    )
}