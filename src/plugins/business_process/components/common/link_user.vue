<template>
  <div class="new-bp-user-link">
   <span class="new-bp-userPhoto new-bp-photoTable">
     <img :src="user.photo"/>
   </span>
    <el-link :href="user.link" target="blank" :underline="false" :class="{'new-bp-user_table_line_through' : user.deleted}">
      {{user.full_name}}
    </el-link>
  </div>
</template>

<script setup>
defineProps({
  user: {
    type: Object,
  }
});

</script>

<style scoped>
.new-bp-user-link{
  display: grid;
  grid-template-columns: 30px 1fr;
  gap: 5px;
  justify-items: start;
}

span.new-bp-userPhoto {
  border-radius: 50%;
  overflow: hidden;
  display: block;
  width: 200px;
  height: 200px;
}

span.new-bp-userPhoto.new-bp-photoTable{
  width: 30px;
  height: 30px;
}

.new-bp-user_table_line_through{
  text-decoration: line-through;
}

</style>