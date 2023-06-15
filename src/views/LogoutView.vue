<template>
  <div>Logout Page</div>
</template>

<script>
import { useRouter } from "vue-router";
import { useLogout } from "@/composables/useLogout";

export default {
  setup() {
    const route = useRouter();
    const { error, logout } = useLogout();

    async function onLogout() {
      logout();
      if (!error.value) {
        route.push({ name: "login", params: {} });
      }
    }

    onLogout();

    return {};
  },
};
</script>
