<template>
  <div class="row mb-20">
    <div class="container mx-auto px-8">
      <!-- title -->
      <div class="grid grid-cols-1">
        <div class="col-span-1">
          <h3 class="font-bold text-xl text-primary mb-2">
            Detail Transaction
          </h3>
        </div>
      </div>
      <!-- Transaction -->
      <div class="grid grid-cols-1">
        <div class="col-span-1">
          <h4 class="font-bold text-xl text-gray-400 mb-2">Today</h4>
          <ul>
            <li
              v-for="d in data"
              :key="d.userId"
              class="w-full h-20 bg-white row flex justify-between items-center rounded-xl mb-3"
            >
              <div class="row flex justify-start items-center pl-4">
                <div class="w-16 h-16 rounded-xl mr-2" :class="d.color"></div>
                <div class="flex-col flex justify-between">
                  <div class="font-bold text-xl text-primary mb-3">
                    {{ d.note }}
                  </div>
                  <div class="font-bold text-sm text-gray-400">
                    {{ d.category }}
                  </div>
                </div>
              </div>
              <div class="flex-col flex justify-end pr-4">
                <div class="flex justify-end font-bold text-xl mb-3">
                  {{ d.total }}
                </div>
                <div class="font-bold text-sm text-gray-400">
                  {{ d.date }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import useGetMoney from "@/composables/useGetMoney";
import useGetData from "@/composables/useGetData";
import { useUser } from "@/composables/useUser";
import useUpdateWallet from "@/composables/useUpdateDataWallet";

export default {
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();

    const { getData } = useGetData("wallet", user.value.uid);
    const wallet = getData();

    const { getMoney } = useGetMoney(
      "transactions",
      user.value.uid,
      "My wallet"
    );
    const transactions = getMoney();

    const data = ref([]);
    let sum = 0;

    transactions.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const transaction = doc.data();
        data.value.push(transaction);
        sum += transaction.total;
      });
      let walletId = "";
      wallet.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          walletId = doc.id;
        });
        console.log(walletId);
        if (walletId) {
          const { update } = useUpdateWallet(sum, walletId);
          update();
        }
      });
    });

    return { data };
  },
};
</script>
