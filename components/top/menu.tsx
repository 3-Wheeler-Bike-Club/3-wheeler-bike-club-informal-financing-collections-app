import Image from "next/image";
import { Logout } from "@/components/top/logout";


export function Menu() {

    
    
    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-h-[4rem] h-full flex justify-between items-center">
                <div className="flex">
                    <Image src="/icons/512x512.png" alt="logo" width={50} height={50} /> 
                </div>

                <div className="flex gap-6 items-center">   
                    <Logout/>
                </div>
            </div>
        </div>
    )
}