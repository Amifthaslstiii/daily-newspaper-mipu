const data = JSON.parse(localStorage.getItem("newsData")) || [];

const tbody = document.querySelector("#rekapTable tbody");

if(data.length === 0){
  tbody.innerHTML = "<tr><td colspan='5'>Belum ada data</td></tr>";
}

data.forEach((d,i)=>{

  let ceklis;

  if(d.jumlah > 0){
    ceklis = "✔";
  }else{
    ceklis = "-";
  }

  const row = `
  <tr>
    <td>${i+1}</td>
    <td>${d.masuk || "-"}</td>
    <td>${d.koran || "-"}</td>
    <td>${d.jumlah || 0}</td>
    <td>${ceklis}</td>
  </tr>
  `;

  tbody.insertAdjacentHTML("beforeend",row);

});
