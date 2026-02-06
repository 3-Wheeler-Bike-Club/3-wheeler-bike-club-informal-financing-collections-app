"use client";

import { FileText, TriangleAlert } from "lucide-react";
import { Menu } from "@/components/top/menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { useGetContracts } from "@/hooks/useGetContracts";
import { ContractsProvider } from "./contractsContext";
import { AddContractOwner } from "./addContractOwner";
import { DataTable } from "./dataTable";
import { columns } from "./columns";
import { useMemo } from "react";
import type { Contract } from "@/hooks/useGetContracts";
import { getWeeksFromStartDate } from "@/utils/helpers";

export interface ContractForTable {
    _id: string
    branch: string
    serial: string
    vehicle: {
        type: string
        model: string
        color: string
        vin: string
        license: string
    }
    owner: {
        firstname: string
        othername: string
        lastname: string
        phone: string
    }
    driver?: {
        firstname: string
        othername: string
        lastname: string
        phone: string
        location: string
        headshot: string[]
        national: string[]
    }
    guarantor?: {
        firstname: string
        othername: string
        lastname: string
        phone: string
        location: string
        headshot: string[]
        national: string[]
    }
    deposit: number
    start: Date
    end: Date
    duration: number
    amount: number
    installment: number
    payments?: Array<{
        week: number
        amount: number
        method: string
        reference: Date
        status: string
    }>
    status: string
    createdAt: Date
    updatedAt: Date
    weeksFromStart: number
    expectedAmountFromStart: number
    currentAmountFromStart: number
    dueAmountFromStart: number
    vehicleType: string
    vehicleLicense: string
}

export function Wrapper() {
    const { contracts, loading, error, getBackContracts } = useGetContracts()

    const contractsForTable = useMemo((): ContractForTable[] | null => {
        if (!contracts) return null
        // First, map the contracts and add calculated fields
        const mapped = contracts.map((contract: Contract) => {
            const weeksFromStart = getWeeksFromStartDate(new Date(contract.start))
            const expectedAmountFromStart = contract.installment * weeksFromStart
            const currentAmountFromStart =
                contract.payments?.reduce((sum, p) => sum + p.amount, 0) ?? 0
            const dueAmountFromStart = expectedAmountFromStart - currentAmountFromStart
            const vehicleType = contract.vehicle?.type
            const vehicleLicense = contract.vehicle?.license
            return {
                ...contract,
                weeksFromStart,
                expectedAmountFromStart,
                currentAmountFromStart,
                dueAmountFromStart,
                vehicleType,
                vehicleLicense,
            }
        })
        // Then, sort descending by dueAmountFromStart
        return mapped.sort((a, b) => b.dueAmountFromStart - a.dueAmountFromStart)
    }, [contracts])

    return (
        <ContractsProvider getBackContracts={getBackContracts}>
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
            <Menu/>

            <div className="flex flex-col h-full w-full gap-6">
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-[66rem]">
                        <Alert>
                            <FileText className="h-4 w-4" />
                            <AlertTitle className="font-bold text-primary">
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
                                                <TriangleAlert className="h-4 w-4 text-primary" />
                                            </EmptyMedia>
                                            <EmptyTitle>No Contracts Found</EmptyTitle>
                                            <EmptyDescription className="max-w-xs text-pretty">
                                                We can&apos;t find any work & pay contracts. New contracts will appear here.
                                            </EmptyDescription>
                                        </EmptyHeader>
                                        <EmptyContent>
                                            <AddContractOwner getContracts={getBackContracts} />
                                        </EmptyContent>
                                    </Empty>
                                </>
                            )
                        }
                        {
                            contractsForTable && contractsForTable.length >= 1 && (
                                <>
                                    <div className="flex flex-col w-full gap-4">
                                        
                                        <DataTable columns={columns} data={contractsForTable} getContracts={getBackContracts} />
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
        </ContractsProvider>
    )
}