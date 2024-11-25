import toast from "react-hot-toast";

export const errorToast = (message) => {
  toast.error(message, {
    icon: "❌",
    style: {
      backgroundColor: "#333",
      color: "#fff",
      borderRadius: "50px",
    },
  });
};

export const successToast = (message) => {
  toast.success(message, {
    icon: "✅",
    style: {
      backgroundColor: "#333",
      color: "#fff",
      borderRadius: "50px",
    },
  });
};
