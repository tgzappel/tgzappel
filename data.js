/*unc*/
const LEVELS_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=0&output=csv";
const PLAYERS_CSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=2037985449&output=csv";

window.DATA = { levels: [], players: [] };

async function fetchAllData() {
    try {
        const [resL, resP] = await Promise.all([fetch(LEVELS_CSV), fetch(PLAYERS_CSV)]);
        const parseCSV = (text) => {
            const rows = text.split(/\r?\n/).slice(1);
            return rows.filter(r => r.trim() !== "").map(row => 
                row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/^"|"$/g, '').trim())
            );
        };

        const lData = parseCSV(await resL.text());
        const pData = parseCSV(await resP.text());

        window.DATA.levels = lData.map(c => ({
            id: c[0], name: c[1], author: c[2], verifier: c[3] || "N/A",
            skills: c[4] || "", enjoyment: c[5] || "N/A", ratio: c[6] || "N/A",
            quality: c[7] || "N/A", points: parseInt(c[8]) || 0, img: c[9],
            location: c[10], desc: c[11]
        }));

        window.DATA.players = pData.map(c => ({
            name: c[0], completions: c[1] ? c[1].split(',').map(s => s.trim()) : []
        }));

        if (typeof renderLevels === "function") renderLevels();
        if (typeof calculateLeaderboard === "function") calculateLeaderboard();
    } catch (err) { console.error("Fetch error:", err); }
}
fetchAllData();
