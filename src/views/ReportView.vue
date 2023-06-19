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
            <li v-for="d in data" :key="d.userId">
              <div
                class="w-full h-20 bg-white row flex justify-between items-center rounded-xl mb-3"
                @click="(onDetail = true), (setData = d)"
              >
                <div class="row flex justify-start items-center pl-4">
                  <div class="w-16 h-16 rounded-xl mr-2" :class="d.color"></div>
                  <div class="flex-col flex justify-between">
                    <div class="font-bold text-lg text-primary mb-3 w-32">
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
              </div>
              <detail-transaction
                v-if="onDetail"
                :title="setData"
                @detail="updateDetail"
                class="absolute top-0 left-0 mt-24 w-full"
                style="background-color: #f8fafb"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import DetailTransaction from "@/components/DetailTransaction.vue";
import useGetMoney from "@/composables/useGetMoney";
import useGetData from "@/composables/useGetData";
import { useUser } from "@/composables/useUser";
import useUpdateWallet from "@/composables/useUpdateDataWallet";

export default {
  components: {
    DetailTransaction,
  },
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
    const onDetail = ref(false);

    const data = ref([]);
    let sumIncome = 0;
    let sumExpense = 0;
    let sum = 0;

    const setData = ref({});

    transactions.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const transaction = doc.data();
        data.value.push(transaction);
        if (transaction.total < 0) {
          sumExpense += transaction.total;
        } else if (transaction.total > 0) {
          sumIncome += transaction.total;
        }
        sum = sumExpense + sumIncome;
      });
      let walletId = "";
      wallet.then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          walletId = doc.id;
        });
        console.log(walletId);
        if (walletId) {
          const { update } = useUpdateWallet(
            sumExpense,
            sumIncome,
            sum,
            walletId
          );
          update();
        }
      });
    });

    const updateDetail = () => {
      onDetail.value = false;
    };

    return { data, onDetail, setData, updateDetail };
  },
};
</script>
