import { message } from "antd";
import axios from "axios";
import { logoutAction } from "../redux/actions/authAction";
import { token } from "../utils/auth/auth.service";
import * as consts from "../utils/consts";

axios.defaults.baseURL = consts.BASE_URL_API_LOCAL;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const tokenLS = token.get();
    if (tokenLS) config.headers.authorization = `Bearer ${tokenLS}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.message === "Network Error" && !err.response) {
      message.error(
        "Network Error - Asegúrese de que la API se este ejecutando"
      );
      return;
    }
    if (originalConfig.url !== "/Account/Authenticate" && err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const rs = await axios.post("/Account/RefreshToken", {});
          console.log(rs.data);
          const { jwToken } = rs.data.data;
          token.set(jwToken);
          return axios(originalConfig);
        } catch (_error) {
          token.remove();
          console.log("remove");
          return Promise.reject(_error);
        }
      }
    }
  }
);

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

const AppAPI = {};

const AuthAPI = {
  startLogin: async (req) => request.post("/Account/Authenticate", req),
  startRegister: (req) => request.post("/Account/Register", req),
  refreshToken: () => request.post("/Account/RefreshToken", {}),
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
  listCharlaForm: async () => request.get("/Charla/GetAllCharlaAsync"),
  sendCharlaMedia: (req) => request.postMedia("/Charla/CreateCharlaAsync", req),
  editCharlaMedia: (req) =>
    request.putMedia(`/Charla/UpdateCharlaAsync/${req.id}`, req.form),
  deshabilitarCharla: (id) =>
    request.patch(`/Charla/DeshabilitarCharlaAsync/${id}`),
  createEvento: (req) => request.post("/Evento/CrearEventoAsync", req),
  editarEvento: (id, req) =>
    request.put(`/Evento/UpdateEventoAsync/${id}`, req),
  deleteLogEvento: (id) => request.patch(`/Evento/DeleteLogEventoAsync/${id}`),
};

export { HomeAPI, AdminAPI, MisEventosAPI, AppAPI, AuthAPI };
