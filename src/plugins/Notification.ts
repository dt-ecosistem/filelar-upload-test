import { ElNotification } from "element-plus";

const Notification = (type: string, title: string, message: string): void => {
  ElNotification({
    title,
    message,
    type,
  });
};

export default Notification;
