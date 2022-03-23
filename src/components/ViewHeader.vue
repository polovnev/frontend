<template>
  Локация: {{ this.locationName }}
  <router-link :to="{ name: 'ChooseLocation' }">
    <a class="btn btn-info btn-sm" role="button">Локация</a>
  </router-link>

  <router-link :to="{ name: 'ViewLogin' }">
    <a class="btn btn-info btn-sm" role="button">Логин</a>
  </router-link>
  <router-link :to="{ name: 'ViewRegistration' }">
    <a class="btn btn-info btn-sm" role="button">Регистрация</a>
  </router-link>
</template>

<script>
export default {
  data() {
    return { locationName: "locationName" };
  },
};
</script>
