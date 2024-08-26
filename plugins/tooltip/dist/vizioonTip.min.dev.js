"use strict";

//  __      ___     _                     _______ _       
//  \ \    / (_)   (_)                   |__   __(_)      
//   \ \  / / _ _____  ___   ___  _ __      | |   _ _ __  
//    \ \/ / | |_  / |/ _ \ / _ \| '_ \     | |  | | '_ \ 
//     \  /  | |/ /| | (_) | (_) | | | |    | |  | | |_) |
//      \/   |_/___|_|\___/ \___/|_| |_|    |_|  |_| .__/ 
//                                                 | |    
//                                                 |_|   
//  - V:0.0.1
//  - Plugin Desenvolvido : Daniel Estevão Martins Mendes
//  - License: Ceuma Corporation
//  - Auth: 23iwe924u
document.addEventListener('DOMContentLoaded', function () {
  // Adiciona o evento de hover para todos os elementos com atributos de tooltip
  document.querySelectorAll('[vizioon-tip]').forEach(function (element) {
    var tooltipText = element.getAttribute('vizioon-tip');
    var position = element.getAttribute('vizioon-posicao') || 'top';
    var attribute_tip = element.getAttribute('vizioon-attr'); // Cria o elemento do tooltip

    var tooltip = document.createElement('div');
    tooltip.className = "tooltip ".concat(position);
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip); // Função para mostrar o tooltip

    var showTooltip = function showTooltip(event) {
      tooltip.classList.add('tooltip-visible');

      if (attribute_tip) {
        // Adiciona cada classe individualmente
        var classes = attribute_tip.split(' ');
        classes.forEach(function (cls) {
          return tooltip.classList.add(cls);
        });
      }

      tooltip.style.display = "block";
      var rect = element.getBoundingClientRect();
      var tooltipRect = tooltip.getBoundingClientRect(); // Calcula a posição do tooltip

      switch (position) {
        case 'top':
          tooltip.style.left = "".concat(rect.left + rect.width / 2 - tooltipRect.width / 2, "px");
          tooltip.style.top = "".concat(rect.top - tooltipRect.height, "px");
          tooltip.style.marginTop = "-1rem";
          break;

        case 'right':
          tooltip.style.left = "".concat(rect.right, "px");
          tooltip.style.top = "".concat(rect.top + rect.height / 2 - tooltipRect.height / 2, "px");
          break;

        case 'bottom':
          tooltip.style.left = "".concat(rect.left + rect.width / 2 - tooltipRect.width / 2, "px");
          tooltip.style.top = "".concat(rect.bottom, "px");
          break;

        case 'gbottom':
          tooltip.style.left = "".concat(rect.left + rect.width / 2 - tooltipRect.width / 2, "px");
          tooltip.style.top = "".concat(rect.bottom, "px");
          tooltip.style.marginTop = "1rem";
          break;

        case 'left':
          tooltip.style.left = "".concat(rect.left - tooltipRect.width, "px");
          tooltip.style.top = "".concat(rect.top + rect.height / 2 - tooltipRect.height / 2, "px");
          break;
      }
    }; // Função para esconder o tooltip


    var hideTooltip = function hideTooltip() {
      tooltip.classList.remove('tooltip-visible');
    }; // Adiciona os eventos de mouse


    element.addEventListener('mouseover', showTooltip);
    element.addEventListener('mouseout', hideTooltip);
  });
});