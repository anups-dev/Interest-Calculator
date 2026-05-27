// Calculate interest and display results
function calculateInterest() {
    // Get input values
    const lastPrincipal = parseFloat(document.getElementById('lastPrincipal').value);
    const addedPrincipal = parseFloat(document.getElementById('addedPrincipal').value);
    const daysRemaining = parseFloat(document.getElementById('daysRemaining').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);

    // Validate inputs
    if (!lastPrincipal || !addedPrincipal || !daysRemaining || !annualRate) {
        alert('Please fill in all fields');
        return;
    }

    if (daysRemaining < 1 || daysRemaining > 31) {
        alert('Days remaining should be between 1 and 31');
        return;
    }

    // Calculate interest using simple interest formula: I = (P × R × T) / (365 × 100)
    // where P = Principal, R = Annual Rate (%), T = Time in days
    
    // Days in the full month (assuming 30 days for standard calculation)
    const daysInMonth = 30;

    // Interest on last principal for the full month
    const interestOnLast = (lastPrincipal * annualRate * daysInMonth) / (365 * 100);

    // Interest on added principal for remaining days
    const interestOnAdded = (addedPrincipal * annualRate * daysRemaining) / (365 * 100);

    // Total interest
    const totalInterest = interestOnLast + interestOnAdded;

    // Display results
    document.getElementById('interestOnLast').textContent = '₹' + interestOnLast.toFixed(2);
    document.getElementById('interestOnAdded').textContent = '₹' + interestOnAdded.toFixed(2);
    document.getElementById('totalInterest').textContent = '₹' + totalInterest.toFixed(2);

    // Show results section
    document.getElementById('results').classList.remove('hidden');
}

// Reset form and hide results
function resetForm() {
    document.getElementById('interestForm').reset();
    document.getElementById('results').classList.add('hidden');

    // Reset to default values
    document.getElementById('lastPrincipal').value = 10000;
    document.getElementById('addedPrincipal').value = 5000;
    document.getElementById('daysRemaining').value = 15;
    document.getElementById('interestRate').value = 6;
}

// Allow Enter key to calculate
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('interestForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateInterest();
        }
    });
});
