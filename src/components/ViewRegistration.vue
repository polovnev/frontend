<template>
  <h1>Регистрация</h1>
  <br />
  Имя<input type="text" v-model="this.firstName" /><br />
  Фамилия<input type="text" v-model="this.secondName" /><br />
  Имя в системе<input type="text" v-model="this.username" /><br />
  Почта<input type="text" v-model="this.email" /><br />
  Пароль<input type="password" v-model="this.password" /><br />
  <div @click="sendCreateUser">Отправить</div>
</template>

<script>
import axios from "axios";

export default {
  setup() {},
  data() {
    return {
      firstName: "",
      secondName: "",
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    sendCreateUser() {
      let url = "http://localhost:8001/registration";
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let requestBody = {
        firstName: this.firstName,
        secondName: this.secondName,
        username: this.username,
        email: this.email,
        password: this.password,
      };
      axios
        .post(url, requestBody, axiosConfig)
        .then(this.afterSuccessRegistration())
        .catch((error) => {
          alert("Что-то пошло не так");
          console.log(error);
        });
    },
    afterSuccessRegistration() {
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      };
      let requestBody = {
        username: this.username,
        password: this.password,
      };
      axios
        .post("http://localhost:8001/login", requestBody, axiosConfig)
        .then((response) => this.saveToCookiesAndPushToQuestions(response))
        .catch((error) => {
          alert("Не верный пароль или имя пользователя");
          console.log(error);
        });
    },
    saveToCookiesAndPushToQuestions(response) {
      let username = response.data.username;
      let jwt = response.data.jwt;
      this.cookies.set("username", username);
      this.cookies.set("jwt", jwt);
      this.$emit("login", username, jwt);
    },
  },
};
</script>
