<template>

  <img alt="Vue logo" src="./assets/logo.png">
  <ChooseLocation @set-location="setLocation"/>
  Локация {{locationName}}
  <ViewQuestions/>
</template>

<script>
import ChooseLocation from "./components/ChooseLocation.vue"
import ViewQuestions from "./components/ViewQuestions.vue"

export default {
  name: 'App',
  components: {
    ChooseLocation,
    ViewQuestions
  },
  data() {
    return {
      locationId: 0,
      locationName: ""
    }
  },
  methods: {
    setLocation(locationId, locationName) {
        this.locationId = locationId;
        this.locationName = locationName;
    }
  }
}
</script>


