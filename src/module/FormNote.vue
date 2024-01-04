<template>
  <div class="bg-[#f1f2f4] min-w-[272px] w-[272px] mx-[6px] rounded-xl">
    <div class="p-[8px]">
      <div class="flex items-center">
        <input
          class="w-full px-[12px] py-[6px] rounded-md font-semibold text-sm text-[#4a4a4a] bg-[#f1f2f4] border-2 border-transparent focus:border-blue-500 focus:outline-none"
          v-model="work.title"
          @change="handleChange"
        />
        <Showdown>
          <template #shot-title>
            <Menu class="h-3.5 w-3.5 cursor-pointer mx-2" />
          </template>
          <template #default>
            <a-menu @click="handleClick">
              <a-menu-item key="1" :value_key="work._id" class="text-center">
                <span>Hoàn thành</span>
              </a-menu-item>
              <a-menu-item key="2" :value_key="work._id" class="text-center">
                <span>Xóa</span>
              </a-menu-item>
            </a-menu>
          </template>
        </Showdown>
      </div>
      <div v-for="(note, index) in work.tasks" :key="note._id">
        <div class="relative">
          <textarea
            v-model="note.content"
            rows="3"
            cols="50"
            class="text-black w-full p-2 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none resize-none"
            :class="{ 'line-through !text-[#ada8a8]': note.isComplete }"
            @change="handleChangeChildTask(note)"
          ></textarea>
          <Showdown>
            <template #shot-title>
              <div
                class="absolute p-2 rounded-full hover:bg-slate-200 z-50 top-1 right-1 cursor-pointer"
              >
                <Pen class="h-4 w-4" />
              </div>
            </template>
            <template #default>
              <a-menu @click="handleTaskChild" class="top-[-3rem]">
                <a-menu-item key="1" :value_key="note._id" class="text-center">
                  <span v-if="!note.isComplete">Hoàn thành</span>
                  <span v-else>Hủy bỏ</span>
                </a-menu-item>
                <a-menu-item key="2" :value_key="note._id" class="text-center">
                  <span>Xóa</span>
                </a-menu-item>
              </a-menu>
            </template>
          </Showdown>
        </div>
      </div>
      <div v-if="checkOpen">
        <textarea
          v-model="textContent"
          placeholder="Vui lòng nhập tiêu đề..."
          rows="3"
          cols="50"
          class="text-black w-full p-2 rounded-lg border-2 border-transparent focus:border-blue-500 focus:outline-none resize-none"
        ></textarea>
      </div>
      <div class="flex items-center mt-2">
        <button
          @click="handleOpen"
          class="bg-[#f1f2f4] px-[12px] py-[6px] rounded-md font-semibold text-[#4a4a4a] hover:bg-slate-300 flex items-center flex-1"
        >
          <Plus class="h-3 w-3 mr-2" />
          Thêm thẻ
        </button>
        <div
          @click="handleSubmit"
          class="ml-1 p-2 hover:bg-slate-200 rounded-md cursor-pointer"
        >
          <Sample class="h-4 w-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import Plus from "../assets/icons/Plus.vue";
import Menu from "../assets/icons/Menu.vue";
import Sample from "../assets/icons/Sample.vue";
import Pen from "../assets/icons/Pen.vue";
import Showdown from "./Showdown.vue";
import { updateWork, deleteWork, createTask, toggleContentTask,completeAllTask,deleteTaskChild, updateContentTask } from "@/api/WorkApi";
import { Toast } from "@/utils/Toast";
import type { typeTask, typeWork } from "@/types";

const { work, storageWorks } = defineProps(["work", "storageWorks"]);

const textTitle = ref<string>(work.title);
const textContent = ref<string>("");

const checkOpen = ref<boolean>(false);

const handleOpen = () => {
  checkOpen.value = !checkOpen.value;
};

const handleClick = async (e: any) => {
  //Hoàn thành
  if (e.key === "1") {
    console.log(storageWorks);
  }
  //Hủy bỏ
  if (e.key === "2") {
    const { data, error } = await deleteWork({ id: e.item.value_key });
    if (!!data) {
      Toast({
        status: "success",
        message: "Thành công",
        description: "Đã xóa thành công",
      });
      for (let i = 0; i < storageWorks.length; i++) {
        if (storageWorks[i]._id === e.item.value_key) {
          storageWorks.splice(i, 1);
          break;
        }
      }
    }
    if (!!error) {
      Toast({
        status: "error",
        message: "Thất bại",
        description: "Xóa thất bại",
      });
    }
  }
};

const handleTaskChild = async (e: any) => {
   //Hoàn thành
   if (e.key === "1") {
    const {data, error} = await toggleContentTask({id:work._id, idTaskChild:e.item.value_key})
    if(!!data){
      const index = storageWorks.findIndex((value: typeWork) => value._id === work._id)
      storageWorks[index] = data;
      Toast({
        status: "success",
        message: "Thành công",
        description: "Trạng thái đã được thay đổi",
      });
    }
    if (!!error) {
      Toast({
        status: "error",
        message: "Thất bại",
        description: "Trạng thái chưa được thay đổi",
      });
    }
  }

  // Xóa
  if(e.key === "2"){
    const {data, error} = await deleteTaskChild({id:work._id, idTaskChild:e.item.value_key})
    if(!!data){
      const index = storageWorks.findIndex((value: typeWork) => value._id === work._id)
      storageWorks[index] = data;
      Toast({
        status: "success",
        message: "Thành công",
        description: "Đã xóa thành công",
      });
    }
    if (!!error) {
      Toast({
        status: "error",
        message: "Thất bại",
        description: "Xóa thất bại",
      });
    }
  }
}
// Thay đổi task Child
const handleChangeChildTask = async (value:typeTask) => {
  const { data, error } = await updateContentTask({ id: work._id, content:value.content, idTaskChild: value._id});
  if (!!data) {
    Toast({
      status: "success",
      message: "Thành công",
      description: "Bạn đã cập nhật thành công",
    });
  }
  if (!!error) {
    Toast({
      status: "error",
      message: "Thất bại",
      description: "Bạn cập nhật không thành công",
    });
  }
};

//Thay đổi title
const handleChange = async () => {
  const { data, error } = await updateWork({ id: work._id, title: work.title });
  if (!!data) {
    Toast({
      status: "success",
      message: "Thành công",
      description: "Bạn đã cập nhật thành công",
    });
  }
  if (!!error) {
    Toast({
      status: "error",
      message: "Thất bại",
      description: "Bạn cập nhật không thành công",
    });
    work.title = textTitle.value;
  }
};

// create các công việc con
const handleSubmit = async () => {
  if (textContent.value !== "") {
    const { data } = await createTask({
      id: work._id,
      content: textContent.value,
    });
    if (!!data) {
     const index = storageWorks.findIndex((value: typeWork) => value._id === work._id)
      storageWorks[index] = data;
    }
    checkOpen.value = false;
    textContent.value = ""
  }
};
</script>
