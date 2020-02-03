
<template lang="pug">
    #editor function foo(items) { var x = "All this is syntax highlighted"; return x;
</template>
<script>
/* eslint-disable */
// import ace from 'ace-builds'

export default {
  data: () => ({
    isPlaying: true
  }),
  mounted() {
    var editor = ace.edit('editor')
    editor.setTheme('ace/theme/monokai')
    editor.session.setMode('ace/mode/golang')
    console.log(ace)
  },
  methods: {}
}
</script>
<style>
#editor {
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
