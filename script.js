let newsData = JSON.parse(localStorage.getItem("newsData")) || [];


if (document.getElementById("newsTable")) {

  function addRow(data = null) {
    const tableBody = document.querySelector("#newsTable tbody");
    const rowNumber = tableBody.rows.length + 1;

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

    newsData.sort((a, b) => new Date(a.masuk) - new Date(b.masuk));

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

    if (newsData.length === 0) {
      container.innerHTML = "Belum ada data.";
      return;
    }

    let html = "<table><tr><th>No</th><th>Tgl Masuk</th><th>Tgl Koran</th><th>Jumlah</th><th>Ceklis</th></tr>";

    newsData.forEach((d, i) => {
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

  window.addRow = addRow;
  window.saveData = saveData;

  renderTable();
  showSavedData();
}



if (document.getElementById("rekapTable")) {

  function formatHari(tanggal){
    const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    return hari[new Date(tanggal).getDay()];
  }

  function buatRekap(){
    const container = document.getElementById("rekapTable");

    if(newsData.length === 0){
      container.innerHTML = "Belum ada data.";
      return;
    }

    const rekap = {};

    newsData.forEach(item => {
      if(!item.masuk) return;

      const date = new Date(item.masuk);
      const tahun = date.getFullYear();
      const bulan = date.toLocaleString("id-ID",{month:"long"});
      const tanggal = date.getDate();
      const hari = formatHari(item.masuk);

      const key = `${bulan} ${tahun}`;

      if(!rekap[key]){
        rekap[key] = [];
      }

      rekap[key].push({ tanggal, hari, jumlah: item.jumlah || 0 });
    });

    let html = "";

    for(let periode in rekap){
      html += `<h3>${periode}</h3>`;
      html += "<table><tr><th>Tanggal</th><th>Hari</th><th>Jumlah</th></tr>";

      rekap[periode].forEach(d => {
        html += `
          <tr>
            <td>${d.tanggal}</td>
            <td>${d.hari}</td>
            <td>${d.jumlah}</td>
          </tr>
        `;
      });

      html += "</table>";
    }

    container.innerHTML = html;
  }

  buatRekap();
}