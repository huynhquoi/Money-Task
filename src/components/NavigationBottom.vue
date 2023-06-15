<template>
  <footer
    id="footer"
    class="fixed w-full bottom-0 left-0 bg-white pt-4 p-b-safe-4"
  >
    <div class="container mx-auto px-8 h-full">
      <ul class="flex justify-between h-full items-center">
        <li v-for="navItem in navItems" :key="navItem.name">
          <router-link :to="{ name: navItem.name, params: {} }">
            <i class="t2ico text-3xl" :class="navItem.icon"></i>
          </router-link>
        </li>
      </ul>
    </div>

    <div data-circle>
      <div
        class="flex items-center justify-center bg-primary text-white w-14 h-14 rounded-full cursor-pointer font-bold text-xl"
        @click="gotoRoute"
      >
        <i class="t2ico t2ico-plus"></i>
      </div>
    </div>
  </footer>
</template>

<script>
import { reactive } from "vue";
import { NAV_OPTIONS } from "@/constants";
import { useRouter } from "vue-router";

export default {
  setup() {
    const navItems = reactive(NAV_OPTIONS);

    const route = useRouter();

    function gotoRoute() {
      route.push({ name: "transaction", params: {} });
    }

    return { navItems, gotoRoute };
  },
};
</script>

<style scoped>
#footer > div[data-circle],
#footer > div[data-circle] > div {
  @apply absolute;
  left: 50%;
  transform: translateX(-50%);
}
#footer > div[data-circle] {
  background-color: #f8fafb;
  content: "";
  width: 60px;
  height: 30px;
  border-bottom-right-radius: 60px;
  border-bottom-left-radius: 60px;
  top: 0;
}

#footer > div[data-circle] > div {
  content: "\e921";
  font-family: "t2ico";
  top: -28px;
}
</style>
