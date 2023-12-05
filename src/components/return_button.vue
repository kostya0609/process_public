<template>
  <el-button type="primary" @click="goBack">
    Вернуться назад
  </el-button>
</template>
<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

function goBack(){
  router.back(1);


// if(!router.previous){
//     router.push({name:'myProcess'});
//   }else{
//     if (router.previous === 'addProcess' || router.previous === 'editProcess')
//       router.push({name:'allProcess'});
//         else
//           router.back(1);
//   }


};


</script>

<style scoped>

</style>