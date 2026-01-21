import { DoorOpen } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "../ui/alert";

export function Contracts() {
    return (
        <div className="flex flex-col h-full w-full gap-4">
            <div className="flex w-full justify-center">
                <Alert className="w-full max-w-[66rem]">
                    <DoorOpen className="h-4 w-4" />
                    <AlertTitle className="font-bold">Welcome </AlertTitle>
                    <AlertDescription className="text-xs italic">
                        <p className="max-md:text-[11px]">{"Manage Payment Collections & Agreements"}</p>
                    </AlertDescription>
                </Alert>
            </div>

            <div>
                
            </div>
        </div>
    );
}