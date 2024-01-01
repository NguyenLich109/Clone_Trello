type Status = "success" | "error";

interface typeToast {
  status: Status;
  message: string;
  description: string;
}

import { notification } from "ant-design-vue";
export const Toast = ({ status, message, description }: typeToast) => {
  return notification[status]({
    message,
    description,
    placement: "topRight",
    duration: 3,
  });
};
