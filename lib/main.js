var widgets = require('widget');
var self = require('self');
var Request = require('request').Request;
var data = self.data


var requestPanel = require('panel').Panel({
  width:550,
  height:550,
  contentURL: data.url('request.html'),
  contentScriptFile: data.url('request_script.js')
});

requestPanel.on('show', function(){
  requestPanel.port.emit('show');
});

requestPanel.port.on('url-entered', function(url){
  console.log('this is the url received: ' + url);
  Request({
    url: url,
    onComplete: function (response) {
      requestPanel.port.emit('response-received', JSON.stringify(response.json, null, 2));
    }
  }).get();
});

var widget = widgets.Widget({
  id: 'json-request',
  label: 'JSONRequest',
  contentURL: 'http://www.mozilla.org/favicon.ico',
  panel: requestPanel
});

console.log('The add-on is running.');
