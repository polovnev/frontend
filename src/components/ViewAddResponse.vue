<template>
  <router-link
    :to="{
      name: 'ViewResponses',
      params: {
        id: this.questionId,
      },
      query: { locationId: this.locationId },
    }"
  >
    <div>Назад</div>
  </router-link>
  Add Response
</template>

<script>
export default {
  props: ["locationId"],
  setup() {},
  data() {
    return {
      questionId: this.$route.query.questionId,
    };
  },
};
</script>
