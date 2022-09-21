const {createApp} = Vue;

const app = createApp({
  data() {
    return {
      code:DEFAULT_GAME,
      currentMode: 'code',
      errorMessage:undefined,
    }
  },
  methods: {
    changecode(value){
      this.code = value;
    },
    error(e) {
      this.currentMode = 'code';
      this.errorMessage = e;
    },
    exportStandAlone(){
      exportStandAlone(this.code, 'asemic')
    },
    exportXML(){
      exportXML(this.code, 'asemic')
    }
  }
})

app.component('editor', {
  data() {
    return {
      editor:undefined
    }
  },
  props:['code'],
  template:'<div id="ace-editor"></div>',
  mounted() {
    this.editor = ace.edit("ace-editor");
    this.editor.session.setMode("ace/mode/xml");
    this.editor.setOption("showInvisibles", true);
    this.editor.setBehavioursEnabled(false);
    this.editor.setTheme("ace/theme/chrome");
    this.editor.setValue(this.code);
    this.editor.session.on('change', ()=>{
      let value = this.editor.getValue()
      this.$emit('changecode', value)
    });

  },
})

app.component('game', {
  props:['code'],
  template:'<div id="asemic" ref="game"></div>',
  mounted() {
    try {
      this.game = Game.fromText(this.code);
    } catch (e) {
      this.$emit('error', e);
      return;
    }
    this.game.init(this.$refs.game);
  },
  unmounted() {
    if(this.game){
      this.game.close();
    }
  },
})

app.mount('#app');
