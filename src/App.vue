<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <ChooseLocation @set-location="setLocation" :isShowChooseLocation="isShowChooseLocation" />
    <button @click="this.isShowChooseLocation = true">Локация</button>

  Локация {{ locationName }}
  <ViewQuestions />
</template>

<script>
import ChooseLocation from "./components/ChooseLocation.vue";
import ViewQuestions from "./components/ViewQuestions.vue";
import { useCookies } from "vue3-cookies";

export default {
  name: "App",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    ChooseLocation,
    ViewQuestions,
  },
  data() {
    return {
      locationId: 0,
      locationName: "",
      isShowChooseLocation: false,
    };
  },
  methods: {
    setLocation(locationId, locationName) {
      this.locationId = locationId;
      this.locationName = locationName;
      this.cookies.set("locationId", locationId);
      this.cookies.set("locationName", locationName);
      this.isShowChooseLocation = false;
    },
  },
  beforeMount() {
    let locationId = this.cookies.get("locationId");
    let locationName = this.cookies.get("locationName");
    if (!(locationId === null) && !(locationName === null)) {
      this.locationId = locationId;
      this.locationName = locationName;
    } else {
      this.isShowChooseLocation = true;
    }
  },
};
</script>


