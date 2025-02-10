import Swal from "sweetalert2";

// function AlertError(message) {
//   return Swal.fire({
//     title: "Error",
//     text: message,
//     icon: "error",
//   }).then(function () {
//     location.reload();
//   });
// }
function AlertError(message) {
  return Swal.fire({
    title: "Error",
    text: message,
    icon: "error",
  });
}

export default AlertError;
