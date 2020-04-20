<template >
  <div>
    <parallaxSection></parallaxSection>
    <stepsSection></stepsSection>
    <featureSection></featureSection>
    <videoSection></videoSection>
    <badgesSection></badgesSection>
    <feedbackSection></feedbackSection>
  </div>
</template>
<script>
import parallaxSection from '../components/indexPage/parallaxSection.vue'
import stepsSection from '../components/indexPage/stepsSection.vue'
import featureSection from '../components/indexPage/featureSection.vue'
import videoSection from '../components/indexPage/videoSection.vue'
import badgesSection from '../components/indexPage/badgesSection.vue'
import feedbackSection from '../components/indexPage/feedbackSection.vue'

export default {
  data: () => ({}),
  components: {
    parallaxSection,
    stepsSection,
    featureSection,
    videoSection,
    badgesSection,
    feedbackSection
  }
}
</script>

<style>
.texture-arrows {
  will-change: clip-path, padding-top, padding-bottom;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  transition: clip-path 0.2s ease-out 0s, padding-top 0.2s ease-out 0s, padding-bottom 0.2s ease-out 0s;
  background: url(/img/texture/texture-arrows.png) 0px 0px / 300px 300px,
    linear-gradient(315deg, rgb(24, 13, 28) 0.57%, rgb(69, 38, 80) 100%) 0% 0% / cover;
  background-image: url(/img/texture/texture-arrows.png),
    linear-gradient(315deg, rgb(24, 13, 28) 0.57%, rgb(69, 38, 80) 100%);
  background-repeat: repeat;
}

.texture-scrabble {
  will-change: clip-path, padding-top, padding-bottom;
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  transition: clip-path 0.2s ease-out 0s, padding-top 0.2s ease-out 0s, padding-bottom 0.2s ease-out 0s;
  background: url(/img/texture/texture-scrabble.png) 0px 0px / 300px 300px,
    linear-gradient(315deg, rgb(24, 13, 28) 0.57%, rgb(69, 38, 80) 100%) 0% 0% / cover;
  background-image: url(/img/texture/texture-scrabble.png),
    linear-gradient(315deg, rgb(24, 13, 28) 0.57%, rgb(69, 38, 80) 100%);
  background-repeat: repeat;
}

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
