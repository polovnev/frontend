<template>Подтверждение регистрации</template>

<script>
import axios from "axios";

export default {
  setup() {},
  data() {
    return {
      username: null,
      activationCode: null,
    };
  },
  beforeMount() {
    this.username = this.$route.query.username;
    this.activationCode = this.$route.query.activationCode;
    this.sendActivateUser();
  },
  methods: {
    sendActivateUser() {
      let url =
        "http://localhost:8001/activate?username=" +
        this.username +
        "&activationCode=" +
        this.activationCode;
      axios
        .get(url)
        .then(this.afterSuccessActivation())
        .catch((error) => {
          alert("Что-то пошло не так");
          console.log(error);
        });
    },
    afterSuccessActivation() {
      alert("Пользователь успешно активирован");
    },
  },
};
</script>
