<template>
  123
  <p v-for="question in questions" :key="question.id">
    {{ question.text }}
  </p>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      questions: [],
      locationId: 1,
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
  },
  beforeMount() {
    this.loadQuestions();
  },
};
</script>
