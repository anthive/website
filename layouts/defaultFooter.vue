<template>
  <v-footer
    class="footer texture-arrows pa-4 elevation-2 d-flex justify-space-around"
    app
    tag="footer"
    absolute
  >
    <div class="footer__copyright f-rubik col-3 text-center">
      <span>AntHive.IO</span>
      <span class="mx-2">
        Copyright&copy;, {{ new Date().getFullYear() }}
      </span>
      
    </div>

    <div class="footer__subscribe f-rubik col-6 text-center">
      <span class="mr-2">{{ $t("feedbackText1") }}</span>
      <AntHiveBtn
        href="https://visitor.r20.constantcontact.com/d.jsp?llr=iei6rx6ab&amp;p=oi&amp;m=1131440677000&amp;sit=hmwc8c9mb&amp;f=c1095ec4-d2a5-4f31-85e6-9f5d16f7d72c"
        target="_blank"
        fill
        color="brown white--text darken-2 mx-0"
        >{{ $t("subscribe") }}</AntHiveBtn
      >
    </div>
    <div class="footer__issue col-3 f-rubik text-center">
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
import AntHiveBtn from '@/components/AntHiveBtn'
export default {
  name: 'defaultFooter',
  data: () => ({}),
  mounted() {},
  components: { AntHiveBtn }
}
</script>

<style lang="scss" scoped>
.footer {
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
