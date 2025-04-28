# Algorithm: Dynamic Programming (DP)

Maximize profit given a time constraint and a set of build options.

## Problem

You have **n** units of time.  
You can build:

- **Theatre**: 5 time units, $1500 profit
- **Pub**: 4 time units, $1000 profit
- **Commercial Park**: 10 time units, $3000 profit

Constraints:
- Only **one property** can be built at a time (sequential, not parallel).

**Objective**:  
Find the mix of properties that maximizes profit within **n** units of time.

---

## Algorithm (Dynamic Programming)

### State

- `dp[t]` = Maximum profit achievable in `t` units of time.

### Transition

For each time `t` from 1 to `n`:

- Try building each property if enough time remains:
  - If `t >= time_needed`, then
    ``` 
    dp[t] = max(dp[t], dp[t - time_needed] + earning)
    ```

### Reconstruction

To reconstruct the solution (i.e., the number of each property built):

- Maintain a **choice array** to track which property was selected at each time step.

---
