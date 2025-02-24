const searchResults = document.getElementById('searchResults');
const emojiPopup = document.getElementById('emojiPopup');
const footerSongInfo = document.getElementById('footerSongInfo');
const footerSongTitle = document.getElementById('footerSongTitle');
const footerSongArtist = document.getElementById('footerSongArtist');
const footerAudio = document.getElementById('footerAudio');
const footerAudioSource = document.getElementById('footerAudioSource');
const footerSongImage = document.getElementById('footerSongImage');
const chatContainer = document.getElementById('chatContainer');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

const songs = [
    { title: 'Often', artist: 'Weekend', url: 'songs/often.mp3', image: 'happy.jpg', category: 'happy' },
    { title: 'wishes', artist: 'Artist', url: 'songs/wishes.mp3', image: 'wishes.png', category: 'love' },
    { title: 'Sad Song', artist: 'Sad Artist', url: 'sad_song.mp3', image: 'sad.jpg', category: 'sad' },
    { title: 'Party Song', artist: 'Party Artist', url: 'party_song.mp3', image: 'party.jpg', category: 'party' },
    { title: 'Chill Song', artist: 'Chill Artist', url: 'chill_song.mp3', image: 'chill.jpg', category: 'chill' },
];

function searchSongs() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    searchResults.innerHTML = '';
    const results = songs.filter(song => song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query));
    if (results.length > 0) {
        searchResults.style.display = 'block';
        results.forEach(song => {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = `${song.title} - ${song.artist}`;
            resultDiv.onclick = () => playSong(song);
            searchResults.appendChild(resultDiv);
        });
    } else {
        searchResults.style.display = 'none';
    }
}
recognition.onresult = function(event) {
    let result = event.results[0][0].transcript;
    result = result.replace(/[.,!?;]$/, '').trim();  // Clean the result
    document.getElementById('searchInput').value = result;
    searchSongs();
};


function playSong(song) {
    footerSongTitle.textContent = song.title;
    footerSongArtist.textContent = song.artist;
    footerAudioSource.src = song.url;
    footerAudio.load();
    footerAudio.play();
    footerSongImage.src = song.image;
    footerSongInfo.style.display = 'flex';
    searchResults.style.display = 'none';
}

function toggleEmojiPopup() {
    emojiPopup.style.display = emojiPopup.style.display === 'block' ? 'none' : 'block';
}

function filterByEmoji(category) {
    searchResults.innerHTML = '';
    const results = songs.filter(song => song.category === category);
    if (results.length > 0) {
        searchResults.style.display = 'block';
        results.forEach(song => {
            const resultDiv = document.createElement('div');
            resultDiv.textContent = `${song.title} - ${song.artist}`;
            resultDiv.onclick = () => playSong(song);
            searchResults.appendChild(resultDiv);
        });
    } else {
        searchResults.style.display = 'none';
    }
}

function toggleChat() {
    const isChatVisible = chatContainer.style.display === 'flex';
    chatContainer.style.display = isChatVisible ? 'none' : 'flex';
    document.getElementById('chatToggle').textContent = isChatVisible ? '+' : '-';
}

function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = messageText;
        chatMessages.appendChild(messageDiv);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}

function shareSong(song) {
    const messageText = `Check out this song: ${song.title} by ${song.artist}`;
    const messageDiv = document.createElement('div');
    messageDiv.textContent = messageText;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function startRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Your browser does not support speech recognition.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function() {
        console.log('Voice recognition started.');
    };

    recognition.onresult = function(event) {
        const result = event.results[0][0].transcript;
        document.getElementById('searchInput').value = result;
        searchSongs();
    };

    recognition.onerror = function(event) {
        console.error('Voice recognition error', event.error);
    };

    recognition.onend = function() {
        console.log('Voice recognition ended.');
    };

    recognition.start();
}
