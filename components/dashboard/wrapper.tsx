"use client";

import { Menu } from "@/components/top/menu";
import { DoorOpen, Package, ShoppingCart, FileText, Check } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Wrapper() {
    const menuItems = [
        {
            title: "Motor",
            description: "Complete motor vehicle management system",
            icon: Package,
            href: "/motor",
            iconBg: "bg-chart-1/10",
            iconColor: "text-chart-1",
            borderColor: "border-chart-1/30",
            hoverColor: "hover:bg-chart-1/5 hover:border-chart-1/50",
            features: [
                "View all vehicles",
                "Add new motor vehicles",
                "Update stock status",
                "Track vehicle details",
            ],
        },
        {
            title: "Sales",
            description: "Comprehensive sales tracking and management",
            icon: ShoppingCart,
            href: "/sales",
            iconBg: "bg-chart-2/10",
            iconColor: "text-chart-2",
            borderColor: "border-chart-2/30",
            hoverColor: "hover:bg-chart-2/5 hover:border-chart-2/50",
            features: [
                "Record sales transactions",
                "View sales history",
                "Generate reports",
                "Track revenue",
            ],
        },
        {
            title: "Work & Pay",
            description: "Payment collections and contract management",
            icon: FileText,
            href: "/contracts",
            iconBg: "bg-chart-3/10",
            iconColor: "text-chart-3",
            borderColor: "border-chart-3/30",
            hoverColor: "hover:bg-chart-3/5 hover:border-chart-3/50",
            features: [
                "Create contracts",
                "Track payments",
                "Manage collections",
                "View payment history",
            ],
        },
    ];

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col p-4 md:p-6 lg:p-8 w-full gap-6">
                <Menu/>
                
                <div className="flex flex-col w-full gap-6">
                    <div className="flex w-full justify-center">
                        <div className="w-full max-w-[90rem]">
                            <Alert>
                                <DoorOpen className="h-4 w-4" />
                                <AlertTitle className="font-bold">
                                    Welcome, <span className="text-primary">Mustapha Enterprise</span>
                                </AlertTitle>
                                <AlertDescription className="text-xs italic">
                                    <p className="max-md:text-[11px]">{"Select an option from the menu to get started"}</p>
                                </AlertDescription>
                            </Alert>
                        </div>
                    </div>

                    <div className="flex w-full justify-center py-4 md:py-8 min-h-0 md:h-[70vh]">
                        <div className="w-full max-w-[90rem] h-full md:h-full">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 w-full h-auto md:h-[75%]">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link 
                                            key={item.title}
                                            href={item.href}
                                            className="group h-full md:h-full"
                                        >
                                            <div className={`
                                                relative w-full min-h-[320px] md:h-full p-6 md:p-8 rounded-xl border-2 
                                                transition-all duration-300 cursor-pointer
                                                bg-card text-card-foreground
                                                border-border
                                                ${item.borderColor} ${item.hoverColor}
                                                shadow-md
                                                hover:shadow-xl hover:scale-105 hover:-mt-2
                                                flex flex-col
                                            `}>
                                                <div className="flex flex-col items-center text-center mb-6">
                                                    <div className={`
                                                        p-3 md:p-4 rounded-xl mb-4
                                                        ${item.iconBg} ${item.iconColor}
                                                        group-hover:scale-110 transition-transform duration-300
                                                    `}>
                                                        <Icon className="h-8 w-8 md:h-10 md:w-10" />
                                                    </div>
                                                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                                                        {item.title}
                                                    </h2>
                                                    <p className="text-sm md:text-base text-muted-foreground">
                                                        {item.description}
                                                    </p>
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between">
                                                    <ul className="space-y-3 mb-6">
                                                        {item.features.map((feature, idx) => (
                                                        <li key={idx} className="flex items-start gap-3">
                                                            <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                                        </li>
                                                        ))}
                                                    </ul>

                                                    <Button 
                                                        className="w-full group-hover:scale-105 transition-transform duration-300"
                                                        variant="outline"
                                                    >
                                                        Get Started
                                                    </Button>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}