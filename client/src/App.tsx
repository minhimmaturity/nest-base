import {
  Admin,
  Create,
  EditGuesser,
  ListGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import dataProvider from "./services/dataProvider";
import { createBrowserHistory } from "history";
import { QueryClient } from "react-query";
import authProvider from "./services/authProvider";
import Login from "./pages/login";
import { resources } from "./resources";
import CreateBase from "./common/CreateBase";

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
    {resources.map((resource) => (
      <Resource
        name={resource}
        list={ListGuesser}
        edit={EditGuesser}
        show={ShowGuesser}
        create={CreateBase}
      />
    ))}
  </Admin>
);
