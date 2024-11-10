const pildid = [
"https://varjupaik.ee/photos/suviste_large.jpg",
"https://varjupaik.ee/photos/Rey_large.jpg",
"https://varjupaik.ee/photos/Tsopp_large.jpg",
"https://varjupaik.ee/photos/Lemsalu-1_large.jpg",
"https://varjupaik.ee/photos/Anett%20Kontaveit_large.jpg",
"https://varjupaik.ee/photos/Kanepi-1_large.jpg",
"https://varjupaik.ee/photos/Ivanov-1_large.jpg"
];

var aktiivnePilt = 0;
muudaGaleriiPilti(1);
// Iga 5s järel muuda galerii pilti automaatselt
var galeriiInterval = setInterval(()=>muudaGaleriiPilti(1), 5000);

function muudaGaleriiPilti(dir, keelaAutomaatneMuutmine = false)
{
    // Kui kasutaja vajutab galerii pildi muutmiseks nuppe, lõpeta galerii pildi automaatne muutmine
    if (keelaAutomaatneMuutmine)
        clearInterval(galeriiInterval);
    
    // Muuda praeguse galerii pildi juurde käiv tekst nähtamatuks
    document.getElementById(aktiivnePilt).style.display = "none";
    
    aktiivnePilt += dir;
    // Muutuja aktiivnePilt peab jääma vahemikku [0, 6]
    if (aktiivnePilt > 6)
        aktiivnePilt = 0;
    else if (aktiivnePilt < 0)
        aktiivnePilt = 6;
    
    // Vaheta galerii pilt ja muuda selle juurde käiv tekst nähtavaks
    document.getElementById("galeriiPilt").style.backgroundImage = "url(" + pildid[aktiivnePilt] + ")";
    document.getElementById(aktiivnePilt).style.display = "block";
}
