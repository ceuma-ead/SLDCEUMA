document.addEventListener("DOMContentLoaded", function (event) {
  // Seleciona todos os elementos com a classe popover-btn
  renderPopover()
});



function renderPopover(){
  var popoverTriggerList = [].slice.call(document.querySelectorAll('.popover-btn'));

  // Inicializa todos os popovers
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
}