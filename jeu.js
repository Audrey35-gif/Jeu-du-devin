// =======================================================
// Variables de jeu
// =======================================================
let nombreSecret = Math.floor(Math.random() * 20) + 1;
let compteurTentatives = 0;

// =======================================================
// Références aux éléments HTML
// =======================================================
const inputTentative = document.getElementById('tentative');
const resultatElement = document.getElementById('resultat');
const boutonDeviner = document.getElementById('boutonDeviner');
const boutonRejouer = document.getElementById('boutonRejouer');

// Sécurité : vérifier que les éléments existent
if (!inputTentative || !resultatElement || !boutonDeviner || !boutonRejouer) {
  console.error('Un ou plusieurs éléments HTML sont introuvables. Vérifie les ids dans ton HTML.');
  // on arrête le script pour éviter des erreurs
  throw new Error('Éléments HTML manquants');
}

// =======================================================
// Fonctions du jeu
// =======================================================
function verifierTentative() {
  const valeur = inputTentative.value;
  const tentativeJoueur = parseInt(valeur, 10);

  if (isNaN(tentativeJoueur) || tentativeJoueur < 1 || tentativeJoueur > 20) {
    resultatElement.textContent = "Erreur : entre un nombre valide entre 1 et 20 !";
    resultatElement.setAttribute('role', 'status');
    resultatElement.style.backgroundColor = 'yellow';
    inputTentative.value = '';
    inputTentative.focus();
    return;
  }

  compteurTentatives++;

  if (tentativeJoueur === nombreSecret) {
    resultatElement.textContent = `🥳 Bravo Kp ! Tu as trouvé le nombre secret (${nombreSecret}) en ${compteurTentatives} essais.`;
    resultatElement.style.backgroundColor = 'lightgreen';
    terminerPartie();
  } else if (tentativeJoueur < nombreSecret) {
    resultatElement.textContent = `C'est ${tentativeJoueur}. Trop bas. Essaie encore !`;
    resultatElement.style.backgroundColor = 'lightblue';
  } else {
    resultatElement.textContent = `C'est ${tentativeJoueur}. Trop haut. Essaie encore !`;
    resultatElement.style.backgroundColor = 'lightcoral';
  }

  // Effacer et remettre le focus pour la prochaine tentative
  inputTentative.value = '';
  inputTentative.focus();
}

function terminerPartie() {
  boutonDeviner.disabled = true;
  inputTentative.disabled = true;
  boutonRejouer.style.display = 'inline-block';
  // Optionnel : annoncer la victoire pour les aides vocales
  resultatElement.setAttribute('aria-live', 'polite');
}

function reinitialiserJeu() {
  nombreSecret = Math.floor(Math.random() * 20) + 1;
  compteurTentatives = 0;

  resultatElement.textContent = "Je pense à un nouveau nombre entre 1 et 20. À toi de jouer !";
  resultatElement.style.backgroundColor = 'transparent';

  inputTentative.value = '';
  inputTentative.disabled = false;
  boutonDeviner.disabled = false;
  boutonRejouer.style.display = 'none';
  inputTentative.focus();
}

// =======================================================
// Événements : préférence addEventListener (pas d'onclick inline)
// =======================================================
boutonDeviner.addEventListener('click', verifierTentative);
boutonRejouer.addEventListener('click', reinitialiserJeu);

// Permettre d'appuyer sur Entrée dans l'input
inputTentative.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    verifierTentative();
  }
});
