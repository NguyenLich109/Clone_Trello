<template>
  <a-spin :indicator="indicator" />
</template>
<script lang="ts" setup>
import { LoadingOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "28px",
  },
  spin: true,
});
</script>
