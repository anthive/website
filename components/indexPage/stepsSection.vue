<template>
  <section class="steps pt-10 pb-12">
    <v-container>
      <v-row
        ><span
          class="f-rubik f-title text-center primary--text mx-auto mt-12 mb-5"
          >{{ $t("stepsTitle") }}</span
        ></v-row
      >
      <v-row justify-center>
        <v-col class="pa-2 justify-left" cols="12" md="4">
          <v-card class="elevation-0 white" height="100%">
            <v-card-title class="pt-3 f-rubik f-text-large primary--text">{{
              $t("step1Title")
            }}</v-card-title>
            <v-card-text class="f-rubik f-text primary--text"
              >{{ $t("step1Text1") }}
              <a href="https://github.com/new/import" class="accent--text">{{
                $t("import")
              }}</a>
              {{ $t("step1Text2") }}
            </v-card-text>
            <div class="text-xs-left">
              <div class="steps__lang-panel mx-3">
                <a href="https://github.com/anthive/js" target="_blank"
                  ><img class="mx-1" width="50px" src="/lang-icons/js.svg"
                /></a>
                <a href="https://github.com/anthive/python" target="_blank"
                  ><img class="mx-1" width="50px" src="/lang-icons/python.svg"
                /></a>
                <a href="https://github.com/anthive/go" target="_blank"
                  ><img class="mx-1" width="50px" src="/lang-icons/go.svg"
                /></a>
                <a href="https://github.com/anthive/cpp" target="_blank"
                  ><img
                    class="mx-1"
                    width="50px"
                    src="/lang-icons/c-plus-plus.svg"
                /></a>
                <a href="https://github.com/anthive/php" target="_blank"
                  ><img
                    class="mx-1 my-3"
                    width="50px"
                    src="/lang-icons/php.svg"
                /></a>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col class="pa-2 justify-left" cols="12" md="4">
          <v-card class="elevation-0 white" height="100%">
            <v-card-title class="pt-3 f-rubik f-text-large primary--text">{{
              $t("step2Title")
            }}</v-card-title>
            <v-card-text class="f-rubik f-text primary--text"
              >{{ $t("step2Text") }}
            </v-card-text>
            <AntHiveBtn
              class="ma-3"
              :to="localePath('rules')"
              fill
              href="https://profile.anthive.io/login/"
              >{{ $t("profile") }}</AntHiveBtn
            >
          </v-card>
        </v-col>
        <v-col class="pa-2 justify-left" cols="12" md="4">
          <v-card class="elevation-0 white" height="100%">
            <v-card-title class="pt-3 f-rubik f-text-large primary--text">{{
              $t("step3Title")
            }}</v-card-title>
            <v-card-text class="f-rubik f-text primary--text"
              >{{ $t("step3Text") }}
              <a :to="localePath('leaderboard')" class="accent--text"
                >{{ $t("step3leaderboard") }}
              </a></v-card-text
            >
            <AntHiveBtn class="ma-3" :to="localePath('rules')" fill>{{
              $t("rules")
            }}</AntHiveBtn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>


<script>
import AntHiveBtn from '@/components/AntHiveBtn'
export default {
  data: () => ({}),
  mounted() {},
  components: { AntHiveBtn }
}
</script>

<style lang="scss" scoped>
.steps {
  background-color: white;
  clip-path: polygon(0% 0%, 100% 3.49vw, 100% 100%, 0% 100%);
  margin-top: -95px;
}

a {
  text-decoration: none;
}
</style>
