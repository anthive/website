<template lang="pug">
	section
		v-parallax(src='/img/home_bg.png', height='300')
		v-row.mx-2
			v-col(cols="12")
				v-card.white.pa-3.elevation-6.rules__card
					v-card-title {{ "sandbox" }}
					v-row
						v-col.conte(cols="6")
							//- v-card-text.white-space {{ $t('rulesText') }}
							editor
								//- code.python def openFile(path): file = open(path, "r") content = file.read() file.close() return content
						v-col(cols="6")
							#player
</template>
<script>
import editor from '@/components/editor.vue'

export default {
  data: () => ({
    isPlaying: true
  }),
  mounted() {
    const dataUrl = 'https://storage.googleapis.com/anthive-dev-games/Kj5A2SydOFlqgLIu35Br.zip'
    // eslint-disable-next-line
	new AnthivePlayer('#player', dataUrl)
  },
  components: {
    editor
  }
}
</script>
<style>
.conte {
  position: relative;
  height: 200px;
}
.rules__card {
  margin-top: -250px;
}

.white-space {
  white-space: pre-line;
}
</style>
