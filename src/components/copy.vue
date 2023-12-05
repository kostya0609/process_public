<template>
  <slot/>
  &nbsp;
  <span>
    <el-tooltip
      v-if="!copied"
      effect="dark"
      :content="'Скопировать'"
      placement="top"
    >
      <el-icon size="10" @click.stop="copy" style="cursor: pointer"><CopyDocument /></el-icon>
    </el-tooltip>

    <el-icon v-if="copied" size="10" class=""><Check /></el-icon>
  </span>
</template>

<script setup>
import {ref} from "vue";
import {useSlots} from 'vue'

const slots    = useSlots()

const copied   = ref(false);

const copy     = () => {
  copied.value = true;
  navigator.clipboard.writeText(
      slots.default()[0].children.toString()
  );
  setTimeout(() => {copied.value = false}, 1000);
};

</script>

<style scoped>

</style>