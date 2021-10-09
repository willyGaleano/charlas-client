import axios from "axios";
import * as consts from "../utils/consts";

axios.defaults.baseURL = consts.BASE_URL_API_LOCAL;

const responseBody = (response) => response?.data;

const request = {
  get: (url) => axios.get(url).then(responseBody),
  post: (url, body) => axios.post(url, body).then(responseBody),
  put: (url, body) => axios.put(url, body).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
  patch: (url) => axios.patch(url).then(responseBody),
};

const HomeAPI = {
  crearAsistencia: async (body) =>
    request.post("/Asistencia/CrearAsistenciaAsync", body),
};

const AdminAPI = {
  listCharlaEvento: async (req) =>
    request.get(
      `/CharlaEvento/GetAllPaginationAsync?Nombre=${req.nombre}&PageNumber=${req.pageNumber}&PageSize=${req.pageSize}`
    ),
  listCharla: async (req) =>
    request.get(
      `/Charla/GetAllPaginationCharlaAsync?Nombre=${req.nombre}&PageNumber=${req.pageNumber}&PageSize=${req.pageSize}`
    ),
};

export { HomeAPI, AdminAPI };
