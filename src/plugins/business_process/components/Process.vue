<template>
  <created-process
    :process="activeProcess.process"
    v-if="activeProcess.type === ACTIVE_PROCESS_TYPE.CREATED"
  />
  <completed-process
    :completed-process="activeProcess.process"
    v-else-if="activeProcess.type === ACTIVE_PROCESS_TYPE.COMPLETED"
  />
  <not-created-process v-else-if="activeProcess.type === ACTIVE_PROCESS_TYPE.NOT_CREATED" />
  <el-alert
    type="warning"
    v-else
  >
    Неверный тип процесса!
  </el-alert>
</template>
<script setup>
import { inject, provide, ref } from "vue";
import CreatedProcess from './CreatedProcess';
import CompletedProcess from './CompletedProcess';
import NotCreatedProcess from './NotCreatedProcess';
import { ProcessRepo } from "@/plugins/business_process/repositories";
import { ACTIVE_PROCESS_TYPE } from '@/plugins/business_process/constants';

const user_id = inject('_business_process_user_id');

const props = defineProps({
  document_id: Number,
  template_id: Number,
});

const emit = defineEmits([
  'runned',
  'cancellation',
  'decided',
  'completed',
]);

const activeProcess = ref(null);

const setActiveProcess = process => {
  activeProcess.value = process;
}

const process = await ProcessRepo.get({
  template_id: props.template_id,
  document_id: props.document_id,
  user_id,
});

setActiveProcess(process);

provide('setActiveProcess', setActiveProcess);
provide('emit', emit);
</script>