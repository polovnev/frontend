<template>
  <div>Назад</div>
  Добавить ответ
  <div>
    <div class="card-body">
      <span
        v-for="tag in question.tags"
        :key="tag.id"
        class="badge bg-secondary"
        >{{ tag.text }}</span
      >
      <h5 class="card-title">{{ question.text }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ question.authorId }}</h6>
      <p class="card-text">{{ question.createdDate }}</p>
    </div>
    <div
      v-for="response in question.responses"
      :key="response.id"
      class="card"
      style="width: 70rem"
    >
      <div class="card-body">
        <h5 class="card-title">{{ response.text }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ response.authorId }}</h6>
        <p class="card-text">{{ response.isResponse }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      question: null,
    }
  },
  methods: {
    async loadQuestionWithResponses(questionId) {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      this.question = (
        await axios.get(
          "http://localhost:8001/question/" + questionId,
          axiosConfig
        )
      ).data;
    },
  },
  beforeMount() {
    let questionId = this.$route.params.id;
    this.question = this.loadQuestionWithResponses(questionId);
  },
};
</script>
