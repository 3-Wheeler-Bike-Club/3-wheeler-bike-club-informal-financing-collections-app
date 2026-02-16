"use client";

import { Menu } from "@/components/top/menu";
import {
    Car,
    Package,
    ShoppingCart,
    FileText,
    Wrench,
    ChevronRight,
    Check,
    MapPin,
} from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

type NavItem = {
    title: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
    features: string[];
    placeholder?: boolean;
};

const MOTOR_VEHICLES: NavItem[] = [
    {
        title: "Motor",
        href: "/motor",
        icon: Car,
        desc: "Complete motor vehicle management",
        features: ["View all vehicles", "Add new motor vehicles", "Update stock status", "Track vehicle details"],
    },
    {
        title: "Sales",
        href: "/sales",
        icon: ShoppingCart,
        desc: "Sales tracking and management",
        features: ["Record sales transactions", "View sales history", "Generate reports", "Track revenue"],
    },
    {
        title: "Work & Pay",
        href: "/contracts",
        icon: FileText,
        desc: "Payment collections and contracts",
        features: ["Create contracts", "Track payments", "Manage collections", "View payment history"],
    },
];

const SPARE_PARTS: NavItem[] = [
    {
        title: "Spare",
        href: "/spare",
        icon: Package,
        desc: "Parts inventory management",
        features: ["View parts stock", "Manage branch inventory", "Check quantities", "Update spare parts"],
    },
    {
        title: "Sales",
        href: "/sales",
        icon: ShoppingCart,
        desc: "Parts sales and transactions",
        features: ["Record parts sales", "View sales history", "Track parts revenue", "Generate reports"],
    },
    {
        title: "By branch",
        href: "/spare",
        icon: MapPin,
        desc: "Stock view by location",
        features: ["View stock by branch", "Compare branch levels", "Transfer between branches", "Branch reports"],
    },
];

function SectionCard({
    title,
    icon: Icon,
    items,
    accentClass,
}: {
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    items: NavItem[];
    accentClass: string;
}) {
    return (
        <div className="flex flex-col h-full rounded-xl border border-border bg-card text-card-foreground shadow-sm overflow-hidden transition-shadow hover:shadow-md">
            <div className={`flex items-center gap-3 px-5 py-4 border-b border-border ${accentClass}`}>
                <div className="flex items-center justify-center size-10 rounded-lg bg-background/80">
                    <Icon className="size-5 text-foreground" />
                </div>
                <h2 className="text-lg font-semibold">{title}</h2>
            </div>
            <nav className="flex flex-col flex-1 min-h-0 p-4 gap-2">
                {items.map((item) => {
                    const ItemIcon = item.icon;
                    return (
                        <Link
                            key={item.title + item.href}
                            href={item.href}
                            className="flex flex-1 min-h-0 flex-col rounded-lg border border-border/50 px-4 py-3 text-left transition-colors hover:bg-accent hover:border-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring overflow-hidden"
                        >
                            <div className="flex items-center gap-3 shrink-0">
                                <ItemIcon className="size-5 text-muted-foreground shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <span className="font-medium block">{item.title}</span>
                                    <span className="text-xs text-muted-foreground block">{item.desc}</span>
                                </div>
                                <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                            </div>
                            <ul className="flex flex-1 min-h-0 flex-col justify-center gap-1.5 mt-2 pl-8">
                                {item.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Check className="size-3.5 text-primary shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}

export function Wrapper() {
    return (
        <div className="flex flex-col w-full min-h-screen">
            {/* Compact top bar: menu only */}
            <header className="shrink-0 px-4 py-3 md:px-6 md:py-3 border-b border-border bg-background/95">
                <Menu />
            </header>

            {/* Main area fills remaining screen */}
            <main className="flex-1 flex flex-col min-h-0 p-4 md:p-6 lg:p-8">
                <div className="w-full max-w-[90rem] mx-auto flex flex-col flex-1 min-h-0 gap-4 md:gap-6">
                    <div className="shrink-0">
                        <Alert className="py-2.5">
                            <Car className="h-4 w-4" />
                            <AlertTitle className="font-bold text-sm md:text-base">
                                Welcome, <span className="text-primary">Mustapha Enterprise</span>
                            </AlertTitle>
                            <AlertDescription className="text-xs italic max-md:text-[11px]">
                                Choose a section below to get started
                            </AlertDescription>
                        </Alert>
                    </div>

                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 min-h-0 min-[900px]:min-h-[320px]">
                        <SectionCard
                            title="Motor vehicles"
                            icon={Car}
                            items={MOTOR_VEHICLES}
                            accentClass="bg-chart-1/10 dark:bg-chart-1/15"
                        />
                        <SectionCard
                            title="Spare parts"
                            icon={Wrench}
                            items={SPARE_PARTS}
                            accentClass="bg-chart-2/10 dark:bg-chart-2/15"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
