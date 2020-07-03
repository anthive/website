<template>
  <section>
    <v-parallax src="/img/home_bg.png" height="500">
      <v-row class="justify-space-around align-center">
        <v-col class="pa-2" cols="12" sm="6" md="5" lg="4" xl="3">
          <v-card
            class="elevation-6 white pa-3 mail"
            style="padding-left: 70px !important;"
            height="100%"
          >
            <div class="headline text-xs-left px-0 brown--text text--lighten-2">
              {{ $t("home.subscribe") }}
            </div>
            <v-card-text class="body-1 text-xs-left px-0 grey--text">{{
              $t("home.feedbackText1")
            }}</v-card-text>
            <v-btn
              href="https://visitor.r20.constantcontact.com/d.jsp?llr=iei6rx6ab&p=oi&m=1131440677000&sit=hmwc8c9mb&f=c1095ec4-d2a5-4f31-85e6-9f5d16f7d72c"
              target="_blank"
              color="brown white--text darken-2 mx-0"
              >{{ $t("home.subscribe") }}</v-btn
            >
          </v-card>
        </v-col>
        <v-col class="pa-2" cols="12" sm="6" md="5" lg="4" xl="3">
          <v-card
            class="elevation-6 white pa-3 bug"
            style="padding-left: 70px !important;"
            height="100%"
          >
            <div class="headline text-xs-left px-0 brown--text text--lighten-2">
              {{ $t("footer.feedbackTitle") }}
            </div>
            <v-card-text class="body-1 text-xs-left px-0 grey--text">{{
              $t("home.feedbackText2")
            }}</v-card-text>
            <v-btn
              href="https://github.com/anthive/io/issues"
              color="brown white--text darken-2 mx-0"
              >{{ $t("footer.feedbackBtn") }}</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-parallax>
  </section>
</template>


<script>
export default {
  data: () => ({}),
  mounted() {},
  components: {}
}
</script>

<style>
</style>
