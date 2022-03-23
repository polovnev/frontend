<template>
  <ViewQuestions
    :isShowQuestions="isShowQuestions"
    :questions="questions"
    @click-on-question="clickOnQuestion"
  />
  <ViewResponses
    :isShowResponses="isShowResponses"
    :question="question"
    :responses="responses"
  />
</template>

<script>
import ViewQuestions from "./ViewQuestions.vue";
import ViewResponses from "./ViewResponses.vue";
import axios from "axios";
import { useCookies } from "vue3-cookies";

export default {
  components: {
    ViewQuestions,
    ViewResponses,
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data() {
    return {
      isShowQuestions: true,
      isShowResponses: false,
      questions: [],
      responses: [],
      question: null,
    };
  },
  methods: {
    async loadQuestions(locationId) {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      this.questions = (
        await axios.post(
          "http://localhost:8001/question/find",
          {
            locationId: locationId,
          },
          axiosConfig
        )
      ).data;
    },
    async loadResponses() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      this.responses = (
        await axios.get(
          "http://localhost:8001/question/" + this.question.id + "/response",
          axiosConfig
        )
      ).data;
    },
    clickOnQuestion(question) {
      this.question = question;
      this.responses = this.loadResponses();
      this.isShowQuestions = false;
      this.isShowResponses = true;
    },
    clickBackToQuestions() {
      this.isShowQuestions = true;
      this.isShowResponses = false;
    },
  },
  beforeMount() {
    let locationId = this.$route.query.locationId;
    if (locationId == null) {
      locationId = this.cookies.get("locationId");
      this.$router.push({
        name: "ViewQuestionsAndResponses",
        query: { locationId: locationId },
      });
    }
    if (locationId == null) {
      this.$router.push({ name: "ChooseLocation" });
    }
    this.loadQuestions(locationId);
  },
};
</script>
