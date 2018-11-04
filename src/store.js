import createStore from './create-store'

export const store = createStore()

// accessing store in dev tools
window.__store = store
