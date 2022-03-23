import { createWebHistory, createRouter } from "vue-router";
import ViewQuestionsAndResponses from "../components/ViewQuestionsAndResponses.vue"
import ChooseLocation from "../components/ChooseLocation.vue"
import ViewLogin from "../components/ViewLogin.vue"
import ViewRegistration from "../components/ViewRegistration.vue"

const routes = [
  {
    path: "/question",
    name: "ViewQuestionsAndResponses",
    component: ViewQuestionsAndResponses,
  },
  {
    path: "/chooseLocation",
    name: "ChooseLocation",
    component: ChooseLocation,
  },
  {
    path: "/login",
    name: "ViewLogin",
    component: ViewLogin,
  },
  {
    path: "/registration",
    name: "ViewRegistration",
    component: ViewRegistration,
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;