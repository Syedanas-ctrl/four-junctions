# Algorithm: Dynamic Programming (DP)

Maximize profit given a time constraint and a set of build options.

## Problem

You have **n** units of time.  
You can build:

- **Theatre**: 5 time units, $1500 profit after built
- **Pub**: 4 time units, $1000 profit after built
- **Commercial Park**: 10 time units, $3000 profit after built

Constraints:
- Only **one property** can be built at a time (sequential, not parallel).

**Objective**:  
Find the mix of properties that maximizes profit within **n** units of time.

---

## Algorithm (Dynamic Programming)

### State

- `dp[t]` = Maximum profit achievable in `t` units of time.
- `choices[t]` = Array of all property choices at time `t` that lead to maximum profit.

### Transition

For each time `t` from 1 to `n`:
- For each property `i` with building time `time[i]` and earning rate `earning[i]`:
  - If `t >= time[i]`, calculate potential earnings:
    ```
    operationalTime = t - time[i]
    potentialEarning = dp[t - time[i]] + operationalTime * earning[i]
    ```
  - Update state:
    ```
    if potentialEarning > dp[t]:
        dp[t] = potentialEarning
        choices[t] = [[i, t - time[i]]]  // Clear previous choices
    else if potentialEarning == dp[t]:
        choices[t].append([i, t - time[i]])  // Add alternative choice
    ```

### Finding All Optimal Solutions

To find all combinations that achieve maximum profit:
- Use backtracking to explore all paths in the `choices` array
- Each path from time `n` to 0 represents one optimal solution
- For each time step, try all available choices that lead to optimal profit

### Time and Space Complexity

- Time Complexity: O(n * m + k), where:
  - n = time units
  - m = number of property types (3 in this case)
  - k = number of optimal solution combinations
- Space Complexity: O(n)

---
