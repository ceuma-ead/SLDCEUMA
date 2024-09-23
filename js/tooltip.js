// Seleciona todos os elementos com a classe tooltip-btn
var tooltipTriggerList = [].slice.call(document.querySelectorAll('.tooltip-btn'));

// Inicializa todos os tooltips
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});