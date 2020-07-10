<template>
  <section class="steps pt-10 pb-12">
    <v-container>
      <v-row
        ><span
          class="f-rubik f-title text-center primary--text mx-auto mt-12 mb-5"
          >{{ $t("home.stepsTitle") }}</span
        ></v-row
      >
      <v-row justify-center>
        <v-col class="pa-2 justify-left" cols="12" md="4">
          <v-card class="steps__step elevation-0 white" height="100%">
            <v-card-title  class="steps__step-title pt-3 f-rubik f-text-large primary--text">{{
              $t("home.step1Title")
            }}</v-card-title>
            <v-card-text class=" f-rubik f-text primary--text"
              >{{ $t("home.step1Text1") }}
              <a href="https://github.com/new/import" class="accent--text">{{
                $t("home.import")
              }}</a>
              {{ $t("home.step1Text2") }}
            </v-card-text>
            <div class="text-xs-left">
              <div class="steps__lang-panel mx-3">
                <a href="https://github.com/anthive/js" target="_blank"
                  ><img class=" steps__lang-panel-img" width="40px" src="/skins/lang/js.png" alt="js"
                /></a>
                <a href="https://github.com/anthive/python" target="_blank"
                  ><img class=" steps__lang-panel-img" width="40px" src="/skins/lang/python3.png" alt="python3"
                /></a>
                <a href="https://github.com/anthive/go" target="_blank"
                  ><img class=" steps__lang-panel-img" width="40px" src="/skins/lang/go.png" alt="go"
                /></a>
                <a href="https://github.com/anthive/cpp" target="_blank"
                  ><img
                    class=" steps__lang-panel-img"
                    width="40px"
                    src="/skins/lang/cpp.png"
                    alt="cpp"
                /></a>
                <a href="https://github.com/anthive/php" target="_blank"
                  ><img
                    class=" steps__lang-panel-img"
                    width="40px"
                    src="/skins/lang/php.png"
                    alt="php"
                /></a>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col class="pa-2 justify-left" cols="12" md="4">
          <v-card class="steps__step elevation-0 white" height="100%">
            <v-card-title class="steps__step-title pt-3 f-rubik f-text-large primary--text">{{
              $t("home.step2Title")
            }}</v-card-title>
            <v-card-text class="f-rubik f-text primary--text"
              >{{ $t("home.step2Text") }}
            </v-card-text>
            <AntHiveBtn
              class="ma-3"
              :to="localePath('rules')"
              fill
              href="https://profile.anthive.io/login/"
              >{{ $t("home.profile") }}</AntHiveBtn
            >
          </v-card>
        </v-col>
        <v-col class="pa-2 justify-left" cols="12" md="4">
          <v-card class="steps__step elevation-0 white" height="100%">
            <v-card-title class="steps__step-title pt-3 f-rubik f-text-large primary--text">{{
              $t("home.step3Title")
            }}</v-card-title>
            <v-card-text class=" f-rubik f-text primary--text"
              >{{ $t("home.step3Text") }}
              <a :to="localePath('leaderboard')" class="accent--text"
                >{{ $t("home.step3leaderboard") }}
              </a></v-card-text
            >
            <AntHiveBtn class="ma-3" :to="localePath('rules')" fill>{{
              $t("header.rules")
            }}</AntHiveBtn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>


<script>
export default {
  data: () => ({}),
  mounted() {},
  components: {}
}
</script>

<style lang="scss" scoped>
.steps {
  background-color: white;
  clip-path: polygon(0% 0%, 100% 3.49vw, 100% 100%, 0% 100%);
  margin-top: -95px;
  &__lang-panel-img {
    box-sizing: content-box;
    padding: 10px;
    transition: 0.7s;
    border-radius: 10px;
  }
  &__lang-panel-img:hover {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    transition: 0.7s;
  }
  &__step-title {
    justify-content: center;
  }
  &__step {
    text-align: center;
  }
}

a {
  text-decoration: none;
}
</style>
