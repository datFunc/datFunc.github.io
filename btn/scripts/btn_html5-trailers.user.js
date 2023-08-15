// ==UserScript==
// @name         BTN HTML5 Trailers
// @namespace    http*://*broadcasthe.net/*
// @version      1.0
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

  try {
    const applyStyling = (styles) => {
      const style = document.createElement('style');
      let styleContent = '';
      for (let selector in styles) styleContent += `${selector} { ${styles[selector]} }`;
      style.innerHTML = styleContent;
      document.head.appendChild(style);
    };

    applyStyling({
      '#trailer': 'opacity: 1 !important;',
      '#banner': 'transition: 0.3s',
      '#playbutton':
        'opacity: 0.65; cursor: pointer; transition: 0.3s; background: url(https://datfunc.github.io/ptp/assets/icons/play-trailer.svg); width: 110px !important; height: 110px !important; box-sizing: border-box !important; padding-left: 110px !important; background-size: contain !important; margin-top: 7px;',
      '#series #content center:hover #playbutton':
        'transform: scale(0.9); opacity: .79',
      '#series #content center:hover #banner': 'opacity: .65',
      '#trailerinner':
        'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);',
    });
  } catch (error) {
    console.error('Error in applyStyling:', error);
  }

  const disconnectObserver = (observer) => observer.disconnect();

  const callback = (mutationList, observer) => {
    try {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList' && mutation.removedNodes.length) {
          Array.from(mutation.removedNodes).forEach((node) => {
            node.id === 'trailer' ? disconnectObserver(observer) : null;
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
            } else {
              disconnectObserver(observer);
            }
          } else {
            disconnectObserver(observer);
          }
        }
      }
    } catch (error) {
      console.error('Error in mutation callback:', error);
    }
  };

  const initObserver = () => {
    try {
      const targetNode = document.getElementById('series');
      if (!targetNode) {
        setTimeout(initObserver, 500);
        return;
      }
      const config = { attributes: false, childList: true, subtree: false };
      const observer = new MutationObserver(callback);
      observer.observe(targetNode, config);
    } catch (error) {
      console.error('Error in initObserver:', error);
    }
  };

  initObserver();

  try {
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
  } catch (error) {
    console.error('Error in Youtube box processing:', error);
  }
})();
