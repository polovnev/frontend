<template>
<a class="btn btn-info btn-sm " @click="this.isShowChooseLocation = true" role="button">Локация</a>
 
  <ChooseLocation @set-location="setLocation" :isShowChooseLocation="isShowChooseLocation" />
  Локация {{ locationName }}
  <ViewQuestions :locationId="locationId"/>
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


