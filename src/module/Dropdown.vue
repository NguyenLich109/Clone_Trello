<template>
  <div
    class="absolute w-[120px] bg-slate-100 top-[5%] right-[-50%] z-50 rounded-lg border border-slate-400"
  >
    <ul>
      <li
      @click="$emit('handleStatusSuccess', value)"
        class="p-2 hover:bg-slate-200 cursor:pointer font-semibold text-center rounded-t-lg cursor-pointer text-sm"
      >
        Hoàn thành
      </li>
      <li
      @click="$emit('handleStatusDelete',value)"
        class="p-2 hover:bg-slate-200 cursor:pointer font-semibold text-center rounded-b-lg cursor-pointer text-sm"
      >
        Hủy bỏ
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['handleStatusSuccess','handleStatusDelete'])
defineProps(['value'])

</script>
