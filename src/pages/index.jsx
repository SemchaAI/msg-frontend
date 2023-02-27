import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const RegisterPage = lazy(() => import("./register"));
const LoginPage = lazy(() => import("./login"));
const HomePage = lazy(() => import("./home"));
const ProfilePage = lazy(() => import("./profile"));
const SearchPage = lazy(() => import("./search"));
const ChatsPage = lazy(() => import("./chats"));

export const Routing = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chats" element={<ChatsPage />} />
        <Route path="*" element={<h1>Error</h1>} />
      </>
    )
  );
  return router;
};
