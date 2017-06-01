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
}

//FATTO
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


function stampaProdotti() {
    $('#link_carrello').attr("href", document.URL);
    var tot_costo = 0;
    var cont_carrello;
    var contatore_bottoni = 0;
    var testo =$("#Lista_carrello");
    var vet_lista_prodotti = deserializzaObjDaJson(letturaLink(document.URL));
    if (vet_lista_prodotti)
     {
        cont_carrello=vet_lista_prodotti.length;
        $('#contatore_carrello').text( cont_carrello);
        $("#titolo_carrello").text("Lista prodotti nel carrello");
        for (prodotto of vet_lista_prodotti)
        {
          tot_costo += Number(prodotto.prezzo);
          $("#Lista_carrello").append("<div id=prod_"+contatore_bottoni+"></div>");

          var contenitore= $("#prod_"+contatore_bottoni);

          $(contenitore).append("<img src="+prodotto.pathImmagine+" class=img_prodotto></img><p>"+prodotto.nome + "<br/>" + "Durata: " + prodotto.durata + " mesi <br/>" + "Prezzo: " + prodotto.prezzo + "€ </p><button onclick=startEliminazioneProdotto(this.getAttribute('id')) id="+contatore_bottoni+" class='btn btn-danger'><span>Elimina</span></button>");
          contatore_bottoni++;
        }
        //Qui si crea il riassunto del carrello
        var sezione_riassunto = $('#tot_carrello');
        $(sezione_riassunto).append("<h3 style='margin-top:0px'>Totale ordine <span id ='cont_elem_carrello'>"+contatore_bottoni+"</span></h3>");
        $(sezione_riassunto).append("<p>Costo totale: <span id='costo_tot'>"+tot_costo+"</span>€</p><button class='btn btn-success' style='margin-top:25px'>procedi all'acquisto</button>");

    }
    else
    {
      visualizzaPagCarrelloVuota();
    }

}


function eliminazioneElemHTML(id_elem){
  $("#"+id_elem).parent().remove();
}

function aggiornamentoGraficoListaCarrello(id_bottone){
  eliminazioneElemHTML(id_bottone);
}

function aggiornamentoGraficoRiassuntoCarrello(vet_lista_prodotti, id_bottone){
  $("#cont_prodotti").text(Number($("#cont_prodotti").text())-1);
  $("#costo_tot").text(Number($("#costo_tot").text())-vet_lista_prodotti[id_bottone].prezzo);
  document.getElementById('cont_elem_carrello').innerHTML--;
}

function aggiornamentoGraficoPagCarrello(vet_lista_prodotti, id_bottone){
  aggiornamentoGraficoListaCarrello(id_bottone);
  aggiornamentoGraficoRiassuntoCarrello(vet_lista_prodotti, id_bottone);

  if(!(vet_lista_prodotti.length-1)){
    visualizzaPagCarrelloVuota();
  }

  aggiornamentoContatoreCarrello(0);
}

function startEliminazioneProdotto(id_bottone){
  var vet_lista_prodotti = deserializzaObjDaJson(letturaLink($("#link_carrello").attr("href")));
  aggiornamentoGraficoPagCarrello(vet_lista_prodotti, id_bottone);

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

function visualizzaPagCarrelloVuota(){

  $("#titolo_carrello").text( "Non sono presenti prodotti nel tuo carrello");
  $("#tot_carrello").css("display","none");

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
