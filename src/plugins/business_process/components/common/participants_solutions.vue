<template>
  <div>
    <el-table
      :data="solutions_table"
      class="new-bp-participants_solutions-mb-10"
      border
      max-height="600"
      stripe
    >
      <el-table-column
        label="ФИО"
        width="400"
      >
        <template #default="scope">
          <link-user :user="scope.row.user" />
        </template>
      </el-table-column>
      <el-table-column
        prop="action.title"
        label="Решение"
        width="150"
      />
      <el-table-column
        prop="comment"
        label="Комментарий"
      />
      <el-table-column
        prop="files"
        label="Файлы"
      >
        <template #default="scope">
          <div
            v-for="item in scope.row.files"
            :key="item.id"
          >
            <el-link
              target="_blank"
              type="primary"
              :href="item.link"
            >
              {{ item.file_name }}
            </el-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <label>Тип: {{ type.toLowerCase() }}</label>

  </div>
</template>

<script setup>
import linkUser from "@/plugins/business_process/components/common/link_user";

const props = defineProps({
  solutions_table: Array,
  type: String,
});
</script>

<style scoped>.new-bp-participants_solutions-mb-10 {
  margin-bottom: 10px;
}</style>