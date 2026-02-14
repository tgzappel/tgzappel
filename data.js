window.DATA = { levels: [], players: [] };

async function fetchData() {
    const lUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=0&single=true&output=csv";
    const pUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSAr2BhXbwr5ApU9nFjskDz_S-8Q7my0UCzxa62AMNVBiJD1yiSZgiYdGYYad765gDsjDpuR34zb3rv/pub?gid=645186334&single=true&output=csv";

    try {
        const [lR, pR] = await Promise.all([fetch(lUrl), fetch(pUrl)]);
        const lT = await lR.text();
        const pT = await pR.text();

        window.DATA.levels = parseCSV(lT);
        window.DATA.players = parseCSV(pT).map(p => ({
            ...p,
            completions: p.completions ? p.completions.split(',').map(s => s.trim()) : []
        }));

        if (typeof renderLevels === 'function') renderLevels();
    } catch (e) { console.error(e); }
}

function parseCSV(csv) {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    return lines.slice(1).filter(l => l.trim()).map(l => {
        const v = l.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(x => x.replace(/^"|"$/g, '').trim());
        const o = {};
        headers.forEach((h, i) => o[h] = v[i]);
        return o;
    });
}
fetchData();
