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
  postMedia: (url, formData) =>
    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(responseBody),
  putMedia: (url, formData) =>
    axios
      .put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(responseBody),
};

const HomeAPI = {
  crearAsistencia: async (body) =>
    request.post("/Asistencia/CrearAsistenciaAsync", body),
};

const MisEventosAPI = {
  listMisEventos: async (req) =>
    request.get(
      `/Asistencia/GetAllAsync?Nombre=${req.nombre}&AppUserId=${req.userId}&PageNumber=${req.pageNumber}&PageSize=${req.pageSize}`
    ),
  cancelarEvento: async (asistenciaId) =>
    request.delete(`/Asistencia/RechazarEventoAsync/${asistenciaId}`),
};

const AdminAPI = {
  listCharlaEvento: async (req) =>
    request.get(
      `/Evento/GetAllPaginationAsync?Nombre=${req.nombre}&PageNumber=${req.pageNumber}&PageSize=${req.pageSize}&IsAdmin=${req.isAdmin}`
    ),
  listCharla: async (req) =>
    request.get(
      `/Charla/GetAllPaginationCharlaAsync?Nombre=${req.nombre}&PageNumber=${req.pageNumber}&PageSize=${req.pageSize}`
    ),
  sendCharlaMedia: (req) => request.postMedia("/Charla/CreateCharlaAsync", req),
  editCharlaMedia: (req) =>
    request.putMedia(`/Charla/UpdateCharlaAsync/${req.id}`, req.form),
  deshabilitarCharla: (id) =>
    request.patch(`/Charla/DeshabilitarCharlaAsync/${id}`),
};

export { HomeAPI, AdminAPI, MisEventosAPI };
