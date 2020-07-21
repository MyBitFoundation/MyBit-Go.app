if (
  process.env.NODE_ENV === 'production' &&
  typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object'
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__.inject = {};
}
