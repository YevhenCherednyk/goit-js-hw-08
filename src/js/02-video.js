import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const PLAYBACK_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onTimeUpdate, 1000));

function onTimeUpdate({ seconds }) {
  localStorage.setItem(PLAYBACK_TIME, JSON.stringify({ seconds }));
}

try {
  const stopVideoTimeValue = JSON.parse(localStorage.getItem(PLAYBACK_TIME));

  if (stopVideoTimeValue) {
    player
      .setCurrentTime(stopVideoTimeValue.seconds)
      .then(function (seconds) {
        // seconds = the actual time that the player seeked to
      })
      .catch(function (error) {
        switch (error.name) {
          case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

          default:
            // some other error occurred
            break;
        }
      });
  }
} catch (error) {
  console.log(error.name);
  console.log(error.message);
}
