import { Motorbike, Caravan } from "lucide-react"
export const BRANCHES = [
    {
        name: "Head Office Kasoa",
        value: "head-office-kasoa",
    },
    {
        name: "Walantu Kasoa",
        value: "walantu-kasoa",
    },
    {
        name: "Escobar Kasoa",
        value: "escobar-kasoa",
    },
    {
        name: "Buduburam Liberia Camp",
        value: "buduburam-liberia-camp",
    },
    {
        name: "Dwenase Sefwi Wiawso",
        value: "dwenase-sefwi-wiawso",
    },
]

export const VEHICLE_COLORS = [ 
    {
        name: "Black",
        value: "black",
    },
    {
        name: "Red",
        value: "red",
    },
    {
        name: "Blue",
        value: "blue",
    },
    {
        name: "Green",
        value: "green",
    },
    {
        name: "Yellow",
        value: "yellow",
    },
    {
        name: "White",
        value: "white",
    },
]

export const VEHICLE_TYPES = [
    {
        name: "Motorcycle",
        value: "motorcycle",
        icon: <Motorbike className="h-4 w-4 text-primary" />,
    },
    {
        name: "Scooter",
        value: "scooter",
        icon: <Motorbike className="h-4 w-4 text-primary" />,
    },

    {
        name: "Semi Auto",
        value: "semi-auto",
        icon: <Motorbike className="h-4 w-4 text-primary" />,
    },
    {
        name: "Tricycle",
        value: "tricycle",
        icon: <Caravan className="h-4 w-4 text-primary" />,
    },
]


export const MODELS = [
    {
        type: "motorcycle",
        name: "TVS Apache RTR 200 4V",
        value: "tvs-apache-rtr-200-4v",
    },
    {
        type: "motorcycle",
        name: "TVS Apache RTR 180",
        value: "tvs-apache-rtr-180",
    },
    {
        type: "motorcycle",
        name: "TVS Jive",
        value: "tvs-jive",
    },
    {
        type: "motorcycle",
        name: "TVS 150X 5 Gear",
        value: "tvs-150x-5-gear",
    },
    {
        type: "motorcycle",
        name: "TVS 150 5 Gear",
        value: "tvs-150-5-gear",
    },
    {
        type: "motorcycle",
        name: "TVS Star HLX 125",
        value: "tvs-star-hlx-125",
    },
    {
        type: "motorcycle",
        name: "TVS ZT 125",
        value: "tvs-zt-125",
    },
    {
        type: "motorcycle",
        name: "TVS HLX Plus",
        value: "tvs-hlx-plus",
    },
    {
        type: "motorcycle",
        name: "TVS HLX 125 5G",
        value: "tvs-hlx-125-5g",
    },
    {
        type: "scooter",
        name: "TVS Ntorq 125",
        value: "tvs-ntorq-125",
    },
    {
        type: "semi-auto",
        name: "TVS NEO NX",
        value: "tvs-neo-nx",
    },
    {
        type: "semi-auto",
        name: "TVS Rockz",
        value: "tvs-rockz",
    },
    {
        type: "tricycle",
        name: "TVS King Deluxe",
        value: "tvs-king-deluxe",
    },
    {
        type: "tricycle",
        name: "TVS King Deluxe Plus",
        value: "tvs-king-deluxe-plus",
    },
    {
        type: "tricycle",
        name: "TVS Kargo",
        value: "tvs-kargo",
    }
]


export const SEARCH_FILTERS = [
    {
        name: "Serial",
        value: "serial",
        column: "serial",
        content: "filter by serial number...",
    },
    {
        name: "Branch",
        value: "branch",
        column: "branch",
        content: "filter by branch...",
    },
    {
        name: "Type",
        value: "type",
        column: "vehicleType",
        content: "filter by vehicle type...",
    },
    {
        name: "License",
        value: "license",   
        column: "vehicleLicense",
        content: "filter by license plate number...",
    },
]

export const PARTS = []