// global css
import './theme/main.scss';

// polyfill
import './polyfill';

// offline runtime
if (!DEVELOPMENT) {
  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install();
}

if (DEVELOPMENT) {
  console.log('Development Mode');
  console.log(require('@cycjimmy/awesome-js-funcs/handheld').getBrowserInfo());
}

if (PRODUCTION) {
  console.log('Production Mode');
}

