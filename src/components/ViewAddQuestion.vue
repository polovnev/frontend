<template>
  <router-link
    :to="{ name: 'ViewQuestions', query: { locationId: this.locationId } }">
    <div>Назад</div>
    </router-link>
    Add Question
</template>

<script>
export default {
    props: ["locationId"],
    setup() {
        
    },
    
}
</script>
