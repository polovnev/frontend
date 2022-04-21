<template>
  <div class="container">
    <header>
      <nav class="navbar navbar-light bg-light">
        Локация: {{ this.locationName }}<br />
        <router-link :to="{ name: 'ChooseLocation' }">
          <a class="btn btn-info btn-sm" role="button">Локация</a>
        </router-link>
        <ChooseTags @set-tags="setTags" :test="test" />
<i class="fa-solid fa-building"></i>
        <div v-show="!isAuthenticated">
          <router-link :to="{ name: 'ViewLogin' }">
            <a class="btn btn-outline-info btn-sm" role="button">Войти</a>
          </router-link>
        </div>
        <div v-show="isAuthenticated">
          Пользователь: {{ this.user.username }}
          <a
            @click="this.logout()"
            class="btn btn-outline-danger btn-sm"
            role="button"
          >
            Выйти
          </a>
        </div>
        <div v-show="!isAuthenticated">
          <router-link :to="{ name: 'ViewRegistration' }">
            <a class="btn btn-outline-success btn-sm" role="button"
              >Регистрация</a
            >
          </router-link>
        </div>
      </nav>
    </header>
  </div>
  <div class="container">
    <router-view
      :locationId="locationId"
      :user="user"
      :tags="tags"
      :isAuthenticated="isAuthenticated"
      @login="setUsernameAndJwt"
      @question-added="questionAdded"
    />
  </div>
</template>

<script>
import { useCookies } from "vue3-cookies";
import axios from "axios";
import ChooseTags from "../components/ChooseTags.vue";

export default {
  components: {
    ChooseTags,
  },
  data() {
    return {
      locationId: null,
      locationName: null,
      isAuthenticated: null,
      tags: null,
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
    moveToQuestions() {
      let tagsString;
      if (this.tags) {
        tagsString = this.tags.query;
      } else {
        tagsString = this.$route.query.tags;
      }
      this.$router.push({
        name: "ViewQuestions",
        query: {
          locationId: this.locationId,
          tags: tagsString,
        },
      });
    },
    questionAdded() {
      alert("Вопрос добавлен!");
      this.moveToQuestions();
    },
    setLocationName() {
      let url =
        "http://localhost:8001/country/null/location/" + this.locationId;

      axios
        .get(url)
        .then((response) => (this.locationName = response.data.name))
        .catch((error) => {
          alert("Ошибка загрузки имя локации");
          console.log(error);
        });
    },
    checkIsAuthenticated() {
      return this.user.username != null && this.user.jwt != null;
    },
    moveToChooseLocation() {
      this.$router.push({ name: "ChooseLocation" });
    },
    setLocation() {
      this.locationId = this.$route.query.locationId;
      if (this.locationId == null) {
        let locationIdFromCookies = this.cookies.get("locationId");
        if (locationIdFromCookies != null) {
          this.locationId = locationIdFromCookies;
        } else {
          this.moveToChooseLocation();
        }
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
    },
    logout() {
      this.user.username = null;
      this.user.jwt = null;
      this.cookies.remove("username");
      this.cookies.remove("jwt");
      this.isAuthenticated = false;
      this.moveToQuestions();
    },
    setTags(tags) {
      this.tags = tags;
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
