import { createRouter, createWebHistory } from "vue-router";
import { projectAuth } from "@/configs/firebase";

//Auth Guards
const requireAuth = (to, from, next) => {
  const user = projectAuth.currentUser;

  if (!user) next({ name: "login", params: {} });
  else next();
};

const routes = [
  {
    path: "/home",
    name: "home",
    meta: {
      text: "Hey, ",
      leading: true,
    },
    beforeEnter: requireAuth,
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/HomeView.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/",
    name: "login",
    meta: {
      layout: "auth",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    meta: {
      text: "My Profile",
      leading: false,
    },
    beforeEnter: requireAuth,
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/ProfileView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: requireAuth,
    component: () =>
      import(/* webpackChunkName: "logout" */ "../views/LogoutView.vue"),
  },
  {
    path: "/report",
    name: "report",
    meta: {
      text: "Report",
      leading: false,
    },
    beforeEnter: requireAuth,
    component: () =>
      import(/* webpackChunkName: "report" */ "../views/ReportView.vue"),
  },
  {
    path: "/budget",
    name: "budget",
    meta: {
      text: "Budget",
      leading: false,
    },
    beforeEnter: requireAuth,
    component: () =>
      import(/* webpackChunkName: "budget" */ "../views/BudgetView.vue"),
  },
  {
    path: "/transaction",
    name: "transaction",
    meta: {
      text: "New Transaction",
      leading: false,
    },
    beforeEnter: requireAuth,
    component: () =>
      import(
        /* webpackChunkName: "transaction" */ "../views/NewTransactions.vue"
      ),
  },
  {
    path: "/mywallet",
    name: "mywallet",
    meta: {
      text: "My Wallet",
      leading: false,
    },
    beforeEnter: requireAuth,
    component: () =>
      import(/* webpackChunkName: "mywallet" */ "../views/MyWalletView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
