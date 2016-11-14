# fis3-command-vim
a scaffold for offline development


##安装

npm install fis3-command-vim

##配置方式


```javascript

fis.set('vim.src','scaffold/');
fis.set('vim.pageDir','views/');
fis.set('vim.pageExt','.jade');
fis.set('vim.widgetDir','src/apps/');
fis.set('vim.widgetJsExt','.es6');

```
或者

```javascript

fis.set('vim',{
	src:'scaffold/',
	pageDir:'views/',
	pageExt:'.jade',
	widgetDir:'src/apps/',
	widgetJsExt:'.es6',
    widgetCssExt:'.less',
    widgetTplExt:'.tpl'
})

```
##运行

fis3 vim -n xxx  or fis3 vim --name xxx

自动在 views/ 目录下生成 xxx.jade.
在 src/apps/ 目录下生成 xxx/index.es6 , xxx/index.less , xxx/index.tpl
文件模板来自 scaffold/ 的 index.jade , index.es6 , index.less , index.tpl.

##TODO

去掉后缀名配置， 直接取 scaffold/ 目录下文件模板后缀。


  


