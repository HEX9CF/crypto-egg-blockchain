import { ref } from "vue";
import { Chain } from "@/models/chain";
import { Key } from "@/models/key";

const chain = ref(new Chain(1, 2));
const key = ref(new Key());
const transactionForm = ref({
    to: "",
    amount: 0,
    message: ""
});

export { chain, key, transactionForm };