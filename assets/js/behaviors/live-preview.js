// -------------------------------------------
//   Live preview
// -------------------------------------------

Grapse.Behaviors.LivePreview = Essential.Behavior.extend({
  priority: 1,

  init: function() {
    this.parser = Grapse.Services.TextParser.new();
  },

  channels: {
    'editor:changed': 'refreshChannel',
    'macroLibrary:changed': 'setMacroLib'
  },

  setMacroLib: function(e) {
    this.parser.setMacroLib(e.detail.macroLib);
    this.refresh(this.lastParsedText);
  },

  refreshChannel: function(e) {
    this.refresh(e.detail.text);
  },

  refresh: function(text) {
    this.lastParsedText = text;
    this.el.innerHTML = this.parser.parseGroff(text);
  }
});
