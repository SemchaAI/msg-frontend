export const authControl = (data) => {
  const valid = localStorage.getItem("token");
  if (valid) {
    return true;
  }
};
