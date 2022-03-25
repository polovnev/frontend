<template>
  <div>
    Локация: {{ this.locationName }}<br>
    Пользователь: {{this.user.username}}

    <router-link :to="{ name: 'ChooseLocation' }">
      <a class="btn btn-info btn-sm" role="button">Локация</a>
    </router-link>

    <router-link :to="{ name: 'ViewLogin' }">
      <a class="btn btn-info btn-sm" role="button">Логин</a>
    </router-link>
    <router-link :to="{ name: 'ViewRegistration' }">
      <a class="btn btn-info btn-sm" role="button">Регистрация</a>
    </router-link>
  </div>
  <router-view :locationId="locationId" :user="user" @login="setUsernameAndJwt"/>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  data() {
    return {
      locationId: null,
      locationName: null,
      user: {
        username: null,
        jwt: null
      }
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
    setUsernameAndJwt(username, jwt) {
      this.user.username = username;
      this.user.jwt = jwt;
    },
  },
  beforeMount() {
    this.locationId = this.$route.query.locationId;

    if (this.locationId == null) {
      this.locationId = this.cookies.get("locationId");
      this.$router.push({
      name: "ViewQuestions",
      query: { locationId: this.locationId },
    });
    }
    if (this.locationId == null) {
      this.$router.push({ name: "ChooseLocation" });
    }
    this.setLocationName();
  },
};
</script>
