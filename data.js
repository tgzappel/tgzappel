const DATA = {
    levels: [
        { 
            id: "atsc", 
            name: "Among the Stars C-Side", 
            author: "TheGrassyGuys", 
            skills: "Timing, Precision", 
            stats: "12 CPS", 
            points: 2000, 
            img: "assets/atsc.png", 
            code: "123-456", 
            desc: "The final challenge of Crystalline Peaks." 
        },
        { 
            id: "tic", 
            name: "The Instant Cheeseless", 
            author: "Michael Chan", 
            skills: "Speed, Memory", 
            stats: "Average Enjoyment: 1 - Average Quality: 5 - Skill to Effort Balance: 7", 
            points: 1750, 
            img: "assets/tic.png", 
            code: "987-654", 
            desc: "A fast-paced level with zero room for error." 
        }
        // Add more levels here...
    ],
    players: [
        { name: "Grassy", completions: ["atsc", "tic"] },
        { name: "AppelPro", completions: ["atsc"] }
        // Add more players here...
    ]
};
