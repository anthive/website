<template >
  <div class="page-wrap">
    <HomeSlogan />
    <HomeForWhom />
    <HomeStatistics />
  </div>
</template>
<script>
import HomeSlogan from '../components/HomeSlogan.vue'
import HomeForWhom from '../components/HomeForWhom.vue'
import HomeStatistics from '../components/HomeStatistics.vue'

export default {
  head() {
    return {
      title: this.$t('home.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('home.meta.title')
        }
      ]
    }
  },
  components: {
    HomeSlogan,
    HomeForWhom,
    HomeStatistics
  }
}
</script>

<style lang="scss">
a {
  text-decoration: none;
}

.brown a {
  color: #fff !important;
}

.rounded {
  border-radius: 100%;
}

.undeco {
  text-decoration: none;
}

.nuxt-link {
  color: #fff !important;
  text-decoration: none;
}

.ant-card-scientist {
  background-image: url(/img/ant_ml_25.png);
  background-size: 250px;
  background-position: -110px center;
  background-repeat: no-repeat;
}

.ant-card-racing {
  background-image: url(/img/ant_racing_25.png) !important;
  background-size: 250px;
  background-position: -110px center;
  background-repeat: no-repeat;
}

.brown-bg-1 {
  width: 100%;
  height: 100%;
  background-image: url(/img/brown-shape-1.png);
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.brown-bg-2 {
  width: 100%;
  height: 100%;
  background-image: url(/img/brown-shape-2.png);
  background-size: 120%;
  background-position: center center;
  background-repeat: no-repeat;
}

.bug {
  background-image: url(/img/bug.svg) !important;
  background-size: 200px;
  background-position: -110px center;
  background-repeat: no-repeat;
}

.mail {
  background-image: url(/img/mail.svg) !important;
  background-size: 200px;
  background-position: -110px center;
  background-repeat: no-repeat;
}
</style>
