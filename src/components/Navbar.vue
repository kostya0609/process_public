<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      class="menu"
      :router="true"
    >
      <template
        v-for="item in menu"
        v-if="!hideMenu"
        :key="item.name"
      >
        <el-menu-item
          v-if="isHideItem(item)"
          :index="item.path"
        >
          <el-badge
            :value="needActionCount"
            class="badge"
            v-if="item.meta && item.meta.withBadge && !!needActionCount"
          >
            {{ item.name }}
          </el-badge>
          <template v-else>{{ item.name }}</template>
        </el-menu-item>
      </template>

      <el-menu-item
        v-if="route.meta.actionButton"
        class="menu__right-element"
        :index="route.meta.path"
      >
        <el-button
          type="primary"
          @click="route.meta.actionButton.isGoBack ? goBack() : goTo(route.meta.actionButton.link)"
          class="menu__right-button"
        >
          {{ route.meta.actionButton.name }}
        </el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>
  
<script setup>
import { reactive, inject, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { mainMenu } from '@/router';

const route = useRoute();
const router = useRouter();
const menu = reactive([]);
const user = inject('user');
const needActionCount = inject('needActionCount');

const goTo = path => {
  router.push(path);
};

const goBack = () => {
  router.back();
};

mainMenu.forEach(el => {
  menu.push({ path: el.path, name: el.meta.name, meta: el.meta });
});

const activeIndex = computed(() => route.path);
const hideMenu = computed(() => !!route.meta && !!route.meta.hideMenu);

const isHideItem = item => {
  if (!item.meta.isAdmin) {
    return true;
  }

  return item.meta.routeIsAdmin || user.roles.isAdmin;
};
</script>
  
<style scoped lang="scss">
.menu {
  align-items: center;

  &__right-element {
    margin-left: auto !important;
    padding: 12px;
    padding-right: 0;

    &:hover {
      background: none !important;
    }
  }

  &__right-button {
    text-transform: uppercase;
  }
}

::v-deep(.badge .el-badge__content) {
  transform: none !important;
  right: unset !important;
}
</style>