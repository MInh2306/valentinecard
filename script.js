// --- DATA CONFIGURATION ---
const imagesScreen1 = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueGZ3Ymt6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/v4V6YIdp455xkqeX9I/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueGZ3Ymt6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/3o7TKVUn7iM8FMEU24/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueGZ3Ymt6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/l41lUjIDpW8J6C3wA/giphy.gif"
];

const messages = [
    "Are you sure? 🥺",
    "Really? Think again! 😢",
    "Give me a chance... 💔",
    "I will be very sad... 😭"
];

const galleryImages = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/102/200/300",
    "https://picsum.photos/id/103/200/300",
    "https://picsum.photos/id/104/200/300"
];

const galleryMessages = [
    "Lần đầu gặp nhau",
    "Chuyến đi xa đầu tiên",
    "Kỷ niệm ngày đặc biệt",
    "Love you forever"
];

const screen3Image = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueGZ3Ymt6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6eXp6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/26BRv0ThflsHCqfJA/giphy.gif";
const popupImage = "https://picsum.photos/400/400";

// --- LOGIC ---
let noCount = 0;
let yesScale = 1;

// Screen 1: Handle "No" click
function handleNo() {
    noCount++;

    // Change text & image while index within range
    if (noCount <= messages.length) {
        document.getElementById('question-text').innerText = messages[noCount - 1];
    }
    if (noCount <= imagesScreen1.length) {
        document.getElementById('main-img').src = imagesScreen1[noCount - 1];
    }

    // Make Yes button bigger
    yesScale += 0.3;
    document.getElementById('yesBtn').style.transform = `scale(${yesScale})`;

    // Hide No button after 6 tries
    if (noCount > 5) {
        document.getElementById('noBtn').classList.add('hidden');
    }
}

// Screen 1: No button "runaway" on hover
function moveNoButton() {
    const btn = document.getElementById('noBtn');
    const x = Math.random() * (window.innerWidth - btn.offsetWidth - 50);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight - 50);

    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

// Navigation
function nextScreen(screenNum) {
    document.getElementById('screen1').classList.add('hidden');
    document.getElementById('screen2').classList.add('hidden');
    document.getElementById('screen3').classList.add('hidden');

    const next = document.getElementById('screen' + screenNum);
    next.classList.remove('hidden');

    if (screenNum === 2) {
        renderGallery();
    } else if (screenNum === 3) {
        document.getElementById('screen3-img').src = screen3Image;
    }
}

// Screen 2: Generate Gallery
function renderGallery() {
    const container = document.getElementById('gallery');
    container.innerHTML = '';

    galleryImages.forEach((imgSrc, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        // Random size variation for natural layout
        if (index % 3 === 0) card.style.width = '180px';

        card.innerHTML = `
                    <div class="card-inner">
                        <div class="card-front">
                            <img src="${imgSrc}" alt="Memory">
                        </div>
                        <div class="card-back">
                            <p>${galleryMessages[index] || "❤️"}</p>
                        </div>
                    </div>
                `;
        card.onclick = () => card.classList.toggle('is-flipped');
        container.appendChild(card);
    });
}

// Screen 3: Popup Logic
function showPopup() {
    document.getElementById('popup-img').src = popupImage;
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}
