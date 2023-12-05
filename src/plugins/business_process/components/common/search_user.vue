<template>
  <pre-loader
    :loading="loading"
  >
    <el-select
      v-model="user"
      :class="['new-bp-search-user-width-full']"
      @change="userAdd"
      filterable
      remote
      reserve-keyword
      :remote-method="search"
      placeholder="Выбрать пользователя"
    >
      <el-option
        v-for="item in users_list"
        :key="item.id"
        :label="item.full_name"
        :value="item.id"
      />
    </el-select>
  </pre-loader>

</template>

<script setup>

import preLoader from "@/plugins/business_process/components/common/pre_loader";
import {UserRepo} from "@/plugins/business_process/repositories";
import {ref} from "vue";
const props = defineProps({});

const emit = defineEmits([
  'userAdd'
]);

const loading    = ref(false);
const user       = ref(null);
const users_list = ref([]);

const search     = async(query) => {
  if (!query) return;
  try {
    loading.value = true;

    let result = await UserRepo.search(query);

    if(result) users_list.value = result;

  } catch (e) {
    notify({title : 'Ошибка при выполнении запроса поиска', message : e.message, type : 'error'});
  } finally {
    loading.value = false;
  }
};

const userAdd = () => {
  let obj = users_list.value.find(el => el.id == user.value);

  emit('userAdd', obj);

  users_list.value = [];
  user.value = null;
};

</script>

<style scoped>

.new-bp-search-user-width-full{
  width: 100%;
}

</style>