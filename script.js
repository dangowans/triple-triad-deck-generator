// Element types and their symbols
const ELEMENTS = {
    fire: '🔥',
    water: '💧',
    wind: '🌪️',
    earth: '🌍'
};

const elementNames = Object.keys(ELEMENTS);

// Monster face components
const MONSTER_EYES = ['👀', '👁️👁️', '◉◉', '●●', '○○', '◕◕', '◔◔', '◐◐'];
const MONSTER_MOUTHS = ['😃', '😄', '😁', '😊', '😆', '🙂', '😋', '😛', '😝', '😜'];
const MONSTER_HEAD_SHAPES = ['circle', 'square', 'triangle', 'oval'];

// Element to skin color mapping
const ELEMENT_SKIN_COLORS = {
    fire: '#ff6b6b',      // Red-ish
    water: '#4dabf7',     // Blue-ish
    wind: '#e0e0e0',      // Light gray
    earth: '#8b6f47',     // Brown-ish
    none: '#f0f0f0'       // Default gray
};

// Generate random monster face
function generateMonsterFace(element = null) {
    const eyes = MONSTER_EYES[Math.floor(Math.random() * MONSTER_EYES.length)];
    const mouth = MONSTER_MOUTHS[Math.floor(Math.random() * MONSTER_MOUTHS.length)];
    const headShape = MONSTER_HEAD_SHAPES[Math.floor(Math.random() * MONSTER_HEAD_SHAPES.length)];
    const skinColor = ELEMENT_SKIN_COLORS[element || 'none'];
    
    return {
        eyes,
        mouth,
        headShape,
        skinColor
    };
}

// Constants for card generation
const MAX_CARD_GENERATION_ATTEMPTS = 1000;
const ATTEMPTS_MULTIPLIER = 100;

// Generate a random card with 4 numbers that sum to 12
function generateRandomCard(element = null) {
    // Generate 4 random numbers between 1 and 9 that sum to 12
    let numbers;
    let attempts = 0;
    
    do {
        numbers = [];
        let remaining = 12;
        
        // Generate first 3 numbers
        for (let i = 0; i < 3; i++) {
            const min = 1;
            const numbersLeft = 3 - i; // How many more numbers we need to generate after this one
            const max = Math.min(9, remaining - numbersLeft); // Ensure we can still make valid remaining numbers
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            numbers.push(num);
            remaining -= num;
        }
        
        // The last number is whatever is needed to sum to 12
        numbers.push(remaining);
        
        attempts++;
        if (attempts >= MAX_CARD_GENERATION_ATTEMPTS) {
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
    const maxAttempts = totalCards * ATTEMPTS_MULTIPLIER;
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
function createCardElement(card, includeMonster = false) {
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
    
    // Add monster face if enabled
    if (includeMonster) {
        const monster = generateMonsterFace(card.element);
        const monsterDiv = document.createElement('div');
        monsterDiv.className = 'monster-face';
        
        const headDiv = document.createElement('div');
        headDiv.className = `monster-head ${monster.headShape}`;
        headDiv.style.backgroundColor = monster.skinColor;
        headDiv.style.borderRadius = monster.headShape === 'circle' ? '50%' : 
                                      monster.headShape === 'square' ? '10%' :
                                      monster.headShape === 'oval' ? '50% 50% 50% 50% / 60% 60% 40% 40%' :
                                      '50% 50% 0 0';
        
        const eyesDiv = document.createElement('div');
        eyesDiv.className = 'monster-eyes';
        eyesDiv.textContent = monster.eyes;
        
        const mouthDiv = document.createElement('div');
        mouthDiv.className = 'monster-mouth';
        mouthDiv.textContent = monster.mouth;
        
        headDiv.appendChild(eyesDiv);
        headDiv.appendChild(mouthDiv);
        monsterDiv.appendChild(headDiv);
        cardInner.appendChild(monsterDiv);
    }
    
    cardDiv.appendChild(cardInner);
    return cardDiv;
}

// Render cards to the container
function renderCards(cards, includeMonster = false) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = createCardElement(card, includeMonster);
        container.appendChild(cardElement);
    });
}

// Event listeners
document.getElementById('generateBtn').addEventListener('click', () => {
    const totalCards = parseInt(document.getElementById('totalCards').value);
    const elementalCards = parseInt(document.getElementById('elementalCards').value);
    const includeMonster = document.getElementById('monsterFaces').checked;
    
    // Validation
    if (isNaN(totalCards) || totalCards < 1) {
        alert('Total cards must be at least 1');
        return;
    }
    
    if (isNaN(elementalCards) || elementalCards < 0) {
        alert('Elemental cards must be 0 or greater');
        return;
    }
    
    if (elementalCards > totalCards) {
        alert('Elemental cards cannot exceed total cards');
        return;
    }
    
    const cards = generateUniqueCards(totalCards, elementalCards);
    
    if (cards.length < totalCards) {
        alert(`Warning: Could only generate ${cards.length} unique cards out of ${totalCards} requested`);
    }
    
    renderCards(cards, includeMonster);
});

document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
});

// Generate initial set of cards on load
window.addEventListener('load', () => {
    const cards = generateUniqueCards(27, 10);
    renderCards(cards);
});
