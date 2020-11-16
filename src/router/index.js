import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Player from '../views/Player.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:videoName',
    name: 'Player',
    component: Player
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
