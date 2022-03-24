<template>
  <ViewQuestions
    :isShowQuestions="isShowQuestions"
    :questions="questions"
    @click-on-question="clickOnQuestion"
  />
  <router-view/>
</template>

<script>
import ViewQuestions from "./ViewQuestions.vue";

export default {
  components: {
    ViewQuestions,
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
  }
};
</script>
