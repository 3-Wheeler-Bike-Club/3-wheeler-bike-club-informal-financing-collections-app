export function Footer() {
    return (
        <div className="flex flex-col w-full gap-5 items-center justify-center px-4 mb-4">
            
            <div className="flex flex-row gap-5 text-xs max-md:text-[8px]">  
                <p className="">Built with ❤️ at <a className="text-primary underline" href="https://3wb.club" target="_blank" rel="noopener noreferrer">3 Wheeler Bike Club</a></p>
            </div>
            <p className="text-xs max-md:text-[8px]">{"© 2025 3WB LABS INC. <> 3WB GHANA LTD. All rights reserved."}</p>
        </div>
    );
}