import Swal from "sweetalert2";

function AlertSuccess(message, navigate) {
  return Swal.fire({
    title: "success",
    text: message,
    icon: "success",
  }).then(function () {
    if (navigate) {
      navigate();
    }
  });
}

export default AlertSuccess;
