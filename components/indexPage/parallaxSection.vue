<template lang="pug">
    section
        v-parallax(src="/img/home_bg.png" height="700")
            v-container
                v-row.justify-center.align-start
                    v-col.mb-4.text-center(cols= "12" md="6")
                        div.white--text.mb-5.mt-0.display-2.font-weight-thin {{ $t('slogan1') }}
                        div.headline.font-weight-bold.orange--text.text--darken-1 {{ $t('slogan2') }}
                        div.hidden-sm-and-down.mt-2.title.font-weight-regular {{ $t('slogan3') }}
                    v-col.d-flex.justify-center(md="6")
                        div.ant-player( id="player" )
                            h2.loading {{ $t('loading') }}
</template>

<script>
export default {
  data: () => ({
    isPlaying: true
  }),
  mounted() {
    const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/Kj5A2SydOFlqgLIu35Br.zip'
    // eslint-disable-next-line
    new AnthivePlayer('#player', dataUrl)
  },
  methods: {}
}
</script>

<style scoped>
</style>>
