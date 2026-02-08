"use client";

import { Wrench, Plus, TriangleAlert } from "lucide-react";
import { Menu } from "@/components/top/menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { useGetServices } from "@/hooks/useGetServices";
import { AddService } from "./addService";
import { useGetSpares } from "@/hooks/useGetSpares";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

export function Wrapper() {

    const { services, loading: servicesLoading, error: servicesError, getBackServices } = useGetServices()
    const { spares, loading: sparesLoading, error: sparesError, getBackSpares } = useGetSpares()

    const loading = servicesLoading || sparesLoading

    return (
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
            <Menu/>

            <div className="flex flex-col w-full gap-6">
                <div className="flex w-full justify-center">
                    <div className="w-full max-w-[90rem]">
                        <Alert>
                            <Wrench className="h-4 w-4" />
                            <AlertTitle className="font-bold text-primary">
                                Services
                            </AlertTitle>
                            <AlertDescription className="text-xs italic">
                                <p className="max-md:text-[11px]">{"Record & manage all service transactions (spare parts sold)"}</p>
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            </div>

            <div className="flex w-full h-full justify-center">
                <div className="flex w-full h-full max-w-[90rem]">
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
                        services && !loading && services.length === 0 && (
                            <>
                                <Empty className="bg-muted/30 h-full flex items-center justify-center">
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <TriangleAlert className="h-4 w-4 text-primary" />
                                        </EmptyMedia>
                                        <EmptyTitle>No Services Recorded</EmptyTitle>
                                        <EmptyDescription className="max-w-xs text-pretty">
                                            We can&apos;t find any service records. New service records will appear here.
                                        </EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <AddService spares={spares ?? []} getServices={getBackServices} getSpares={getBackSpares} />
                                    </EmptyContent>
                                </Empty>
                            </>
                        )
                    }
                    {
                        services && !loading && services.length >= 1 && (
                            <>
                                <div className="flex flex-col w-full gap-4">
                                    <div className="flex justify-end">
                                        <AddService spares={spares ?? []} getServices={getBackServices} getSpares={getBackSpares} />
                                    </div>
                                    <DataTable columns={columns} data={services} />
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
