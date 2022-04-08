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
    <ShowQuestion :question="question"/>

    <ViewAddResponse
      :locationId="this.locationId"
      :questionId="this.question.id"
      :user="this.user"
      @response-added="responseAdded"
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
import ShowQuestion from "../components/question/ShowQuestion.vue"

export default {
  props: ["locationId", "user"],
  data() {
    return {
      questionId: null,
      question: null,
    };
  },
  components: {
    ViewAddResponse,
    ShowQuestion,
  },
  methods: {
    async loadQuestionWithResponses() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let url = "http://localhost:8001/question/" + this.questionId;
      this.question = (
        await axios.get(
          url,
          axiosConfig
        )
      ).data;
    },
    responseAdded() {
      alert("Вопрос добавлен");
      this.loadQuestionWithResponses();
    }
  },
  beforeMount() {
    this.questionId = this.$route.params.id;
    this.loadQuestionWithResponses();
  },
};
</script>
