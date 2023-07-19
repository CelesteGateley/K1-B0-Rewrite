import { Regions, RiotValorantApi } from 'riot-valorant-api';

let client: RiotValorantApi|null = null;

export function getValorant(): RiotValorantApi|null {
    if (client === null && (process.env.VALORANT_KEY !== '')) {
        client = new RiotValorantApi(`${process.env.VALORANT_KEY}`, Regions.EUROPE);
    }
    return client;
}
