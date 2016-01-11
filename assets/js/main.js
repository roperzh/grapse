// -------------------------------------------
//   Main
// -------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
  var editor = ace.edit("editor");
  var generator = new Jroff.HTMLGenerator();
  var preview = document.getElementById('result');

  editor.setTheme("ace/theme/chrome");
  editor.getSession().setMode("ace/mode/groff");

  editor.getSession().on('change', refreshPreview);

  function refreshPreview () {
    var result = generator.generate(editor.getValue(), 'doc');
    preview.innerHTML = result;
  };

  refreshPreview();
  refreshPreview();
});