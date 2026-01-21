
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO: string;
            THREEWB_API_KEY: string;
            NEXT_PUBLIC_PRIVY_APP_ID: string;
        }
    }
}
  
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}