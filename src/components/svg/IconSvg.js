import Icon from "@ant-design/icons";
import {
  heartSvg,
  editSvg,
  deleteSvg,
  createSvg,
  cancelSvg,
  cancelDisabledSvg,
  disabledSvg,
  charlasSvg,
  eventosSvg,
  estadosSvg,
  usuariosSvg,
} from "./svgs";

export const HeartIcon = (props) => (
  <Icon component={() => heartSvg("2em", "2em")} {...props} />
);

export const HeartPopop = (props) => (
  <Icon component={() => heartSvg("1.2em", "1.2em")} {...props} />
);

export const EditIcon = (props) => (
  <Icon component={() => editSvg("1.8em", "1.8em")} {...props} />
);

export const DeleteIcon = (props) => (
  <Icon component={() => deleteSvg("1.8em", "1.8em")} {...props} />
);

export const CreateIcon = (props) => (
  <Icon component={() => createSvg("2.2em", "2.2em")} {...props} />
);

export const EditPopop = (props) => (
  <Icon component={() => editSvg("1.2em", "1.2em")} {...props} />
);

export const DeletePopop = (props) => (
  <Icon component={() => deleteSvg("1.2em", "1.2em")} {...props} />
);

export const CancelIcon = (props) => (
  <Icon component={() => cancelSvg("1.8em", "1.8em")} {...props} />
);

export const CancelPopop = (props) => (
  <Icon component={() => cancelSvg("1.2em", "1.2em")} {...props} />
);

export const DisabledIcon = (props) => (
  <Icon component={() => disabledSvg("2.1em", "2.1em")} {...props} />
);

export const CharlaIcon = (props) => (
  <Icon component={() => charlasSvg("1em", "1em")} {...props} />
);

export const EventoIcon = (props) => (
  <Icon component={() => eventosSvg("1em", "1em")} {...props} />
);

export const EstadoIcon = (props) => (
  <Icon component={() => estadosSvg("1em", "1em")} {...props} />
);

export const UsuarioIcon = (props) => (
  <Icon component={() => usuariosSvg("1em", "1em")} {...props} />
);

export const CharlaIconPortada = (props) => (
  <Icon component={() => charlasSvg("200px", "200px")} {...props} />
);

export const EventoIconPortada = (props) => (
  <Icon component={() => eventosSvg("200px", "200px")} {...props} />
);

export const EstadoIconPortada = (props) => (
  <Icon component={() => estadosSvg("200px", "200px")} {...props} />
);

export const UsuarioIconPortada = (props) => (
  <Icon component={() => usuariosSvg("200px", "200px")} {...props} />
);
