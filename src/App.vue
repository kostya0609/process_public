<template>
  <div v-if="isOK">
    <Navbar />
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <template #default>
          <component
            :is="Component"
            :key="$route.path"
          />
        </template>

        <template #fallback>
          <pre-loader
            class="mx-auto"
            :loading="true"
          />
        </template>
      </suspense>
    </router-view>
  </div>
</template>

<script setup>
import { ref, provide, reactive } from "vue";
import Navbar from "@/components/Navbar";
import PreLoader from "@/components/pre_loader";
import { ElNotification } from "element-plus";
import { AccessesRepo, MeetingRepo } from "@/repositories";

const user = reactive({
  id: 14317,
  rights: [],
  additional_rights: {},
});

const needActionCount = ref(0);

const notify = ({ title = '', message = '', type = '', duration = 3000 } = {}) => {
  ElNotification({
    title,
    message,
    type,
    duration,
    dangerouslyUseHTMLString: true,
  })
};

const loading = ref(false);
const isOK = ref(null);
const timerId = ref(null);

const initData = async () => {
  window._userId ? user.id = window._userId : user.id = null;
  window._token ? window.token = window._token : window.token = null;
}

const auth = async () => {
  loading.value = true;
  await initData();
  if (window.token) {
    setTimeout(() => { clearInterval(timerId.value) });
    try {
      loading.value = true;

      let result = await AccessesRepo.rights({
        user_id: user.id,
        module: 'BigBlueButton',
      });

      if (result.data) {
        isOK.value = true;
        user.rights.push(...result.data.rights);
        user.additional_rights = result.data.additional_rights;
      } else {
        user.rights = [];
        user.additional_rights = [];
        isOK.value = false;
      }

    } catch (e) {
      notify({ title: 'Проблема с получением данных с сервера', message: e.message, type: 'error' });
    } finally {
      loading.value = false;
    }

  } else {
    user.rights = [];
    user.additional_rights = [];
    isOK.value = false;
    notify({ title: 'Проблема с авторизацией на портале', message: 'Нет токена.', type: 'error' });
    timerId.value = setInterval(async () => await initData(), 15000);
  };
};
auth();

let gridsData = reactive({
  BigBlueButtonList: {
    paginationData: { page: 1, count: 10 },
    sortData: { name: "id", order: "desc" },
    filterData: {},
    showValueFilter: [],
    activeProfile: null,
  },

});

const updateNeedActionCount = async () => {
  try {
    needActionCount.value = await MeetingRepo.getCountNeedActions({ user_id: user.id });
  } catch (e) {
    notify({
      title: 'Произошла ошибка!',
      message: e.message,
      type: 'error',
    });
    throw e;
  }
};

(async () => {
  await updateNeedActionCount();
})();

provide('user', user);
provide('notify', notify);
provide('gridsData', gridsData);
provide('needActionCount', needActionCount);
provide('updateNeedActionCount', updateNeedActionCount);
</script>