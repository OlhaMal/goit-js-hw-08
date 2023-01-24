import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCAL_CURRENT_TIME = 'videoplayer-current-time';

player.on(
  'timeupdate',
  throttle(evt => {
    localStorage.setItem(LOCAL_CURRENT_TIME, evt.seconds);
  }),
  1000
);

player
  .setCurrentTime(localStorage.getItem(LOCAL_CURRENT_TIME))
  .catch(function (error) {
    console.error(error);
  });
