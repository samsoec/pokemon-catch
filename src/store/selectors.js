export const isLoading = (store) => (...actionsToCheck) =>
  store.ui.loader.actions.some(action => actionsToCheck.includes(action.name));