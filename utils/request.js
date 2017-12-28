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

export function grab(url, options={}) {
  options = {
      // your default options
      credentials: 'same-origin',
      redirect: 'error',
      ...options,
  };

  if(options.qs) {
      url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options.qs);
      delete options.queryParams;
  }

  return fetch(url, options);
}

export function queryParams(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}
