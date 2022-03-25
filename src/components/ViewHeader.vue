<template>
  <div>
    Локация: {{ this.locationName }}<br />

    <router-link :to="{ name: 'ChooseLocation' }">
      <a class="btn btn-info btn-sm" role="button">Локация</a>
    </router-link>
    <div v-if="!isAuthenticated">
      <router-link :to="{ name: 'ViewLogin' }">
        <a class="btn btn-info btn-sm" role="button">Логин</a>
      </router-link>
    </div>
    <div v-if="isAuthenticated">
      Пользователь: {{ this.user.username }}
      <a @click="this.logout()" class="btn btn-info btn-sm" role="button">Выйти</a>
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
    setLocation() {
      this.locationId = this.$route.query.locationId;

      if (this.locationId == null) {
        this.locationId = this.cookies.get("locationId");
        this.moveToQuestions();
      }
      if (this.locationId == null) {
        this.$router.push({ name: "ChooseLocation" });
      }
      this.setLocationName();
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
      this.isAuthenticated = true;
      this.moveToQuestions();
    },
    logout() {
      this.user.username = null;
      this.user.jwt = null;
      this.cookies.remove("username");
      this.cookies.remove("jwt");
      this.isAuthenticated = false;
    },
  },
  beforeMount() {
    this.setLocation();
    this.setUsernameAndJwtFromCookies();
    this.isAuthenticated = this.checkIsAuthenticated();
  },
};
</script>
