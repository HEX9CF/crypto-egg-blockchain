import { ref } from "vue";
import { Chicken } from "@/models/chicken";

const chicken = ref(new Chicken());
const inventory = ref({
    food: 0,
    egg: 0
});

export { chicken, inventory };