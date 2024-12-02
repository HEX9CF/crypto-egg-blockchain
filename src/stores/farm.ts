import { ref } from "vue";
import { Chicken } from "@/models/chicken";
import {generateEmojiArtByAddress} from "../utils/emoji_art";
import {wallet} from "./wallet";

export const chicken = ref(new Chicken());
export const inventory = ref({
    food: 0,
});

export const farmEmojiArt = ref([]);

// 更新图案
// setInterval(() => {
//     farmEmojiArt.value = generateFarmEmojiArt(10, 6);
// }, 10000);

export function updateFarmEmojiArt(): void {
    farmEmojiArt.value = generateEmojiArtByAddress(32, 4, wallet.value.publicKey);
}