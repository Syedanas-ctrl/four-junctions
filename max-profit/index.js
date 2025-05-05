function maxProfit(n) {
    if (isNaN(n)) return { earnings: 0, solution: 'Invalid input', allSolutions: [] };
    
    // Property definitions
    const properties = [
        { name: 'T', time: 5, earning: 1500 },
        { name: 'P', time: 4, earning: 1000 },
        { name: 'C', time: 10, earning: 3000 }
    ];

    // DP arrays
    const dp = Array(n + 1).fill(0);
    const choices = Array(n + 1).fill().map(() => []);

    // DP computation
    for (let t = 1; t <= n; t++) {
        for (let i = 0; i < properties.length; i++) {
            const { time, earning } = properties[i];
            if (t >= time) {
                const operationalTime = t - time;
                const potentialEarning = dp[t - time] + operationalTime * earning;
                
                if (potentialEarning > dp[t]) {
                    dp[t] = potentialEarning;
                    choices[t] = [[i, t - time]]; // [property index, remaining time]
                } else if (potentialEarning === dp[t]) {
                    choices[t].push([i, t - time]);
                }
            }
        }
    }

    // Find all solutions
    const allSolutions = new Set();
    
    function buildSolutions(time, solution) {
        if (time <= 0) {
            const count = [0, 0, 0]; // [T, P, C]
            solution.forEach(idx => count[idx]++);
            allSolutions.add(`T: ${count[0]} P: ${count[1]} C: ${count[2]}`);
            return;
        }
        
        if (!choices[time] || choices[time].length === 0) {
            if (dp[time] === 0) {
                const count = [0, 0, 0];
                solution.forEach(idx => count[idx]++);
                allSolutions.add(`T: ${count[0]} P: ${count[1]} C: ${count[2]}`);
            }
            return;
        }
        
        for (const [propIdx, nextTime] of choices[time]) {
            buildSolutions(nextTime, [...solution, propIdx]);
        }
    }
    
    buildSolutions(n, []);
    
    const solutions = [...allSolutions];
    
    return {
        earnings: dp[n],
        solution: solutions[0] || 'T: 0 P: 0 C: 0',
        allSolutions: solutions
    };
}

// Example usage:
console.log(maxProfit(0));
console.log(maxProfit(0/0));
console.log(maxProfit(7));
console.log(maxProfit(8));
console.log(maxProfit(13));
console.log(maxProfit(49));
