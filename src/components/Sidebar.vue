<template>
  <div>
  <div
  v-if="!toggleSidebar"
    class="min-w-[272px] w-[272px] min-h-[calc(100vh-56px)] bg-stone-200 opacity-[0.94] rounded-tr-lg"
  >
    <div
      class="flex justify-between items-center px-2 py-2 border-b rounded-tr-lg"
    >
      <span
        class="bg-[linear-gradient(#6e5dc6,#0c66e4)] h-8 w-8 text-center text-xl text-white font-semibold rounded-md"
        >N</span
      >
      <div class="ml-2">
        <p class="text-md font-semibold text-black">Không gian làm việc NotePad</p>
        <p class="text-[0.8rem] text-black">Miễn phí</p>
      </div>
      <span @click="handleToggleSidebar" class="cursor-pointer"><AngleVue class="h-4 w-4" /></span>
    </div>
    <div class="pt-2 relative">
      <div class="flex justify-between items-center px-2">
        <h1 class="text-sm font-semibold pb-2 text-black">Các bảng của bạn</h1>
        <span class="flex items-center text-xl">
          <MenuVue class="h-4 w-4 cursor-pointer mr-4" />
          <Modal :formState="formState" @SubmitModal="SubmitModal"></Modal>
        </span>
      </div>
      <Loading v-if="loading" class="flex justify-center py-3" />
      <div v-for="(value, index) in categoryStorage" :key="value._id">
        <router-link :to="'/' + value._id + '?url=' + value.url">
          <div
            class="flex justify-between items-center py-2 relative px-2"
            :class="{
              'bg-[#c8c8c8]': value._id === router.currentRoute.value.params.id,
              'bg-[#a2c3f1]': value.complete,
            }"
          >
            <span class="flex justify-start items-center">
              <img
                :src="value.url"
                class="h-8 w-8 rounded-md"
              />
              <p class="text-sm px-2 text-black">{{ value.title }}</p>
            </span>
            <Showdown>
              <template #shot-title>
                <MenuVue class="h-[0.8rem] w-[0.8rem] cursor-pointer" />
              </template>
              <template #default>
                <a-menu @click="handleClick">
                  <a-menu-item
                    key="0"
                    :value_key="value._id"
                    class="text-center"
                  >
                    <span>Hoàn thành</span>
                  </a-menu-item>
                  <a-menu-item
                    key="1"
                    :value_key="value._id"
                    class="text-center"
                  >
                    <span>Xóa</span>
                  </a-menu-item>
                </a-menu>
              </template>
            </Showdown>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else @click="handleToggleSidebar" class="p-2 rounded-lg bg-slate-300 mx-2 cursor-pointer fixed">
    <AngleVue class="h-4 w-4" />
  </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watchEffect } from "vue";
import { useRouter } from "vue-router";

import type { typeFormCategory } from "@/types";
import MenuVue from "../assets/icons/Menu.vue";
import AngleVue from "../assets/icons/Angle.vue";
import {
  GetCategory,
  postCategory,
  updateSuccessCategory,
} from "@/api/CategoryApi";

import Showdown from "@/module/Showdown.vue";
import Modal from "../module/Modal.vue";
import { deleteCategory } from "@/api/CategoryApi";
import { Toast } from "@/utils/Toast";
import Loading from "./Loading.vue";

const router = useRouter();

const formState = reactive<typeFormCategory>({
  url: "image-1.jpg",
  title: "",
});

const categoryStorage = ref<typeFormCategory[]>([]);
const loading = ref<boolean>(false);
const toggleSidebar = ref<boolean>(false)

// bật tắt sidebar
const handleToggleSidebar = () => {
  toggleSidebar.value = !toggleSidebar.value
}

const SubmitModal = async () => {
  if (formState.title !== "" && formState.url !== "") {
    const { data } = await postCategory({
      title: formState.title,
      url: formState.url,
    });
    categoryStorage.value.push(data);
  }
};

const handleClick = async (e: any) => {
  //hủy bỏ
  if (e.key === "1") {
    const { data } = await deleteCategory(e.item.value_key);
    if (!!data && !!data.success) {
      Toast({
        status: "success",
        message: "Thành công",
        description: "Đã xóa danh mục thành công",
      });
      categoryStorage.value = categoryStorage.value.filter(
        (value) => value._id !== e.item.value_key
      );
      router.push("/");
    }
  }
  // hoàn thành
  if (e.key === "0") {
    const { data, error } = await updateSuccessCategory(e.item.value_key);
    if (!!data && !!data.success) {
      Toast({
        status: "success",
        message: "Thành công",
        description: "Bạn đã cập nhật thành công",
      });
      const search = categoryStorage.value.find(
        (value) => value._id === e.item.value_key
      );
      if (!!search) {
        search.complete = true;
      }
    }
  }
};

watchEffect(() => {
  categoryStorage.value.sort((a, b) =>
      !a.complete && b.complete ? -1 : a.complete && !b.complete ? 1 : 0
    );
})

onMounted(async () => {
  loading.value = true;
  const { data } = await GetCategory();
  if (!!data) {
    loading.value = false;
    categoryStorage.value = !!data
      ? data.sort((a: typeFormCategory) => (a.complete ? 1 : -1))
      : [];
  }
});
</script>
