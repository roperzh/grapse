// -------------------------------------------
//   Macro switch
// -------------------------------------------

Grapse.Behaviors.MacroSwitch = Essential.Behavior.extend({
  mappings: {
    'true': 'an',
    'false': 'doc'
  },

  events: {
    'change': 'emitChange'
  },

  emitChange: function(e) {
    var macroLib = this.mappings[this.el.checked];

    this.emit({
      channel: 'macroLibrary:changed',
      data: {
        macroLib: macroLib
      }
    });
  }
});