var nupud = document.getElementsByClassName("nupp");
var sisemineGalerii = document.getElementsByClassName("sisemineGalerii")[0];

var aktiivsePildiIndeks = 0;
// Iga 5s järel muuda galerii pilti automaatselt
var galeriiInterval = setInterval(()=>valiJargminePilt(1, false), 5000);

function lahtesta(jargmisePildiIndeks)
{
    var aktiivnePilt = document.getElementById("pilt" + aktiivsePildiIndeks);
    var jargminePilt = document.getElementById("pilt" + jargmisePildiIndeks);
    // Muuda eelmine pilt nähtamatuks ja lähtesta praegu nähtava pildi järjekorranumber
    aktiivnePilt.style.display = "none";
    jargminePilt.style.order = "1";
    // Lähtesta galerii positsioon, eemaldades sellelt klassid "parem" või "vasak"
    sisemineGalerii.classList.remove("parem");
    sisemineGalerii.classList.remove("vasak");
    aktiivsePildiIndeks = jargmisePildiIndeks;

    for (let nupp = 0; nupp < nupud.length; nupp++) {
        nupud[nupp].disabled = false;
    }
}

function muudaGaleriiPilti(jargmisePildiIndeks, keelaAutomaatneMuutmine = true)
{
    // Kui järgmine pilt on praegusest vasakul, on muutuja "suund" negatiivne, ja vastupidi
    var suund = jargmisePildiIndeks - aktiivsePildiIndeks;
    
    if (suund == 0)
        // Soovitakse laadida juba aktiivset pilti, seega pole vaja funktsiooniga jätkata
        return;

    // Kui järgmise ja praeguse pildi indeksite vahe on suurem galerii poolest pikkusest,
    // muuda muutuja "suund" märk vastupidiseks
    // Niiviisi liigutatakse galeriid alati sinna suunas, kus tal oleks pildini lühem tee
    if (Math.abs(suund) >= 4)
        suund *= -1;

    for (let nupp = 0; nupp < nupud.length; nupp++) {
        nupud[nupp].disabled = true;
    }

    // Kui kasutaja vajutab galerii pildi muutmiseks nuppe, lõpeta galerii pildi automaatne muutmine
    if (keelaAutomaatneMuutmine)
        clearInterval(galeriiInterval);

    var jargminePilt = document.getElementById("pilt" + jargmisePildiIndeks);
    jargminePilt.style.display = "flex";

    if (suund > 0)
    {
        // Liiguta järgmisena nähtavale ilmuv pilt praegu nähtavast pildist paremale ja lisa sisemisele galeriile
        // klass "vasak", mis liigutab galeriid 1s jooksul ühe pildi võrra vasakule
        jargminePilt.style.order = "2";
        sisemineGalerii.classList.add("vasak");
    }
    else
    {
        // Liiguta järgmisena nähtavale ilmuv pilt praegu nähtavast pildist vasakule ja lisa sisemisele galeriile
        // klass "parem", mis liigutab galeriid 1s jooksul ühe pildi võrra paremale
        jargminePilt.style.order = "0";
        sisemineGalerii.classList.add("parem");
    }

    document.getElementById("nupp" + aktiivsePildiIndeks).classList.remove("valikuNuppAktiivne");
    document.getElementById("nupp" + jargmisePildiIndeks).classList.add("valikuNuppAktiivne");
    
    setTimeout(()=>lahtesta(jargmisePildiIndeks), 1000);
}

function valiJargminePilt(dir, keelaAutomaatneMuutmine = true)
{
    var jargmisePildiIndeks = aktiivsePildiIndeks + dir;
    // Muutuja aktiivsePildiIndeks peab jääma vahemikku [0, 6]
    if (jargmisePildiIndeks > 6)
        jargmisePildiIndeks = 0;
    else if (jargmisePildiIndeks < 0)
        jargmisePildiIndeks = 6;

    muudaGaleriiPilti(jargmisePildiIndeks, keelaAutomaatneMuutmine);
}
