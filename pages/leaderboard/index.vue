<template>
  <div/>
</template>

<script>
export default {
  mounted() {
    this.$router.push(`${this.localePath('leaderboard')}/bots`)
  }
}
</script>
