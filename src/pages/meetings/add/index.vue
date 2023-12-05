<template>
    <pre-loader
        :loading="loading"
        class="meeting-add"
    >
      <el-row class="mb-2" :gutter="10">
        <el-col :md=6>
          <label class="block mb-1">Название</label>
          <el-input
              v-model="meeting.name"
              placeholder="Введите название"
          />
        </el-col>
      </el-row>

      <el-row class="mb-2" :gutter="10">
        <el-col :md=6>
          <label class="block mb-1">Дата начала</label>
          <el-date-picker
              v-model="meeting.date_start"
              class="!w-full"
              type="date"
              format="DD.MM.YYYY"
              valueFormat="DD.MM.YYYY"
              placeholder="Выберите дату"
          >
          </el-date-picker>

        </el-col>
        <el-col :md=6>
          <label class="block mb-1">Дата окончания</label>
          <el-date-picker
              v-model="meeting.date_stop"
              class="!w-full"
              type="date"
              format="DD.MM.YYYY"
              valueFormat="DD.MM.YYYY"
              placeholder="Выберите дату"
          >
          </el-date-picker>

        </el-col>
      </el-row>

      <el-button
        class="mt-2"
        type="primary"
        @click="saveMeeting"

      >
        Сохранить
      </el-button>

    </pre-loader>
</template>

<script setup>
import {ref, reactive, inject, watchEffect, watch, computed} from "vue";
import { useRouter, useRoute } from 'vue-router';
import preLoader from "@/components/pre_loader";
import {MeetingRepo} from "@/repositories";

const router              = useRouter();
const route               = useRoute();

const loading             = ref(false);
const user                = inject('user');
const notify              = inject('notify')

const meeting             = reactive({
    name       : 'Тестовая',
    date_start : '',
    date_stop  : ''
})

const saveMeeting = async() => {
  if(!meeting.name || !meeting.date_start || !meeting.date_stop) {
    notify({title : 'Создание встречи', message : 'Заполните все поля', type : 'error', duration : 5000});
    return
  }

  try {
    loading.value = true;
    let result = await MeetingRepo.add({
      user_id    : user.id,
      ...meeting
    });

    if(result.success){
      notify({title : 'Встреча создана', message : '', type : 'success', duration : 1000});
      router.push({name:'listMeetings'});
    };

  } catch (e) {
    notify({title : 'Ошибка при выполнении запроса создание встречи', message :e.message, type : 'error', duration : 5000});
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>

</style>