<template>
  <div v-html="rules"></div>
</template>
 
<script>
  import rules from 'rules.md'
 
  export default {
    computed: {
      rules() {
        return rules
      }
    }
  }
</script> 