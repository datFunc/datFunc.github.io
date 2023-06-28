// ==UserScript==
// @name         BTN HTML5 Trailers
// @namespace    http*://*broadcasthe.net/*
// @version      0.1
// @description  Fix BTN's trailers by replacing the flash implementation with the HTML5 (iframe) version
// @author       PuNkFuSe
// @match        https://www.broadcasthe.net/series.php?id=*
// @icon         https://datfunc.github.io/btn/assets/icons/play-trailer_alt.svg
// @updateURL    https://datfunc.github.io/btn/scripts/btn_html5-trailers.user.js
// @downloadURL  https://datfunc.github.io/btn/scripts/btn_html5-trailers.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

( () => {
  'use strict';

  // Select the node that will be observed for mutations
  const targetNode = document.getElementById('series');

  // Options for the observer (which mutations to observe)
  const config = {
    attributes: false,
    childList: true,
    subtree: false,
  };

  const applyStyling = (styles) => {
    const style = document.createElement('style');
    let styleContent = '';
    for (let selector in styles) styleContent += `${selector} { ${styles[selector]} }`;
    style.innerHTML = styleContent;
    document.head.appendChild(style);
  };

  applyStyling({
    '#trailer': `
        opacity: 1 !important;
    `,
    '#playbutton': `
        opacity: 1;
        cursor: pointer;
        transition: 0.3s;
    `,
    '#trailerinner': `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `,
  });

  const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        // Check for removed nodes
        if (mutation.removedNodes.length) {
          for (let i = 0; i < mutation.removedNodes.length; i++) {
            // Check if the 'trailer' node was removed
            if (
              mutation.removedNodes[i] &&
              mutation.removedNodes[i].id === 'trailer'
            ) {
              // Disconnect the observer when the 'trailer' node was removed
              observer.disconnect();
            }
          }
        }

        if (
          mutation.addedNodes.length > 0 &&
          mutation.addedNodes[0].id === 'trailer'
        ) {
          const trailerContainerInnerContent = document.getElementById('trailerinner');
          if (
            trailerContainerInnerContent &&
            trailerContainerInnerContent.childNodes.length > 0
          ) {
            const embedNode =
              trailerContainerInnerContent.querySelector('#video > embed');
            if (embedNode) {
              const trailerURL = embedNode.getAttribute('src');
              const iframeElement = `<iframe width="720" height="480" frameBorder="0" src=${trailerURL}></iframe>`;
              trailerContainerInnerContent.innerHTML = iframeElement;
            } else {
              observer.disconnect();
            }
          } else {
            observer.disconnect();
          }
        }
      }
    }
  };

  const observer = new MutationObserver(callback); // Create an observer instance linked to the callback function
  observer.observe(targetNode, config); // Start observing the target node for configured mutations

  // 'Sidebar' trailer
  const sidebarBoxes = Array.from(document.querySelectorAll('.sidebar .box'));
  const youtubeBox = sidebarBoxes.find((box) => {
    const headElement = box.querySelector('.head');
    return headElement && headElement.innerHTML.includes('Youtube');
  });

  if (youtubeBox) {
    const embedNode = youtubeBox.querySelector('.nobullet > table > tbody > tr > td > object > embed');
    if (embedNode) {
      const trailerURL = embedNode.getAttribute('src');
      const iframeElement = `<iframe width="230" frameBorder="0" src=${trailerURL}></iframe>`;
      youtubeBox.querySelector('.nobullet > table > tbody > tr > td').innerHTML = iframeElement;
    }
  }
})();
