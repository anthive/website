<template>
  <v-card color="#272822" height="500"> 
    <v-tabs active-class="editor__active-tab" v-model="tab" show-arrows background-color="grey darken-2" dark>
      <v-tabs-slider color="#e1567c" />
      <v-tab
        :disabled="!lang.sampleCode"
        @change="onChangeTab(lang)"
        v-for="(lang, key) in langs"
        :key="key"
      >{{ lang.name }}</v-tab
      >
    </v-tabs>
    <v-tabs-items class="editor-content" v-model="tab">
      <v-tab-item :transition="false" :reverse-transition="false" eager v-for="(lang, key) in langs" :key="key">
        <v-card color="#272822" height="450" flat>  
          <v-card-text>
            <div class="editor" :id="lang.editor" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import axios from 'axios'
if (process.client) {
  var ace = require('ace-builds')
  require('ace-builds/src-min-noconflict/theme-monokai')
  require('ace-builds/src-min-noconflict/ext-language_tools')
}
export default {
  props: {
    valueCode: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    langs: {},
    editor: null,
    tab: 0,
    editors: {}
  }),
  async mounted() {
    await this.fetchLangs()
    this.currentLangTab = this.langs.find(lang => {
      return lang.extention === this.$route.params.lang
    })
    this.tab = this.langs.findIndex(lang => {
      return lang.extention === this.$route.params.lang
    })
    await this.initEditors(this.currentLangTab.editor)
  },
  beforeDestroy() {
    for (const lang in this.editors) {
      this.editors[lang].destroy()
    }
  },
  methods: {
    onChangeTab(lang) {
      this.$router.push(`/sandbox/${lang.extention}`)
    },
    async initEditors(lang) {
      new Promise(async resolve => {
        await require(`ace-builds/src-min-noconflict/mode-${lang}`)
        await require(`ace-builds/src-min-noconflict/snippets/${lang}`)
        return resolve()
      }).then(async () => {
        this.editor = ace.edit(lang, {
          theme: 'ace/theme/monokai',
          mode: `ace/mode/${lang}`,
          fontSize: 14,
          printMargin: false,
          autoScrollEditorIntoView: true,
          enableBasicAutocompletion: true,
          enableSnippets: true,
          enableLiveAutocompletion: true
        })

        let getCode = this.getDefaultGameCode

        if (this.$route.query.box) {
          getCode = this.getGameCode
        }

        const code = await getCode()

        this.editor.setValue(code)
        this.editor.clearSelection()
        this.editor.on('change', () => this.emitValueCode(lang))
        this.editors[lang] = this.editor
        this.emitValueCode(lang)
      })
    },
    async getDefaultGameCode() {
      const codeUrl = this.currentLangTab.sampleCode
      const resp = await axios.get(codeUrl)
      return resp.data
    },
    async getGameCode() {
      const codeUrl = `${process.env.SANDBOX_BUCKET}${this.$route.query.box}.${this.$route.params.lang}`
      const resp = await axios.get(codeUrl)
      return resp.data
    },
    async fetchLangs() {
      const resp = await axios.get('/langs/data.json')
      this.langs = resp.data
    },
    emitValueCode(lang) {
      if (this.currentLangTab.editor === lang && !!this.editors[lang]) {
        this.$emit('update:valueCode', {
          extention: this.currentLangTab.extention,
          lang: lang,
          value: `${this.editors[lang].getValue()}`
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/style/global.scss';
.editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  &__active-tab {
    color: $color-red-300 !important;
  }
}
// editor scrollbar
.ace_scrollbar.ace_scrollbar-v {
  z-index: 1;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: $color-green-900;
  }
  &::-webkit-scrollbar-thumb {
    background: $color-red-400;
  }
}
</style>
