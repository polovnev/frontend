<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <ChooseLocation @set-location="setLocation"/>
  Локация {{locationName}}
</template>

<script>
import ChooseLocation from "./components/ChooseLocation.vue"

export default {
  name: 'App',
  components: {
    ChooseLocation
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
