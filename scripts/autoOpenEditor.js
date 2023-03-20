let spawn = require('hexo-util/lib/spawn');

hexo.on('new', (data) => {
  spawn('D:/\Program Files/\Typora/\Typora.exe', [data.path]);
});
