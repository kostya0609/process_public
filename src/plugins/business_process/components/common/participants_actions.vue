<template>
  <el-card>
    <template #header>
       <div class="new-bp-participants-actions-card-header">
         <span>Действие</span>
         <el-button
           type="primary"
           @click="saveSolution"
           :disabled="(need_comment && !comment) || !action_id"
         >
            Сохранить
         </el-button>
       </div>
    </template>

    <el-select
      v-model="action_id"
      :class="['new-bp-participants-actions-card-width-full', 'new-bp-participants-actions-card-mb-10']"
      placeholder="Решение"
      @change="changeAction"
    >
      <el-option
        v-for="item in actionList"
        :key="item.id"
        :label="item.title"
        :value="item.id"
      >
      </el-option>
    </el-select>

    <el-input
      v-model="comment"
      :class="['new-bp-participants-actions-card-width-full', 'new-bp-participants-actions-card-mb-10']"
      type="textarea"
      rows="5"
      placeholder="Комментарий"
    />

    <upload-file
      :upload_data="upload_data"
    />

  </el-card>

</template>

<script setup>
import {reactive, ref} from "vue";
import uploadFile from "@/plugins/business_process/components/common/upload_file";

const props = defineProps({
  actionList : Array,
});

const emit = defineEmits([
  'saveSolution'
]);
const need_comment = ref(false);

const action_id    = ref(null);
const comment      = ref('');
const upload_data  = reactive({
  list     : [],
  files    : [],
  multiple : true,
});

const changeAction = () => {
  let obj = props.actionList.find(el => el.id == action_id.value);
  if(obj) need_comment.value = obj.is_commentable;
};

const saveSolution = () => {
  emit('saveSolution',action_id.value, comment.value, upload_data);
  action_id.value = null;
  comment.value   = null;
};

</script>

<style scoped>
.new-bp-participants-actions-card-header {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.new-bp-participants-actions-card-width-full{
  width: 100%;
}

.new-bp-participants-actions-card-mb-10{
margin-bottom: 10px;
}

</style>