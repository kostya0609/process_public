<template>
  <div
    v-if="upload_data.multiple"
    class="new-bp-upload_file_container"
  >
    <el-upload
      v-model:file-list="upload_data.list"
      action=""
      multiple
      :auto-upload="false"
      :on-change="changeFile"
      :on-remove="deleteBth"
      drag
    >
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        Перенеситесюда файлы или <em>кликните для выбора</em>
      </div>
    </el-upload>
  </div>
</template>

<script setup>


import { inject, ref } from "vue";
const props = defineProps({
  upload_data: Object,
});

const notify = inject('_business_process_notify');

const upload = ref();

const uploadBtn = (files) => {
  upload.value.clearFiles();
  const new_file = files[0];
  new_file.uid = genFileId();
  upload.value.handleStart(new_file);
};

const deleteBth = (file) => {
  if (props.upload_data.multiple) {
    props.upload_data.files = props.upload_data.files.filter(el => el.name !== file.name);
  } else {
    props.upload_data.list.length = 0;
    props.upload_data.files.length = 0;
  }
};

const changeFile = (file) => {

  if (props.upload_data.multiple) {
    let newFilName = file.name;

    let err_there_is_file = !!props.upload_data.files.find(item =>
      newFilName === item.name
    );
    if (!err_there_is_file) {
      props.upload_data.files.push(file);
    } else {
      notify({ title: 'Ошибка добавления дополнительного файла', message: 'Файл с таким именем уже существует.', type: 'error', duration: 5000 });
      setTimeout(() => { props.upload_data.list.splice(props.upload_data.list.length - 1, 1) }, 0);
    };

  } else {
    props.upload_data.files.push(file);
  }

}

</script>

<style scoped>
.new-bp-upload_file_container {
  padding: 10px 10px 0 10px;
  border-width: 1px;
}
</style>