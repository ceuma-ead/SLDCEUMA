document.addEventListener("DOMContentLoaded", function (event) {
  // Seleciona todos os elementos com a classe popover-btn
  renderPopover()
});



function renderPopover(){
  // Inicializa todos os popovers
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  var popoverList  = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl , {
      trigger: 'hover'
    });
  });
}