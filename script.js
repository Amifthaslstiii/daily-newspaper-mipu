function addRow() {
  const tableBody = document.querySelector("#newsTable tbody");
  const rowNumber = tableBody.rows.length + 1;

  const row = `
    <tr>
      <td>${rowNumber}</td>

      <td>
        <input type="date">
      </td>

      <td>✨</td>

      <td>
        <input type="date">
      </td>

      <td>
        <input type="number" min="0" style="width:60px">
      </td>

      <td>
        <input type="checkbox">
      </td>
    </tr>
  `;

  tableBody.insertAdjacentHTML("beforeend", row);
}


// 💾 SIMPAN + TAMPILKAN
function saveData() {
  const rows = document.querySelectorAll("#newsTable tbody tr");

  const data = [];

  rows.forEach(row => {
    const inputs = row.querySelectorAll("input");

    data.push({
      masuk: inputs[0].value,
      koran: inputs[1].value,
      jumlah: inputs[2].value,
      ceklis: inputs[3].checked
    });
  });

  localStorage.setItem("newsData", JSON.stringify(data));
  showSavedData();
}


// 📄 TAMPILKAN DATA DI BAWAH
function showSavedData() {
  const container = document.getElementById("savedData");
  const saved = JSON.parse(localStorage.getItem("newsData")) || [];

  if (saved.length === 0) {
    container.innerHTML = "Belum ada data tersimpan.";
    return;
  }

  let html = "<table border='1' cellpadding='6'><tr><th>No</th><th>Tgl Masuk</th><th>Tgl Koran</th><th>Jumlah</th><th>Ceklis</th></tr>";

  saved.forEach((d, i) => {
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${d.masuk || "-"}</td>
        <td>${d.koran || "-"}</td>
        <td>${d.jumlah || 0}</td>
        <td>${d.ceklis ? "✔" : "-"}</td>
      </tr>
    `;
  });

  html += "</table>";

  container.innerHTML = html;
}


// 🔄 LOAD SAAT HALAMAN DIBUKA
window.onload = showSavedData;
