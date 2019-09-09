/**
 * ASB - Accessibility Settings Bar
 * version 0.3
 */

(function() {
  const accessibiltyBar = document.querySelector("#accessibilty-bar"); // Parent element
  const btnAccessibiltyBar = document.querySelector("#universalAccessBtn"); // Toggle button
  const elReadingLine = document.querySelector("#reading_guide"); // Toggle button
  const btnAccessibility = document.querySelectorAll(".setAccessibility"); // Settings buttons
  const html = document.documentElement; //<html> for font-size settings
  const body = document.body; //<body> for the adjusts classes
  let readingLine;

  if (btnAccessibiltyBar) {
    setTimeout(function() {
      btnAccessibiltyBar.classList.add("collapsed");
    }, 2000);
  }

  /*
	=== === === === === === === === === === === === === === === === === ===
	=== === === === === === === === openBar === === === === === === === ===
	=== === === === === === === === === === === === === === === === === ===
	*/
  html.addEventListener("mousemove", function(e) {
    if (body.classList.contains("accessibility_readingLine")) {
      let linePositionY = e.pageY - 20;
      console.log(linePositionY);
      const elReadingLine = document.querySelector("#reading_guide"); // Toggle button
      elReadingLine.style.top = `${linePositionY}px`;
    }
  });

  /*
	=== === === === === === === === === === === === === === === === === ===
	=== === === === === === === === openBar === === === === === === === ===
	=== === === === === === === === === === === === === === === === === ===
	*/

  btnAccessibiltyBar.addEventListener("click", () =>
    accessibiltyBar.classList.toggle("active")
  );

  /*
	=== === === === === === === === === === === === === === === === === ===
	=== === === === === ===  toggleAccessibilities  === === === === === ===
	=== === === === === === === === === === === === === === === === === ===
	*/

  function toggleAccessibilities(action) {
    switch (action) {
      case "contrast":
        window.toggleContrast();
        break;
      case "dark":
        window.toggleDark();
        break;
      case "incFont":
        window.toggleFontSize(action);
        break;
      case "oriFont":
        window.toggleFontSize(action);
        break;
      case "decFont":
        window.toggleFontSize(action);
        break;
      case "readingLine":
        body.classList.toggle("accessibility_readingLine");
        break;
      case "reset":
        Dark.currentState === true ? Dark.setState(false) : null;
        Contrast.currentState === true ? Contrast.setState(false) : null;
        window.toggleFontSize("oriFont");
        body.classList.remove("accessibility_readingLine");
        break;
      default:
        break;
    }
    accessibiltyBar.classList.toggle("active");
  }

  btnAccessibility.forEach(button =>
    button.addEventListener("click", () =>
      toggleAccessibilities(button.dataset.accessibility)
    )
  );

  /*
	=== === === === === === === === === === === === === === === === === ===
	=== === === === === === ===  FontSize   === === === === === === === ===
	=== === === === === === === === === === === === === === === === === ===
	*/

  const htmlFontSize = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("font-size")
  );
  let FontSize = {
    storage: "fontSizeState",
    cssClass: "fontSize",
    currentState: null,
    check: checkFontSize,
    getState: getFontSizeState,
    setState: setFontSizeState,
    toggle: toggleFontSize,
    updateView: updateViewFontSize
  };

  window.toggleFontSize = function(action) {
    FontSize.toggle(action);
  };

  FontSize.check();

  function checkFontSize() {
    this.updateView();
  }

  function getFontSizeState() {
    return sessionStorage.getItem(this.storage)
      ? sessionStorage.getItem(this.storage)
      : 100;
  }

  function setFontSizeState(state) {
    sessionStorage.setItem(this.storage, "" + state);
    this.currentState = state;
    this.updateView();
  }

  function updateViewFontSize() {
    if (this.currentState === null) this.currentState = this.getState();

    this.currentState
      ? (html.style.fontSize = (this.currentState / 100) * htmlFontSize + "px")
      : "";

    this.currentState
      ? body.classList.add(this.cssClass + this.currentState)
      : "";
  }

  function toggleFontSize(action) {
    switch (action) {
      case "incFont":
        if (parseFloat(this.currentState) < 200) {
          body.classList.remove(this.cssClass + this.currentState);
          this.setState(parseFloat(this.currentState) + 20);
        } else {
          alert("Limite atingido!");
        }
        break;
      case "oriFont":
        body.classList.remove(this.cssClass + this.currentState);
        this.setState(100);
        break;
      case "decFont":
        if (parseFloat(this.currentState) > 40) {
          body.classList.remove(this.cssClass + this.currentState);
          this.setState(parseFloat(this.currentState) - 20);
        } else {
          alert("Limite atingido!");
        }
        break;
      default:
        break;
    }
  }

  /*
	=== === === === === === === === === === === === === === === === === ===
	=== === === === === ===  HighConstrast  === === === === === === === ===
	=== === === === === === === === === === === === === === === === === ===
	*/
  let Contrast = {
    storage: "contrastState",
    cssClass: "contrast",
    currentState: null,
    check: checkContrast,
    getState: getContrastState,
    setState: setContrastState,
    toggle: toggleContrast,
    updateView: updateViewContrast
  };

  window.toggleContrast = function() {
    Contrast.toggle();
  };

  Contrast.check();

  function checkContrast() {
    this.updateView();
  }

  function getContrastState() {
    return sessionStorage.getItem(this.storage) === "true";
  }

  function setContrastState(state) {
    sessionStorage.setItem(this.storage, "" + state);
    this.currentState = state;
    this.updateView();
  }

  function updateViewContrast() {
    if (this.currentState === null) this.currentState = this.getState();

    this.currentState
      ? body.classList.add(this.cssClass)
      : body.classList.remove(this.cssClass);
  }

  function toggleContrast() {
    this.setState(!this.currentState);
    Dark.currentState === true ? Dark.setState(false) : null;
  }

  /*
	=== === === === === === === === === === === === === === === === === ===
	=== === === === === === ===   DarkMode  === === === === === === === ===
	=== === === === === === === === === === === === === === === === === ===
	*/
  let Dark = {
    storage: "darkState",
    cssClass: "darkmode",
    currentState: null,
    check: checkDark,
    getState: getDarkState,
    setState: setDarkState,
    toggle: toggleDark,
    updateView: updateViewDark
  };

  window.toggleDark = function() {
    Dark.toggle();
  };

  Dark.check();

  function checkDark() {
    this.updateView();
  }

  function getDarkState() {
    return sessionStorage.getItem(this.storage) === "true";
  }

  function setDarkState(state) {
    sessionStorage.setItem(this.storage, "" + state);
    this.currentState = state;
    this.updateView();
  }

  function updateViewDark() {
    if (this.currentState === null) this.currentState = this.getState();

    this.currentState
      ? body.classList.add(this.cssClass)
      : body.classList.remove(this.cssClass);
  }

  function toggleDark() {
    this.setState(!this.currentState);
    Contrast.currentState === true ? Contrast.setState(false) : null;
  }
})();
