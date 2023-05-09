const https = require('https');
const fs = require('fs');
const path = require('path');
var __dirname_HTML = "../public/HTML/";

const express = require("express");
let app = express();
const port = 8080;

const server = https.createServer((req, res) => {
  start: port => {
    app.listen(port, () => {
      console.log(`App listening to port ${port}`);
    });
  
    app.use(express.static("../public"));
  }
  
});

/* // Crée un serveur HTTP
const server = http.createServer((req, res) => {
  // Récupère l'URL de la requête
  const url = req.url;

  // Si l'URL est '/', renvoie la page principale
  if (url === '/') {
    const filePath = path.join(__dirname_HTML, 'index.html');
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end(`Erreur du serveur: ${error}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
  }
  
  // Si l'URL est '/add-client', renvoie la page d'ajout de client
  else if (url === '/add-client') {
    const filePath = path.join(__dirname_HTML, 'add-client.html');
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end(`Erreur du serveur: ${error}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
  }

  // Si l'URL est '/edit-client', renvoie la page de modification de client
  else if (url === '/edit-client') {
    const filePath = path.join(__dirname_HTML, 'edit-client.html');
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end(`Erreur du serveur: ${error}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
  }

  // Si l'URL est '/delete-client', renvoie la page de suppression de client
  else if (url === '/delete-client') {
    const filePath = path.join(__dirname_HTML, 'delete-client.html');
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end(`Erreur du serveur: ${error}`);
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content, 'utf-8');
      }
    });
  }

  // Si l'URL correspond à un fichier CSS ou JS, renvoie le fichier demandé
  else if (/\.(CSS|JS)$/.test(url)) {
    const filePath = path.join(__dirname, url);
    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end(`Erreur du serveur: ${error}`);
      } else {
        res.writeHead(200, { 'Content-Type': `text/${url.split('.').pop()}` });
        res.end(content, 'utf-8');
      }
    });
  }

  // Si l'URL ne correspond à aucun des cas ci-dessus, renvoie une erreur 404
  else {
    res.writeHead(404);
    res.end('Page introuvable');
  }
});

// Ecoute les connexions sur le port 3000
server.listen(8080, () => {
  console.log('Serveur démarré sur http://localhost:8080');
});
 */