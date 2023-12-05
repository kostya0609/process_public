<template>
  <div>
    <el-result
      icon="info"
      :title="meeting.name"
    >
      <template #sub-title>
        <p>Статус: {{ meeting.status.toLowerCase() }}</p>
      </template>
      <template #extra>
        <el-button
          type="primary"
          @click="goToProcess"
        >
          Перейти в бизнес-процесс
        </el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup>
import { inject } from 'vue';

defineProps({
  meeting: Object,
});

const goToProcess = inject('goToProcess');

</script>

<style scoped></style>