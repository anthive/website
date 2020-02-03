<template lang="pug">
    section
        v-container
            v-row.justify-center.align-start
                v-col.mb-4.text-center(cols= "12" md="4")
                    v-textarea#textarea(:value="playerRequest" height="200" placeholder="Loading..." ref="textarea" solo dark dense no-resize readonly)
                    p(v-if="frame") Ticks: {{ frame }} / {{ totalFrame }} 
                v-col.d-flex.justify-center(md="6")
                    div.ant-player.ah-container( id="player" )
                        h2.loading {{ $t('loading') }}
</template>

<script>
export default {
  data: () => ({
    totalFrame: null,
    playerRequest: '',
    status: 'Loading...',
    player: null,
    requests: [
      '{"antId":{"act":"move","dir":"right"}}',
      '{"antId":{"act":"move","dir":"up"}}',
      '{"antId":{"act":"move","dir":"down"}}'
    ],
    responses: ['Ant moved right', 'Ant moved up', 'Ant moved down'],
    counter: 0
  }),
  mounted() {
    const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/Kj5A2SydOFlqgLIu35Br.zip'
    if (dataUrl != null) {
      // eslint-disable-next-line
      this.player = new AnthivePlayer('#player', dataUrl)
      // eslint-disable-next-line
      this.player.on(AnthivePlayer.event.READY, () => {
        this.totalFrame = this.player.control.frameTotal
        this.player.control.speed = 0.5
      })
      // eslint-disable-next-line
      this.player.on(AnthivePlayer.event.END, () => {
        this.player.control.frame = 0
        this.player.control.play()
      })
    } else {
      this.status = "Can't find game."
    }
  },
  methods: {
    replay() {
      this.player.control.frame = 0
      this.player.control.play()
      this.isGameEnd = false
    },
    scrollTextarea() {
      this.$nextTick(() => {
        const textarea = this.$el.querySelector('#textarea')
        textarea.scrollTop = textarea.scrollHeight
      })
    },
    addDataToTextarea() {
      if (this.counter === 3) this.counter = 0
      this.playerRequest += `REQUEST #${this.frame + 1}: ${this.requests[this.counter]}\n`
      this.playerRequest += `RESPONSE: ${this.responses[this.counter]}\n\n`
      this.counter++
    }
  },
  computed: {
    frame() {
      if (this.player && this.player.control) return this.player.control.frame
    }
  },
  watch: {
    frame() {
      this.addDataToTextarea()
      this.scrollTextarea()
    }
  }
}
</script>

<style scoped>
</style>
