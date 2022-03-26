<template>
  <div>
    Локация: {{ this.locationName }}<br />

    <router-link :to="{ name: 'ChooseLocation' }">
      <a class="btn btn-info btn-sm" role="button">Локация</a>
    </router-link>
    <div v-if="!isAuthenticated">
      <router-link :to="{ name: 'ViewLogin' }">
        <a class="btn btn-info btn-sm" role="button">Войти</a>
      </router-link>
    </div>
    <div v-if="isAuthenticated">
      Пользователь: {{ this.user.username }}
      <a @click="this.logout()" class="btn btn-info btn-sm" role="button">
        Выйти
      </a>
    </div>
    <div v-if="!isAuthenticated">
      <router-link :to="{ name: 'ViewRegistration' }">
        <a class="btn btn-info btn-sm" role="button">Регистрация</a>
      </router-link>
    </div>
  </div>
  <router-view
    :locationId="locationId"
    :user="user"
    @login="setUsernameAndJwt"
    @question-added="questionAdded"
  />
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  data() {
    return {
      locationId: null,
      locationName: null,
      isAuthenticated: null,
      user: {
        username: null,
        jwt: null,
      },
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  methods: {
    questionAdded() {
      alert("Вопрос добавлен!");
        this.moveToQuestions();
    },
    async setLocationName() {
      this.locationName = (
        await axios.get(
          "http://localhost:8001/country/null/location/" + this.locationId
        )
      ).data.name;
    },
    checkIsAuthenticated() {
      return this.user.username != null && this.user.jwt != null;
    },
    moveToQuestions() {
      this.$router.push({
        name: "ViewQuestions",
        query: { locationId: this.locationId },
      });
    },
    moveToChooseLocation() {
      this.$router.push({ name: "ChooseLocation" });
    },
    setLocation() {
      this.locationId = this.$route.query.locationId;

      if (this.locationId == null) {
        this.locationId = this.cookies.get("locationId");
      }
      if (this.locationId == null) {
        this.moveToChooseLocation();
      } else {
        this.moveToQuestions();
      }
      if (this.locationId != null) {
        this.setLocationName();
      }
    },
    setUsernameAndJwt(username, jwt) {
      this.user.username = username;
      this.user.jwt = jwt;
      this.isAuthenticated = true;
      this.moveToQuestions();
    },
    setUsernameAndJwtFromCookies() {
      this.user.username = this.cookies.get("username");
      this.user.jwt = this.cookies.get("jwt");
    },
    logout() {
      this.user.username = null;
      this.user.jwt = null;
      this.cookies.remove("username");
      this.cookies.remove("jwt");
      this.isAuthenticated = false;
      this.moveToQuestions();
    },
  },
  beforeMount() {
    this.setUsernameAndJwtFromCookies();
    this.setLocation();
    this.isAuthenticated = this.checkIsAuthenticated();
  },
};
</script>
