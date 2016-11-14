var fs = require('fs');
var ObjectAssign = require('object-assign');
var exists = fs.existsSync;
var write = fs.writeFileSync;
var mkdir = fs.mkdirSync;
var read = function(filepath) {
  return fis.util.read(filepath,true);
};
//var rVariable = /\$\{([\w\.\-_]+)(?:\s(.*?))?\}/g;

exports.name = 'vim';
exports.desc = 'description of vim.';
exports.options = {
  '-h, --help': 'print this help message',
  '-n, --name': 'set page name'
};

exports.run = function(argv, cli, env) {

  if (argv.h || argv.help) {
    return cli.help(exports.name, exports.options);
  }

  var projectPath = fis.project.getProjectPath(); // == env.configBase 
  var vimConfig = fis.get('vim');
  var fileName = argv.n || argv.name;
  var DEFAULT_OPTIONS = {
    src:'scaffold/',
    pageDir:'views/',
    pageExt:'.jade',
    widgetDir:'src/apps/',
    widgetJsExt:'.es6',
    widgetCssExt:'.less',
    widgetTplExt:'.tpl'
  };

  var vimOptions = ObjectAssign(DEFAULT_OPTIONS, vimConfig);

  var pageFileName = projectPath + '/' + vimOptions.src + 'index' + vimOptions.pageExt;
  var widgetFiles = [
    projectPath + '/' + vimOptions.src + 'index' + vimOptions.widgetJsExt,
    projectPath + '/' + vimOptions.src + 'index' + vimOptions.widgetCssExt,
    projectPath + '/' + vimOptions.src + 'index' + vimOptions.widgetTplExt
  ];

  var targetPageDir = projectPath + '/' + vimOptions.pageDir;
  var targetWidgetDir = projectPath + '/' + vimOptions.widgetDir;

  // page 写入
  if(exists(targetPageDir)){
    write(targetPageDir + fileName + vimOptions.pageExt , read(pageFileName));
  }else{
    mkdir(targetPageDir, 0777);
    write(targetPageDir + fileName + vimOptions.pageExt , read(pageFileName));
  }


  widgetFiles.forEach(function(filepath){
    var _contents = read(filepath);
    if (typeof _contents !== 'string') {
      return;
    }
    if(exists(targetWidgetDir + fileName + '/')){
      console.log('widget-file:' + targetWidgetDir + fileName + '/index' + filepath.substring(filepath.lastIndexOf('.')))
      write(targetWidgetDir + fileName + '/index' + filepath.substring(filepath.lastIndexOf('.')) , _contents);
    }else{
      mkdir(targetWidgetDir + fileName + '/', 0777);
      console.log('widget-file:' + targetWidgetDir + fileName + '/index' + filepath.substring(filepath.lastIndexOf('.')))
      write(targetWidgetDir + fileName + '/index' + filepath.substring(filepath.lastIndexOf('.')) , _contents);
    }
  });

};