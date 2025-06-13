import { toast } from "react-hot-toast";

interface ToastProps {
  icon?: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
}

export default function showToast({ icon, type, message }: ToastProps) {
  switch (type) {
    case "success":
      return toast.success(message, { position: "bottom-center" });
    case "error":
      return toast.error(message, { position: "bottom-center" });
    case "warning":
      return toast(message, { position: "bottom-center", icon: "⚠️" });
    case "info":
      return toast(message, { position: "bottom-center", icon: "ℹ️" });
    default:
      return toast(message, { position: "bottom-center", icon });
  }
}
