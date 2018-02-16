export function parseJSON(response) {
  return response.json();
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function queryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

export function grab(url, options = {}) {
  let theOptions = options
  let theUrl = url
  theOptions = {
    // your default options
    credentials: 'same-origin',
    redirect: 'error',
    ...theOptions,
  };

  if (theOptions.qs) {
    theUrl += (theUrl.indexOf('?') === -1 ? '?' : '&') + queryParams(theOptions.qs);
    delete theOptions.queryParams;
  }

  return fetch(theUrl, options);
}

