<template>
  <form @submit.prevent="onSubmit">
    <div class="row mt-2">
      <!-- Input Information -->
      <div class="bg-white rounded-lg py-4 mb-8">
        <div class="container mx-auto px-8">
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Total</span>
            <label
              for="total"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <input
                class="text-base w-full focus:outline-none focus:border-transparent"
                type="number"
                placeholder="0"
                v-model="total"
              />
              <div class="flex w-10 leading-10 justify-center mb-1">
                <span class="inline-block px-1 text-dark text-xl">VND</span>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
          <div class="flex flex-col pb-1">
            <span class="pb-1">Select Category</span>
            <label
              for="category"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <input
                class="text-base w-full focus:outline-none focus:border-transparent"
                type="text"
                placeholder="Select.."
                v-model="category"
                @focus="inSelect = true"
                @blur="onblur"
              />
              <div
                class="flex w-10 leading-10 items-center justify-center mb-1"
              >
                <span
                  class="inline-bloc w-8 h-8 rounded-full"
                  :class="color"
                ></span>
              </div>
            </label>
            <div
              v-if="inSelect"
              class="flex flex-col justify-between items-start border"
            >
              <div v-for="d in data" :key="d.categoryId">
                <div
                  class="h-8 flex justify-start items-center ml-2"
                  @click="(category = d.name), (color = d.color)"
                >
                  {{ d.name }}
                </div>
              </div>
            </div>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Note</span>
            <label
              for="note"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <input
                class="text-base w-full focus:outline-none focus:border-transparent"
                maxlength="200"
                type="text"
                placeholder="Note here..."
                v-model="note"
              />
              <div class="flex w-10 leading-10 justify-center items-end">
                <i
                  Class="t2ico t2ico-document inline-block text-dark text-3xl"
                ></i>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Date</span>
            <label
              for="date"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <div class="w-full text-base">{{ date }}</div>
              <div class="flex w-10 leading-10 justify-center items-end">
                <i
                  Class="t2ico t2ico-calendar inline-block text-dark text-3xl"
                ></i>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Wallet</span>
            <label
              for="wallet"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <input
                class="text-base w-full focus:outline-none focus:border-transparent"
                maxlength="200"
                type="text"
                placeholder="Select wallet"
                v-model="wallet"
              />
              <div class="flex w-10 leading-10 justify-center items-end">
                <i
                  Class="t2ico t2ico-wallet inline-block text-dark text-3xl"
                ></i>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
        </div>
      </div>

      <!-- Start more Information -->
      <div v-if="!isMoreDetails" class="row mt-8">
        <button
          class="bg-white rounded-lg py-3 w-full text-primary font-semibold cursor-pointer"
          @click="isMoreDetails = !isMoreDetails"
        >
          More Details
        </button>
      </div>

      <!-- More Information -->
      <div v-if="isMoreDetails" class="bg-white rounded-lg py-4 mt-8">
        <div class="container mx-auto px-8">
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Location</span>
            <label
              for="location"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <input
                class="text-base w-full focus:outline-none focus:border-transparent"
                type="text"
                placeholder="0"
                v-model="location"
              />
              <div class="flex w-10 leading-10 justify-center items-end">
                <i
                  Class="t2ico t2ico-location inline-block text-dark text-3xl"
                ></i>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">With person</span>
            <label
              for="person"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <input
                class="text-base w-full focus:outline-none focus:border-transparent"
                maxlength="200"
                type="text"
                placeholder="Select wallet"
                v-model="person"
              />
              <div class="flex w-10 leading-10 justify-center items-end">
                <i
                  Class="t2ico t2ico-users inline-block text-dark text-3xl"
                ></i>
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
import { useUser } from "@/composables/useUser";
import { getNewdate } from "../untils/import";
import { useRouter } from "vue-router";
import useCollection from "@/composables/useCollection";
import useGetData from "@/composables/useGetData";

export default {
  setup() {
    const { getUser } = useUser();

    const { error, addRecord } = useCollection("transactions");

    const isMoreDetails = ref(false);
    const inSelect = ref(false);
    const onblur = () => {
      setTimeout(() => {
        inSelect.value = false;
      }, 100);
    };
    const router = useRouter();

    const total = ref(0);
    const category = ref("");
    const note = ref("");
    const wallet = ref("My wallet");
    const location = ref("");
    const person = ref("");
    const date = ref(getNewdate());
    const color = ref("bg-dark");

    async function onSubmit() {
      const { user } = getUser();

      const transaction = {
        total: total.value,
        category: category.value,
        note: note.value,
        date: date.value,
        wallet: wallet.value,
        location: location.value,
        person: person.value,
        userId: user.value.uid,
        color: color.value,
      };

      await addRecord(transaction);

      !error ? console.log(error) : router.push({ name: "report", params: {} });
    }
    const { user } = getUser();
    const { getData } = useGetData("category", user.value.uid);
    const transactions = getData();

    const data = ref([]);

    transactions.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const transaction = doc.data();
        data.value.push(transaction);
      });
    });

    return {
      onSubmit,
      isMoreDetails,
      total,
      category,
      note,
      date,
      wallet,
      location,
      person,
      inSelect,
      onblur,
      data,
      color,
    };
  },
};
</script>
