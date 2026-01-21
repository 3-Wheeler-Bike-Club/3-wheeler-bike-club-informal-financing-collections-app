"use client";

import { Menu } from "../top/menu";

export function Wrapper() {
    return (
        <div className="flex flex-col h-full p-4 md:p-6 lg:p-8 w-full gap-6">
            <Menu/>
            {
                true 
                ? (
                    <div className="flex h-full justify-center items-center text-2xl font-bold">
                        <p>Loading...</p>
                    </div>
                ) 
                : (
                    <>
                        {
                            <></>
                        }
                    </>
                )
            }    
        </div>
    );
}