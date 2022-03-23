<template>
<ViewHeader/>
<router-view/>
</template>

<script>
import { useCookies } from "vue3-cookies";
import ViewHeader from "./components/ViewHeader.vue"

export default {
  name: "App",
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  components: {
    ViewHeader
  },
  data() {
    return {
      isShowChooseLocation: false,
    };
  },
  methods: {
    setLocation(locationId, locationName) {
      this.locationId = locationId;
      this.locationName = locationName;
      this.cookies.set("locationId", locationId);
      this.cookies.set("locationName", locationName);
    },
  },
  beforeMount() {
    let locationId = this.cookies.get("locationId");
    let locationName = this.cookies.get("locationName");
    if (!(locationId === null) && !(locationName === null)) {
      this.locationId = locationId;
      this.locationName = locationName;
      //this.$router.push({name: "ViewQuestionsAndResponses", params:{locationId: this.locationId}})
    } else {
      this.isShowChooseLocation = true;
    }
  },
};
</script>


