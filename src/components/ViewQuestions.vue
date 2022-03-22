<template>
  <div v-if="isShowQuestions">
    Добавить вопрос
    <div
      v-for="question in questions"
      :key="question.id"
      class="card"
      style="width: 70rem"
      @click="clickOnQuestion(question)"
    >
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["locationId", "isShowQuestions", "questions"],
  methods: {
    clickOnQuestion(question) {
      this.$emit("click-on-question", question);
    },
  },
};
</script>
