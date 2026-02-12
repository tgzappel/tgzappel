const DATA = {
    levels: [
        { id: "atsc", name: "Among the Stars C-Side", points: 2000, img: "atsc.png", code: "123..." },
        { id: "tic", name: "The Instant Cheeseless", points: 1750, img: "tic.png", code: "456..." },
        // If you add a level here, you don't need to change any IDs!
    ],
    players: [
        { name: "Grassy", completions: ["atsc", "tic"] },
        { name: "AppelPro", completions: ["tic"] }
    ]
};

function showLevelDetails(levelId) {
    const lvl = DATA.levels.find(l => l.id === levelId);
    // Find all players who beat this level
    const victors = DATA.players.filter(p => p.completions.includes(levelId));
    
    const modalContent = `
        <h2>${lvl.name}</h2>
        <img src="${lvl.img}" style="width:100%">
        <p>${lvl.desc}</p>
        <h3>Victors:</h3>
        <ul>${victors.map(v => `<li>${v.name}</li>`).join('')}</ul>
    `;
    openModal(modalContent);
}
