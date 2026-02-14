// The data object that index and leaderboard will use
window.DATA = {
    levels: [],
    players: []
};

async function fetchData() {
    const levelsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=0&single=true&output=csv";
    const playersUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=645186334&single=true&output=csv";

    try {
        // Fetch both CSVs at the same time
        const [levelsRes, playersRes] = await Promise.all([
            fetch(levelsUrl),
            fetch(playersUrl)
        ]);

        const levelsText = await levelsRes.text();
        const playersText = await playersRes.text();

        // Convert CSV text to usable Objects
        window.DATA.levels = parseCSV(levelsText);
        window.DATA.players = parseCSV(playersText).map(p => ({
            ...p,
            // Convert "Level1, Level2" string into a clean Array
            completions: p.completions ? p.completions.split(',').map(s => s.trim()) : []
        }));

        console.log("Data Loaded Successfully:", window.DATA);

        // Tell the page to start drawing the list/leaderboard
        if (typeof renderLevels === 'function') {
            renderLevels();
        }

    } catch (error) {
        console.error("Error loading spreadsheet data:", error);
    }
}

// Helper to turn CSV text into a Javascript Array of Objects
function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        // This handles commas inside quotes if your descriptions have them
        const values = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());
        const obj = {};
        
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        result.push(obj);
    }
    return result;
}

// Start the process
fetchData();
