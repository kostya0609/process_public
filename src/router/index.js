import Meetings from '@/pages/meetings'
import NeedAction from '@/pages/need-action'
import AddMeeting from '@/pages/meetings/add'
import DetailMeeting from '@/pages/meetings/detail'
import { createRouter, createWebHistory } from 'vue-router';

export const mainMenu = [
  {
    path: '/process-test/',
    component: Meetings,
    name: 'listMeetings',
    meta: {
      name: 'Встречи',
      actionButton: {
        name: 'Добавить',
        link: '/process-test/meetings/add/',
      },
    },
  },
  {
    path: '/process-test/need-action',
    component: NeedAction,
    name: 'listCheck',
    meta: {
      name: 'Требует вашей реакции',
      actionButton: {
        name: 'Добавить акцию',
        link: '/process-test/meetings/add/',
      },
      withBadge: true,
    },
  },
];

const routes = [
  {
    path: '/process-test/meetings/add/',
    component: AddMeeting,
    meta: {
      actionButton: {
        name: 'Вернуться назад',
        link: '/process-test/',
      },
      hideMenu: true,
    },
  },
  {
    path: '/process-test/meetings/:id/',
    component: DetailMeeting,
    name: 'detailMeeting',
    meta: {
      actionButton: {
        name: 'Вернуться назад',
        link: '/process-test/',
      },
      hideMenu: true,
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: Meetings,
  },
];

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...mainMenu,
    ...routes,
  ]
});

export default router;
