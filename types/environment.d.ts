declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_KEY: string;
        }
    }
}