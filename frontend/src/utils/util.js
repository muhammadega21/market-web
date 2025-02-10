export function formatDate(dateString) {
  const date = new Date(dateString);

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${dayName}, ${day}-${month}-${year}`;
}

export function getCurrentDate() {
  let newDate = new Date();
  let date = newDate.toISOString().split("T")[0];

  return date;
}
