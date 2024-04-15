import crudProvider from "ra-data-nestjsx-crud";
import { API_URL } from "./api";
import raFetch from "./ra-fetch";
export default crudProvider(API_URL, raFetch);
