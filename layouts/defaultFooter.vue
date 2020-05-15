<template>
  <v-footer
    class="footer texture-arrows pa-4 elevation-2 d-flex justify-space-around"
    app
    tag="footer"
    absolute
  >
    <div col="12" md="3" class="footer__copyright f-rubik text-center">
      <span>AntHive.IO</span>
      <span class="mx-2">
        Copyright&copy;, {{ new Date().getFullYear() }}
      </span>
      
    </div>

    <div col="12" md="6" class="footer__subscribe f-rubik text-center">
      <span class="mr-2">{{ $t("feedbackText1") }}</span>
      <AntHiveBtn
        href="https://visitor.r20.constantcontact.com/d.jsp?llr=iei6rx6ab&amp;p=oi&amp;m=1131440677000&amp;sit=hmwc8c9mb&amp;f=c1095ec4-d2a5-4f31-85e6-9f5d16f7d72c"
        target="_blank"
        fill
        color="brown white--text darken-2 mx-0"
        >{{ $t("subscribe") }}</AntHiveBtn
      >
    </div>
    <div col="12" md="3" class="footer__issue f-rubik text-center">
      <span>{{ $t("feedbackTitle2") }}</span>
      <AntHiveBtn
        href="https://visitor.r20.constantcontact.com/d.jsp?llr=iei6rx6ab&amp;p=oi&amp;m=1131440677000&amp;sit=hmwc8c9mb&amp;f=c1095ec4-d2a5-4f31-85e6-9f5d16f7d72c"
        target="_blank"
        color="brown white--text darken-2 mx-0"
        >{{ $t("feedbackBtn2") }}</AntHiveBtn
      >
    </div>
  </v-footer>
</template>




<script>
export default {
  name: 'defaultFooter',
  data: () => ({}),
  mounted() {},
  components: {}
}
</script>

<style lang="scss" scoped>
.footer {
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
  &__copyright {
    color: white;
  }
  &__subscribe {
    color: white;
  }
  &__issue {
    color: white;
  }
}
</style>
