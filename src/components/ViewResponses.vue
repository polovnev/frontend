<template>
  <router-link
    :to="{
      name: 'ViewQuestions',
      query: {
        locationId: this.locationId,
        tags: this.tags.query,
      },
    }"
  >
    <div>Назад</div>
  </router-link>

  <div>
    <ShowQuestion :question="question" />

    <ViewAddResponse
      :locationId="this.locationId"
      :questionId="this.questionId"
      :user="this.user"
      :isAuthenticated="isAuthenticated"
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
import ShowQuestion from "../components/question/ShowQuestion.vue";

export default {
  props: ["locationId", "user", "tags", "isAuthenticated"],
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
    loadQuestionWithResponses() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let url = "http://localhost:8001/question/" + this.questionId;
      axios
        .get(url, axiosConfig)
        .then((response) => {
          this.question = response.data;
        })
        .catch((error) => {
          alert("Ошибка загрузки вопроса");
          console.log(error);
        });
    },
    responseAdded() {
      alert("Ответ добавлен");
      this.loadQuestionWithResponses();
    },
  },
  beforeMount() {
    console.log("View Responses before mount -- start");
    this.questionId = this.$route.params.id;
    console.log("View Responses before mount questionId: "+ this.questionId);

    this.loadQuestionWithResponses();
    console.log("View Responses before mount -- end");
  },
};
</script>
