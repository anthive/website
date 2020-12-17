<template>
  <div class="editor__wrap">
    <v-card color="#272822" tile height="80vh">
      <v-slide-group class="editor__tab-slider" show-arrows v-model="tab">
        <template v-slot:prev>
          <AntHiveIcon icon="arrow-left-box" color="white" />
        </template>
        <v-slide-item
          v-for="(lang, index) in langs"
          :key="index"
          v-slot:default="{ active }"
        >
          <v-btn
            tile
            class="editor__tab-slider-item"
            text
            :input-value="active"
            active-class="editor__tab-slider-item--active"
            @click="onChangeTab(lang, index)"
          >
            {{ lang.name }}
          </v-btn>
        </v-slide-item>
        <template v-slot:next>
          <AntHiveIcon icon="arrow-right-box" color="white" />
        </template>
      </v-slide-group>
      <v-tabs-items class="editor-content" v-model="tab">
        <v-tab-item
          :transition="false"
          :reverse-transition="false"
          eager
          v-for="(lang, key) in langs"
          :key="key"
        >
          <v-card color="#272822" height="80vh" flat>
            <v-card-text>
              <div class="editor" :id="lang.editor" />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <h3 class="mt-3 mb-10" v-if="currentLangTab.sample">
        {{ $t("sandbox.sourceCode") }}:
        <a target="_blank" class="accent--text" :href="currentLangTab.sample">{{
          currentLangTab.sample
        }}</a>
      </h3>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import langs from '../static/langs/data.json'
import AntHiveIcon from '@/components/AntHiveIcon'

if (process.client) {
  var ace = require('ace-builds')
  require('ace-builds/src-min-noconflict/theme-monokai')
  require('ace-builds/src-min-noconflict/ext-language_tools')
  require('ace-builds/webpack-resolver')
}
export default {
  props: {
    valueCode: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    AntHiveIcon
  },
  data: () => ({
    langs: {},
    editor: null,
    tab: 0,
    editors: {},
    currentLangTab: {}
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
    onChangeTab(lang, tab) {
      this.tab = tab
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
      const codeUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${this.$route.query.box}.${
        this.$route.params.lang
      }`
      const resp = await axios.get(codeUrl)
      return resp.data
    },
    async fetchLangs() {
      this.langs = langs
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
  &__tab-slider {
    background-color: #616161 !important;
    &-item {
      color: hsla(0, 0%, 100%, 0.6) !important;
      box-sizing: content-box;
      padding: 5px 15px !important;
      &--active {
        color: $color-red-300 !important;
        border-bottom: 2px solid $color-red-300;
      }
    }
  }
  &__wrap {
    height: 100%;
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

.ace_scrollbar.ace_scrollbar-h {
  z-index: 1;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: $color-green-900;
  }
  &::-webkit-scrollbar-thumb {
    background: $color-red-400;
  }
}
</style>
