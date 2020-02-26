/**
 *  web init
 */

// component
import VideoContext from 'videocontext';

export default () => {

  return Promise.all([
    // tasks
    (() => {
      const canvas = document.getElementById('canvas');
      const videoCtx = new VideoContext(canvas);
      const videoRes = 'https://cycjimmy.github.io/staticFiles/media/Sony_test_video_1280x720.mp4';
      const videoNode = videoCtx.video(videoRes);
      videoNode.connect(videoCtx.destination);
      videoNode.start(0);
      videoNode.stop(4);

      canvas.addEventListener('click', () => {
        console.log('click');
        videoCtx.play();
      });

      console.log(videoCtx);
      // videoCtx.on('ended', () => {
      //   console.log('ended');
      // });

      videoCtx.play();
    })(),
  ])
    .catch(err => console.error('Failed to init', err));
};

