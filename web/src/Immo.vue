<template>
  {{list}}
</template>

<script>
export default {
  name: "Immo",
  async setup(){
    const list = await fetch(`${location.origin}/api/search?prixmin=300000&prixmax=400000`)
        .then(response => response.json())

    return { list };
  }
}
</script>

<style scoped>

</style>
