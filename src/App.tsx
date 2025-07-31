import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RootLayout from "./layouts/RootLayout";
import HomeLayout from "./layouts/HomeLayout";
import RequireAuth from "./components/RequireAuth";
import TaskSection from "./components/TaskSection";
import SpinSection from "./components/SpinSection";
import TaskDetails from "./components/TaskDetails";
import { taskDetailsLoader } from "./services/task-loader";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        
        <Route
          path="todos"
          element={
            <RequireAuth>
              <HomeLayout />
            </RequireAuth>
          }
        >
          <Route path="tasklist" element={<TaskSection />}>
            {/* Nested route for task details */}
            <Route path=":id" element={<TaskDetails />} loader={taskDetailsLoader} errorElement={<div>Task not found!</div>} />
            
          </Route>
          <Route path="spins" element={<SpinSection />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
