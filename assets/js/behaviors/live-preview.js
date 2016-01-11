// -------------------------------------------
//   Live preview
// -------------------------------------------

Grapse.Behaviors.LivePreview = Essential.Behavior.extend({
  priority: 1,

  init: function() {
    this.parser = Grapse.Services.TextParser.new();
  },

  channels: {
    'editor:changed': 'refreshChannel'
  },

  refreshChannel: function(e) {
    this.refresh(e.detail.text);
  },

  refresh: function(text) {
    this.el.innerHTML = this.parser.parseGroff(text);
  }
});
