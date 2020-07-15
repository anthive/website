<template>
  <section class="steps">
    <v-container>
      <v-row
        ><span
          class="f-rubik f-subtitle text-center primary--text mx-auto mt-12 mb-5"
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
              color="accent"
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
            <AntHiveBtn class="ma-3" :to="localePath('rules')" color="accent">{{
              $t("header.rules")
            }}</AntHiveBtn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.steps {
  background-color: $color-white;
  clip-path: polygon(0% 0%, 100% 3.49vw, 100% 100%, 0% 100%);
  margin-top: -130px;
  padding: 70px 0 90px;
  &__lang-panel-img {
    box-sizing: content-box;
    margin: 10px;
    transition: 0.1s;
    border-radius: $border-radius-default;
  }
  &__lang-panel-img:hover {
    box-shadow: $box-shadow-hover;
    transition: 0.1s;
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
