<template>
  <div>
    <div @click="addQuestion">Добавить вопрос</div>
    <div
      v-for="question in questions"
      :key="question.id"
      class="card"
      style="width: 70rem"
    >
      <router-link
        :to="{
          name: 'ViewResponses',
          params: { id: question.id },
          query: { locationId: this.locationId },
        }"
      >
    <ShowQuestion :question="question"/>

      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShowQuestion from "../components/question/ShowQuestion.vue";

export default {
  props: ["locationId", "user", "tags"],
  data() {
    return {
      questions: [],
    };
  },
  components: {
    ShowQuestion,
  },
  methods: {
    addQuestion() {
      if (this.user.username != null) {
        this.$router.push({
          name: "ViewAddQuestion",
        });
      } else {
        this.$router.push({
          name: "ViewLogin",
        });
      }
    },
    async loadQuestions() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let requestBody = {
        locationId: this.locationId,
        tags: this.tags
      };
      this.questions = (
        await axios.post(
          "http://localhost:8001/question/find",
          requestBody,
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
