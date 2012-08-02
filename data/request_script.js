var input_url = document.getElementById('url');
var results = document.getElementById('results');
var go_btn = document.getElementById('go');
var clear_btn = document.getElementById('clear');


self.port.on('show', function(){
  go_btn.onclick = function(event){
    url = input_url.value;
    if (url != ''){
      self.port.emit('url-entered', url);
    }
  };

  clear_btn.onclick = function(event){
    results.value = '';
  };
});


self.port.on('response-received', function(response){
  results.value = response;
});
