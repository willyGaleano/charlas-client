import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import AdminPage from "../pages/admin/AdminPage";
import CharlasCrudPage from "../pages/admin/charlas/CharlasCrudPage";
import EventosCrudPage from "../pages/admin/evento/EventosCrudPage";
import UsersCrudPage from "../pages/admin/users/UsersCrudPage";
import PrivateRouter from "./PrivateRouter";
import EstadoEventosCrudPage from "../pages/admin/estado-eventos/EstadoEventosCrudPage";
import EstadoAsistenciasCrudPage from "../pages/admin/estado-asistencias/EstadoAsistenciasCrudPage";

const AdminRouter = () => {
  const { url } = useRouteMatch();
  return (
    <Switch>
      <PrivateRouter exact path={`${url}`} component={AdminPage} />
      <PrivateRouter
        exact
        path={`${url}/charlas`}
        component={CharlasCrudPage}
      />
      <PrivateRouter
        exact
        path={`${url}/eventos`}
        component={EventosCrudPage}
      />
      <PrivateRouter
        exact
        path={`${url}/estado-asistencias`}
        component={EstadoAsistenciasCrudPage}
      />
      <PrivateRouter
        exact
        path={`${url}/estado-eventos`}
        component={EstadoEventosCrudPage}
      />
      <PrivateRouter exact path={`${url}/usuarios`} component={UsersCrudPage} />
      <Route path="*">
        <Redirect to="/404" />
      </Route>
    </Switch>
  );
};

export default AdminRouter;
