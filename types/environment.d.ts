declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_KEY: string;
            VALORANT_KEY: string|null;
        }
    }
}
