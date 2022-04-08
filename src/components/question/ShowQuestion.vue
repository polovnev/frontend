<template>
  <div class="card-body">
    <span
      v-for="tag in question.tags"
      :key="tag.id"
      class="badge"
      v-bind:class="tag.color"
      >{{ tag.text }}</span
    >
    <h5 class="card-title">{{ question.text }}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{{ question.authorId }}</h6>
    <p class="card-text">{{ question.createdDate }}</p>
  </div>
</template>

<script>
export default {
  props: ["question"],
};
</script>
