// javascript to registrar service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    
    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }
    
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
};


//the rest ...
window.onload = function () {
    
    var get_img_button = document.getElementById("get_pushed_img_button");
    var get_private_image_button = document.getElementById("get_nonpushed_img_button");
    var get_sw_image_button = document.getElementById("get_sw_img_button");    

    get_img_button.onclick = function() {
        var img = document.createElement("img");
        img.src = "images/mustang_frm_pushed.jpg";
        img_div.appendChild(img);
    }

    get_private_image_button.onclick = function() {
        var img = document.createElement("img");
        img.src = "images/mustang_frm_nonpushed.jpg";
        img_div.appendChild(img);
    }

    get_sw_image_button.onclick = function() {
        var img = document.createElement("img");
        img.src = "images/mustang_frm_sw.jpg";
        img_div.appendChild(img);
    }

   
}
