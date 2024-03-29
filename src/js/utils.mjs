// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// remove data from local storage
export function removeStorage(key) {
  localStorage.removeItem(key);
}

export function alertMessage(message, scroll = true) {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('custom-alert');
  
  const alertMessage = document.createElement('p');
  alertMessage.textContent = message;
  alertContainer.appendChild(alertMessage);

  document.body.insertBefore(alertContainer, document.body.firstChild);

  if (scroll) {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  }
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString)
  const product = urlParams.get(param)
  return product
}
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data)
  }
}
async function loadTemplate(path) {
  const res = await fetch(path)
  const template = await res.text();
  return template
}
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}