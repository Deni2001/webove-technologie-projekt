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

$(document).ready(function () {
    $("#getServices").click(function () {
        $.ajax({
            url: "services.xml", // Nahraďte skutočnou cestou k súboru XML
            dataType: "xml",
            success: function (data) {
                // Spracovanie údajov z XML
                var table = $("<table></table>");
                table.append("<tr><th>Názov</th><th>Popis</th></tr>");

                $(data).find("service").each(function () {
                    var serviceName = $(this).find("name").text();
                    var serviceDescription = $(this).find("description").text();

                    table.append("<tr><td><b>" + serviceName + "</b></td><td>" + serviceDescription + "</td></tr>");

                    var subservices = $(this).find("subservice");
                    subservices.each(function () {
                        var subserviceName = $(this).find("name").text();
                        var subserviceDescription = $(this).find("description").text();
                        table.append("<tr><td><i>" + subserviceName + "</i></td><td>" + subserviceDescription + "</td></tr>");
                    });
                });

                $("#servicesContent").html(table);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error("Error:", textStatus, errorThrown);
                $("#servicesContent").html("Chyba pri načítavaní dát.");
            }
        });
    });
});

function validateForm() {
    var name = document.getElementById('meno').value;
    var priezvisko = document.getElementById('priezvisko').value;
    var email = document.getElementById('email').value;
    var hodnotenie = document.getElementById('hodnotenie').value;
    var sprava = document.getElementById('sprava').value;
    var suhlas = document.getElementById('suhlas').checked;

    var namePattern = /^[a-zA-Z\u00C0-\u017F\s]*$/; // Zahrnutie diakritiky
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var valid = true;

    if (name.trim() === "") {
        document.getElementById('meno-error').innerText = "Meno je povinné pole.";
        valid = false;
    } else if (!namePattern.test(name)) {
        document.getElementById('meno-error').innerText = "Meno musí obsahovať iba písmená a medzery.";
        valid = false;
    } else {
        document.getElementById('meno-error').innerText = "";
    }

    if (priezvisko.trim() === "") {
        document.getElementById('priezvisko-error').innerText = "Priezvisko je povinné pole.";
        valid = false;
    } else if (!namePattern.test(priezvisko)) {
        document.getElementById('priezvisko-error').innerText = "Priezvisko musí obsahovať iba písmená a medzery.";
        valid = false;
    } else {
        document.getElementById('priezvisko-error').innerText = "";
    }

    if (!emailPattern.test(email)) {
        document.getElementById('email-error').innerText = "Prosím, zadajte platnú emailovú adresu.";
        valid = false;
    } else {
        document.getElementById('email-error').innerText = "";
    }

    if (hodnotenie === "") {
        document.getElementById('hodnotenie-error').innerText = "Prosím, vyberte hodnotenie.";
        valid = false;
    } else {
        document.getElementById('hodnotenie-error').innerText = "";
    }

    if (sprava === "") {
        document.getElementById('sprava-error').innerText = "Prosím, napíšte správu.";
        valid = false;
    } else {
        document.getElementById('sprava-error').innerText = "";
    }

    if (!suhlas) {
        document.getElementById('suhlas-error').innerText = "Musíte súhlasiť s podmienkami.";
        valid = false;
    } else {
        document.getElementById('suhlas-error').innerText = "";
    }

    return valid;
}