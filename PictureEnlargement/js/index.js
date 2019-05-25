
function modalFramePicture() {
    var body = document.getElementById('body');
    var imgAll = body.getElementsByTagName('img');

    for (var i = 0; i < imgAll.length; i++) {
        imgAll[i].index = i;
        imgAll[i].onclick = function () {
            var createMask = document.createElement('div');
            createMask.className = 'createMask';
            createMask.addEventListener('click', function () {
                body.removeChild(createMask);
            }); 

            var createImg = document.createElement('img');
            var currentPicture = imgAll[this.index];
            createImg.className = 'createImg'
            createImg.src = currentPicture.src;
            createImg.style.width = currentPicture.width * 2 + 'px';
            createImg.style.height = currentPicture.height * 1.5 + 'px';

            createMask.appendChild(createImg);
            body.appendChild(createMask);
        }
    }
}

modalFramePicture();