// Element types and their symbols
const ELEMENTS = {
    fire: '🔥',
    water: '💧',
    wind: '🌪️',
    earth: '🌍'
};

const elementNames = Object.keys(ELEMENTS);

// Generate a random card with 4 numbers that sum to 12
function generateRandomCard(element = null) {
    // Generate 4 random numbers between 1 and 9 that sum to 12
    let numbers;
    let attempts = 0;
    const maxAttempts = 1000;
    
    do {
        numbers = [];
        let remaining = 12;
        
        // Generate first 3 numbers
        for (let i = 0; i < 3; i++) {
            const min = 1;
            const max = Math.min(9, remaining - (3 - i)); // Ensure we can still make valid remaining numbers
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.push(num);
            remaining -= num;
        }
        
        // The last number is whatever is needed to sum to 12
        numbers.push(remaining);
        
        attempts++;
        if (attempts > maxAttempts) {
            // If we can't find a valid combination after many attempts,
            // return null to indicate failure rather than creating invalid duplicates
            return null;
        }
    } while (numbers[3] < 1 || numbers[3] > 9); // Ensure the last number is valid
    
    // Shuffle the numbers to randomize positions
    shuffleArray(numbers);
    
    return {
        top: numbers[0],
        left: numbers[1],
        right: numbers[2],
        bottom: numbers[3],
        element: element
    };
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Convert card to a string for uniqueness checking
// Creates a string representation using exact positions to ensure uniqueness
function cardToString(card) {
    return `${card.top}-${card.left}-${card.right}-${card.bottom}-${card.element || 'none'}`;
}

// Generate unique cards
function generateUniqueCards(totalCards, elementalCards) {
    const cards = [];
    const cardSet = new Set();
    const maxAttempts = totalCards * 100;
    let attempts = 0;
    
    // Generate elemental cards first
    let elementalCount = 0;
    while (elementalCount < elementalCards && attempts < maxAttempts) {
        const element = elementNames[Math.floor(Math.random() * elementNames.length)];
        const card = generateRandomCard(element);
        
        if (!card) {
            attempts++;
            continue;
        }
        
        const cardStr = cardToString(card);
        
        if (!cardSet.has(cardStr)) {
            cardSet.add(cardStr);
            cards.push(card);
            elementalCount++;
        }
        attempts++;
    }
    
    // Generate non-elemental cards
    while (cards.length < totalCards && attempts < maxAttempts) {
        const card = generateRandomCard(null);
        
        if (!card) {
            attempts++;
            continue;
        }
        
        const cardStr = cardToString(card);
        
        if (!cardSet.has(cardStr)) {
            cardSet.add(cardStr);
            cards.push(card);
        }
        attempts++;
    }
    
    return cards;
}

// Create HTML for a card
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    
    if (card.element) {
        cardDiv.classList.add(card.element);
    }
    
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    
    // Add numbers
    const positions = ['top', 'left', 'right', 'bottom'];
    positions.forEach(pos => {
        const numberDiv = document.createElement('div');
        numberDiv.className = `card-number ${pos}`;
        numberDiv.textContent = card[pos];
        cardInner.appendChild(numberDiv);
    });
    
    // Add element symbols if elemental card
    if (card.element) {
        const symbol = ELEMENTS[card.element];
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(corner => {
            const symbolDiv = document.createElement('div');
            symbolDiv.className = `element-symbol ${corner}`;
            symbolDiv.textContent = symbol;
            cardInner.appendChild(symbolDiv);
        });
    }
    
    cardDiv.appendChild(cardInner);
    return cardDiv;
}

// Render cards to the container
function renderCards(cards) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
    });
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', () => {
    const totalCards = parseInt(document.getElementById('totalCards').value);
    const elementalCards = parseInt(document.getElementById('elementalCards').value);
    
    // Validation
    if (totalCards < 1) {
        alert('Total cards must be at least 1');
        return;
    }
    
    if (elementalCards > totalCards) {
        alert('Elemental cards cannot exceed total cards');
        return;
    }
    
    if (elementalCards < 0) {
        alert('Elemental cards cannot be negative');
        return;
    }
    
    const cards = generateUniqueCards(totalCards, elementalCards);
    
    if (cards.length < totalCards) {
        alert(`Warning: Could only generate ${cards.length} unique cards out of ${totalCards} requested`);
    }
    
    renderCards(cards);
});

document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
});

// Generate initial set of cards on load
window.addEventListener('load', () => {
    const cards = generateUniqueCards(10, 3);
    renderCards(cards);
});
