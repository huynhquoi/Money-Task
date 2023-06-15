<template>
  <div class="mt-8">
    <div class="container mx-auto px-8">
      <!-- Start: Form -->
      <form
        class="flex flex-col space-y-6 justify-start"
        @submit.prevent="onSubmit"
      >
        <div class="row mt-6">
          <label class="flex flex-col" for="fullName">
            <span class="font-semibold">Full Name</span>
            <input
              id="fullName"
              class="px-4 py-3 rounded-lg border border-gray-150 mt-1"
              type="text"
              placeholder="Nguyen Van A"
              v-model="fullName"
            />
          </label>
        </div>

        <div class="row mt-6">
          <label class="flex flex-col" for="email">
            <span class="font-semibold">Email Address</span>
            <input
              id="email"
              class="px-4 py-3 rounded-lg border border-gray-150 mt-1"
              type="email"
              placeholder="nguyenvana@gmail.com"
              autocomplete="username"
              v-model="email"
            />
          </label>
        </div>

        <div class="row mt-6">
          <label class="flex flex-col" for="password">
            <span class="font-semibold">Password</span>
            <input
              id="password"
              class="px-4 py-3 rounded-lg border border-gray-150 mt-1"
              type="password"
              placeholder="Nguyenvana@"
              autocomplete="current-password"
              v-model="password"
            />
          </label>
        </div>

        <div class="row">
          <button
            v-if="!isPending"
            class="py-3 text-center w-full bg-primary text-white font-bold rounded-lg"
            type="submit"
          >
            Sign Up
          </button>
          <button
            v-else
            class="py-3 text-center w-full bg-gray-700 text-white font-bold rounded-lg cursor-not-allowed"
            type="button"
            disabled
          >
            Loading...
          </button>
        </div>
      </form>

      <!-- Start Error -->
      <div v-if="error" class="text-left text-red mt-6">
        <span>{{ error }}</span>
      </div>
      <!-- Start: Direction -->
      <div class="w-full text-center mt-6">
        <span class="font-semibold">I'm already a member.</span>
        <span class="ml-1">
          <router-link
            :to="{ name: 'login', params: {} }"
            class="font-bold text-primary"
            >Sign In</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "@/composables/useUser";
import { useSignUp } from "@/composables/useSignUp";

export default {
  setup() {
    const { error, isPending, signUp, addWallet } = useSignUp();
    const router = useRouter();

    const fullName = ref("");
    const email = ref("");
    const password = ref("");

    async function onSubmit() {
      await signUp(email.value, password.value, fullName.value);

      const { getUser } = useUser();
      const { user } = getUser();

      const wallet = {
        expense: 0,
        income: 0,
        money: 400000,
        name: "My Wallet",
        userId: user.value.uid,
        walletId: "1",
      };
      await addWallet(wallet);
      if (!error.value) router.push({ name: "home", params: {} });
    }
    return { fullName, email, password, error, isPending, onSubmit };
  },
};
</script>
