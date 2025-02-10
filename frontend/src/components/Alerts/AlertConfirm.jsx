import Swal from "sweetalert2";

function AlertConfirm({ message }) {
  return Swal.fire({
    title: "Are you sure?",
    text: message,
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
}

export default AlertConfirm;
