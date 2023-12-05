<template>
  <el-select
    v-model="user"
    :class="['new-bp-select-user-width-full']"
    @change="userAdd"
    placeholder="Выбрать пользователя"
  >
    <el-option
      v-for="item in filled_participants"
      :key="item.id"
      :label="item.full_name"
      :value="item.id"
      :disabled="item.disabled"
    >
    </el-option>
  </el-select>

</template>

<script setup>

import {ref} from "vue";
const props = defineProps({
  filled_participants : Array,
});

const emit = defineEmits([
  'userAdd'
]);

const user       = ref(null);

const userAdd = () => {
  let obj =  props.filled_participants.find(el => el.id == user.value);

  emit('userAdd',obj);
  user.value = null;
};

</script>

<style scoped>

.new-bp-select-user-width-full{
  width: 100%;
}

</style>