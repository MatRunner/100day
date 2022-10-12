import { useRoutes } from "react-router-dom";
import App from "../App";
import Template from "./template";
function Routes() {
  const element = useRoutes([
    {
      path: '/',
      element: <App />,
    },
    {
      path: ':id',
      element: <Template />,
    }
  ])
  return element
}
export default Routes