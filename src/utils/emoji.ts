export function generateFarmEmojiArt(x: number, y: number): string[] {
    const emojis = ["🐣", "🐥", "🐓", "🥚", "🐔", "🐝", "🐛", "🦋", "🐌", "🏠", "🏡", "🛖", "🌲", "🌳", "🌿", "🍀", "☘️", "🌱", "🎋", "🌾", "🌺", "🌼", "🏵️", "🌻", "🌹", "🌷", "🪴", "🪵", "🪨", "🏀"];
    var image:string[] = [];
    for (let i = 0; i < y; i++) {
        image[i] = "";
        for (let j = 0; j < x; j++) {
            const index = Math.floor(Math.random() * emojis.length);
            image[i] += emojis[index];
        }
    }
    return image;
}