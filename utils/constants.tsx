import { Motorbike, Caravan } from "lucide-react"
export const BRANCHES = [
    {
        name: "Head Office",
        value: "head-office",
    },
    {
        name: "Walantu Main",
        value: "walantu-main",
    },
    {
        name: "Walantu Annex",
        value: "walantu-annex",
    },
    {
        name: "Escobar",
        value: "escobar",
    },
    {
        name: "Budumburam Liberia Camp",
        value: "budumburam-liberia-camp",
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





export const PART = [

    {
        type: "general",
        description: "TOTAL ENERGIES QUARTZ 5000 1L",
        no: "20W-50 API SL/CF",
        cost: 72 ,
    },
    {
        type: "general",
        description: "X-TREME 4T 1L",
        no: "SAE 20W-50 API SN/JASO MA-2",
        cost: 55 ,
    },
    {
        type: "tricycle",
        description: "ULTRA ACTIVE BRAKE FLUID 250GM",
        no: "DOT 3",
        cost: 15 ,
    },
    {
        type: "tricycle",
        description: "KGL HEAVY DUTY GEAR OIL ",
        no: "SAE 140 API GL-4",
        cost: 30,
    },
    {
        type: "tricycle",
        description: "UNICORN POWER 4T 1L",
        no: "20W-50 API-SG JASO MA",
        cost: 0,
    },
    {
        type: "tricycle",
        description: "STEERING COLUMN",
        no: "G2150010",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "WINDSHIELD FRAME - NEP BLUE",
        no: "G5220010M",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "WIND PROTECTOR",
        no: "G5220140",
        cost: 0 , // TURN BOX
    },
    {
        type: "motorcycle",
        description: "CLUTCH WIRE",
        no: "NA317004",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "GEAR WIRE",
        no: "KA317003",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "NUMBER PLATE GOLDEN YELLOW",
        no: "G52208905R",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "THROTTLE INNER CABLE REL",
        no: "24191080",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "ADANAH INNER GEAR WIRE",
        no: "",
        cost: 0,
    },
    {
        type: "tricycle",
        description: "SHOE BRAKE",
        no: "",
        cost: 0,
    },
    {
        type: "tricycle",
        description: "SIB SLIDER BLOCK SET",
        no: "FORG-AUTO-24-AL02",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "FUEL TANK TAPESET POLY BLUE U 229",
        no: "N51405503M",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CANVAS SOFT TOP BROWN",
        no: "G52225007H",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "DIFFERENTIAL ASSY",
        no: "G4080880",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CRANKSHAFT COMP NP 049",
        no: "G1020010",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "REAR COMB LAMP LH (N)",
        no: "G4160690",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "REAR COMB LAMP RH (N)",
        no: "G4160700",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "RIDER FOOTREST SUB ASSY",
        no: "N6120400",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "WOOD STICK MIDDLE SOFT TOP",
        no: "G5122080",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "CENTER STAND COMP",
        no: "N5123020",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "FENDER FRONT POLYESTER BLUE",
        no: "N62216603M",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "G42210905R",
        no: "FENDER FRONT PAINTED G YELLOW",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "MUFFLER COMP",
        no: "G4050440",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "LEVER ASSY PARKING BREAK",
        no: "G2110750",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "CRASHGUARD COMP",
        no: "N6222390",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "WIRING HARNEESS 2 FR",
        no: "G4160980",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "WIRING HARNEESS 2 RR",
        no: "G4160990",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CABLE ASSY CLUTCH(R)",
        no: "G5170020",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CABLE ASSY BLACK GEARSHIFT",
        no: "G5170030",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "CABLE ASSY SPEEDO CITY 110/SPORT",
        no: "N8170260",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CABLE ASSY WHITE GEARSHIFT",
        no: "G5170040",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "CABLE ASSY CLUTCH PHX/VIC/CITY+ | CLUTCH CABLE ASSY (A)",
        no: "N5170140",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CLUTCH CABLE ASSY (M)",
        no: "G4070730",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CABLE THROTTLE ASSY W/O TPS",
        no: "G4170190",
        cost: 0 ,
    },
    {
        
        type: "motorcycle",
        description: "SEAL VALVE STEN OIL",
        no: "M1010620",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "CABLE ASSY FR BRAKE STAR",
        no: "N5170020",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "THROTTLE CABLE ASSY (A)",
        no: "N5170120",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "COMP GASKET",
        no: "G4010070",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "GASKET CLUTCH COVER",
        no: "N4030360CN",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CABLE ASSY CLUTCH (M)",
        no: "G4070730",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "CAP ASSY FUEL TANK 5LTR",
        no: "G5140680",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "KIT CARBURETTER",
        no: "K3322040",
        cost: 0,
    },
    {
        type: "tricycle",
        description: "CAM CHAIN",
        no: "G4010140",
        cost: 80, 
    },
    {
        type: "tricycle",
        description: "TIMING CHAIN 86L",
        no: "G1597021",
        cost: 0, 
        quantity: 2,
    },
    {
        type: "tricycle",
        description: "ENGINE VALVE KIT",
        no: "G4320780",
        cost: 0,
        quantity: 50,
    },
    {
        type: "tricycle",
        description: "LEG OIL SEAL ",
        no: "G111004",
        cost: 0 ,
        quantity: 15,
    },
    {
        type: "motorcycle",
        description: "SWITCH ASSY R EXP 1",
        no: "N5160890",
        cost: 0 ,
        quantity: 3,
    },
    {
        type: "motorcycle",
        description: "SWITCH ASSY L",
        no: "N5160710",
        cost: 0 ,
        quantity: 3,
    },
    {
        type: "tricycle",
        description: "TCI UNIT PETROL",
        no: "G4060130",
        cost: 0 ,
        quantity: 5,
    },
    {
        type: "motorcycle",
        description: "TCI UNIT",
        no: "N6060040",
        cost: 0 ,
        quantity: 1,
    },
    {
        type: "tricycle",
        description: "SPARK PLUG 4S WITH FERRUL",
        no: "G4011310",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "NOT DESCRIBED METAL RINGS",
        no: "G5320010",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "BUNDY TUBE ASSY",
        no: "G3110050",
        cost: 0 ,   
    },
    {
        type: "tricycle",
        description: "FRONT ENGINE MTG DAMPER KIT",
        no: "G4301590",
        cost: 0 ,
    },
    {
        type: "general",
        description: "T.Y.L BATTERY 12V 40Ah",
        no: "",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "AVATAR MOTORCYCLE BATTERY 12V 5AH/10 HR",
        no: "6MF5-BS",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "GS PREMIUM BATTERY 12V 5AH/10 HR",
        no: "GM5Z-3B",
        cost: 0 ,
    },
    {
        type: "motorcycle",
        description: "LEAD 99 12V 6AH/10 HR",
        no: "6MF6L-BS",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "GUAGE OIL LEVEL NP 049",
        no: "G4080400",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "STEERING CONE TOP (MODIFIED)",
        no: "G5320500",
        cost: 0 ,
    }, 
    {
        type: "motorcycle",
        description: "STEERING CONE TOP",
        no: "N8320070",
        cost: 0 ,   
    }, 
    {
        type: "tricycle",
        description: "REGULATOR CUM RECTIFIER 3",
        no: "G4660290",
        cost: 0 ,   
    }, 
    {
        type: "tricycle",
        description: "PIVOT PIN FRONT KIT",
        no: "G5320470",
        cost: 0 ,
    }, 
    
    {
        type: "tricycle",
        description: "KIT BUFFER RUBBER",
        no: "G4320760",
        cost: 0,
    }, 
    {
        type: "tricycle",
        description: "SLIDER BLOCK KIT",
        no: "G2320570",
        cost: 0 ,
    }, 
    {
        type: "motorcycle",
        description: "REGULATOR DC",
        no: "N3163500",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "KIT PISTON DIA 62 - STD+",
        no: "G4322340",
        cost: 0 ,   
    }, 
    
    {
        type: "tricycle",
        description: "PISTON KIT STD 4S",
        no: "G4320330",
        cost: 0 ,
        quantity: 1,
    }, 
    {
        type: "tricycle",
        description: "CAM SHAFT COMP - DELUXE BSIII",
        no: "G4010130",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "STATOR ASSY ES",
        no: "G4322070",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "DISC PRESSURE CLUTCH MC",
        no: "G4070320",
        cost: 0 ,
    }, 
    {
        type: "motorcycle",
        description: "DISC CLUTCH PRESSURE",
        no: "N2070200",
        cost: 0 ,
    }, 
    
    {
        type: "motorcycle",
        description: "HUB CLUTCH MC",
        no: "N4070250",
        cost: 0 ,
    }, 
    {
        type: "motorcycle",
        description: "LEVER ASSY BRAKE",
        no: "N5150170",
        cost: 0 ,
    }, 
    {
        type: "general",
        description: "ABRO STAR EPOXY STEEL CLEAR 4-MIN KWIK SET",
        no: "ES-501",
        cost: 15,
    },
    {
        type: "tricycle",
        description: "VORRRAC ARMATURE ASSY",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "general",
        description: "FAVOUR GOLD BEARINGS",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "YOTO BEARING",
        no: "",
        cost: 10, /// SLL PRICE CHECK FROM CHAIRMAN
    },
    {
        type: "tricycle",
        description: "MUTOBON BEARING",
        no: "",
        cost: 10, /// SLL PRICE CHECK FROM CHAIRMAN
    },
    {
        type: "tricycle",
        description: "MCP SUPER BEARING",
        no: "",
        cost: 10, /// SLL PRICE CHECK FROM CHAIRMAN
    },
    {
        type: "",
        description: "JAYNA OIL FILTER",
        no: "JAN101190",
        cost: 0 ,
    }, 
    {
        type: "general",
        description: "F-TBGOLD AEROSOL PAINT SKY BLUE",
        no: "",
        cost: 20,
    },
    {
        type: "general",
        description: "VISA AEROSOL PAINT DARK BLUE",
        no: "",
        cost: 20,
    },
    {
        type: "general",
        description: "F-TBGOLD AEROSOL PAINT ONION GRREN",
        no: "",
        cost: 20,
    },
    {
        type: "tricycle",
        description: "FILTER PAPER",
        no: "G4040980",
        cost: 0 ,
    }, 
    {
        type: "motorcycle",
        description: "LOCK SET",
        no: "N5150490",
        cost: 0 ,
    }, 
    {
        type: "motorcycle",
        description: "KIT CYL BLOCK PISTON R1R180 BS6",
        no: "NF321300",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "AXLE GEAR",
        no: "G2110530",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "SET PLATE CLUTCH",
        no: "G4320690",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "SHOCK ABSORBER 1",
        no: "N6090320",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "BRAKE DRUM",
        no: "G2110390",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "CHAIN SPROCKET KIT",
        no: "N5322220",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "STARTER MOTOR ASSY",
        no: "K6060200",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "MIRROR ASSY L-CITY+/PHOENIX",
        no: "N3220630",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "ZLINGBO SPARK PLUG",
        no: "",
        cost: 10, /// SLL PRICE CHECK FROM CHAIRMAN
    },
    {
        type: "",
        description: "MASTER CYL SUB ASSY",
        no: "G4110190",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "MIRROR ASSY LH REAR VIEW",
        no: "G5221970",
        cost: 0 ,
    }, 
    {
        type: "",
        description: "MIRROR ASSY LH REAR VIEW",
        no: "G5221980",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "JAYNA GOLD FLANGE SMALL",
        no: "",
        cost: 55,
    },
    {
        type: "tricycle",
        description: "RBX BRAKES WHEEL CYLINDER KIT",
        no: "26218",
        cost: 10,
    },
    {
        type: "general",
        description: "GREASE",
        no: "",
        cost: 5,
    },
    {
        type: "tricycle",
        description: "PERFECT GRADE PISTON KIT COMPACT 4S",
        no: "STD+++",
        cost: 75,
    },
    {
        type: "tricycle",
        description: "AMAREX FLANGE",
        no: "",
        cost: 60,
    },
    {
        type: "tricycle",
        description: "FORTA REAR VIEW MIRROR",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "VARROC BELLOW PROPELLOR SHAFT",
        no: "RUBB-TVSK-2320",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "KOOWAY MOTORCYCLE TUBE SIZE 4.00-8",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "FLOOR MAT",
        no: "",
        cost: 10,
    },
    {
        type: "tricycle",
        description: "CLUTCH CABLE COMP 4S",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "GEAR CABLE BLACK 4S",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "ADANAH GEAR CABLE BLACK",
        no: "",
        cost: 0 ,
    },
    
    {
        type: "tricycle",
        description: "ADANAH GEAR CABLE WHITE",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "CHANLIN THROTTLE CABLE",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "CHINE SAM CLUTCH CABLE",
        no: "",
        cost: 0 ,
    },  
    {
        type: "tricycle",
        description: "BULLOCK THROTTLE CABLE",
        no: "",
        cost: 0 ,
    },  
    {
        type: "tricycle",
        description: "ADANAH CLUTCH CABLE",
        no: "",
        cost: 0 ,
    },  
    {
        type: "tricycle",
        description: "WAY-C SKY THROTTLE CABLE",
        no: "",
        cost: 0 ,
    },
    {
        type: "tricycle",
        description: "SMALL RUBBER",
        no: "",
        cost: 2,
    },
    {
        type: "tricycle",
        description: "MEDIUM RUBBER",
        no: "",
        cost: 5,
    },
    {
        type: "tricycle",
        description: "BIG RUBBER",
        no: "",
        cost: 10,
    },  
    {
        type: "tricycle",
        description: "JAYNA FRONT WHEEL HUB AXLE",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "IAUTO FRONT WHEEL HUB AXLE",
        no: "",
        cost: 0 ,
    },  
    {
        type: "tricycle",
        description: "BBE FRONT WHEEL HUB AXLE",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "SPELLMAN FRONT WHEEL HUB AXLE",
        no: "",
        cost: 0 ,
    },  
    {
        type: "tricycle",
        description: "TAIL LIGHT COVER",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "UHK HORN",
        no: "",
        cost: 0 ,
    },  
    {
        type: "tricycle",
        description: "PERFECT GRADE ARMATURE",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "motorcycle",
        description: "ENDURANCE SHOCK ABSORBER SMALL",
        no: "S255100106",
        cost: 0 ,
    },  
    {
        type: "motorcycle",
        description: "ENDURANCE SHOCK ABSORBER BIG",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "JIANSHING BRAKE SHOE",
        no: "",
        cost: 0 ,
    },  
    {
        type: "tricycle",
        description: "PERFECT GRADE CLUTCH FIBER",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "CYLINDER GASKET KIT",
        no: "AA101149/AN101135",
        cost: 15,
    },
    {
        type: "tricycle",
        description: "DB-3520 BEARING",
        no: "B01DBB766",
        cost: 20, /// SLL PRICE CHECK FROM CHAIRMAN
    },
    {
        type: "tricycle",
        description: "JYOTI ROTOR ASSEMBLY",
        no: "BC23",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "CLUTCH RELIZER",
        no: "",
        cost: 20,
    },
    {
        type: "tricycle",
        description: "BUSH",
        no: "AB 1710 16",
        cost: 10,
    },
    {
        type: "tricycle",
        description: "GEAR INNER CABLE REL | THROTTLE INNER CABLE REL",
        no: "24191080",
        cost: 10,
    },
    {
        type: "tricycle",
        description: "GRACE LIGHT REAR TRAILING ARM BUSH",
        no: "",
        cost: 0 ,   
    },  
    {
        type: "tricycle",
        description: "PIVOT PIN FRONT KIT",
        no: "G5320470",
        cost: 80,   
    },
    {
        type: "general",
        description: "CABLE CLIPS",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "HJ & BS KIT SPROCKET",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "general",
        description: "SMALL BULBS",
        no: "",
        cost: 2,
    },
    {
        type: "tricycle",
        description: "SPRING",
        no: "",
        cost: 0 ,
    },  
    {
        type: "motorcycle",
        description: "2W TYRES",
        no: "",
        cost: 0 ,
    }, 
    {
        type: "tricycle",
        description: "3W TYRES WITH TUBE",
        no: "",
        cost: 0 ,
    }, 
]