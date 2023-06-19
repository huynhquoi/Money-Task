<template>
  <div class="full-page mb-20" v-if="user">
    <!-- Start: infor -->

    <div class="row">
      <div class="container mx-auto p-8">
        <div class="text-center">
          <div class="w-24 h-24 rounded-full overflow-hidden mx-auto">
            <img
              class="w-full h-auto object-cover"
              src="../assets/images/avatar.png"
              sizes="xs"
              alt="User's image"
            />
          </div>
          <div class="font-bold text-2xl text-primary mt-3">
            {{ user.displayName }}
          </div>
          <p class="font-semibold text-gray-400 mt-1">
            {{ user.email }}
          </p>
        </div>
      </div>
    </div>

    <!-- Start: menu -->

    <div class="row">
      <div class="container mx-auto px-8">
        <!-- title -->
        <div class="grid grid-cols-1">
          <div class="col-span-1">
            <h3 class="font-bold text-xl text-primary mb-2">General</h3>
          </div>
        </div>
        <!-- menu -->
        <div class="grid grid-cols-1">
          <div class="col-span-1">
            <ul class="text-dark">
              <li
                v-for="(profileOption, index) in profileOptions"
                :key="profileOption.name"
              >
                <router-link
                  :to="profileOption.route"
                  class="flex justify-between items-center py-3"
                >
                  <div
                    class="flex items-center text-left"
                    :class="{ 'text-red': index === profileOptions.length - 1 }"
                  >
                    <i class="t2ico text-2xl" :class="profileOption.icon"></i>
                    <h5 class="font-semibold ml-3">{{ profileOption.name }}</h5>
                  </div>
                  <div
                    class="text-right"
                    :class="{ 'text-red': index === profileOptions.length - 1 }"
                  >
                    <i class="t2ico t2ico-arrow-right text-2xl"></i>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="full-page flex justify-center items-center h-96" v-else>
    Loading...
  </div>
</template>

<script>
import { useUser } from "@/composables/useUser";
import { reactive } from "vue";
import { PROFILE_OPTIONS } from "@/constants";

export default {
  setup() {
    const { getUser } = useUser();
    const { user } = getUser();

    const profileOptions = reactive(PROFILE_OPTIONS);

    return { user, profileOptions };
  },
};
</script>
