// --- DATA CONFIGURATION ---
//where click No
const imagesScreen1 = [
    "picture/sayno_pic (1).JPG",
    "picture/sayno_pic (2).JPG",
    "picture/sayno_pic (3).JPG",
    "picture/sayno_pic (4).JPG",
    "picture/sayno_pic (5).JPG",
    "picture/sayno_pic (6).JPG",
    "picture/sayno_pic (7).JPG",
    "picture/sayno_pic (8).JPG",
    "picture/sayno_pic (9).JPG"
];

const messages = [
    "Are you sure? 🥺",
    "Really? Think again! 😢",
    "Give me a chance... 💔",
    "I will be very sad... 😭",
    "My heart just broke a little... 💔",
    "Nooo, don't do this to me! 😩",
    "Even my dog would say yes... 🐶",
    "Plot twist: you actually meant yes 😏",
    "Error 404: Accept button not found? 🤔",
    "This is not the button you're looking for... 👀",
    "My mom already likes you tho... 😅",
    "I practiced this for 3 days... 🥲",
    "The cat says yes, why won't you? 🐱",
    "Okay but have you considered... YES? 🤭",
    "That button is cursed, try the other one 🙃",
    "Wrong button bestie 😭",
    "The universe wants you to say yes 🌍✨",
    "I already bought matching outfits... 😬",
    "My plants are rooting for us 🌱",
    "Are you clicking that on purpose?! 😤",
    "Legend says no one has ever clicked this twice... 👁️",
    "Roses are red, violets are blue, please say yes, I'm begging you 🌹",
];

const galleryImages = [
    "picture/album (1).PNG",
    "picture/album (2).PNG",
    "picture/album (3).PNG",
    "picture/album (4).PNG",
    "picture/album (5).PNG",
    "picture/album (6).PNG",
    "picture/album (7).PNG",
    "picture/album (8).PNG",
];

const galleryMessages = [
    "Đi thư viện workdate nè, nhìn ăn xinh vcl",
    "Hôm đưa bae ra sân bay, tự nhiên trời tuyết",
    "Bảo tàng khủng long đồ hen, thanh xuân vườn trường, tối đó xỉn vcl",
    "Vẻ đẹp tri thứcccccccccccccc, thích nhìn e học",
    "Đợi bus đi date, hôm đi thủy cung",
    "Thủy cung again, quá xinh....",
    "Haizz....quá xinh, đúng là ngoan xinh yêu...",
    "Tấm này bae vẽ ok quá nên không dám vẽ đè lên...để nguyên luôn",
];

const screen3Image = "picture/screen3Image.JPG";
const popupImage = "https://picsum.photos/400/400";

// --- LOGIC ---
let noCount = 0;
let yesScale = 1;
let noScale = 1;

// Khởi tạo 1 lần ở ngoài, không bị reset mỗi lần click
let shuffledMessages = [...messages].sort(() => Math.random() - 0.5);
let messageIndex = 0;
let shuffledImages = [...imagesScreen1].sort(() => Math.random() - 0.5);
let imageIndex = 0;

// Screen 1: Handle "No" click
function handleNo() {
    noCount++;

    // Message — lấy tuần tự từ mảng đã shuffle
    if (messageIndex < shuffledMessages.length) {
        document.getElementById('question-text').innerText = shuffledMessages[messageIndex];
        messageIndex++;
    }

    // Image — lấy tuần tự từ mảng đã shuffle
    if (imageIndex < shuffledImages.length) {
        document.getElementById('main-img').src = shuffledImages[imageIndex];
        imageIndex++;
    }

    // Yes to dần
    yesScale += 0.2;
    document.getElementById('yesBtn').style.transform = `scale(${yesScale})`;

    // No nhỏ dần
    noScale -= 0.1;
    document.getElementById('noBtn').style.transform = `scale(${noScale})`;

    // Ẩn No sau 9 lần
    if (noCount > 9) {
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

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${imgSrc}" alt="Memory">
                    <button class="zoom-btn" onclick="openZoom(event, '${imgSrc}', \`${galleryMessages[index] || '❤️'}\`)">
                        🔍
                    </button>
                </div>
                <div class="card-back">
                    <p>${galleryMessages[index] || "❤️"}</p>
                    <button class="zoom-btn zoom-btn--back" onclick="openZoom(event, '${imgSrc}', \`${galleryMessages[index] || '❤️'}\`)">
                        🔍
                    </button>
                </div>
            </div>
        `;

        // Click card để flip (không phải click vào zoom btn)
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.zoom-btn')) {
                card.classList.toggle('is-flipped');
            }
        });

        container.appendChild(card);
    });
}

// Zoom popup
function openZoom(event, imgSrc, caption) {
    // Ngăn card flip khi click zoom
    event.stopPropagation();

    const overlay = document.getElementById('zoom-overlay');
    const zoomImg = document.getElementById('zoom-img');
    const zoomCaption = document.getElementById('zoom-caption');

    zoomImg.src = imgSrc;
    zoomCaption.textContent = caption;

    overlay.classList.remove('hidden');
    // Trigger animation
    requestAnimationFrame(() => {
        overlay.classList.add('zoom-overlay--visible');
    });
}

function closeZoom() {
    const overlay = document.getElementById('zoom-overlay');
    overlay.classList.remove('zoom-overlay--visible');
    // Đợi animation xong rồi hide
    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 300);
}

// Click ngoài ảnh để đóng
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('zoom-overlay');
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeZoom();
        }
    });

    // Phím ESC để đóng
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeZoom();
    });
});

// Screen 3: Popup Logic
function showPopup() {
    document.getElementById('popup-img').src = popupImage;
    document.getElementById('popup').classList.remove('hidden');
}

function closePopup() {
    document.getElementById('popup').classList.add('hidden');
}