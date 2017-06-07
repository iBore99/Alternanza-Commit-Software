var map_prezzi_base;
//FATTO
class Prodotto {

    constructor(nome, prezzo_finale, durata,pathImmagine) {
        this.nome = nome;
        this.prezzo = prezzo_finale;
        this.durata = durata;
        this.pathImmagine=pathImmagine;
    }

    attr() {
        return this.nome + "\n" + this.prezzo + "€ per la durata di " + this.durata + " mesi.";
    }
    setImgSrc(nuovo_link){
      this.pathImmagine = nuovo_link;
    }
}


angular.module("utility", []).service("utilityService",function(){

    this.stringa_prodotti_json = letturaLink(document.URL);
    this.vett_prodotti_in_carrello = deserializzaObjDaJson(this.stringa_prodotti_json);

    this.vett_prodotti_mostrati =
    [
      {
        titolo: 
        descrizione:
        prezzo:
        testo_garanzia:

      },
      {
        titolo:
        descrizione:
        prezzo:
        testo_garanzia:
      },

      {
        titolo:
        descrizione:
        prezzo:
        testo_garanzia:
      },

      {
        titolo:
        descrizione:
        prezzo:
        testo_garanzia:
      }
   ];

    this.serializzaObjInJson = function(obj){
      return JSON.stringify(obj);
    }

    this.deserializzaObjDaJson = function(stringa_json) {
          return eval(stringa_json);
    }

//map per le path delle immagini che servono per quando si crea il prodotto.


    this.map_img_prodotti = {};
    this.map_img_prodotti["1"] = $("#img_prod_1").attr("src");
    this.map_img_prodotti["2"] = this.map_img_prodotti["1"];
    this.map_img_prodotti["3"] = $("#img_prod_2").attr("src");
    this.map_img_prodotti["4"] = this.map_img_prodotti["3"];
});

//FATTO
function start() {
    set_prezzi();
    var cont_carrello;
    if(document.URL.indexOf("?") != -1)
      $("#link_carrello").attr("href", "carrello.html?"+document.URL.split("?")[1]);
    else
      $("#link_carrello").attr("href", "carrello.html");
    if(controlloPresenzaProdotti()){
      var vet_lista_prodotti = deserializzaObjDaJson(letturaLink(document.URL));
      cont_carrello = vet_lista_prodotti.length;
    }
    else{
      cont_carrello = 0;
    }

    $("#contatore_carrello").text(cont_carrello);

}

var carrello = angular.module("carrelloAngular",["utility"]);
var index = angular.module("indexAngular",["utility"]);

//FATTO
function start() {
    set_prezzi();
    var cont_carrello;
    if(document.URL.indexOf("?") != -1)
      $("#link_carrello").attr("href", "carrello.html?"+document.URL.split("?")[1]);
    else
      $("#link_carrello").attr("href", "carrello.html");
    if(controlloPresenzaProdotti()){
      var vet_lista_prodotti = deserializzaObjDaJson(letturaLink(document.URL));
      cont_carrello = vet_lista_prodotti.length;
    }
    else{
      cont_carrello = 0;
    }

    $("#contatore_carrello").text(cont_carrello);

}

var carrello=angular.module("carrelloAngular",[]);

carrello.service("informazioniVettore",function(){
    this.vettore=deserializzaObjDaJson(letturaLink(document.URL));
     if(this.vettore==undefined){
      this.vettore=[];
    }
});

carrello.controller("stampaCarrello",function(informazioniVettore){
    this.vettoreCarrello=informazioniVettore.vettore;
      this.vettoreCarrello=informazioniVettore.vettore;
      this.path=function(){
        return serializzaObjInJson(informazioniVettore.vettore);
      }
      this.vuoto=function(){
          return getVuoto(informazioniVettore.vettore);
      };
      this.setTot=function(){
        return totale(informazioniVettore.vettore);
      };
});

