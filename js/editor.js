const {createApp} = Vue;

const app = createApp({
  data() {
    return {
      localization:'en',
      supportedLanguages:['en', 'fr'],
      code:Cookies.get('code') || '',
      currentMode: 'code',
      errorMessage:undefined,
    }
  },
  mounted(){
    this.supportedLanguages.forEach(lang=>{
      if(navigator.language.startsWith(lang)) this.localization = lang;
    });
  },
  methods: {
    localize(key){
      return editorLocalization[key][this.localization];
    },
    switchMode(mode){
      this.errorMessage = '';
      this.currentMode=mode;
      this.localSave();
      if(document.activeElement) document.activeElement.blur();
    },
    changecode(value){
      this.code = value;
      this.localSave();
    },
    localSave(){
      Cookies.set('code', this.code)
    },
    error(e) {
      this.currentMode = 'code';
      this.errorMessage = e;
    },
    exportStandAlone(){
      try {
        exportStandAlone(this.code, 'mote')
      } catch (e) {
        alert(this.localize('export_failed'))
      }
    },
    exportXML(){
      exportXML(this.code, 'mote')
      this.localSave();
    }
  }
})

app.component('editor', {
  data() {
    return {
      showHelp:false,
      editor:undefined,
      showInvisibles:false,
      schema:moteSchema,
      doc:editorDynamicDoc,
    }
  },
  props:['code'],
  template:`
  <div class="container">
    <Transition name="slide">
      <aside v-if="showHelp" id="help">
        <div class="help-container">
          
        <table v-for="chapter in doc">
          <tr><th colspan="42">{{chapter.title[$root.localization]}}</th></tr>
          <tr v-if="chapter.intro"><td colspan="42"><p v-html="chapter.intro[$root.localization]"></p></td></tr>
          <tr v-if="chapter.content?.type == 'tag'" v-for="tag in chapter.content.list">
            <td><code>&lt;{{schema.tags[tag].localization[$root.localization]}}&gt;</code></td>
            <td>{{schema.tags[tag].doc[$root.localization]}}</td>
          </tr>
          <tr v-if="chapter.content?.type == 'rule'" v-for="rule in chapter.content.list">
            <td>
              <code>{{schema.rules[rule].localization[$root.localization]}}=""</code>
              </td>
              <td>
              <p>{{schema.rules[rule].doc[$root.localization]}}</p>
              <p>{{schema.rules[rule].validation.description[$root.localization]}}</p>
              <p>({{$root.localize('default_value')}}<code v-if="schema.rules[rule].keywords">"{{schema.keywords[schema.rules[rule].keywords].find(kw=>kw.localization.en==schema.rules[rule].default).localization[$root.localization]}}"</code><code v-else>"{{schema.rules[rule].default}}"</code>)</p>
            </td>
          </tr>
  
        </table>

        </div>
      </aside>
    </Transition>
    <main id="ace-editor">
    </main>
    <footer>
      <label for="showInvisibles">{{$root.localize('showInv')}}
        <input type="checkbox" id="showInvisibles" v-model="showInvisibles" />
      </label>
      <label class="file-input" for="importXML">
        <input type="file" id="importXML" accept="application/xml" @change="importXML" />
        <span>{{$root.localize('importXML')}}</span>
      </label>
      <button @click="$emit('savecode')">{{$root.localize('exportXML')}}</button>
      <button @click="toggleHelp()" :class={active:showHelp}>{{$root.localize('help')}}</button>
      </footer>
    </div>`,
  watch:{
    showInvisibles(val){
      this.editor.setOption("showInvisibles", val);
    }
  },
  methods:{
    toggleHelp(){
      this.showHelp = !this.showHelp;
    },
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
    this.editor.setValue(this.code, -1);
    this.editor.session.setTabSize(1);
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

app.component('option-select', {
  data(){return{
    showOptions:false,
  }},
  props: ['modelValue', 'options'],
  emits: ['update:modelValue'],
  methods: {
    toggleOptions(){
      this.showOptions = !this.showOptions;
    },
    select(value){
      this.toggleOptions();
      this.$emit('update:modelValue', value);
    },
  },
  template:`<div class="optionselect">
    <button @click="toggleOptions()" :class={active:showOptions}>{{modelValue}}</button>
    <ul v-if="showOptions" class="options">
      <li v-for="option in options">
        <button @click="select(option.value)">{{option.name}}</button>
      </li>
    </ul>
  </div>`,
});

app.mount('#app');
