document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateEstimate);
    
    // Base cost per sq ft for different project types
    const baseCosts = {
        residential: 150,
        commercial: 200,
        industrial: 250,
        infrastructure: 300
    };
    
    // Complexity multipliers
    const complexityMultipliers = {
        simple: 0.9,
        moderate: 1.0,
        complex: 1.3,
        'high-end': 1.7
    };
    
    // Location cost adjustments (example values)
    const locationAdjustments = {
        'new york': 1.4,
        'san francisco': 1.5,
        'chicago': 1.1,
        'houston': 0.9,
        'miami': 1.2
    };
    
    function calculateEstimate() {
        // Get input values
        const projectType = document.getElementById('project-type').value;
        const projectSize = parseFloat(document.getElementById('project-size').value) || 0;
        const complexity = document.getElementById('complexity').value;
        const location = document.getElementById('location').value.toLowerCase();
        const duration = parseFloat(document.getElementById('duration').value) || 6;
        
        // Validate inputs
        if (projectSize <= 0) {
            alert('Please enter a valid project size');
            return;
        }
        
        // Calculate base cost
        let baseCostPerSqFt = baseCosts[projectType] || 150;
        
        // Apply complexity multiplier
        const complexityFactor = complexityMultipliers[complexity] || 1.0;
        baseCostPerSqFt *= complexityFactor;
        
        // Apply location adjustment
        let locationFactor = 1.0;
        for (const [key, value] of Object.entries(locationAdjustments)) {
            if (location.includes(key)) {
                locationFactor = value;
                break;
            }
        }
        baseCostPerSqFt *= locationFactor;
        
        // Calculate total base cost
        const totalBaseCost = projectSize * baseCostPerSqFt;
        
        // Calculate cost breakdown (approximate percentages)
        const materialsCost = totalBaseCost * 0.45;
        const laborCost = totalBaseCost * 0.35;
        const equipmentCost = totalBaseCost * 0.12;
        const permitsCost = totalBaseCost * 0.08;
        
        const totalCost = materialsCost + laborCost + equipmentCost + permitsCost;
        
        // Apply duration adjustment (longer projects may have higher costs)
        const durationFactor = 1 + (duration / 24) * 0.1; // 10% increase per 2 years
        const adjustedTotalCost = totalCost * durationFactor;
        
        // Update the UI
        document.getElementById('materials-cost').textContent = formatCurrency(materialsCost);
        document.getElementById('labor-cost').textContent = formatCurrency(laborCost);
        document.getElementById('equipment-cost').textContent = formatCurrency(equipmentCost);
        document.getElementById('permits-cost').textContent = formatCurrency(permitsCost);
        document.getElementById('total-cost').textContent = formatCurrency(adjustedTotalCost);
    }
    
    function formatCurrency(amount) {
        return '$' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
});