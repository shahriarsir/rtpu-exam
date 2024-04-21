import { createRouter, createWebHistory } from "vue-router";
// import McqLeaderboard from "";
const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "../views/Exam/Index.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/exam/:id",
      name: "ExamQuestion",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/mcq/MCQuestion.vue"),
    },
    {
      path: "/mcq/:id",
      name: "McqQuestion",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/mcq/Link.vue"),
    },

    {
      path: "/ranking/:id",
      name: "Leaderboard",
      component: () => import("../views/Exam/Leaderboard.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/solution/:id",
      name: "ExamSolution",
      meta: {
        requiresAuth: true,
      },
      component: () => import("../views/mcq/Solution.vue"),
    },
    {
      path: "/link/:id",
      name: "Link",
      component: () => import("../views/mcq/Link.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Auth/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Auth/Register.vue"),
    },

    {
      path: "/admin",
      name: "Admin",
      component: () => import("../views/Admin/Index.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin/ranking/:id",
      name: "AdminLeaderboard",
      component: () => import("../views/Admin/Ranking.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/Auth/Profile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:catchAll(.*)*",
      redirect: {
        name: "home",
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }

  if (localStorage.getItem("rtpu")) {
    next();
    return;
  }

  next({
    name: "Login",
  });
});

export default router;
