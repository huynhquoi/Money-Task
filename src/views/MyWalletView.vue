<template>
  <form @submit.prevent="onSubmit" class="mb-20">
    <div class="row mt-2">
      <!-- Input Information -->
      <div class="bg-white rounded-lg py-4 mb-8">
        <div class="container mx-auto px-8">
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Money</span>
            <label
              for="total"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <input
                class="text-base w-full focus:outline-none focus:border-transparent"
                type="number"
                placeholder="4000000"
                v-model="money"
              />
              <div class="flex w-10 leading-10 justify-center mb-1">
                <span class="inline-block px-1 text-dark text-xl">VND</span>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="row mt-8 w-full flex justify-center items-center">
        <button
          class="bg-primary rounded-lg py-3 w-80 text-white font-semibold cursor-pointer"
          type="submit"
        >
          ADD
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "@/composables/useUser";
import useUpdateWallet from "@/composables/useUpdateDataWallet";
import useGetData from "@/composables/useGetData";

export default {
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();
    const { getData } = useGetData("wallet", user.value.uid);
    const wallet = getData();
    const router = useRouter();
    const sure = ref(true);

    const money = ref();

    function onSubmit() {
      if (sure.value) {
        const sum = money.value - 4000000;
        let walletId = "";
        wallet.then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            walletId = doc.id;
          });
          console.log(walletId);
          if (walletId) {
            const { update } = useUpdateWallet(0, 0, sum, walletId);
            update();
          }
        });
        router.push({ name: "home", params: {} });
      }
      return;
    }

    return {
      money,
      onSubmit,
    };
  },
};
</script>
