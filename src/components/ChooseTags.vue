<template>
  Choose tags
  <span v-for="tag in tags" :key="tag.id" v-bind:class="tag.color" class="badge "> {{
    tag.text
  }}</span>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tags: [],
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
  },
  beforeMount() {
    this.loadTags();
  },
};
</script>
