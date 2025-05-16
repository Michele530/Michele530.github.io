const CLIP_LIST = document.getElementById("clip-list");

// Remplace cette URL par le lien vers ton fichier JSON sur GitHub
const JSON_URL = "https://raw.githubusercontent.com/<ton-user>/<ton-repo>/main/database.json";

fetch(JSON_URL)
  .then((response) => {
    if (!response.ok) throw new Error("Erreur de chargement des données.");
    return response.json();
  })
  .then((clips) => {
    CLIP_LIST.innerHTML = ""; // Clear loading text
    clips.forEach((clip) => {
      const card = document.createElement("div");
      card.className = "clip-card";
      card.innerHTML = `
        <h2>Clip ID: ${clip.id}</h2>
        <p><strong>Author:</strong> ${clip.author}</p>
        <p><strong>Player:</strong> ${clip.player}</p>
        <p><strong>Map:</strong> ${clip.map}</p>
        <p><strong>Type:</strong> ${clip.type_competition}</p>
        <p><strong>Date:</strong> ${clip.date_clip}</p>
        <p><strong>Weapons:</strong> ${clip.weapons.join(", ")}</p>
        <p><strong>Note:</strong> ${clip.note ? clip.note.toFixed(2) : "N/A"}/5</p>
        <p><a href="${clip.url}" target="_blank">Watch Clip</a></p>
      `;
      CLIP_LIST.appendChild(card);
    });
  })
  .catch((error) => {
    CLIP_LIST.innerHTML = `<p style="color: red;">Erreur: ${error.message}</p>`;
  });
