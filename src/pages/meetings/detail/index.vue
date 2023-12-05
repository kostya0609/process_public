<template>
  <pre-loader
    :loading="loading"
    class="meeting-add"
  >
    <el-tabs
      type="border-card"
      v-model="page"
    >

      <el-tab-pane
        label="Инфо о встречи"
        name="info"
      >
        <info v-model:meeting="meeting" />
      </el-tab-pane>

      <el-tab-pane
        label="Бизнес процесс"
        name="process"
      >
        <Process
          :document_id="+route.params.id"
          :template_id="10"
          @runned="onRunned"
          @cancellation="onCancellation"
          @decided="onDecided"
          @completed="onCompleted"
        />
      </el-tab-pane>

      <el-tab-pane
        label="История"
        name="history"
      >
        <History :history="meeting.history" />
      </el-tab-pane>
    </el-tabs>

  </pre-loader>
</template>

<script setup>
import { ref, reactive, inject, provide } from "vue";
import { useRoute } from 'vue-router';
import preLoader from "@/components/pre_loader";
import info from "@/pages/meetings/detail/components/info";
import History from "@/pages/meetings/detail/components/history";

import { MeetingRepo } from "@/repositories";

const route = useRoute();

const loading = ref(false);
const user = inject('user');
const notify = inject('notify');
const updateNeedActionCount = inject('updateNeedActionCount');

const meeting = reactive({
  id: '',
  name: '',
  date_start: '',
  date_stop: '',
  status: '',
  status_eng: '',
  history: [],
});

const page = ref('info');

const getData = async () => {
  try {
    loading.value = true;
    const result = await MeetingRepo.get({
      meeting_id: route.params.id,
      user_id: user.id,
    });

    meeting.id = result.id;
    meeting.name = result.name;
    meeting.date_start = result.date_start;
    meeting.date_stop = result.date_stop;
    meeting.status = result.status
    meeting.status_eng = result.status_eng;
    meeting.history = result.history;

  } catch (e) {
    notify({ title: 'Ошибка при выполнении запроса получения информации о встрече', message: e.message, type: 'error', duration: 5000 });
    throw e;
  } finally {
    loading.value = false;
  }

};
await getData();

const onRunned = async () => {
  await getData();
  await updateNeedActionCount();
};

const onCancellation = async () => {
  await getData();
  await updateNeedActionCount();
};

const onDecided = async () => {
  await getData();
  await updateNeedActionCount();
};

const onCompleted = async () => {
  await getData();
  await updateNeedActionCount();
};

provide('goToProcess', () => {
  page.value = 'process';
});

</script>

<style scoped></style>