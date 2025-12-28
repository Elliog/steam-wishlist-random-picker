async function pick() {
  const steamId = document.getElementById("steamid").value.trim();
  const status = document.getElementById("status");
  const result = document.getElementById("result");

  status.textContent = "";
  result.textContent = "";

  if (!/^\d{17}$/.test(steamId)) {
    status.textContent = "SteamID invalide (17 chiffres requis)";
    return;
  }

  const url =
    `https://store.steampowered.com/wishlist/profiles/${steamId}/wishlistdata/`;

  try {
    status.textContent = "Chargement de la wishlist…";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Wishlist inaccessible");
    }

    const data = await response.json();
    const games = Object.values(data);

    if (games.length === 0) {
      status.textContent = "Wishlist vide.";
      return;
    }

    const randomGame =
      games[Math.floor(Math.random() * games.length)];

    status.textContent = "";
    result.textContent = randomGame.name;

  } catch {
    status.textContent =
      "Erreur : SteamID invalide ou wishlist privée.";
  }
}

function extractId() {
  const url = document.getElementById("profileUrl").value.trim();
  const output = document.getElementById("steamIdResult");

  const match = url.match(/profiles\/(\d{17})/);

  if (match) {
    document.getElementById("steamid").value = match[1];
    output.textContent = "SteamID trouvé : " + match[1];
  } else {
    output.textContent =
      "Impossible de détecter un SteamID dans cette URL.";
  }
}
