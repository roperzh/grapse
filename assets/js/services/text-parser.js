// -------------------------------------------
//   Text parser
// -------------------------------------------

Grapse.Services.TextParser = Proto.extend({
  constructor: function() {
    this.generator = new Jroff.HTMLGenerator();
    this.macroLib = 'doc';
  },

  setMacroLib: function(macroLib) {
    this.macroLib = macroLib;
  },

  parseGroff: function(text) {
    return this.generator.generate(text, this.macroLib);
  }
});