carrello.controller("Contatore_carrello_ctrl",function(informazioniVettore){
  this.contatore=informazioniVettore.vettore.length;
carrello.controller("titoloctrl",function(informazioniVettore){   
      this.Titolo=function(){
          return setTitolo(informazioniVettore.vettore);
      };
});
carrello.controller("eliminazioneProdotti",function(informazioniVettore){
  this.cancella=function(id_bottone){
    startEliminazioneProdotto(id_bottone,informazioniVettore.vettore)
  };
});

carrello.controller("RegistraLogin",function(){
});
function getVuoto(vett){
  var vuoto;
  if(vett.length==0)
      vuoto=true;   
    else
      vuoto=false;
    return vuoto;
}
function totale(vett){
  var contTot=0;
  for (prodotto of vett) {
      contTot+=Number(prodotto.prezzo);
  }
  return contTot;
}
function setTitolo(vett){
  if(vett.length==0)
      return  "Non ci sono prodotti nel carrello" 
    else
      return "Ecco i tuoi prodotti"
}

index.controller('ControllerProdotti', function(utilityService){
//Funzioni per l'aggiunta di un prodotto.
  this.aggiuntaProdotto = function(num_prodotto){

      //return utilityService.map_img_prodotti[num_prodotto];
  };

  this.prezzo_finale = [0, 0, 0, 0];
  this.numero_mese = [1, 1, 1, 1];

//FATTO
function start() {
    set_prezzi();
    var cont_carrello;
    if(document.URL.indexOf("?") != -1)
      $("#link_carrello").attr("href", "carrello.html?"+document.URL.split("?")[1]);
    else
      $("#link_carrello").attr("href", "carrello.html");
    if(controlloPresenzaProdotti()){
      var vet_lista_prodotti = deserializzaObjDaJson(letturaLink(document.URL));
      cont_carrello = vet_lista_prodotti.length;
    }
    else{
      cont_carrello = 0;
    }

    $("#contatore_carrello").text(cont_carrello);

}

  this.lista_option = [{
      name: "1 mese",
      value: 1
  }, {
      name: "3 mesi",
      value: 3
  }, {
      name: "6 mesi",
      value: 6
  }, {
      name: "12 mesi",
      value: 12
  }];

  this.setPrezzo = function(id_prodotto){
    this.prezzo_finale[id_prodotto-1] = this.map_prezzi_base["prezzo_prod_" + id_prodotto]*this.numero_mese[id_prodotto-1];
  };

  this.map_prezzi_base = {};
  this.map_prezzi_base["prezzo_prod_1"] = 299;
  this.map_prezzi_base["prezzo_prod_2"] = 599;
  this.map_prezzi_base["prezzo_prod_3"] = 199;
  this.map_prezzi_base["prezzo_prod_4"] = 499;

});


function serializzaObjInJson(obj){
  return JSON.stringify(obj);
}

//FATTO
function controlloPresenzaProdotti(){
   return (letturaLink($("#link_carrello").attr("href")).indexOf('[') != -1);
}

//FATTO


//FATTO


//FATTO
function incrementoContatoreCarrello(val){
  var contatore = $("#link_carrello span").text();
  $("#link_carrello span").text(contatore+val);
}
function decrementoContatoreCarrello(val){
  var contatore = $("#link_carrello span").text();
  $("#link_carrello span").text(contatore-val);
}

//FATTO
function aggiuntaProdotto(num_prodotto){
  var prod = creazioneProdotto(num_prodotto);
  var link_carrello = $("#link_carrello");
  var vet_lista_prodotti = new Array();

  if(controlloPresenzaProdotti()){
    vet_lista_prodotti = deserializzaObjDaJson(letturaLink(link_carrello.attr("href")));
  }

  vet_lista_prodotti.push(prod);
  link_carrello.attr("href", "carrello.html?" + serializzaObjInJson(vet_lista_prodotti));
  incrementoContatoreCarrello(1); //Incremento il contatore del carrello.
}

//FATTO
function deserializzaObjDaJson(stringa_json) {
      return eval(stringa_json);
}

//FATTO

function letturaLink(s) {
    //restituire l'url formato dal codice json...

	if(s.indexOf('?') != -1)
		s = s.split('?')[1];
  else return "[]";
    if(s.indexOf('#') != -1)
		s = s.split("#")[0];
    s = s.replace(/(%22)/g, "\"");
    s = s.replace(/(%20)/g, " ");
    s = s.replace(/(%27)/g, "'");

    return s;

}

function eliminazioneElemHTML(id_elem){
  $("#"+id_elem).parent().remove();
}



function startEliminazioneProdotto(id_bottone,vet_lista_prodotti){
  vet_lista_prodotti=eliminaProdottoDaHTML(vet_lista_prodotti, id_bottone);

}


function eliminaProdottoDaHTML(vet_lista_prodotti, index){
  for(var i = Number(index)+1; i < vet_lista_prodotti.length; i++){
    $("#"+i).attr("id", i-1);
    //$("prod_" + i).attr("id", "prod_" + i-1);
  }
 vet_lista_prodotti.splice(index,1);
 return vet_lista_prodotti;
}

function RegistraLogin(Id, Id2){
	if($("#"+Id).style.display == 'none' && $(Id2).style.display=='block')
	{
		$("#"+Id).style.display='block'
    $("#"+Id2).style.display='none'
	}
  else if($("#"+Id).style.display == 'block'){
    $("#"+Id).style.display='none'
  }
  else{
    $("#"+Id).style.display='block'
  }
}
