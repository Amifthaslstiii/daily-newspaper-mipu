let newsData = JSON.parse(localStorage.getItem("newsData")) || [];

const hariList = ["Sen","Sel","Rab","Kam","Jum","Sab","Min"];

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
    const bulanNama = date.toLocaleString("id-ID",{month:"long"});
    const key = `${bulanNama} ${tahun}`;

    if(!rekap[key]){
      rekap[key] = [];
    }

    rekap[key].push(item);
  });

  let html = "";

  for(let periode in rekap){

    html += `<h3>${periode}</h3>`;

    html += `
    <table>
      <tr>
        <th>No</th>
        <th>Tgl</th>
        <th>Sen</th>
        <th>Sel</th>
        <th>Rab</th>
        <th>Kam</th>
        <th>Jum</th>
        <th>Sab</th>
        <th>Min</th>
        <th>Tgl Koran</th>
        <th>Jumlah</th>
      </tr>
    `;

    rekap[periode].forEach((item,index)=>{

      const date = new Date(item.masuk);
      const hariIndex = date.getDay(); 
      const tanggal = date.getDate();

      let hariKolom = "";

    for(let i=1;i<=7;i++){

  const isHariSesuai = (hariIndex === 0 && i===7) || hariIndex===i;

  if(isHariSesuai){


    if(item.koran && item.jumlah){
      hariKolom += "<td>✔</td>";   // lengkap
    } else {
      hariKolom += "<td>✖</td>";   // tidak lengkap
    }

  } else {
    hariKolom += "<td>-</td>";
  }
}

      html += `
      <tr>
        <td>${(index % 31)+1}</td>
        <td>${tanggal}</td>
        ${hariKolom}
        <td>${item.koran || "-"}</td>
        <td>${item.jumlah || 0}</td>
      </tr>
      `;
    });

    html += "</table>";
  }

  container.innerHTML = html;
}

buatRekap();
