<template>
  <router-link
    :to="{ name: 'ViewQuestions', query: { locationId: this.locationId } }"
  >
    <div>Назад</div>
  </router-link>
  Добавить вопрос

  <input type="text" v-model="text" />
  <div @click="sendQuestion">Отправить</div>
</template>

<script>
import axios from "axios";
export default {
  props: ["locationId", "user"],
  data() {
    return {
      text: "",
    };
  },
  setup() {},
  methods: {
    sendQuestion() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Authorization": "Bearer " + this.user.jwt,
        },
      };
      let requestBody = {
        text: this.text,
        location: this.locationId,
      };
      axios
        .post("http://localhost:8001/question", requestBody, axiosConfig)
        .then(this.$emit("question-added"))
        .catch((error) => {
          alert("Что-то пошло не так");
          console.log(error);
        });
    },
  },
};
</script>
