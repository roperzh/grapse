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