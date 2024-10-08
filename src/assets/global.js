import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showAlert = (status, title) => {
  Swal.fire({
    icon: status,
    title: title,
    showConfirmButton: false,
    timer: 1500,
  });
};

const showToast = (type, message) =>
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    type: type,
  });


const checkCompanyName = (value) => {
  let error = "";
  if (value == "") {
    error = "Company Name is required";
  }
  return error;
};

const checkSECCert = (value) => {
  let error = "";
  if (value == "") {
    error = "SEC Certificate is required";
  }
  return error;
};

const checkCompanyLogo = (value, isEdit = false) => {
  let error = "";

  if (isEdit) {
    return error;
  }

  if (value == "" || value == null) {
    error = "Company Logo is required";
  }
  return error;
};

const checkDateRegistered = (value) => {
  let error = "";
  if (value == "") {
    error = "Date is required";
  }
  return error;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export {
  showAlert,
  showToast,
  formatDate,
  checkCompanyName,
  checkSECCert,
  checkCompanyLogo,
  checkDateRegistered,
  convertBase64,
};
