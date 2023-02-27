export const loadState = () => {
  if (localStorage.getItem("appState") !== null) {
    return JSON.parse(localStorage.getItem("appState")); // re-hydrate the store
  }
};
export const loadStatePersist = () => {
  if (localStorage.getItem("persist:root") !== null) {
    return JSON.parse(localStorage.getItem("persist:root")); // re-hydrate the store
  }
};

// export const localStorageMiddleware = (getState) => {
//   return (next) => (action) => {
//     const result = next(action);
//     localStorage.setItem("appState", JSON.stringify(getState()));
//     return result;
//   };
// };

export const saveState = (state) => {
  try {
    const stateToBeSaved = JSON.stringify(state);
    localStorage.setItem("appState", stateToBeSaved);
  } catch (error) {
    console.error(error);
  }
};
