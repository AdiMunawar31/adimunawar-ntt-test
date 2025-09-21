import { RouterProvider } from "react-router-dom";

import router from "./routes";
import NavigationScroll from "./layouts/NavigationScroll";
import ThemeCustomization from "./themes";

// ==============================|| APP ||============================== //

export default function App() {
  return (
    <ThemeCustomization>
      <NavigationScroll>
        <>
          <RouterProvider router={router} />
        </>
      </NavigationScroll>
    </ThemeCustomization>
  );
}
