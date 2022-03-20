<template>
  <button @click="isShowChooseLocation = true">Локация</button>


  <section class="vh-100" style="background-color: #2779e2; position: fixed; top: 0; left: 0; width:100%" v-if="isShowChooseLocation">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-xl-9">
          <h1 class="text-white mb-4">Выберите локацию</h1>

          <div class="card" style="border-radius: 15px">
            <div class="card-body">
              <div class="row align-items-center pt-4 pb-3">
                <div class="col-md-3 ps-5">
                  <h6 class="mb-0">Страна</h6>
                </div>
                <div class="col-md-9 pe-5">
                  <select @change="loadLocations" class="form-select">
                    <option selected value="">Выберите страну</option>
                    <option
                      v-for="country in countries"
                      :key="country.id"
                      :value="country.id"
                    >
                      {{ country.name }}
                    </option>
                  </select>
                </div>
              </div>

              <hr class="mx-n3" />

              <div class="row align-items-center py-3" v-if="isShowLocations">
                <div class="col-md-3 ps-5">
                  <h6 class="mb-0">Локация</h6>
                </div>
                <div class="col-md-9 pe-5">
                  <select @change="setLocation" class="form-select">
                    <option value="">Выберите локацию</option>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
        await axios.get("http://localhost:8001/country")
      ).data;
    },
    async loadLocations(event) {
      let countryId = event.target.value;
      this.locations = (
        await axios.get(
          "http://localhost:8001/country/" + countryId + "/location"
        )
      ).data;
      this.isShowLocations = true;
    },
    setLocation(event) {
      let locationId = event.target.value;
      let locationName = this.locations.find((x) => x.id == locationId).name;
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