/**
 * Pick a random number between two given numbers
 * @param low
 * @param high
 */
export function randint(low: number, high: number): number {
    return Math.floor(Math.random() * (high - low) + low);
}

/**
 * Returns a promise to sleep for x milliseconds
 * @param {number} millis
 * @returns {Promise<void>}
 */
export function sleep(millis: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, millis));
}
