<template>
  <p v-for="question in questions" :key="question.id">
    {{ question.text }}, {{question.id}}, {{question.authorId}}, {{question.createdDate}},
     <span v-for="tag in question.tags" :key="tag.id" class="badge bg-secondary">{{tag.text}}</span>{{question.tags}}
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
