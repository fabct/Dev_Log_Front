document.addEventListener("DOMContentLoaded", function() {
    // récupère les données JSON à partir du fichier data.json
    fetch("../../ressources/users.json")
      .then(response => response.json())
      .then(data => {
        // sélectionne le corps du tableau dans le HTML
        const tbody = document.querySelector("#client-table tbody");
        
        // boucle à travers les données JSON et les ajoute au tableau
        data.forEach(client => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${client.first}</td>
            <td>${client.last}</td>
            <td>${client.email}</td>
          `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => console.error(error));
});
  