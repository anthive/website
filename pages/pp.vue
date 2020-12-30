<template>
  <section class="page-wrap">
    <v-parallax src="/img/pre-footer.jpg" align="" height="300" />
    <v-row class="justify-center">
      <v-col cols="11" md="8">
        <v-card class="white text-xs-left pa-3 elevation-6 rules__card" flat="" tile="">
          <v-card-title class="primary--text font-weight-bold mb-5">Privacy Policy</v-card-title>
          <v-card-text class="primary--text white-space"/>
        </v-card>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('pp.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('pp.meta.title')
        }
      ]
    }
  }
}
</script>

<style>
.policy__card {
  margin-top: -178px;
}

.white-space {
  white-space: pre-line;
}
</style>
