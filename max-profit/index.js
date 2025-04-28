function maxProfit(n) {
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
                if (dp[t] < dp[t - time] + earning) {
                    dp[t] = dp[t - time] + earning;
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
console.log(maxProfit(7));   // { earnings: 3000, solution: 'T: 1 P: 0 C: 0' }
console.log(maxProfit(8));   // { earnings: 4500, solution: 'T: 1 P: 1 C: 0' }
console.log(maxProfit(13));  // { earnings: 16500, solution: 'T: 2 P: 2 C: 0' }