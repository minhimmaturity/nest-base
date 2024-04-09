import { Admin, ListGuesser, Resource } from "react-admin";
import dataProvider from "./services/dataProvider";
import { createBrowserHistory } from "history";
import { QueryClient } from "react-query";
import authProvider from "./services/authProvider";
import Login from "./pages/login";

const history = createBrowserHistory();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});
export const App = () => (
  <Admin
    history={history}
    queryClient={queryClient}
    dataProvider={dataProvider}
    loginPage={Login}
    authProvider={authProvider}
  >
    <Resource name="users" list={ListGuesser} />
  </Admin>
);
