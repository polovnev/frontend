<template>
  <button class="btn btn-outline-dark btn-sm" v-show="!isChooseTags" @click="isChooseTags = true">Выбрать теги</button>
  <div v-show="isChooseTags">
    <span
      v-for="tag in tags.notActive"
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
        v-for="activeTag in tags.active"
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
      tags: {
        all: [],
        query: null,
        active: [],
        notActive: [],
      },
    };
  },
  methods: {
    setTags() {
      this.loadTags();
    },
    generateQuery() {
      this.tags.query = this.tags.active.map((x) => x.id).join();
    },
    async loadTags() {
      let url = "http://localhost:8001/tag";
      await axios
        .get(url)
        .then((response) => {
          this.tags.all = response.data;
          this.tags.notActive = response.data;
          let tagsString = this.$route.query.tags;
          if (tagsString) {
            this.tags.query = tagsString;
            let tagIds = tagsString.split(",").map((x) => +x);
            for (let i = 0; i < tagIds.length; i++) {
              let tagId = tagIds[i];
              let foundTag = this.tags.all.find((tag) => tag.id == tagId);
              this.markActive(foundTag);
            }
          }
          this.generateQuery();
          this.$emit("set-tags", this.tags);
        })
        .catch((error) => {
          alert("Ошибка загрузка тегов");
          console.log(error);
        });
    },
    markActive(tag) {
      if (this.tags.active.indexOf(tag) === -1) {
        this.tags.active.push(tag);
      }
      const index = this.tags.notActive.indexOf(tag);
      if (index > -1) {
        this.tags.notActive.splice(index, 1);
      }
    },
    removeFromActive(activeTag) {
      const index = this.tags.active.indexOf(activeTag);
      if (index > -1) {
        this.tags.active.splice(index, 1);
      }
      if (this.tags.notActive.indexOf(activeTag) === -1) {
        this.tags.notActive.push(activeTag);
      }
    },
    applyTags() {
      this.generateQuery();
      this.isChooseTags = false;
      this.$emit("set-tags", this.tags);
    },
  },
  beforeMount() {
    this.setTags();
  },
};
</script>
