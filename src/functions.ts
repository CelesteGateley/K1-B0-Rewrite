/**
 * Pick a random number between two given numbers
 * @param low
 * @param high
 */
export function randint(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
}
