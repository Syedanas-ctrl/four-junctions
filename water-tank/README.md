# 💧 Water Tank Visualization

A web application that visualizes water trapped between blocks and calculates the total trapped water units.

## Overview

This app lets you:

1. Type in some block heights (just numbers with commas)
2. See how much water would get stuck between them
3. Check out a colorful picture of what it looks like

## How to Play With It

1. Just open `index.html` in any browser
2. Punch in some numbers like `0,4,0,0,0,6,0,6,4,0` (or make up your own pattern!)
3. Hit that "Calculate" button
4. Watch the magic happen! Blue blocks = walls, yellow stuff = trapped water

## Algorithm

The application uses the "two-pointer" technique to efficiently calculate the amount of water trapped:

1. We initialize two pointers at the left and right ends of the array
2. We maintain the maximum height seen from both directions
3. We move the pointer from the side with a smaller maximum height
4. We calculate water at each position as the difference between the minimum of the two maximum heights and the current height

## Example

Input: `[0,4,0,0,0,6,0,6,4,0]`
Output: 18 units of water

The visualization shows how water is trapped between the blocks, matching exactly what is shown in the example diagram. 