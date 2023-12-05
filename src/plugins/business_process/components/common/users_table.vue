<template>
  <el-card shadow="never">
    <template #header>
      <div class="new-bp-user_table_card-header">
        <span>Участники</span>
        <span>Тип: {{ type.toLowerCase() }}</span>
      </div>
    </template>
    <div
      v-for="participant in participants"
      :key="participant.user.id"
      class="new-bp-user_table_row"
    >
      <label v-if="participant.user.deleted" class="new-bp-user_table_delete_label">Удален</label>
      <link-user :user="participant.user"/>

      <el-icon
        v-if="participant.can_deletable && !participant.user.deleted"
        class="new-bp-user_table_action"
        @click="emit('userDelete', participant.user.id)"
      >
        <Close />
      </el-icon>
      <el-icon
        v-if="participant.can_deletable && participant.user.deleted"
        class="new-bp-user_table_action"
        @click="emit('userReturn', participant.user.id)"
      >
        <RefreshLeft />
      </el-icon>

    </div>
  </el-card>
</template>

<script setup>
import linkUser from "@/plugins/business_process/components/common/link_user";
const props = defineProps({
  type         : String,
  participants : Array,
  group_id     : Number,
});

const emit = defineEmits([
  'userDelete', 'userReturn'
]);

</script>

<style scoped>
.new-bp-user_table_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.new-bp-user_table_row{
  display: flex;
  align-items: center;
}

.new-bp-user_table_action{
  cursor: pointer;
  padding: 0 10px;
}
.new-bp-user_table_action:hover{
  color: #3bc8f5;
}
.new-bp-user_table_delete_label{
  font-weight: bold;
  color: red;
  margin-right: 5px;
}
</style>