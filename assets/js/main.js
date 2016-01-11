// -------------------------------------------
//   Main
// -------------------------------------------

Grapse = {};
Grapse.Behaviors = {};
Grapse.Services = {};

document.addEventListener('DOMContentLoaded', function() {
  Essential.loadBehaviors({
    application: Grapse.Behaviors,
    context: document
  });
});