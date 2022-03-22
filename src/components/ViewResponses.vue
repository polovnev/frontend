<template>
  <div @click="clickBackToQuestions">Назад</div>
  Добавить ответ
  <div v-if="isShowResponses">
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
      v-for="response in responses"
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
export default {
  props: ["question", "responses", "isShowResponses"],
  methods: {
    clickBackToQuestions() {
      this.$emit("click-back-to-questions");
    },
  },
};
</script>
