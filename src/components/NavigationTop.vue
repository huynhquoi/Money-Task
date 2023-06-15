<template>
  <header id="header" class="py-8 fixed top-0 left-0 w-full z-10">
    <div class="container mx-auto px-8">
      <div class="flex justify-between items-center">
        <div class="flex items-center">
          <div
            v-if="meta.leading === true"
            class="w-10 h-10 rounded-full overflow-hidden mx-auto mr-3"
          >
            <img
              class="w-full h-auto object-cover"
              src="../assets/images/avatar.png"
              sizes="xs"
              alt="User's image"
            />
          </div>
          <h1 v-if="meta.leading === true" class="text-xl font-bold text-dark">
            {{ meta.text }} {{ user.displayName }}
          </h1>
          <h1 v-else class="text-xl font-bold text-dark">
            {{ meta.text }}
          </h1>
        </div>
        <div class="flex">
          <ul>
            <li>
              <i class="t2ico t2ico-notification text-2xl"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
  <div class="mb-24"></div>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUser } from "@/composables/useUser";

export default {
  setup() {
    const route = useRoute();
    const { getUser } = useUser();
    const { user } = getUser();

    return {
      meta: computed(() => route.meta),
      user,
    };
  },
};
</script>

<style>
#header {
  background-color: #f8fafb;
}
</style>
