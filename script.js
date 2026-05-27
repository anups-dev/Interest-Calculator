// Store all added principal entries
let additionEntries = [
    { amount: 5000, daysFromEnd: 15 }
];

// Add a new principal entry
function addNewEntry() {
    additionEntries.push({ amount: 1000, daysFromEnd: 15 });
    renderAdditionEntries();
}

// Remove an entry
function removeEntry(index) {
    additionEntries.splice(index, 1);
    renderAdditionEntries();
}

// Update an entry
function updateEntry(index, field, value) {
    if (field === 'amount') {
        additionEntries[index].amount = parseFloat(value) || 0;
    } else if (field === 'daysFromEnd') {
        additionEntries[index].daysFromEnd = parseInt(value) || 0;
    }
}

// Render all addition entries
function renderAdditionEntries() {
    const listContainer = document.getElementById('additionsList');
    listContainer.innerHTML = '';

    additionEntries.forEach((entry, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'addition-entry';
        
        entryDiv.innerHTML = `
            <div class="addition-entry-field">
                <label>Amount</label>
                <input 
                    type="number" 
                    placeholder="Enter amount" 
                    step="0.1"
                    value="${entry.amount}"
                    onchange="updateEntry(${index}, 'amount', this.value)"
                >
                <span class="currency">₹</span>
            </div>
            <div class="addition-entry-field days-field">
                <label>Days Until End of Month</label>
                <input 
                    type="number" 
                    placeholder="Days" 
                    min="1"
                    max="31"
                    value="${entry.daysFromEnd}"
                    onchange="updateEntry(${index}, 'daysFromEnd', this.value)"
                >
                <span class="unit">days</span>
            </div>
            <button type="button" class="delete-entry-btn" onclick="removeEntry(${index})">Delete</button>
        `;
        
        listContainer.appendChild(entryDiv);
    });
}

// Calculate interest and display results
function calculateInterest() {
    // Get input values
    const lastPrincipal = parseFloat(document.getElementById('lastPrincipal').value);
    const totalDaysInMonth = parseInt(document.getElementById('totalDaysInMonth').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);

    // Validate inputs
    if (!lastPrincipal || !totalDaysInMonth || !annualRate) {
        alert('Please fill in all required fields');
        return;
    }

    if (totalDaysInMonth < 1 || totalDaysInMonth > 31) {
        alert('Total days in month should be between 1 and 31');
        return;
    }

    if (additionEntries.length === 0) {
        alert('Please add at least one principal entry');
        return;
    }

    // Validate all entries
    for (let i = 0; i < additionEntries.length; i++) {
        if (!additionEntries[i].amount || !additionEntries[i].daysFromEnd) {
            alert(`Entry ${i + 1}: Please fill in both amount and days`);
            return;
        }
        if (additionEntries[i].daysFromEnd > totalDaysInMonth) {
            alert(`Entry ${i + 1}: Days cannot exceed total days in month`);
            return;
        }
    }

    // Calculate interest using simple interest formula: I = (P × R × T) / (365 × 100)
    // where P = Principal, R = Annual Rate (%), T = Time in days

    // Interest on last principal for the full month
    const interestOnLast = (lastPrincipal * annualRate * totalDaysInMonth) / (365 * 100);

    // Calculate interest for each addition
    let totalAddedInterest = 0;
    const additionsResults = [];

    additionEntries.forEach((entry, index) => {
        const interestOnThisAddition = (entry.amount * annualRate * entry.daysFromEnd) / (365 * 100);
        totalAddedInterest += interestOnThisAddition;
        additionsResults.push({
            index: index,
            amount: entry.amount,
            days: entry.daysFromEnd,
            interest: interestOnThisAddition
        });
    });

    // Total interest
    const totalInterest = interestOnLast + totalAddedInterest;

    // Display results
    document.getElementById('interestOnLast').textContent = '₹' + interestOnLast.toFixed(2);
    
    // Display individual addition results
    const additionsResultsList = document.getElementById('additionsResultsList');
    additionsResultsList.innerHTML = '';

    additionsResults.forEach((result) => {
        const resultCard = document.createElement('div');
        resultCard.className = 'addition-result-card';
        resultCard.innerHTML = `
            <div class="result-item">
                <span class="addition-result-label">
                    Interest on ₹${result.amount.toFixed(2)} for ${result.days} days
                </span>
                <span class="addition-result-value">₹${result.interest.toFixed(2)}</span>
            </div>
        `;
        additionsResultsList.appendChild(resultCard);
    });

    // Display total
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
    document.getElementById('totalDaysInMonth').value = 30;
    document.getElementById('interestRate').value = 6;

    // Reset entries
    additionEntries = [
        { amount: 5000, daysFromEnd: 15 }
    ];
    renderAdditionEntries();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Render initial entries
    renderAdditionEntries();

    // Allow Enter key to calculate
    document.getElementById('interestForm').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            calculateInterest();
        }
    });
});
