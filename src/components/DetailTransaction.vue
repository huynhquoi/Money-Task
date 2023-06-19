<template>
  <form class="mb-20">
    <div class="transform rotate-180 flex justify-end ml-4">
      <i
        @click="updateDetail"
        class="t2ico t2ico-arrow-right text-4xl text-primary"
      ></i>
    </div>
    <div class="row mt-2 mx-6">
      <!-- Input Information -->
      <div class="bg-white rounded-lg py-4 mb-8">
        <div class="container mx-auto px-8">
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Total</span>
            <label
              for="total"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <div
                class="text-base w-full focus:outline-none focus:border-transparent"
              >
                {{ total }}
              </div>
              <div class="flex w-10 leading-10 justify-center mb-1">
                <span class="inline-block px-1 text-dark text-xl">VND</span>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Select Category</span>
            <label
              for="category"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <div
                class="text-base w-full focus:outline-none focus:border-transparent"
              >
                {{ category }}
              </div>
              <div
                class="flex w-10 leading-10 items-center justify-center mb-1"
              >
                <span
                  class="inline-bloc w-8 h-8 rounded-full"
                  :class="color"
                ></span>
              </div>
            </label>
            <!-- <div class="border-b border-gray-100"></div> -->
          </div>
          <div class="flex flex-col pb-1 mb-3">
            <span class="pb-1">Note</span>
            <label
              for="note"
              class="flex row justify-between items-center border-b focus-within:border-primary"
            >
              <div
                class="text-base w-full focus:outline-none focus:border-transparent"
              >
                {{ note }}
              </div>
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
              <div
                class="text-base w-full focus:outline-none focus:border-transparent"
              >
                {{ wallet }}
              </div>
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
          @click="isMoreDetails = true"
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
              <div
                class="text-base w-full focus:outline-none focus:border-transparent"
              >
                {{ location }}
              </div>
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
              <div
                class="text-base w-full focus:outline-none focus:border-transparent"
              >
                {{ person }}
              </div>
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
    </div>
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    title: {
      type: Object,
    },
  },
  emits: ["detail"],
  setup(props, ctx) {
    const isMoreDetails = ref(false);
    const total = ref(props.title.total);
    const category = ref(props.title.category);
    const note = ref(props.title.note);
    const date = ref(props.title.date);
    const wallet = ref(props.title.wallet);
    const location = ref(props.title.location);
    const person = ref(props.title.person);
    const color = ref(props.title.color);
    total.value = Math.abs(total.value);

    const updateDetail = () => {
      ctx.emit("detail");
    };

    return {
      isMoreDetails,
      total,
      category,
      note,
      date,
      wallet,
      location,
      person,
      color,
      updateDetail,
    };
  },
};
</script>
