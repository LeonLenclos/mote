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
    switchMode(mode){
      this.errorMessage = '';
      console.log(`Mode: ${mode}`)
      this.currentMode=mode;
      if(document.activeElement) document.activeElement.blur();
    },
    changecode(value){
      this.code = value;
    },
    error(e) {
      this.currentMode = 'code';
      this.errorMessage = e;
    },
    exportStandAlone(){
      exportStandAlone(this.code, 'mote')
    },
    exportXML(){
      exportXML(this.code, 'mote')
    }
  }
})

app.component('editor', {
  data() {
    return {
      editor:undefined,
      showInvisibles:false,
    }
  },
  props:['code'],
  template:`
  <div class="container">
    <main id="ace-editor">
    </main>
    <footer>
      <label for="showInvisibles">Show invisibles:
        <input type="checkbox" id="showInvisibles" v-model="showInvisibles" />
      </label>
      <label class="file-input" for="importXML">
        <input type="file" id="importXML" accept="application/xml" @change="importXML" />
        <span>Import XML</span>
      </label>
      <button @click="$emit('savecode')">save XML</button>
      </footer>
  </div>`,
  watch:{
    showInvisibles(val){
      this.editor.setOption("showInvisibles", val);
    }
  },
  methods:{
    importXML(event){
      event.target.files[0].text().then((value)=>{
        this.editor.setValue(value)
        this.$emit('changecode', value)
      })
    },
  },
  mounted() {
    this.editor = ace.edit("ace-editor");
    this.editor.session.setMode("ace/mode/xml");
    this.editor.setOption("showInvisibles", this.showInvisibles);
    this.editor.setOption("showPrintMargin", false);
    this.editor.setOption("displayIndentGuides", false);

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
  template:'<div id="mote"></div>',
  mounted() {
    try {
      this.game = Game.fromText(this.code);
    } catch (e) {
      this.$emit('error', e);
      return;
    }

    this.game.init(this.$el);
  },
  unmounted() {
    if(this.game){
      this.game.close();
    }
  },
})

app.mount('#app');
