// ==UserScript==
// @name         Blue Night+
// @namespace    http*://*passthepopcorn.me/*
// @version      0.3.7
// @description  Adds a couple of UI enhancements to the Blue Night Stylesheet
// @author       PuNkFuSe
// @updateURL    https://datfunc.github.io/ptp/blue_night-plus.user.js
// @downloadURL  https://datfunc.github.io/ptp/blue_night-plus.user.js
// @grant        none
// @match        http*://*passthepopcorn.me/*
// @run-at       document-end
// @icon        https://datfunc.github.io/ptp/assets/icons/post-topic-unread.svg
// ==/UserScript==

(() => {
  'use strict';

  // Create reusable elements and selectors.
  const elementsFactory = (() => {
    const initElementsController = () => {
      const selectors = ['head', 'body'].map(
        (selector) => (selector = document.querySelector(selector))
      );
      const [documentHead, documentBody] = selectors;
      const elements = ['link', 'style', 'div', 'span', 'img', 'p'].map(
        (element) => (element = document.createElement(element))
      );
      const [
        linkElement,
        styleElement,
        divElement,
        spanElement,
        imgElement,
        paraElement,
      ] = elements;

      class initElementBuild {
        constructor(parentElement, newElement, newElementClassName) {
          this.parentElement = parentElement;
          this.newElement = newElement;
          this.newElement.className = newElementClassName;
        }
      }

      return {
        documentHead,
        documentBody,
        linkElement,
        styleElement,
        divElement,
        spanElement,
        imgElement,
        paraElement,
        initElementBuild,
      };
    };

    return {
      initElementsController,
    };
  })();

  // Create a scroll to the top element.
  const scrollToTop = (() => {
    const element = elementsFactory.initElementsController();
    const initElement = () => {
      const classInit = new element.initElementBuild(
        element.documentBody,
        element.divElement,
        'scrollToTop'
      );
      return {
        classInit,
      };
    };

    const initElementStyle = () => {
      const elementStyle = element.styleElement;
      elementStyle.innerHTML = `
                .scrollToTop {
                    opacity: 0;
                    visibility: hidden;
                    box-sizing: border-box;
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    width: 55px;
                    height: 55px;
                    background-color: #2f3447;
                    -webkit-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
                    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
                    border-radius: 50%;
                    cursor: pointer;
                    -webkit-transition: all .3s;
                    -o-transition: all .3s;
                    -moz-transition: all .3s;
                    transition: all .3s;
                }

                .arrowUpImg {
                    opacity: .55;
                    position: relative;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    vertical-align: initial;
                    width: 20px; height: 20px;
                    -webkit-transition: all .3s;
                    -o-transition: all .3s;
                    -moz-transition: all .3s;
                    transition: all .3s;
                }`;
      return {
        elementStyle,
      };
    };

    const applyStyling = () => {
      const scrollToTopStyling = initElementStyle().elementStyle;
      element.documentHead.append(scrollToTopStyling.cloneNode(true));
    };

    const initElementBuild = () => {
      initElement();
      element.documentBody.append(element.divElement);
      let scrollToTop = document.querySelector('.scrollToTop');
      if (scrollToTop) {
        scrollToTop.append(element.imgElement);
        element.imgElement.classList.add('arrowUpImg');
        let arrowUpImg = document.querySelector('.arrowUpImg');
        arrowUpImg.src =
          'https://datfunc.github.io/ptp/assets/icons/arrow-up-white.svg';
        scrollToTop.addEventListener('click', () => window.scrollTo(0, 0));
        scrollToTop.addEventListener('mouseover', () => {
          arrowUpImg.style.opacity = '1';
        });
        scrollToTop.addEventListener('mouseout', () => {
          arrowUpImg.style.opacity = '.55';
        });
      }
      window.addEventListener('scroll', () => {
        const y = window.scrollY;
        if (y >= 400) {
          scrollToTop.style.opacity = '1';
          scrollToTop.style.visibility = 'visible';
        } else {
          scrollToTop.style.opacity = '0';
          scrollToTop.style.visibility = 'hidden';
        }
      });
    };

    const initElementAction = () => {
      initElementBuild();
    };

    const init = () => {
      initElementAction();
      applyStyling();
    };

    return {
      init,
    };
  })();

  // Replace the default favicon.
  const replaceFavicon = (() => {
    const element = elementsFactory.initElementsController();
    const initElement = () => {
      const classInit = new element.initElementBuild(
        element.documentHead,
        element.linkElement,
        'favicon'
      );
      return {
        classInit,
      };
    };

    const initElementBuild = () => {
      initElement();
      element.documentHead.append(element.linkElement);
      let favicon = document.querySelector('.favicon');
      let faviconImg =
        'https://datfunc.github.io/ptp/assets/icons/post-topic-unread.svg';
      favicon.setAttribute('rel', 'shortcut icon');
      favicon.setAttribute('href', faviconImg);
      favicon.setAttribute('type', 'image/x-icon');
    };

    const initElementAction = () => {
      initElementBuild();
    };

    const init = () => {
      initElementAction();
    };

    return {
      init,
    };
  })();

  // Display a loader/spinner while pages are loading.
  const pagesLoader = (() => {
    const element = elementsFactory.initElementsController();
    const initElement = () => {
      const classInit = new element.initElementBuild(
        element.documentBody,
        element.divElement,
        'loader'
      );
      return {
        classInit,
      };
    };

    const initElementStyle = () => {
      const elementStyle = element.styleElement;
      elementStyle.innerHTML = `
                .loader {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    z-index: 99999;
                    width: 150px;
                    height: 150px;
                    margin: -75px 0 0 -75px;
                    border: 16px solid #586179;
                    border-radius: 50%;
                    border-top: 1rem solid #4281da;
                    width: 120px;
                    height: 120px;
                    -webkit-transition: all .3s;
                    -o-transition: all .3s;
                    -moz-transition: all .3s;
                    transition: all .3s;
                    -webkit-animation: spin .9s linear infinite;
                    animation: spin .9s linear infinite;
                }

                @-webkit-keyframes spin {
                    0% { -webkit-transform: rotate(0deg); }
                    100% { -webkit-transform: rotate(360deg); }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }`;
      return {
        elementStyle,
      };
    };

    const applyStyling = () => {
      const loaderStyling = initElementStyle().elementStyle;
      element.documentHead.appendChild(loaderStyling.cloneNode(true));
    };

    const initElementBuild = () => {
      initElement();
      element.documentBody.append(element.divElement);
      let loader = document.querySelector('.loader');
      if (loader) {
        loader.style.visibility = 'visible';
        loader.style.opacity = '1';
      }
    };

    const initElementDestroy = () => {
      initElement();
      let loader = document.querySelector('.loader');
      setTimeout(() => {
        if (loader) {
          loader.style.visibility = 'hidden';
          loader.style.opacity = '0';
          loader.remove();
          loader = null;
        }
      }, 500);
    };

    const initElementAction = () => {
      const wrapper = document.getElementById('wrapper');
      window.addEventListener('load', (event) => {
        setTimeout(() => {
          wrapper.style.visibility = 'visible';
          wrapper.style.opacity = '1';
          element.documentBody.style.overflow = 'auto';
          element.documentBody.style.height = 'auto';
        }, 500);
        initElementDestroy();
      });
      document.addEventListener('readystatechange', (event) => {
        if (
          event.target.readyState === 'interactive' ||
          event.target.readyState === 'complete'
        ) {
          initElementBuild();
          wrapper.style.visibility = 'hidden';
          wrapper.style.opacity = '0';
          element.documentBody.style.overflow = 'hidden';
          element.documentBody.style.height = '100%';
        }
      });
    };

    const init = () => {
      initElementAction();
      applyStyling();
    };

    return {
      init,
    };
  })();

  // Replace the unicode characters in tables with the stylesheet icons.
  const tablesUnicodeCharToImg = (() => {
    const element = elementsFactory.initElementsController();
    const initElement = () => {};

    const initElementStyle = () => {
      const elementStyle = element.styleElement;
      elementStyle.innerHTML = `
                .torrentStatus {
                    width: 12px;
                }`;
      return {
        elementStyle,
      };
    };

    const applyStyling = () => {
      const statusIcon = initElementStyle().elementStyle;
      element.documentHead.appendChild(statusIcon.cloneNode(true));
    };

    const initElementBuild = () => {
      initElement();
      const replaceUnicodeChars = (value, key, map) => {
        const unicodeCharsRegExp = new RegExp(key, 'gi');
        const tableRows =
          '.basic-movie-list__torrent-row > *, .compact-movie-list__torrent-row > *, .huge-movie-list__movie__torrent-summary__row__title + span';
        const targetedElements = document.querySelectorAll(tableRows);
        targetedElements.forEach((element) => {
          element.innerHTML = element.innerHTML.replace(
            unicodeCharsRegExp,
            value
          );
        });
      };

      new Map([
        [
          '☐' || '&#9744;',
          `<img src="https://datfunc.github.io/ptp/assets/icons/not-approved_alt.svg" class="torrentStatus">`,
        ],
        [
          '☑' || '&#9745;',
          `<img src="https://datfunc.github.io/ptp/assets/icons/badge-checker.svg" class="torrentStatus">`,
        ],
        // Not needed for now since the HTML structure was updated
        // ['✿' || '&#10047;', `<img src="https://datfunc.github.io/ptp/assets/icons/gold-encode-checker.svg" class="torrentStatus">`]
      ]).forEach(replaceUnicodeChars);
    };

    const initElementAction = () => {
      initElementBuild();
    };

    const init = () => {
      initElementAction();
      applyStyling();
    };

    return {
      init,
    };
  })();

  // Display a modal when adding/removing a movie to bookmarks.
  const bookmarksModal = (() => {
    const element = elementsFactory.initElementsController();
    const initElement = () => {
      const classInit = new element.initElementBuild(
        element.documentBody,
        element.divElement,
        'bookmarksModal'
      );
      return {
        classInit,
      };
    };

    const initElementStyle = () => {
      const elementStyle = element.styleElement;
      elementStyle.innerHTML = `
            .bookmarksModal {
                visibility: hidden;
                opacity: 0;
                position: fixed;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                width: 420px;
                height: 110px;
                z-index: 99999;
                -webkit-backdrop-filter: blur(10px);
                backdrop-filter: blur(10px);
                background-color: rgba(7,11,22,.65);
                border-radius: 5px;
                -webkit-box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
                box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
                -webkit-transition: all .3s;
                -o-transition: all .3s;
                -moz-transition: all .3s;
                transition: all .3s;
            }
            .bookmarkModalContent {
                color: #ffffff;
                text-align: center;
                font-size: 1.2rem;
                position: relative;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
            }`;
      return {
        elementStyle,
      };
    };

    const applyStyling = () => {
      const bookmarksModalStyling = initElementStyle().elementStyle;
      element.documentHead.appendChild(bookmarksModalStyling.cloneNode(true));
    };

    const initElementBuild = () => {
      initElement();
      element.documentBody.append(element.divElement);
      const bookmarksModal = document.querySelector('.bookmarksModal');
      const bookmarkModalContent = element.paraElement;
      bookmarkModalContent.classList.add('bookmarkModalContent');
      bookmarksModal.append(bookmarkModalContent);

      const targetNode = document.querySelector('body');
      const mutationConfig = {
        attributes: true,
        childList: true,
        subtree: true,
      };
      const targetedElements1 =
        '.cover-movie-list__movie__cover-link, .basic-movie-list__movie__cover, .basic-movie-list__movie__title, .small-cover-movie-list__movie__link, .small-cover-movie-list__movie__link--smaller, .release-name-movie-list__movie__release-name';
      const targetedElements2 =
        '.basic-movie-list__movie__bookmark, .huge-movie-list__movie__bookmark, .release-name-movie-list__movie__action';

      // Outer table
      window.addEventListener('load', () => {
        const regularBookmarkLinks =
          document.querySelectorAll(targetedElements2);
        regularBookmarkLinks.forEach((regularBookmarkLink) => {
          regularBookmarkLink.addEventListener('click', function () {
            const bookmarkModalToggle = function () {
              bookmarksModal.style.visibility = 'visible';
              bookmarksModal.style.opacity = '1';
              setTimeout(function () {
                bookmarksModal.style.visibility = 'hidden';
                bookmarksModal.style.opacity = '0';
              }, 500);
            };
            if (regularBookmarkLink.textContent === 'Bookmark') {
              bookmarkModalToggle();
              bookmarkModalContent.textContent = 'Added to bookmarks.';
            } else {
              bookmarkModalToggle();
              bookmarkModalContent.textContent = 'Removed from bookmarks.';
            }
          });
        });

        // Inner table - Single
        const getURL = window.location.href;
        if (getURL.includes('torrents.php?id=')) {
          const parentDOM = document.querySelector('.linkbox:first-of-type');
          const regularBookmarkLinkSingle =
            parentDOM.getElementsByClassName('linkbox__link')[2];
          regularBookmarkLinkSingle.addEventListener('click', () => {
            const bookmarkModalToggle = () => {
              bookmarksModal.style.visibility = 'visible';
              bookmarksModal.style.opacity = '1';
              setTimeout(() => {
                bookmarksModal.style.visibility = 'hidden';
                bookmarksModal.style.opacity = '0';
              }, 500);
            };
            if (regularBookmarkLinkSingle.textContent === '[Bookmark]') {
              bookmarkModalToggle();
              bookmarkModalContent.textContent = 'Added to bookmarks.';
            } else {
              bookmarkModalToggle();
              bookmarkModalContent.textContent = 'Removed from bookmarks.';
            }
          });
        }

        // Bookmark links when hovering on a movie cover (Appended qTip)
        const qTipBookmarkLinks = document.querySelectorAll(targetedElements1);
        qTipBookmarkLinks.forEach((qTipBookmarkLink) => {
          qTipBookmarkLink.addEventListener('mouseenter', function () {
            const qtipCoverData = qTipBookmarkLink.parentElement;
            const qTipObserver = function (mutationList, observer) {
              for (let mutationRecord of mutationList) {
                if (mutationRecord.addedNodes) {
                  for (let addedNodes of mutationRecord.addedNodes) {
                    if (
                      addedNodes.id ===
                        `qtip-${qtipCoverData.dataset.hasqtip}-content` ||
                      addedNodes.id ===
                        `qtip-${qTipBookmarkLink.dataset.hasqtip}-content`
                    ) {
                      const bookmarkLinks = document.querySelectorAll(
                        '.movie-tooltip__bookmark a'
                      );
                      for (const bookmarkLink of bookmarkLinks) {
                        bookmarkLink.addEventListener('click', function () {
                          const bookmarkModalToggle = function () {
                            bookmarksModal.style.visibility = 'visible';
                            bookmarksModal.style.opacity = '1';
                            setTimeout(function () {
                              bookmarksModal.style.visibility = 'hidden';
                              bookmarksModal.style.opacity = '0';
                            }, 500);
                          };
                          if (bookmarkLink.textContent === 'Bookmark') {
                            bookmarkModalToggle();
                            bookmarkModalContent.textContent =
                              'Added to bookmarks.';
                          } else {
                            bookmarkModalToggle();
                            bookmarkModalContent.textContent =
                              'Removed from bookmarks.';
                          }
                        });
                      }
                      return;
                    }
                  }
                }
              }
            };
            const observer = new MutationObserver(qTipObserver);
            observer.observe(targetNode, mutationConfig);
          });
        });
      });
    };

    const initElementAction = () => {
      initElementBuild();
    };

    const init = () => {
      initElementAction();
      applyStyling();
    };

    return {
      init,
    };
  })();

  // Expand/Collapse edition groups
  const toggleEditionsView = (() => {
    const element = elementsFactory.initElementsController();
    const initElement = () => {
      const classInit = new element.initElementBuild(
        element.documentBody,
        element.divElement,
        'collapsible'
      );
      return {
        classInit,
      };
    };

    const initElementStyle = () => {
      const elementStyle = element.styleElement;
      elementStyle.innerHTML = `
                .collapsible {
                    float: right;
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    padding: 0;
                    margin: 0 auto;
                    background-color: #1e2233;
                    color: #ffffff;
                    font-weight: 700;
                    font-size: .8rem;
                    text-align: center;
                    line-height: 20px;
                    vertical-align: middle;
                    border: none;
                    border-radius: 2.5px;
                    z-index: 99;
                    cursor: pointer;
                    -webkit-transition: all .3s;
                    -o-transition: all .3s;
                    -moz-transition: all .3s;
                    transition: all .3s;
                }
                .collapsible:hover {
                    background-color: #0a0e19;
                }
                `;
      return {
        elementStyle,
      };
    };

    const applyStyling = () => {
      const collapsibleStyling = initElementStyle().elementStyle;
      element.documentHead.appendChild(collapsibleStyling.cloneNode(true));
    };

    const initElementBuild = () => {
      initElement();
    };

    const initElementAction = () => {
      initElementBuild();
      document.addEventListener('readystatechange', (event) => {
        if (event.target.readyState === 'complete') {
          // Outer table
          const moviesTableRow = document.querySelectorAll(
            '.torrent_table tbody tr'
          );
          for (const tableRow of [moviesTableRow]) {
            for (const row of tableRow) {
              if (row.className === 'basic-movie-list__torrent-row') {
                const editionType = row.childNodes[0].children[1];

                // Get all releases
                const getEditionReleases = function (row) {
                  const editionReleases = [];
                  let release = row.nextElementSibling;
                  while (
                    release &&
                    release.firstChild.className !==
                      'basic-movie-list__torrent-edition'
                  ) {
                    if (release.nodeType === 1 && release !== row) {
                      editionReleases.push(release);
                    }
                    release = release.nextSibling;
                  }
                  return editionReleases;
                };

                const collapsibleAction = () => {
                  let releases = getEditionReleases(row);
                  [row].forEach((edition) => {
                    editionType.appendChild(element.divElement.cloneNode(true));
                    const collapsibleController =
                      edition.childNodes[0].childNodes[2].children[0];
                    if (collapsibleController) {
                      releases.forEach((release) => {
                        if (release.style.display === 'none') {
                          collapsibleController.textContent = '+';
                        } else if ((release.style.display = 'table-row')) {
                          collapsibleController.textContent = '-';
                        }
                      });

                      collapsibleController.addEventListener(
                        'click',
                        function () {
                          releases.forEach((release) => {
                            if (release.style.display === 'none') {
                              release.style.display = 'table-row';
                              collapsibleController.textContent = '-';
                            } else if ((release.style.display = 'table-row')) {
                              release.style.display = 'none';
                              collapsibleController.textContent = '+';
                            }
                          });
                        }
                      );

                      const releasesView = (value, key, map) => {
                        const releaseType = new RegExp(key, 'g');
                        const firstReleaseParent =
                          releases[0].previousElementSibling.childNodes[0]
                            .childNodes[2];
                        if (firstReleaseParent) {
                          releases.forEach((release) => {
                            if (
                              firstReleaseParent.textContent.match(releaseType)
                            ) {
                              if (value === true) {
                                release.style.display = 'table-row';
                                collapsibleController.textContent = '-';
                              } else {
                                release.style.display = 'none';
                                collapsibleController.textContent = '+';
                              }
                            }
                          });
                        }
                      };

                      // Set the value for the editions you want to hide by default
                      // true = show, false = hide
                      new Map([
                        ['Standard Definition', false],
                        ['High Definition', true],
                        ['Ultra High Definition', true],
                        ['3D', false],
                        ['Other', false],
                      ]).forEach(releasesView);
                    }
                  });
                };
                collapsibleAction();
              }
            }
          }
        }
      });
    };

    const init = () => {
      initElementAction();
      applyStyling();
    };

    return {
      init,
    };
  })();

  scrollToTop.init();
  replaceFavicon.init();
  pagesLoader.init();
  tablesUnicodeCharToImg.init();
  bookmarksModal.init();
  toggleEditionsView.init();
})();
