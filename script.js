let newsData = JSON.parse(localStorage.getItem("newsData")) || [];

function addRow(data = null) {

  const tableBody = document.querySelector("#newsTable tbody");

  let rowNumber;

  if (data) {
    rowNumber = (newsData.indexOf(data) % 31) + 1;
  } else {
    rowNumber = (newsData.length % 31) + 1;
  }

  const row = `
    <tr>
      <td>${rowNumber}</td>
      <td><input type="date" value="${data ? data.masuk : ""}"></td>
      <td>✨</td>
      <td><input type="date" value="${data ? data.koran : ""}"></td>
      <td><input type="number" min="0" style="width:60px"
          value="${data ? data.jumlah : ""}"></td>
      <td><input type="checkbox" ${data && data.ceklis ? "checked" : ""}></td>
    </tr>
  `;

  tableBody.insertAdjacentHTML("beforeend", row);
}

function saveData() {

  const rows = document.querySelectorAll("#newsTable tbody tr");
  newsData = [];

  rows.forEach(row => {

    const inputs = row.querySelectorAll("input");

    newsData.push({
      masuk: inputs[0].value,
      koran: inputs[1].value,
      jumlah: inputs[2].value,
      ceklis: inputs[3].checked
    });
  });

  newsData.sort((a,b)=> new Date(a.masuk) - new Date(b.masuk));

  localStorage.setItem("newsData", JSON.stringify(newsData));

  renderTable();
  showSavedData();
}

function renderTable() {
  const tableBody = document.querySelector("#newsTable tbody");
  tableBody.innerHTML = "";
  newsData.forEach(data => addRow(data));
}

function showSavedData() {

  const container = document.getElementById("savedData");

  if(newsData.length === 0){
    container.innerHTML = "Belum ada data.";
    return;
  }

  let html = "<table><tr><th>No</th><th>Tgl Masuk</th><th>Tgl Koran</th><th>Jumlah</th><th>Ceklis</th></tr>";

  newsData.forEach((d,i)=>{
    html += `
      <tr>
        <td>${i+1}</td>
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

renderTable();
showSavedData();
