const emojis = ["🐣", "🐥", "🐓", "🥚", "🐔", "🐝", "🐛", "🦋", "🐌", "🏠", "🛖", "🌲", "🌳", "🌿", "🍀", "☘️", "🌱", "🌾", "🌺", "🌼", "🏵️", "🌻", "🌹", "🌷", "🪴", "🪵", "🪨", "🏀"];

const addressOffset = 2;

export function generateEmojiArtByRandom(x: number, y: number): string[] {
    const image: string[] = [];
    for (let i = 0; i < y; i++) {
        image[i] = "";
        for (let j = 0; j < x; j++) {
            const index = Math.floor(Math.random() * emojis.length);
            image[i] += emojis[index];
        }
    }
    return image;
}

export function generateEmojiArtByAddress(x: number, y: number, address: string): string[] {
    if (address.length === 0) {
        return [];
    }
    const image: string[] = [];
    for (let i = 0; i < y; i++) {
        image[i] = "";
        for (let j = 0; j < x; j++) {
            // image[i] += String.fromCharCode(address.charCodeAt((i * x + j + addressOffset)));
            const index = address.charCodeAt((i * x + j + addressOffset) % address.length) % emojis.length;
            image[i] += emojis[index];
        }
    }
    return image;
}
