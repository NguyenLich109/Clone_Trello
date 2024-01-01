<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";

import type { typeWork } from "@/types";
import Sidebar from "./Sidebar.vue";
import Content from "./Content.vue";
import { GetWork } from "@/api/WorkApi";

const router = useRouter();
const works = ref<typeWork[]>([]);
const storageWorks = ref<typeWork[]>([]);
const params = computed(() => router.currentRoute.value.params.id);
const url = computed(() => router.currentRoute.value.query.url);

watch(params, async (newParams, oldParmas) => {
  if (newParams !== "undefined") {
    const filter = storageWorks.value.filter(
      (work: typeWork) => work.idCategory === newParams
    );
    if (!!filter[0]) {
      works.value = filter;
    } else {
      const { data } = await GetWork(newParams);
      if (!!data) {
        works.value = data;
        storageWorks.value.push(...data);
      }
    }
  }
});

watchEffect(() => {
  const filter = storageWorks.value.filter(
    (work: typeWork) => work.idCategory === router.currentRoute.value.params.id
  );
  works.value = !!filter[0] ? filter : [];
});

onMounted(async () => {
  if (router.currentRoute.value.params.id !== "undefined") {
    const { data } = await GetWork(router.currentRoute.value.params.id);
    if (!!data) {
      works.value = data;
      storageWorks.value.push(...data);
    }
  }
});
</script>

<template>
  <div
    class="bg-cover bg-no-repeat bg-center"
    :style="{ backgroundImage: `url(${url})` }"
  >
    <div class="h-[56px] text-xl font-semibold leading-[56px] px-4">
      <div class="flex items-center">
        <img src="../assets/image/Trello_loglo.png" alt="" class="h-10 w-10" />
        <span class="text-white font-semibold pl-2">Notes</span>
      </div>
    </div>
    <div class="flex">
      <Sidebar />
      <Content
        :works="works"
        :storageWorks="storageWorks"
        class="flex-1 content py-3"
      />
    </div>
  </div>
</template>

<style scoped>
.content {
  align-items: flex-start;
}
</style>
