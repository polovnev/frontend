import { createWebHistory, createRouter } from "vue-router";
import ViewQuestions from "../components/ViewQuestions.vue"
import ChooseLocation from "../components/ChooseLocation.vue"
import ViewLogin from "../components/ViewLogin.vue"
import ViewRegistration from "../components/ViewRegistration.vue"
import ViewResponses from "../components/ViewResponses.vue"
import ViewHeader from "../components/ViewHeader.vue"
import ViewAddQuestion from "../components/ViewAddQuestion.vue"
import ConfirmRegistration from "../components/ConfirmRegistration.vue"


const routes = [
  {
    path: "/chooseLocation",
    name: "ChooseLocation",
    component: ChooseLocation,
  },
  {
    path: "/registration",
    name: "ViewRegistration",
    component: ViewRegistration,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Header",
    component: ViewHeader,
    children: [
      {
        path: "/confirmRegistration",
        name: "ConfirmRegistration",
        component: ConfirmRegistration,
      },
      {
        path: "/question",
        name: "ViewQuestions",
        component: ViewQuestions,
      },
      {
        path: "/question/:id",
        name: "ViewResponses",
        component: ViewResponses
      },
      {
        path: "/login",
        name: "ViewLogin",
        component: ViewLogin,
      },
      {
        path: "/addQuestion",
        name: "ViewAddQuestion",
        component: ViewAddQuestion,
      },
      {
        path: "/:pathMatch(.*)*",
        redirect: {
          name: "ViewQuestions"
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;