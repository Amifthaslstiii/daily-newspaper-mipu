const tableBody = document.querySelector("#newsTable tbody");

function formatDate(d){
  return d.toISOString().split('T')[0];
}

function getDateByOption(opt){
  let d = new Date();
  if(opt=="kemarin") d.setDate(d.getDate()-1);
  if(opt=="2hari") d.setDate(d.getDate()-2);
  if(opt=="minggu") d.setDate(d.getDate()-7);
  return formatDate(d);
}

function saveData(){
  localStorage.setItem("koranData", tableBody.innerHTML);
}

function loadData(){
  const data = localStorage.getItem("koranData");
  if(data) tableBody.innerHTML = data;
}

function addRow(){

  const rowCount = tableBody.rows.length + 1;

  const row = `
  <tr>
    <td>${rowCount}</td>

    <td>
      <select onchange="this.nextElementSibling.value=getDateByOption(this.value); saveData();">
        <option value="">Pilih</option>
        <option value="today">Hari ini</option>
        <option value="kemarin">Kemarin</option>
        <option value="2hari">2 hari lalu</option>
        <option value="minggu">Seminggu lalu</option>
      </select>
      <br>
      <input type="date" onchange="saveData()">
    </td>

    <td>
      <input type="text" placeholder="😊✨" style="width:60px" onchange="saveData()">
    </td>

    <td>
      <input type="date" onchange="saveData()">
    </td>

    <td>
      <button class="qty" onclick="this.parentNode.dataset.val=4; saveData()">4</button>
    </td>

    <td>
      <input type="checkbox" onchange="saveData()">
    </td>
  </tr>
  `;

  tableBody.insertAdjacentHTML("beforeend", row);
  saveData();
}

loadData();

const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  const data = {
    title: title,
    content: content
  };

  localStorage.setItem("newspaperData", JSON.stringify(data));

  alert("Data saved!");
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("newspaperData");

  if (saved) {
    const data = JSON.parse(saved);

    document.getElementById("title").value = data.title;
    document.getElementById("content").value = data.content;
  }
});

