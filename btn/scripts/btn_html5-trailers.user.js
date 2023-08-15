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

  console.log('Script started.');

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
        'transform: scale(0.9); opacity: .84',
      '#series #content center:hover #banner': 'opacity: .73',
      '#trailerinner':
        'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);',
    });
  } catch (error) {
    console.error('Error in applyStyling:', error);
  }

  const disconnectObserver = (observer) => {
    console.log('Observer disconnected.');
    observer.disconnect();
  };

  const callback = (mutationList, observer) => {
    console.log('Mutation detected.');
    try {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList' && mutation.removedNodes.length) {
          Array.from(mutation.removedNodes).forEach((node) => {
            if (node.id === 'trailer') {
              console.log("'trailer' node removed.");
              disconnectObserver(observer);
            }
          });
        }

        if (
          mutation.addedNodes.length > 0 &&
          mutation.addedNodes[0].id === 'trailer'
        ) {
          console.log("'trailer' node added.");
          const trailerContainerInnerContent =
            document.getElementById('trailerinner');
          if (trailerContainerInnerContent?.childNodes.length > 0) {
            const embedNode =
              trailerContainerInnerContent.querySelector('#video > embed');
            if (embedNode) {
              console.log('Embed node found. Replacing with iframe.');
              trailerContainerInnerContent.innerHTML = `<iframe width="720" height="480" frameBorder="0" src=${embedNode.getAttribute(
                'src'
              )}></iframe>`;
            } else {
              console.log('Embed node not found.');
              disconnectObserver(observer);
            }
          } else {
            console.log("'trailerinner' has no child nodes.");
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
        console.log('#series not found. Retrying in 500ms.');
        setTimeout(initObserver, 500);
        return;
      }
      console.log('Initializing MutationObserver for #series.');
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
      console.log('Youtube box found.');
      const embedContainer = youtubeBox.querySelector(
        '.nobullet > table > tbody > tr > td'
      );
      if (embedContainer) {
        const embedNode = embedContainer.querySelector('object > embed');
        embedContainer.innerHTML = `<iframe width="230" frameBorder="0" src=${embedNode.getAttribute(
          'src'
        )}></iframe>`;
      }
    } else {
      console.log('Youtube box not found.');
    }
  } catch (error) {
    console.error('Error in Youtube box processing:', error);
  }
})();
