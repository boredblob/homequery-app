/**
 * Creates an HTML element with prefilled values.
 * @param {string} type
 * @param {string} className 
 * @param {string} innerHTML 
 * @returns {HTMLElement}
 */
export function createElement(type = "div", className = "", innerHTML = "") {
  const element = document.createElement(type);
  if (className) {element.className = className;}
  if (innerHTML) {element.innerHTML = innerHTML;}
  return element;
}