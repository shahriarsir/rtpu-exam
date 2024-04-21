import { defineStore } from "pinia";
import { api } from "../plugins/api";

export const useUserStore = defineStore("rtpu", {
  state: () => ({
    user: null,
    token: null,
    isAuth: false,
  }),
  actions: {
    async login(phone, router) {
      try {
        const { data } = await api.post("/auth/signin", { phone });

        if (!data.user) {
          return {
            loggedIn: false,
          };
        }

        this.user = data.user;
        this.token = data.access_token;
        this.isAuth = true;

        return {
          loggedIn: true,
        };
      } catch (error) {
        return {
          loggedIn: false,
        };
        console.error(error);
      }
    },

    async registerUser(user, router) {
      try {
        const { data } = await api.post("/auth/signup", user);
        this.user = data.user;
        this.token = data.access_token;
        this.isAuth = true;
        router.push("/");
      } catch (error) {
        
        console.error(error);
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.isAuth = false;
    },
  },
  persist: true,
});
