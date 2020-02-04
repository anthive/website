<template lang="pug" >
  v-card {{editors}}
    v-toolbar(color='grey' dark flat)
      v-toolbar-title Your Sandbox
      template(v-slot:extension)
        v-tabs(v-model='tab' show-arrows)
          v-tabs-slider(color='yellow')
          v-tab(v-for="(lang, key) in langs" :key='key') {{ lang }}
    v-tabs-items(v-model='tab')
      v-tab-item(eager v-for="(lang, key) in langs" :key='key')
        v-card(height='300' flat='')
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
import 'ace-builds/src-min-noconflict/worker-javascript'

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
    tab: null,
    editors: {},
    ed: null,
  }),
  mounted() {
    this.initEditors()
    // this.ed = ace.edit("JavaScript", {
    //     theme: "ace/theme/monokai",
    //     mode: "ace/mode/javascript",
    //     highlightGutterLine: false,
    //     autoScrollEditorIntoView: true,
    //     enableBasicAutocompletion: true,
    //     enableSnippets: true,
    //     enableLiveAutocompletion: true
    // });
    // this.ed2 = ace.edit("editor2", {
    //     theme: "ace/theme/monokai",
    //     mode: "ace/mode/javascript",
    //     autoScrollEditorIntoView: true,
    //     enableBasicAutocompletion: true,
    //     enableSnippets: true,
    //     enableLiveAutocompletion: true
    // });
  //   axios.get('https://raw.githubusercontent.com/anthive/js/master/run.js')
  //   .then((response) => {
  //   // handle success
  //   this.ed.setValue(response.data)
  //   // this.ed2.setValue(response.data)
  //   console.log(response.data, this.ed);
  // })
    // var editor = ace.edit('editor')
    // editor.setTheme('ace/theme/monokai')
    // editor.session.setMode('ace/mode/javascript')
    // // editor.session.setMode('ace/mode/golang')
    // console.log(ace)
  },
  methods: {
    initEditors() {
      for (const lang in this.botTemplates) {
        if (this.botTemplates.hasOwnProperty(lang)) {
          console.log(23423, lang);
          const ed = ace.edit(lang, {
            theme: "ace/theme/monokai",
            mode: `ace/mode/${lang}`,
            autoScrollEditorIntoView: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
          })
          axios.get(this.botTemplates[lang])
            .then(res => ed.setValue(res.data))
            .then(() => this.editors[land] = ed)
            .catch(er => console.log(er))
        }
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

//     watch:{
//         value:function (val) {
//             if(this.contentBackup !== val){
//                 this.editor.session.setValue(val,1);
//                 this.contentBackup = val;
//             }
//         },
//         theme:function (newTheme) {
//             this.editor.setTheme('ace/theme/'+newTheme);
//         },
//         lang:function (newLang) {
//             this.editor.getSession().setMode(typeof newLang === 'string' ? ( 'ace/mode/' + newLang ) : newLang);
//         },
//         options:function(newOption){
//             this.editor.setOptions(newOption);
//         },
//         height:function(){
//             this.$nextTick(function(){
//                 this.editor.resize()
//             })
//         },
//         width:function(){
//             this.$nextTick(function(){
//                 this.editor.resize()
//             })
//         }
//     },
//     beforeDestroy: function() {
//         this.editor.destroy();
//         this.editor.container.remove();
//     },
//     mounted: function () {
//         var vm = this;
//         var lang = this.lang||'text';
//         var theme = this.theme||'chrome';

//         require('brace/ext/emmet');

//         var editor = vm.editor = ace.edit(this.$el);
//         editor.$blockScrolling = Infinity;

//         this.$emit('init',editor);
        
//         //editor.setOption("enableEmmet", true);
//         editor.getSession().setMode(typeof lang === 'string' ? ( 'ace/mode/' + lang ) : lang);
//         editor.setTheme('ace/theme/'+theme);
//         if(this.value)
//             editor.setValue(this.value,1);
//         this.contentBackup = this.value;

//         editor.on('change',function () {
//             var content = editor.getValue();
//             vm.$emit('input',content);
//             vm.contentBackup = content;
//         });
//         if(vm.options)
//             editor.setOptions(vm.options);
//     }
// }
