<template>
  <navigation-top />
  <slot />
  <navigation-bottom />
</template>

<script>
import NavigationBottom from "@/components/NavigationBottom.vue";
import NavigationTop from "@/components/NavigationTop.vue";
export default {
  components: {
    NavigationBottom,
    NavigationTop,
  },
};
</script>
