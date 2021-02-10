<template>
  <UserProfile :username="username" />
</template>

<script>
import UserProfile from '@/components/UserProfile'

export default {
  name: 'User',
  components: {
    UserProfile
  },
  data() {
    return {
      username: ''
    }
  },
  created() {
    this.username = this.$route.params.user || 'anthive'
  }
}
</script>
