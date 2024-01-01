<template>
  <a-dropdown :trigger="['click']">
    <a class="ant-dropdown-link" @click.prevent>
      <slot name="shot-title"></slot>
    </a>
    <template #overlay>
        <slot></slot>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>

</script>
