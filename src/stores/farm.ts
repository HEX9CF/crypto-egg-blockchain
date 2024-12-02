import { ref } from "vue";
import { Chicken } from "@/models/chicken";
import { generateFarmEmojiArt } from "@/utils/emoji";

export const chicken = ref(new Chicken());
export const inventory = ref({
    food: 0,
});

export const farmEmojiArt = ref(generateFarmEmojiArt(10, 6));


// 更新图案
setInterval(() => {
    farmEmojiArt.value = generateFarmEmojiArt(10, 6);
}, 10000);
