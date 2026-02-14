window.DATA = { levels: [], players: [] };

async function fetchData() {
    const lUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=0&single=true&output=csv";
    const pUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=645186334&single=true&output=csv";

    try {
        const [lR, pR] = await Promise.all([fetch(lUrl), fetch(pUrl)]);
        const lT = await lR.text();
        const pT = await pR.text();

        window.DATA.levels = parseCSV(lT);
        
        // Sanitize Players and their completions
        window.DATA.players = parseCSV(pT).map(p => ({
            ...p,
            // Split by comma, then trim spaces and filter out empty strings
            completions: p.completions 
                ? p.completions.split(',').map(s => s.trim()).filter(s => s !== "") 
                : []
        }));

        if (typeof renderLevels === 'function') renderLevels();
    } catch (e) { 
        console.error("Data fetch error:", e); 
    }
}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    return lines.slice(1).filter(l => l.trim()).map(l => {
        // Advanced regex to handle commas inside quotes
        const v = l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(x => x.replace(/^"|"$/g, '').trim());
        const o = {};
        headers.forEach((h, i) => o[h] = v[i]);
        return o;
    });
}
fetchData();
