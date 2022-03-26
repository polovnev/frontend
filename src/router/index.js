import { createWebHistory, createRouter } from "vue-router";
import ViewQuestions from "../components/ViewQuestions.vue"
import ChooseLocation from "../components/ChooseLocation.vue"
import ViewLogin from "../components/ViewLogin.vue"
import ViewRegistration from "../components/ViewRegistration.vue"
import ViewResponses from "../components/ViewResponses.vue"
import ViewHeader from "../components/ViewHeader.vue"
import ViewAddQuestion from "../components/ViewAddQuestion.vue"


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
        path: "/question/:id",
        name: "ViewResponses",
        component: ViewResponses
      },
      {
        path: "/question",
        name: "ViewQuestions",
        component: ViewQuestions,
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
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;