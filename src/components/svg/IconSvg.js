import Icon from "@ant-design/icons";
import { heartSvg, editSvg, deleteSvg, createSvg } from "./svgs";

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
