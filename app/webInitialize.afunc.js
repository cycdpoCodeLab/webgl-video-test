// services
import VideoContext from 'videocontext';

import testVideo from '../static/media/Sony_test_video_1280x720_short.mp4';

const videoOrigin = document.createElement('video');
videoOrigin.width = 640;
videoOrigin.height = 360;
videoOrigin.src = testVideo;
videoOrigin.setAttribute('webkit-playsinline', 'true');
videoOrigin.setAttribute('x5-playsinline', 'true');
videoOrigin.setAttribute('playsinline', 'true');
videoOrigin.setAttribute('x-webkit-airplay', 'true');
// videoOrigin.setAttribute('x5-video-player-type', 'h5');
// videoOrigin.setAttribute('x5-video-player-fullscreen', 'true');

export default () => {
  return Promise.all([
    // Video.js
    (() => {
      const wrapper = document.getElementById('video-js');
      const video = videoOrigin.cloneNode();
      wrapper.appendChild(video);

      const player = videojs(video, {
        controls: false,
        autoplay: false,
        preload: 'auto',
        playsinline: true,
      });

      player.src({type: 'video/mp4', src: testVideo});
      player.ready(() => {
        wrapper.addEventListener('click', () => {
          player.play();
        });

        player.on('ended', () => {
          console.log('ended');
        });
      });
    })(),

    // VideoContext
    (() => {
      const canvas = document.getElementById('video-context');
      const videoCtx = new VideoContext(canvas);
      const video = videoOrigin.cloneNode();

      videoCtx.registerCallback(VideoContext.EVENTS.STALLED, () => console.log('Playback stalled'));
      // videoCtx.registerCallback(VideoContext.EVENTS.UPDATE, () => console.log('new frame'));
      videoCtx.registerCallback(VideoContext.EVENTS.ENDED, () => console.log('Playback ended'));

      canvas.addEventListener('click', () => {
        const videoNode = videoCtx.video(video);
        videoNode.connect(videoCtx.destination);
        videoNode.start(0);
        videoNode.stop(30);
        videoCtx.play();
      });
    })(),

    // Pixi.js
    (() => {
      const wrapper = document.getElementById('pixi');

      const app = new PIXI.Application({
        width: 640,
        height: 360,
        forceCanvas: true,
      });
      wrapper.appendChild(app.view);

      wrapper.addEventListener('click', () => {
        console.log('click');
        const texture = PIXI.Texture.from(videoOrigin.src);
        const videoSprite = new PIXI.Sprite(texture);
        videoSprite.width = app.screen.width;
        videoSprite.height = app.screen.height;
        app.stage.addChild(videoSprite);
      });
    })(),
  ])
    .catch(err => console.error('Failed to init', err));
};

