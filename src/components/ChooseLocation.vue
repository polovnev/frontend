<template>
  <button @click="isShowChooseLocation = true">Локация</button>
  <div v-if="isShowChooseLocation">
    <div>
      Страна:
      <select @change="loadLocations">
        <option value="">Select Country</option>
        <option
          v-for="country in countries"
          :key="country.id"
          :value="country.id"
        >
          {{ country.name }}
        </option>
      </select>
    </div>
    <div v-if="isShowLocations">
      Локация:
      <select @change="setLocation">
        <option value="">Select Location</option>
        <option
          v-for="location in locations"
          :key="location.id"
          :value="location.id"
        >
          {{ location.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      countries: [],
      locations: [],
      isShowLocations: false,
      isShowChooseLocation: true,
    };
  },
  methods: {
    async loadCountries() {
      this.countries = (
        await axios.get("http://localhost:8001/country", {})
      ).data;
    },
    async loadLocations(event) {
      let countryId = event.target.value;
      this.locations = (
        await axios.get(
          "http://localhost:8001/country/" + countryId + "/location",
          {}
        )
      ).data;
      this.isShowLocations = true;
    },
    setLocation(event) {
      let locationId = event.target.value;
      let locationName = this.locations.find(x => x.id == locationId).name;
      console.log(locationName);
      this.$emit("set-location", locationId, locationName);
      this.isShowChooseLocation = false;
    },
  },
  beforeMount() {
    this.loadCountries();
  },
};
</script>