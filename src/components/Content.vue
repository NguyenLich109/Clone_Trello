<template>
  <div class="scroll-content flex px-[6px] overflow-x-auto">
    <div class="bg-[#f1f2f4] min-w-[272px] w-[272px] mx-[6px] rounded-xl">
      <div class="p-[8px]">
        <input
          class="w-full px-[12px] py-[6px] rounded-md font-semibold text-sm text-[#3e3e3e] bg-[#f1f2f4] hover:bg-slate-200 border-2 border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none"
          v-model="textTitile"
          placeholder="Nhập tiêu đề danh sách..."
        />
        <div class="flex items-center mt-2">
          <button
            @click="handleSubmit"
            class="bg-[#0c66e4] px-[12px] py-[6px] rounded-md font-semibold text-white hover:bg-blue-800"
          >
            Thêm danh sách
          </button>
          <div
            @click="handleClose"
            class="ml-1 p-2 hover:bg-slate-300 rounded-md cursor-pointer"
          >
            <Close class="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-for="(value, index) in works"
      :key="value._id"
      class="flex items-start"
    >
      <FormNote :work="value" :storageWorks="storageWorks" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

import Close from "../assets/icons/Close.vue";
import FormNote from "../module/FormNote.vue";
import { CreateWork } from "@/api/WorkApi";
import { Toast } from "@/utils/Toast";

const { works, storageWorks } = defineProps(["works", "storageWorks"]);
const router = useRouter();

const textTitile = ref<string>("");

const handleSubmit = async () => {
  if (textTitile.value !== "") {
    const { data, error} = await CreateWork({
      idCategory: router.currentRoute.value.params.id,
      title: textTitile.value,
    });
    if(!!data){
      storageWorks.push(data);
      Toast({ status:"success", message:"Thành công", description:"Bạn đã thêm thành công" })
    }
    if(!!error){
      Toast({ status:"error", message:"Thất bại", description:"Danh mục đã hoàn thành hoặc không tồn tại"})
    }
    textTitile.value = "";
  }
};

const handleClose = () => {
  textTitile.value = "";
};
</script>

<style scoped>
.scroll-content::-webkit-scrollbar {
  background-color: #f5f5f530;
}
.scroll-content::-webkit-scrollbar-thumb {
  background-color: #919293;
  border-radius: 8px;
}
</style>
