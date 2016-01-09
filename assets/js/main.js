ace.define("ace/mode/groff_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

  var GroffHighlightRules = function() {

    this.$rules = {
      "start": [{
        token: "keyword.bold",
        regex: /^\.\S+/,
        next: "parameter"
      }, {
        token : "comment",
        regex : '(?:^|\\s)\\\\\"[\\s\\S]*$'
      }],
      "parameter": [{
        token: "variable",
        regex : ".+",
        next: "start"
      }]
    };
  };

  oop.inherits(GroffHighlightRules, TextHighlightRules);

  exports.GroffHighlightRules = GroffHighlightRules;

});


ace.define("ace/mode/groff", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(require, exports, module) {
  "use strict";

  var oop = require("../lib/oop");
  // defines the parent mode
  var TextMode = require("./text").Mode;
  var Tokenizer = require("../tokenizer").Tokenizer;
  var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;

  // defines the language specific highlighters and folding rules
  var GroffHighlightRules = require("./groff_highlight_rules").GroffHighlightRules;

  var Mode = function() {
    // set everything up
    this.HighlightRules = GroffHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
  };
  oop.inherits(Mode, TextMode);

  (function() {
    // configure comment start/end characters
    // this.lineCommentStart = '\\\"';

    // special logic for indent/outdent.
    // By default ace keeps indentation of previous line
    this.getNextLineIndent = function(state, line, tab) {
      var indent = this.$getIndent(line);
      return indent;
    };

    this.checkOutdent = function(state, line, input) {
      return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
      this.$outdent.autoOutdent(doc, row);
    };

    // create worker for live syntax checking
    this.createWorker = function(session) {
      // var worker = new WorkerClient(["ace"], "ace/mode/mynew_worker", "NewWorker");
      // worker.attachToDocument(session.getDocument());
      // worker.on("errors", function(e) {
      //     session.setAnnotations(e.data);
      // });
      // return worker;
    };

  }).call(Mode.prototype);

  exports.Mode = Mode;
});

// -------------------------------------------
//   Main
// -------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  var editor = ace.edit("editor");
  var generator = new Jroff.HTMLGenerator();

  editor.setTheme("ace/theme/chrome");
  editor.getSession().setMode("ace/mode/groff");

  editor.getSession().on('change', function(e) {
    var result = generator.generate(editor.getValue(), 'doc');
    document.getElementById('result').innerHTML = result;
  });


});