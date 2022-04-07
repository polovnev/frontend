<template>
  <div v-show="this.isAuthenticated">
    <input type="text" v-model="text" />
    <button @click="sendAddResponse">Отправить</button>
  </div>
  <div v-show="!this.isAuthenticated">Войдите чтобы оставить ответ</div>
</template>

<script>
import axios from "axios";

export default {
  props: ["questionId", "user"],
  setup() {},
  data() {
    return {
      isAuthenticated: this.user.jwt != null,
      text: "",
    };
  },
  methods: {
    sendAddResponse() {
      let url =
        "http://localhost:8001/question/" + this.questionId + "/response";
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + this.user.jwt,
        },
      };
      let requestBody = {
        text: this.text,
      };
      axios
        .post(url, requestBody, axiosConfig)
        .then(() => {
          this.text = "";
          this.$emit("response-added")
          })
        .catch((error) => {
          alert("Что-то пошло не так");
          console.log(error);
        });
    },
  },
};
</script>
