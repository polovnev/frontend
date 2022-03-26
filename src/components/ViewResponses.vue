<template>
  <router-link
    :to="{
      name: 'ViewQuestions',
      query: {
        locationId: this.locationId,
      },
    }"
  >
    <div>Назад</div>
  </router-link>

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

    <ViewAddResponse
      :locationId="this.locationId"
      :questionId="this.question.id"
      :user="this.user"
    />

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
import ViewAddResponse from "../components/ViewAddResponse.vue";

export default {
  props: ["locationId", "user"],
  data() {
    return {
      question: null,
    };
  },
  components: {
    ViewAddResponse,
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
