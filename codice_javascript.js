var map_prezzi_base;
//FATTO
class Prodotto {

    constructor(nome, prezzo_finale, durata,pathImmagine) {
        this.nome = nome;
        this.prezzo = prezzo_finale;
        this.durata = durata;
        this.pathImmagine=pathImmagine;
    }

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

function serializzaObjInJson(obj){
  return JSON.stringify(obj);
}

 function set_prezzi() {
    map_prezzi_base = new Map();
    map_prezzi_base["prezzo_prod_1"] = $('#prezzo_prod_1').text();
    map_prezzi_base["prezzo_prod_2"] = $('#prezzo_prod_2').text();
    map_prezzi_base["prezzo_prod_3"] = $('#prezzo_prod_3').text();
    map_prezzi_base["prezzo_prod_4"] = $('#prezzo_prod_4').text();

}

//FATTO
function controlloPresenzaProdotti(){
   return (letturaLink($("#link_carrello").attr("href")).indexOf('[') != -1);
}


//funzione per il cambio del prezzo
function cambioPrezzo(durata, id_prezzo) {

    var prezzo = map_prezzi_base[id_prezzo];
    $("#"+id_prezzo).text( Number(prezzo) * durata);
}


//FATTO
function creazioneProdotto(num_prodotto){
  var prezzo_finale = $("#prezzo_prod_"+num_prodotto).text();
  var durata = $("#durata_prod_"+num_prodotto).value;
  var nome = $("#nome_prod_"+num_prodotto).text();
  if(num_prodotto > 2)
  var img = $("#img_prod_"+"2").attr("src");
  else var img = $("#img_prod_"+"1").attr("src");
  return new Prodotto(nome,prezzo_finale,durata,img);
}

//FATTO
function aggiornamentoContatoreCarrello(operazione){
  var contatore =$("#link_carrello span").text();
  if(operazione ? contatore++ : contatore--);
  $("#link_carrello span").text(contatore);
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
  aggiornamentoContatoreCarrello(1); //Incremento il contatore del carrello.
}

//FATTO
function deserializzaObjDaJson(stringa_json) {
      return eval(stringa_json);
}

//FATTO
function aggiungiPathAlink(ID_link, nuovo_link) {
    var link = $("#"+ID_link);
    link.attr("href", link.attr("href") + nuovo_link);
}

function modificaLinkPerCarrello(ID_link,fondo_link) {

    if (typeof(fondo_link) == "undefined") {
        fondo_link = "";
    }

    var stringaJson = letturaLink($("#link_carrello").attr('href'));
    if (stringaJson) {
      aggiungiPathAlink(ID_link, "?" + stringaJson + fondo_link);
    }
    else{
      aggiungiPathAlink(ID_link,fondo_link);
    }

}

function letturaLink(s) {
    //restituire l'url formato dal codice json...

	if(s.indexOf('?') != -1)
		s = s.split('?')[1];
  else return "";
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

function startEliminazioneProdotto(id_bottone,vett){
  var vet_lista_prodotti = vett;

  vet_lista_prodotti=eliminaProdottoDaHTML(vet_lista_prodotti, id_bottone);
  if(vet_lista_prodotti.length > 0)
	$("#link_carrello").attr("href","carrello.html?"+serializzaObjInJson(vet_lista_prodotti));
  else
	 $("#link_carrello").attr("href","carrello.html");

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
