<template>
  <div>
    <Plus
      @click="toggleOpenModal"
      class="h-[0.8rem] w-[0.8rem] cursor-pointer ml-4"
    />
    <a-modal v-model:open="open" title="Tạo bảng" @cancel="handleCancel" footer>
      <a-form
        ref="myForm"
        :model="formState"
        @submit.prevent="$emit('SubmitModal', formState)"
      >
        <a-form-item label="Phông nền" name="url">
          <a-radio-group
            v-model:value="formState.url"
            class="flex items-center"
          >
            <a-radio value="image-1.jpg"
              ><img src="@/assets/image/image-1.jpg" class="h-10 w-10"
            /></a-radio>
            <a-radio value="image-2.jpg"
              ><img src="@/assets/image/image-2.jpg" class="h-10 w-10"
            /></a-radio>
            <a-radio value="image-3.jpg"
              ><img src="@/assets/image/image-3.jpg" class="h-10 w-10"
            /></a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="Tiêu đề"
          name="title"
          :rules="[
            {
              required: true,
              message: 'Vui lòng điền tiêu đề',
            },
          ]"
        >
          <a-input v-model:value="formState.title" />
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 0, span: 8 }">
          <a-button html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import Plus from "@/assets/icons/Plus.vue";

defineProps(["formState"]);
defineEmits(["SubmitModal"]);

const open = ref<boolean>(false);
const myForm = ref<any>(null);

const handleCancel = () => {
  myForm.value.resetFields();
};

const toggleOpenModal = () => {
  open.value = !open.value;
};
</script>
