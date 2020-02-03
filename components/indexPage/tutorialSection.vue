<template lang="pug">
    section
        v-container
            v-row.justify-center.align-start
                v-col.mb-4.text-center(cols= "12" md="4")
                    v-textarea(solo  dark dense height="200" width="460" no-resize :value="playerRequest")
                v-col.d-flex.justify-center(md="6")
                    div.ant-player( id="player" )
                        h2.loading {{ $t('loading') }}
</template>

<script>
export default {
  data: () => ({
    playerRequest: null
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
