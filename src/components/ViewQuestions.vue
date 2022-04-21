<template>
  <div>
    <div @click="addQuestion">
      <i class="fa fa-plus-circle" aria-hidden="true"></i>
    </div>
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
          query: { locationId: this.locationId, tags: this.tags.query },
        }"
      >
        <ShowQuestion :question="question" />
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ShowQuestion from "../components/question/ShowQuestion.vue";

export default {
  props: ["locationId", "user", "tags", "isAuthenticated"],
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
      if (this.isAuthenticated) {
        this.$router.push({
          name: "ViewAddQuestion",
        });
      } else {
        this.$router.push({
          name: "ViewLogin",
        });
      }
    },
    loadQuestions() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let tagsArray = [];
      if (this.$route.query.tags) {
        tagsArray = this.$route.query.tags.split(",").map((x) => +x);
      }
      let requestBody = {
        locationId: this.locationId,
        tags: tagsArray,
      };
      let url = "http://localhost:8001/question/find";

      axios
        .post(url, requestBody, axiosConfig)
        .then((response) => (this.questions = response.data))
        .catch((error) => {
          alert("Ошибка загрузки вопросов");
          console.log(error);
        });
    },
  },
  watch: {
    "$route.query": function () {
      this.loadQuestions();
    },
  },
  beforeMount() {
    this.loadQuestions();
  },
};
</script>

<style scoped>
.fa-plus-circle {
  color: green;
  font-size: 50px;
  cursor: pointer;
}
</style>
