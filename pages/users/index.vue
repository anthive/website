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
  data: () => ({
    username: ''
  }),
  created() {
    this.username = this.$route.query.username || 'anthive'
  }
}
</script>
