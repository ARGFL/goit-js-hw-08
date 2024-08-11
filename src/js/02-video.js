import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Initializam Vimeo player
const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

// Load saved time from localStorage and set it as the current time
const savedTime = localStorage.getItem(STORAGE_KEY);
if (savedTime) {
    player.setCurrentTime(savedTime).catch(error => {
        console.error('Failed to restore video time:', error);
    });
}

// Save the current playback time to localStorage every second
const saveCurrentTime = throttle((data) => {
    localStorage.setItem(STORAGE_KEY, data.seconds);
}, 1000); 

player.on('timeupdate', saveCurrentTime);

