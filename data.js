window.DATA = { levels: [], players: [] };

async function fetchData() {
    const levelsUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=0&single=true&output=csv";
    const playersUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=645186334&single=true&output=csv";

    try {
        const [lRes, pRes] = await Promise.all([fetch(levelsUrl), fetch(playersUrl)]);
        const lText = await lRes.text();
        const pText = await pRes.text();

        window.DATA.levels = parseCSV(lText);
        window.DATA.players = parseCSV(pText).map(p => ({
            ...p,
            completions: p.completions ? p.completions.split(',').map(s => s.trim()) : []
        }));

        if (typeof renderLevels === 'function') renderLevels();
    } catch (e) { console.error("CSV Load Error", e); }
}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    return lines.slice(1).filter(line => line.trim()).map(line => {
        const values = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.replace(/^"|"$/g, '').trim());
        const obj = {};
        headers.forEach((h, i) => obj[h] = values[i]);
        return obj;
    });
}
fetchData();
