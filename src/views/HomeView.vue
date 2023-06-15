<template>
  <div class="row mb-8">
    <div class="container mx-auto px-8" v-for="d in data" :key="d.walletId">
      <!-- title -->
      <div class="grid grid-cols-1 w-full">
        <div class="col-span-1 flex flex-col justify-center items-center">
          <h3 class="font-bold text-2xl text-gray-400 mb-8 mt-3">
            {{ d.name }}
          </h3>
          <h3 class="font-bold text-4xl text-primary mb-8">
            {{ d.money }} VND
          </h3>
          <div class="flex justify-between items-center w-full">
            <div
              class="w-40 h-24 bg-green rounded-xl flex row justify-between items-center"
            >
              <div
                class="font-bold text-white ml-2 flex flex-col justify-between h-full"
              >
                <div class="text-xl mt-3">Income</div>
                <div class="text-xl mb-3">{{ d.income }}</div>
              </div>
              <i class="t2ico t2ico-trending-up text-5xl text-white mr-3"></i>
            </div>
            <div
              class="w-40 h-24 bg-red rounded-xl flex row justify-between items-center"
            >
              <div
                class="font-bold text-white ml-2 flex flex-col justify-between h-full"
              >
                <div class="text-xl mt-3">Expense</div>
                <div class="text-xl mb-3">{{ d.expense }}</div>
              </div>
              <i class="t2ico t2ico-trending-down text-5xl text-white mr-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ReportView class="mb-24" />
</template>

<script>
import { ref } from "vue";
import { useUser } from "@/composables/useUser";
import useGetData from "@/composables/useGetData";
import ReportView from "./ReportView.vue";

export default {
  components: {
    ReportView,
  },
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();
    const { getData } = useGetData("wallet", user.value.uid);
    const wallet = getData();

    // console.log(wallet);

    const data = ref([]);

    wallet.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const transaction = doc.data();
        data.value.push(transaction);
      });
    });
    return { user, data };
  },
};
</script>
