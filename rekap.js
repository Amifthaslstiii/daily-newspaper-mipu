const data = JSON.parse(localStorage.getItem("newsData")) || [];
const container = document.querySelector("#rekapTable tbody");

container.innerHTML = "";

if(data.length === 0){
container.innerHTML = "<tr><td colspan='5'>Belum ada data</td></tr>";
return;
}

// kelompokkan data berdasarkan tanggal masuk
const grouped = {};

data.forEach(item => {

let tanggal = item.masuk || "Tanpa Tanggal";

if(!grouped[tanggal]){
grouped[tanggal] = [];
}

grouped[tanggal].push(item);

});

// tampilkan per kelompok tanggal
Object.keys(grouped).forEach(tgl => {

container.insertAdjacentHTML("beforeend",
`
<tr style="background:#eee;font-weight:bold">
<td colspan="5">📅 ${tgl}</td>
</tr>
`);

grouped[tgl].forEach((d,i)=>{

let ceklis = d.jumlah > 0 ? "✔" : "-";

container.insertAdjacentHTML("beforeend",
`
<tr>
<td>${i+1}</td>
<td>${d.masuk || "-"}</td>
<td>${d.koran || "-"}</td>
<td>${d.jumlah || 0}</td>
<td>${ceklis}</td>
</tr>
`);
});

});
