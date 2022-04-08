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

          let tagsString = this.$route.query.tags;
          if (tagsString) {
            let tagIds = tagsString.split(",").map((x) => +x);
            for (let i = 0; i < tagIds.length; i++) {
              let tagId = tagIds[i];
              let foundTag = this.tags.find((tag) => tag.id == tagId);
              this.markActive(foundTag);
            }
          }
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
      const index = this.tags.indexOf(tag);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    },
    removeFromActive(activeTag) {
      const index = this.activeTags.indexOf(activeTag);
      if (index > -1) {
        this.activeTags.splice(index, 1);
      }
      if (this.tags.indexOf(activeTag) === -1) {
        this.tags.push(activeTag);
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
