// ==UserScript==
// @name         BTN HTML5 Trailers
// @namespace    http*://*broadcasthe.net/*
// @version      0.1
// @description  "Fix" BTN's trailers by replacing the DOM old/flash with the new/HTML5 (iframe)
// @author       PuNkFuSe
// @match        https://www.broadcasthe.net/series.php?id=*
// @icon         https://datfunc.github.io/btn/assets/icons/play-trailer_alt.svg
// @updateURL    https://datfunc.github.io/btn/scripts/btn_html5-trailers.user.js
// @downloadURL  https://datfunc.github.io/btn/scripts/btn_html5-trailers.user.js
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(() => {
  'use strict';

  const applyStyling = (styles) => {
    const style = document.createElement('style');
    let styleContent = '';
    for (let selector in styles) styleContent += `${selector} { ${styles[selector]} }`;
    style.innerHTML = styleContent;
    document.head.appendChild(style);
  };

  applyStyling({
    '#trailer': 'opacity: 1 !important;',
    '#playbutton': 'opacity: 1; cursor: pointer; transition: 0.3s;',
    '#trailerinner':
      'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);',
  });

  const disconnectObserver = (observer) => observer.disconnect();

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList' && mutation.removedNodes.length) {
        Array.from(mutation.removedNodes).forEach((node) => {
          if (node.id === 'trailer') disconnectObserver(observer);
        });
      }

      if (
        mutation.addedNodes.length > 0 &&
        mutation.addedNodes[0].id === 'trailer'
      ) {
        const trailerContainerInnerContent =
          document.getElementById('trailerinner');
        if (trailerContainerInnerContent?.childNodes.length > 0) {
          const embedNode =
            trailerContainerInnerContent.querySelector('#video > embed');
          if (embedNode) {
            trailerContainerInnerContent.innerHTML = `<iframe width="720" height="480" frameBorder="0" src=${embedNode.getAttribute(
              'src'
            )}></iframe>`;
          } else disconnectObserver(observer);
        } else disconnectObserver(observer);
      }
    }
  };

  const initObserver = () => {
    const targetNode = document.getElementById('series');
    if (!targetNode) {
      setTimeout(initObserver, 500); // Retry after 500ms if #series is not found
      return;
    }
    const config = { attributes: false, childList: true, subtree: false };
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
  };

  initObserver();

  const sidebarBoxes = document.querySelectorAll('.sidebar .box');
  const youtubeBox = Array.from(sidebarBoxes).find((box) => {
    const headElement = box.querySelector('.head');
    return headElement && headElement.innerHTML.includes('Youtube');
  });

  if (youtubeBox) {
    const embedContainer = youtubeBox.querySelector(
      '.nobullet > table > tbody > tr > td'
    );
    if (embedContainer) {
      const embedNode = embedContainer.querySelector('object > embed');
      embedContainer.innerHTML = `<iframe width="230" frameBorder="0" src=${embedNode.getAttribute(
        'src'
      )}></iframe>`;
    }
  }
})();
