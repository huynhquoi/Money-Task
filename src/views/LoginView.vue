<template>
  <div class="mt-8 mb-20">
    <div class="container mx-auto px-8">
      <!-- Start: Form -->
      <form
        class="flex flex-col space-y-6 justify-start"
        @submit.prevent="onSubmit"
      >
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
            Sign In
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
        <span class="font-semibold">Don't have account?</span>
        <span class="ml-1">
          <router-link
            :to="{ name: 'register', params: {} }"
            class="font-bold text-primary"
            >Sign Up</router-link
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useSignIn } from "@/composables/useSignIn";

export default {
  setup() {
    const { error, isPending, signIn } = useSignIn();

    const email = ref("");
    const password = ref("");
    const router = useRouter();

    async function onSubmit() {
      await signIn(email.value, password.value);
      if (!error.value) router.push({ name: "home", params: {} });
    }
    return { email, password, error, isPending, onSubmit };
  },
};
</script>
