const JSON_URL = "https://raw.githubusercontent.com/Michele530/Michele530.github.io/main/database.json";

const table = document.getElementById('clip-table');
const tbody = table.querySelector('tbody');

let clipsData = [];
let currentSort = { key: null, asc: true };

function renderTable(data) {
  tbody.innerHTML = "";
  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9">Aucun clip trouvé.</td></tr>';
    return;
  }

  data.forEach(clip => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${clip.id}</td>
      <td>${clip.author}</td>
      <td>${clip.player}</td>
      <td>${clip.map}</td>
      <td>${clip.type_competition}</td>
      <td>${clip.date_clip}</td>
      <td>${clip.note.toFixed(2)}</td>
      <td>${clip.weapons.join(', ')}</td>
      <td><a href="${clip.url}" target="_blank" rel="noopener noreferrer">Voir</a></td>
    `;
    tbody.appendChild(tr);
  });
}

function compareValues(a, b, asc, key) {
    if (key === 'note' || key === 'id') {
      a = Number(a);
      b = Number(b);
    } else if (key === 'weapons') {
      // Convertir le tableau d'armes en string jointe, minuscule pour trier
      a = (a || []).join(', ').toLowerCase();
      b = (b || []).join(', ').toLowerCase();
    } else {
      a = a.toString().toLowerCase();
      b = b.toString().toLowerCase();
    }
  
    if (a < b) return asc ? -1 : 1;
    if (a > b) return asc ? 1 : -1;
    return 0;
  }
  

function sortData(key) {
  if (currentSort.key === key) {
    currentSort.asc = !currentSort.asc;
  } else {
    currentSort.key = key;
    currentSort.asc = true;
  }

  table.querySelectorAll('th').forEach(th => {
    th.classList.remove('sort-asc', 'sort-desc');
    if (th.dataset.key === currentSort.key) {
      th.classList.add(currentSort.asc ? 'sort-asc' : 'sort-desc');
    }
  });

  clipsData.sort((a, b) => compareValues(a[key], b[key], currentSort.asc, key));
  renderTable(clipsData);
}

table.querySelectorAll('th[data-key]').forEach(th => {
  th.addEventListener('click', () => {
    sortData(th.dataset.key);
  });
});

fetch(JSON_URL)
  .then(res => {
    if (!res.ok) throw new Error('Fail to load JSON file (ask Vico to solve this)');
    return res.json();
  })
  .then(data => {
    clipsData = data;
    renderTable(clipsData);
  })
  .catch(err => {
    tbody.innerHTML = `<tr><td colspan="9" style="color:red;">${err.message}</td></tr>`;
  });
