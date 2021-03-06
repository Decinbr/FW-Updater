/*url= The url of the image.
//dest= Where you want to save the image.
Example:img.save("https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png","img/pictures/test.png");
This will save the google logo to the pictures folder inside img folder as test.png
*/

class img {
    static save(url, dest) {
        function toDataUrl(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.onload = function() {
                var reader = new FileReader();
                reader.onloadend = function() {
                    callback(reader.result);
                }
                reader.readAsDataURL(xhr.response);
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob';
            xhr.send();
        }
        toDataUrl(url, function(data64) {
            console.log(data64);
            var fs = require('fs');
            var img = data64;
            var data = img.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            console.log(buf);
            fs.writeFileSync(dest, buf);
        });
    }
}