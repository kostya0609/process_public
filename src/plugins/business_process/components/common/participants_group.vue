<template>
  <pre-loader :loading="loading">
    <el-row :gutter="20">
      <el-col :md="10">
        <search-user
          v-if="group.type_fill_id == FILL_TYPES.ANY"
          @userAdd="userAdd"
        />

        <select-user
          v-if="group.type_fill_id == FILL_TYPES.SELECT_FROM_LIST"
          :filled_participants="filled_participants"
          @userAdd="userAdd"
        />
      </el-col>

      <el-col :md="14">
        <users-table
          :group_id="group.id"
          :participants="groups[group.id]"
          :type="type"
          @userDelete="userDelete"
          @userReturn="userReturn"
        >
        </users-table>
      </el-col>
    </el-row>
  </pre-loader>
</template>

<script setup>
import { inject, ref } from "vue";
import { ParticipantRepo } from "@/plugins/business_process/repositories";
import preLoader from "@/plugins/business_process/components/common/pre_loader";
import searchUser from "@/plugins/business_process/components/common/search_user";
import selectUser from "@/plugins/business_process/components/common/select_user";
import usersTable from "@/plugins/business_process/components/common/users_table";

const props = defineProps({
  group: Object,
  process_id: Number,
  type: String,
});

const groups = inject('groups');
const notify = inject('_business_process_notify');
const user_id = inject('_business_process_user_id');

const loading = ref(false);

const filled_participants = ref([]);
filled_participants.value = props.group.filled_participants;

const FILL_TYPES = {
  ANY: 1,
  SELECT_FROM_LIST: 2
}

const userAdd = async (user) => {
  let existing = groups[props.group.id].find(el => el.user.id == user.id);

  if (!existing) {
    try {
      loading.value = true;
      let result = await ParticipantRepo.attach({
        process_id: props.process_id,
        group_id: props.group.id,
        user_id: user.id,//это не текущий пользователь портала, а кондитат в участники процесса
      });

      if (result.success) {

        groups[props.group.id].push({ can_deletable: true, user });

        if (props.group.type_fill_id == FILL_TYPES.SELECT_FROM_LIST) {
          let participant = filled_participants.value.find(el => el.id == user.id);
          if (participant) participant.disabled = true; else console.log('Ошибка, учстник согласования не найден');
        }

      };

    } catch (e) {
      notify({ title: 'Ошибка при выполнении запроса на добавление участника в бизнес процесс', message: e.message, type: 'error', duration: 5000 });
    } finally {
      loading.value = false;
    }

  }
  else
    notify({ title: 'Ошибка добавления пользователя', message: 'Выбранный пользватель уже был добавлен', type: 'error' });
};

const userDelete = async (user_id) => {
  try {
    loading.value = true;
    let result = await ParticipantRepo.detach({
      process_id: props.process_id,
      group_id: props.group.id,
      user_id,//это не текущий пользователь портала а кондитат в участники процесса
    });

    if (result.success) {
      //groups[props.group.id] = groups[props.group.id].filter(el => el.user.id !== user_id);

      let obj = groups[props.group.id].find(el => el.user.id == user_id);
      if (obj) obj.user.deleted = true;

      if (props.group.type_fill_id == FILL_TYPES.SELECT_FROM_LIST) {
        let participant = filled_participants.value.find(el => el.id == user_id);
        if (participant) participant.disabled = false; else console.log('Ошибка, учстник согласования не найден');
      }

    };

  } catch (e) {
    notify({ title: 'Ошибка при выполнении запроса на удаление участника из бизнес процесса', message: e.message, type: 'error', duration: 5000 });
    throw e;
  } finally {
    loading.value = false;
  }
};

const userReturn = async (user_id) => {
  try {
    loading.value = true;
    let result = await ParticipantRepo.attach({
      process_id: props.process_id,
      group_id: props.group.id,
      user_id,//это не текущий пользователь портала а кондитат в участники процесса
    });

    if (result.success) {
      let obj = groups[props.group.id].find(el => el.user.id == user_id);
      if (obj) obj.user.deleted = false;
    };

  } catch (e) {
    notify({ title: 'Ошибка при выполнении запроса на возвращение участника в бизнес процесс', message: e.message, type: 'error', duration: 5000 });
  } finally {
    loading.value = false;
  }


};

</script>

<style scoped></style>