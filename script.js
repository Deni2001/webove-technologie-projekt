var numberOfImages = 23; 

function generateGallery() {
    var galleryContainer = document.getElementById('gallery');
    for (var i = 1; i <= numberOfImages; i++) {
        var image = {
            src: 'obrazok' + i + '.jpg',
            caption: 'Popis obrázku ' + i
        };

        var link = document.createElement('a');
        link.href = image.src;
        link.setAttribute('data-fancybox', 'gallery');
        link.setAttribute('data-caption', image.caption);

        var img = document.createElement('img');
        img.src = image.src;
        img.alt = image.caption;

        link.appendChild(img);
        galleryContainer.appendChild(link);
    }
}

document.addEventListener('DOMContentLoaded', generateGallery);