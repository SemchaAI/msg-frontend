import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectTheme, setTheme } from "../redux/themeSlice";

export const useTheme = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);
  //const theme = "light";

  useEffect(() => {
    document.body.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  const handlerTheme = () => {
    if (currentTheme === "light") {
      dispatch(setTheme("dark"));
    } else dispatch(setTheme("light"));
  };
  return [currentTheme, handlerTheme];
};
