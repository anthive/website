<template lang="pug" >
  v-card(height="500") 
    v-toolbar(color='grey' dark flat)
      v-toolbar-title Your Sandbox
      template(v-slot:extension)
        v-tabs(v-model='tab' show-arrows)
          v-tabs-slider(color='yellow')
          v-tab(@change="onChangeTab(key)" v-for="(lang, key) in langs" :key='key') {{ lang }}
    v-tabs-items(v-model='tab')
      v-tab-item(eager v-for="(lang, key) in langs" :key='key')
        v-card(height='400' flat='')
          v-card-text
            div.editor(:id='key')
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import ace from 'ace-builds'
import 'ace-builds/src-min-noconflict/theme-monokai'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/snippets/javascript'
import 'ace-builds/src-min-noconflict/mode-golang'
import 'ace-builds/src-min-noconflict/snippets/golang'
import 'ace-builds/src-min-noconflict/mode-c_cpp'
import 'ace-builds/src-min-noconflict/snippets/c_cpp'
import 'ace-builds/src-min-noconflict/mode-php'
import 'ace-builds/src-min-noconflict/snippets/php'
import 'ace-builds/src-min-noconflict/mode-python'
import 'ace-builds/src-min-noconflict/snippets/python'

export default {
  data: () => ({
    langs : { 
      javascript: 'JavaScript',
      python: 'Python',
      golang: 'Golang',
      php: 'PHP',
      c_cpp: 'C++'
    },
    botTemplates : { 
      javascript: 'https://raw.githubusercontent.com/anthive/js/master/run.js',
      python: 'https://raw.githubusercontent.com/anthive/python/master/run.py',
      golang: 'https://raw.githubusercontent.com/anthive/go/master/main.go',
      php: 'https://raw.githubusercontent.com/anthive/php/master/run.php',
      c_cpp: 'https://raw.githubusercontent.com/anthive/cpp/master/bot.cpp'
    },
    currentLangTab: null,
    tab: null,
    editors: {},
    ed: null,
  }),
  props: {
    valueCode: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {
    this.initEditors()
  },
  beforeDestroy() {
    for (const lang in this.editors) {
      this.editors[lang].destroy()
    }
  },
  methods: {
    onChangeTab(lang) {
      console.log(lang)
      this.currentLangTab = lang
      this.emitVavueCode(lang)
    },
    initEditors() {
      for (const lang in this.botTemplates) {
        if (this.botTemplates.hasOwnProperty(lang)) {
          const ed = ace.edit(lang, {
            theme: "ace/theme/monokai",
            mode: `ace/mode/${lang}`,
            fontSize: 14,
            printMargin: false,
            autoScrollEditorIntoView: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
          })
          ed.on('change',(z) => this.emitVavueCode(lang))
          axios.get(this.botTemplates[lang])
            .then(res => {
              ed.setValue(res.data)
              this.editors[lang] = ed
              console.log(44)
              this.emitVavueCode(lang)
            })
            .catch(er => console.log(er))
        }
      }    
    },
    emitVavueCode(lang) {
      console.log(5, lang)
      if(this.currentLangTab === lang) {
        console.log(6)
        this.$emit('update:valueCode', {
          lang: lang,
          value: `${this.editors[lang].getValue()}`
        })
      }
    },
    initEditors2() {
       this.ed = ace.edit("javascript", {
        theme: "ace/theme/monokai",
        mode: "ace/mode/javascript",
        highlightGutterLine: false,
        autoScrollEditorIntoView: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
    }
  }
}
</script>
<style>
.editor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>

