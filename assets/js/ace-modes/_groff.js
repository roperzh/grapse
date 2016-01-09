ace.define('ace/mode/matching_brace_outdent', function(require, exports, module) {
  'use strict';

  var Range = require('../range').Range;

  var MatchingBraceOutdent = function() {};

  (function() {

    this.checkOutdent = function(line, input) {
    };

    this.autoOutdent = function(doc, row) {
    };

    this.$getIndent = function(line) {
      return line.match(/^\s*/)[0];
    };

  }).call(MatchingBraceOutdent.prototype);

  exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

ace.define('ace/mode/groff_highlight_rules', function(require, exports, module) {
  'use strict';

  var oop = require('../lib/oop');
  var TextHighlightRules = require('./text_highlight_rules').TextHighlightRules;

  var GroffHighlightRules = function() {
    this.$rules = {
      'start': [{
        token: 'keyword.bold',
        regex: /^\.\S+/,
        next: 'parameter'
      }, {
        token: 'comment',
        regex: '(?:^|\\s)\\\\\"[\\s\\S]*$'
      }],
      'parameter': [{
        token: 'variable',
        regex: '.+',
        next: 'start'
      }]
    };
  };

  oop.inherits(GroffHighlightRules, TextHighlightRules);

  exports.GroffHighlightRules = GroffHighlightRules;

});


ace.define('ace/mode/groff', function(require, exports, module) {
  'use strict';

  var oop = require('../lib/oop');
  // defines the parent mode
  var TextMode = require('./text').Mode;
  var Tokenizer = require('../tokenizer').Tokenizer;
  var MatchingBraceOutdent = require('./matching_brace_outdent').MatchingBraceOutdent;

  // defines the language specific highlighters and folding rules
  var GroffHighlightRules = require('./groff_highlight_rules').GroffHighlightRules;

  var Mode = function() {
    // set everything up
    this.HighlightRules = GroffHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
  };
  oop.inherits(Mode, TextMode);

  (function() {
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

    this.createWorker = function(session) {};

  }).call(Mode.prototype);

  exports.Mode = Mode;
});