const playlistContainer = document.getElementById("playlist-container");

playlists.forEach((playlist) => {
    const card = document.createElement("div");
    card.classList.add("playlist-card");

    const maxLength = 200;
    const description = playlist.description || "Sem descrição disponível";
    const isLong = description.length > maxLength;

    // Criação da descrição curta com o botão "Ler mais"
    const shortDesc = isLong
        ? `${description.substring(0, maxLength)}<span class="ler-mais"> Ler mais</span>`
        : description;

    card.innerHTML = `
        <h3>${playlist.title}</h3>
        <p class="description-text">${shortDesc}</p>
        <a href="${playlist.link}" class="play-button" target="_blank" rel="noopener noreferrer">Ouvir Agora</a>
    `;

    playlistContainer.appendChild(card);
});

// Ativa o "ler mais/menos"
playlistContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("ler-mais")) {
        const span = event.target;
        const p = span.parentElement;  // Pega o parágrafo onde o "Ler mais" está
        const card = span.closest(".playlist-card");
        const title = card.querySelector("h3").textContent; // Título do card
        const playlist = playlists.find(pl => pl.title === title); // Encontra a playlist correspondente

        // Alterna entre "Ler mais" e "Ler menos"
        if (p.classList.contains("expanded")) {
            p.innerHTML = `${playlist.description.substring(0, 200)}<span class="ler-mais"> Ler mais</span>`;
            p.classList.remove("expanded");
        } else {
            p.innerHTML = `${playlist.description}<span class="ler-mais"> Ler menos</span>`;
            p.classList.add("expanded");
        }
    }
});
