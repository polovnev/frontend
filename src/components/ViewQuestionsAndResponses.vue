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
    @click-back-to-questions="clickBackToQuestions"
  />
</template>

<script>
import ViewQuestions from "./ViewQuestions.vue";
import ViewResponses from "./ViewResponses.vue";
import axios from "axios";

export default {
  props: ["locationId"],
  components: {
    ViewQuestions,
    ViewResponses,
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
    async loadQuestions() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      this.questions = (
        await axios.post(
          "http://localhost:8001/question/find",
          {
            locationId: this.locationId,
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
  watch: {
    locationId: function () {
      this.loadQuestions();
    },
    question: function () {
      this.loadResponses();
    },
  },
  beforeMount() {
    if (this.locationId != 0) {
      this.loadQuestions();
    }
  },
};
</script>
