document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const heightsInput = document.getElementById('heights');
    const waterUnitsOutput = document.getElementById('water-units');
    const svgContainer = document.getElementById('svg-container');

    heightsInput.value = '0,4,0,0,0,6,0,6,4,0';

    calculateBtn.addEventListener('click', () => {
        const heightsStr = heightsInput.value.trim();
        const heights = parseHeights(heightsStr);

        if (heights.length === 0) {
            alert('Please enter valid block heights');
            return;
        }

        const waterUnits = calculateWaterUnits(heights);
        waterUnitsOutput.textContent = waterUnits;

        renderVisualization(heights, svgContainer);
    });

    function parseHeights(input) {
        const cleaned = input.replace(/[\[\]]/g, '');
        return cleaned.split(',')
            .map(h => h.trim())
            .filter(h => h !== '')
            .map(h => parseInt(h, 10))
            .filter(h => !isNaN(h) && h >= 0);
    }

    function calculateWaterUnits(heights) {
        if (heights.length <= 2) return 0;

        let left = 0;
        let right = heights.length - 1;
        let leftMax = heights[left];
        let rightMax = heights[right];
        let waterUnits = 0;

        while (left < right) {
            if (leftMax <= rightMax) {
                left++;
                leftMax = Math.max(leftMax, heights[left]);
                waterUnits += Math.max(0, leftMax - heights[left]);
            } else {
                right--;
                rightMax = Math.max(rightMax, heights[right]);
                waterUnits += Math.max(0, rightMax - heights[right]);
            }
        }

        return waterUnits;
    }

    function renderVisualization(heights, container) {
        container.innerHTML = '';

        const maxHeight = Math.max(...heights, 1);
        const cellSize = 40;
        const gridWidth = heights.length;
        const gridHeight = maxHeight;
        const svgWidth = gridWidth * cellSize;
        const svgHeight = gridHeight * cellSize;

        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', svgWidth);
        svg.setAttribute('height', svgHeight);
        svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);

        // Create grid pattern
        for (let y = 0; y < gridHeight; y++) {
            for (let x = 0; x < gridWidth; x++) {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', x * cellSize);
                rect.setAttribute('y', (gridHeight - y - 1) * cellSize);
                rect.setAttribute('width', cellSize);
                rect.setAttribute('height', cellSize);
                rect.setAttribute('class', 'grid');
                svg.appendChild(rect);
            }
        }

        // Calculate water levels
        const waterLevels = calculateWaterLevels(heights);

        // Draw blocks and water
        for (let x = 0; x < heights.length; x++) {
            const blockHeight = heights[x];
            const waterHeight = waterLevels[x] - blockHeight;

            // Draw block
            if (blockHeight > 0) {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', x * cellSize);
                rect.setAttribute('y', (gridHeight - blockHeight) * cellSize);
                rect.setAttribute('width', cellSize);
                rect.setAttribute('height', blockHeight * cellSize);
                rect.setAttribute('class', 'block');
                svg.appendChild(rect);
            }

            // Draw water
            if (waterHeight > 0) {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', x * cellSize);
                rect.setAttribute('y', (gridHeight - blockHeight - waterHeight) * cellSize);
                rect.setAttribute('width', cellSize);
                rect.setAttribute('height', waterHeight * cellSize);
                rect.setAttribute('class', 'water');
                svg.appendChild(rect);
            }
        }

        container.appendChild(svg);
    }

    function calculateWaterLevels(heights) {
        const n = heights.length;
        const waterLevels = [...heights];
        
        let leftMax = 0;
        for (let i = 0; i < n; i++) {
            leftMax = Math.max(leftMax, heights[i]);
            waterLevels[i] = leftMax;
        }
        
        let rightMax = 0;
        for (let i = n - 1; i >= 0; i--) {
            rightMax = Math.max(rightMax, heights[i]);
            waterLevels[i] = Math.min(waterLevels[i], rightMax);
        }
        
        return waterLevels;
    }

    calculateBtn.click();
}); 