const DATA = {
    levels: [
        { 
            id: "atsc", 
            name: "Among the Stars C-Side", 
            points: 2000, 
            img: "assets/atsc.png", // Path to your uploaded file
            code: "123456", 
            desc: "The current top-tier challenge." 
        },
        // ... more levels
    ],
    players: [
        { name: "TheGrassyGuys", completions: ["atsc", "tic"] },
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
