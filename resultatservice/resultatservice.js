//henter variabler
let kPunktInputEl = document.querySelector("#kPunktInput")
let knappKpunkt= document.querySelector("#knapp1")
let navnEl = document.querySelector("#navnEl")
let film = document.querySelector("#film")
let meldingEl = document.querySelector("#meldingEl")
let resultatTabell =document.querySelector("#resultatTabell")
let infoP= document.querySelector("#infoP")
let lengdeEl = document.querySelector("#lengdeEl")

let stilPoengEl = document.querySelector("#stilPoengEl")
let dommerKnappEl = document.querySelector("#dommerKnapp")
let dommer1 = document.querySelector("#dommer1")
let dommer2 = document.querySelector("#dommer2")
let dommer3 = document.querySelector("#dommer3")
let dommer4 = document.querySelector("#dommer4")
let dommer5 = document.querySelector("#dommer5")


let meterverdi;
let kPunkt; //gir denne variablen verdi når brukeren trykker på knappen
let NavnTilHopper;
let lengde;
let lengdepoeng;
let stilPoeng;


//lag et object som kan lagre hopperene om det skulle trenges
class Hopper{
    constructor(navn, lengdePoeng, stilPoeng, poengSum){
        this.navn = navn
        this.lengdePoeng = lengdePoeng
        this.stilPoeng = stilPoeng
        this.poengSum = poengSum
    }
}
let HoppereArray = [] //skal dytte hopper objekter inn i denne arrayen når alle data som trengs er beregnet

knappKpunkt.addEventListener("click", function () {
    meldingEl.innerHTML=""
    lengdeEl.innerHTML=""

    if(navnEl.value==""){
        alert("skriv inn et navn")
        return
    }

    NavnTilHopper= navnEl.value
    meterverdi=beregnMeterverdi(kPunktInputEl.value)
    kPunkt=kPunktInputEl.value
    film.style.display="block";
    film.play()

    console.log("kpunkt "+kPunkt + " meterverdi " +meterverdi + " navn " + NavnTilHopper)


    film.addEventListener("ended", ()=>{
            lengde = Math.floor(kPunkt* plussMinus10Prosent());
            console.log(lengde)
            lengdeEl.innerHTML="lengde: " + lengde + " meter"

            lengdeEl.className="animasjon"

            lengdepoeng= 60 + (lengde - kPunkt)*meterverdi;
            console.log( "lengdepoeng: " +lengdepoeng)

            stilPoengEl.style.display="flex"
            
            infoP.style.display="block"
    })
}) 

dommerKnappEl.addEventListener("click", ()=>{
    let alleStilpoengArray= [dommer1.value, dommer2.value, dommer3.value, dommer4.value, dommer5.value]

    lengdeEl.className="IkkeAnimasjon"
    
    gyldigeStilpoeng(alleStilpoengArray);
    stilpoengSum = BeregnStilPoengSum( alleStilpoengArray);
    meldingEl.innerHTML+= "<br>" + "gjeldende stilpoeng: " + alleStilpoengArray[0] +"," + alleStilpoengArray[1] +","  + alleStilpoengArray[2]+","  +"<br>" +"Sum av stilpoeng: " +stilpoengSum;

    let totalPoengSum = stilpoengSum + lengdepoeng;
    let hopper = new Hopper (NavnTilHopper, lengdepoeng, stilpoengSum, totalPoengSum )
    HoppereArray.push(hopper)
    console.log(HoppereArray)

    stilPoengEl.style.display= "none";
    film.style.display="none"
    
    resultatTabell.style.display="block"

    sorterHoppereEtterPoeng()
    lagTabell(HoppereArray, resultatTabell)

    infoP.style.display="none"
})








//funksjoner---------------------------------------------------------------
//Siste moduler på toppen fra modul 4 og synkende ned mot modul 1 på bunnen

function sorterHoppereEtterPoeng(){
    HoppereArray.sort((a,b) =>b.poengSum - a.poengSum)
}

function lagTabell(array, tabell){
    tabell.innerHTML= "<th>Plass</th>" +"<th>Navn</th>" +"<th>Lengdepoeng</th>" + "<th>Stilpoeng</th>" +"<th>Poengsum</th>"
    let nr = 0
    for (let i=0; i<array.length; i++){
        nr +=1; 
        let rad = tabell.insertRow();
        rad.insertCell().innerHTML+= nr
        for(let egenskap in array[i]){
           rad.insertCell().innerHTML= array[i][egenskap]
        }
    }
}

function gyldigeStilpoeng (alleStilpoengArray){
    alleStilpoengArray.sort(sorterTall)
    alleStilpoengArray.pop()
    alleStilpoengArray.shift();
    console.log(alleStilpoengArray )
}

function BeregnStilPoengSum( alleStilpoengArray){
    let sum =0;
    for (let i=0; i<alleStilpoengArray.length;i++){
        sum+= parseFloat(alleStilpoengArray[i]);
    }
    return sum
}
//en funksjon som sammenligner tall , jeg bruker denne for å sortere tall i dommerpoengenes array
function sorterTall(a,b){
    return a-b
}

function plussMinus10Prosent(){
    let max = 10
    let min = 1
    let rekkeVidde= max-min +1;
    let okningEllerMinking=  (Math.random()) //denne bestemer om det blir pluss eller minus 10 til 0 prosent mer enn kpunkt
    if(okningEllerMinking>=0.5){
        return (Math.floor(Math.random()*rekkeVidde +1)/100) + 1; //dette blir fra 1 til 1.10
    }
    else {
        return 1- (Math.floor(Math.random()*rekkeVidde +1)/100)
    }
}

function beregnMeterverdi (input){
    if (input<=79 && input>=70){
        return 2.2
    }
    if (input>=80 && input<=99){
        return 2
    }
    if (input>=100 && input<=169){
        return 1.8
    }
    if (input<=250 && input>=170){
        return 1.2
    }
    else {
        alert("du må oppgi en gyldig meterverdi, gyldige verdier er mellom 70 og 250 meter")
    }
}

