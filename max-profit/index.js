function maxProfit(n) {
    if (isNaN(n)) {
        return {
            earnings: 0,
            solution: 'Invalid input'
        };
    }
    
    // Property definitions
    const properties = [
        { name: 'T', time: 5, earning: 1500 },
        { name: 'P', time: 4, earning: 1000 },
        { name: 'C', time: 10, earning: 3000 }
    ];

    // DP arrays
    const dp = Array(n + 1).fill(0);
    const choice = Array(n + 1).fill(null);

    // DP computation
    for (let t = 1; t <= n; t++) {
        for (let i = 0; i < properties.length; i++) {
            const { name, time, earning } = properties[i];
            if (t >= time) {
                // Calculate operational time and earnings
                const operationalTime = t - time;  // Time building is operational
                const totalEarning = operationalTime * earning;
                
                if (dp[t] < dp[t - time] + totalEarning) {
                    dp[t] = dp[t - time] + totalEarning;
                    choice[t] = i; // store index of property chosen
                }
            }
        }
    }

    // Reconstruct solution
    let t = n;
    const count = [0, 0, 0]; // [Theatre, Pub, Commercial Park]
    while (t > 0 && choice[t] !== null) {
        const idx = choice[t];
        count[idx]++;
        t -= properties[idx].time;
    }

    // Output
    return {
        earnings: dp[n],
        solution: `T: ${count[0]} P: ${count[1]} C: ${count[2]}`
    };
}

// Example usage:
console.log(maxProfit(0));  
console.log(maxProfit(0/0));  
console.log(maxProfit(7));
console.log(maxProfit(8));  
console.log(maxProfit(13)); 
console.log(maxProfit(49)); 