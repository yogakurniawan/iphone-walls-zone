export default function clientMiddleware() {
  return ({ dispatch, getState }) => next => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    const { promise, type, ...rest } = action; // eslint-disable-line no-redeclare
    if (!promise) {
      return next(action);
    }

    next({ ...rest, type: `${type}_LOADING` });

    promise
      .then(result => next({ ...rest, payload: result.data ? result.data : result, type: `${type}_SUCCESS` }))
      .catch((error) => {
        console.error('MIDDLEWARE ERROR:', error);
        next({ ...rest, error, type: `${type}_ERROR` });
      });

    return promise;
  };
}
