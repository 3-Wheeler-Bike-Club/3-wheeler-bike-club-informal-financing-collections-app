import Image from "next/image";
import { Logout } from "@/components/top/logout";
import { useRouter } from "next/navigation";


export function Menu() {

    const router = useRouter()
    
    return (
        <div className="flex w-full justify-center">
            <div className="w-full max-h-[4rem] h-full flex justify-between items-center">
                <div className="flex cursor-pointer">
                    <Image src="/icons/512x512.png" alt="logo" width={50} height={50} onClick={() => router.push("/dashboard")} /> 
                </div>

                <div className="flex gap-6 items-center">   
                    <Logout/>
                </div>
            </div>
        </div>
    )
}