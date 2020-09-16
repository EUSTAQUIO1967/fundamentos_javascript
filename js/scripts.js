var $=document.querySelector.bind(document);
var txtpeso=$("#txtpeso");
var txtnome = $("#txtnome")
var txtaltura=$("#txtaltura");
var resultado=$(".resultado");
var btnComando=$("button");

var tabela = document.createElement('table');

criaTabelaResultados();

btnComando.addEventListener('click', function(event){
    event.preventDefault();
    calculaImc(txtnome.value, txtpeso.value, txtaltura.value)
});


function converteNumeroParaFloat(valor){
return valor.replace(',','.');

}

function calculaImc(nome, peso,altura){
    resultado.innerHTML='' ;
    peso = converteNumeroParaFloat(peso);
    altura = converteNumeroParaFloat(altura);
    resultado.setAttribute("class", " alert alert-success");
    var imc = ( Number(peso) / ( Number(altura)*Number(altura) ) ).toFixed(2) ;
    resultado.innerHTML= `${nome}, o seu IMC é : ${imc} kg/m2` ; 
    resultado.innerHTML += `<br>voce está  ${analisaResultado(nome, peso, altura, imc)}`;
}

function analisaResultado(nome, peso, altura, imc){
/*
Muito abaixo do peso	16 a 16,9 kg/m2	Queda de cabelo, infertilidade, ausência menstrual
Abaixo do peso	17 a 18,4 kg/m2	Fadiga, stress, ansiedade
Peso normal	18,5 a 24,9 kg/m2	Menor risco de doenças cardíacas e vasculares
Acima do peso	25 a 29,9 kg/m2	Fadiga, má circulação, varizes
Obesidade Grau I	30 a 34,9 kg/m2	Diabetes, angina, infarto, aterosclerose
Obesidade Grau II	35 a 40 kg/m2	Apneia do sono, falta de ar
Obesidade Grau III	maior que 40 kg/m2	Refluxo, dificuldade para se mover, escara
*/
imcArrendondado = Number(imc).toFixed(2);
var analise = "";

if (imcArrendondado < 16.9) {
    analise = 'Muito abaixo do peso &#128557;';
} else if(imcArrendondado > 17 && imcArrendondado <= 18.4 ){
    analise = 'Abaixo do peso &#128552;';
} else if (imcArrendondado >= 18.5 &&  imcArrendondado <= 24.9  ){
    analise = `Peso normal &#128512;`;
} else if (imcArrendondado >= 25 &&  imcArrendondado <= 29.9  ){
    analise = 'Acima do peso &#128556;';
} else if (imcArrendondado >= 30 &&  imcArrendondado <= 34.9  ){
    analise = 'Obesidade Grau I &#128553;';
} else if (imcArrendondado >= 35 &&  imcArrendondado <= 40  ){    
    analise = 'Obesidade Grau II &#128552;';
} else {
    analise = 'Obesidade Grau III &#128557;';
}    

registradorDeResultados(nome, peso, altura, analise, imcArrendondado)


return analise;
}

function criaTabelaResultados(){

tabela.setAttribute("class", "table");

var thead = document.createElement('thead');
var th = document.createElement('th');
th.textContent = "Nome";
thead.appendChild(th);

th = document.createElement('th');
th.textContent = "Peso / altura";
thead.appendChild(th);

th = document.createElement('th');
th.textContent = "Resultado";
thead.appendChild(th);

tabela.appendChild(thead)
$(".tabela-resultados").appendChild(tabela);
}


function registradorDeResultados(nome, pesoInformado, alturaInformada, resultado, imc){
var tr = document.createElement("tr");


var td = document.createElement("td");
td.textContent = nome;
tr.appendChild(td);

td = document.createElement("td");
td.textContent = pesoInformado +  " Kg - " + alturaInformada + " m";
tr.appendChild(td);

td = document.createElement("td");
td.innerHTML = "imc: " + imc + " Kg/m2 - Resultado: " + resultado;
tr.appendChild(td);

tabela.appendChild(tr);


}