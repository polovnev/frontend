<template>
  <div v-show="!isChooseTags" @click="isChooseTags = true">Choose tags</div>
  <div v-show="isChooseTags">
    <span
      v-for="tag in tags"
      :key="tag.id"
      v-bind:class="tag.color"
      @click="markActive(tag)"
      class="badge"
    >
      {{ tag.text }}</span
    >
    <div @click="applyTags()">Применить</div>
    <div>
      <span
        v-for="activeTag in activeTags"
        :key="activeTag.id"
        v-bind:class="activeTag.color"
        @click="removeFromActive(activeTag)"
        class="badge"
      >
        {{ activeTag.text }}</span
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      isChooseTags: false,
      tags: [],
      activeTags: [],
    };
  },
  methods: {
    loadTags() {
      let url = "http://localhost:8001/tag";
      axios
        .get(url)
        .then((response) => {
          this.tags = response.data;
        })
        .catch((error) => {
          alert("Что-то пошло не так");
          console.log(error);
        });
    },
    markActive(tag) {
      if (this.activeTags.indexOf(tag) === -1) {
        this.activeTags.push(tag);
      }
    },
    removeFromActive(activeTag) {
      const index = this.activeTags.indexOf(activeTag);
      if (index > -1) {
        this.activeTags.splice(index, 1); 
      }
    },
    applyTags() {
        this.isChooseTags = false;
        this.$emit("tags-choosed", this.activeTags);
    },
  },
  beforeMount() {
    this.loadTags();
  },
};
</script>
