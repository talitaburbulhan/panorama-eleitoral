fetch("./dados.json")

.then(response => {
   return response.json();
})
.then(jsondata => run(jsondata));

let seletorFaixa = document.querySelector('.faixaEtaria')
let generos = document.querySelectorAll('input[name="genero"]')
let grausDeInstrucao = document.querySelector('.instrucao')
let estadosCivis = document.querySelector('.estadoCivil')
let racas = document.querySelector('.raca')

let opcoes = {     // objeto de estado 
   ano: undefined,
   genero: undefined,
   grauInstrucao: undefined,
   estadoCivil: undefined,            
   raca: undefined   
} 

let dados = undefined


function extraiAno(data){ 
return +data.substr(6,4) //o + converte a string em número 
} 

function run(jsondata) { // criei a função run para que os meus dados em json não desaparecessem. Todo o restante do meu código roda dentro dela.  

   for(row of jsondata){ //Para cada linha do meu objeto
      let idade = 2022 - (extraiAno(row.DT_NASCIMENTO))  /// cria a variável idade. Como? Roda a função extraiAno e dá como parâmetro a coluna DT_ANO do meu Json
      let faixaIdade // Cria a variável faixaIdade , o valor dela muda de acordo com o IF
      if (idade > 18 && idade < 31) faixaIdade = "De 18 a 30 anos"
      if (idade >= 31 && idade <= 40) faixaIdade = "De 31 a 40 anos"
      if (idade >= 41 && idade <= 50) faixaIdade = "De 41 a 50 anos"
      if (idade >= 51 && idade <= 60) faixaIdade = "De 51 a 60 anos"
      if (idade >= 61 && idade <= 70) faixaIdade = "De 61 a 70 anos"
      if (idade >= 71 && idade <= 80) faixaIdade = "De 71 a 80 anos"
      if (idade >= 81 && idade <= 90) faixaIdade = "De 81 a 90 anos"
      if (idade > 90) faixaIdade = "Mais de 90 anos"

      row["faixaIdade"] = faixaIdade // cria a coluna Faixa Idade no banco de dados
   }

   dados = jsondata

   seletorFaixa.addEventListener("change", atualizarOpcoes)

   for (let genero of generos){
      genero.addEventListener('change', atualizarOpcoes)  // aqui coloca um monitor de eventos para cadauma das opções de gênero 
   }

   grausDeInstrucao.addEventListener('change', atualizarOpcoes)

   estadosCivis.addEventListener('change', atualizarOpcoes)
   
   racas.addEventListener('change', atualizarOpcoes)
    
}



   
  

function atualizarOpcoes() {

   for(let ano of seletorFaixa){

      if (seletorFaixa != "") 
      opcoes.ano = seletorFaixa.value
   }
   
  
   for (let genero of generos){

     if (genero.checked) {    // está vendo se o input de radio está selecionado
      opcoes.genero = genero.value // se estiver marcado, guarde no objeto de estado o gênero selecioando. 
      }
   }

   for (let grauInstrucao of grausDeInstrucao) {
      if (grauInstrucao.selected){
         opcoes.grauInstrucao = grauInstrucao.value
      }
   }


   for (let estCivil of estadosCivis) {
      if (estCivil.selected){
         opcoes.estadoCivil = estCivil.value
      }
   }


   for (let raca of racas) {
      if (raca.selected){
         opcoes.raca = raca.value
      }
   }
    
   

  filtrar() 

}

function filtrar() { 

   let contador = 0
   
   for (let dado of dados){  // olha cada linha da planilha e ve se o genero que a pessoa selecionou bate com o do candidato 
   
      
      let condicaoFaixa, condicaoGenero, condicaoInstrucao, condicaoCivil, condicaoRaca

      if (opcoes.ano == "") condicaoFaixa = true
      else condicaoFaixa = opcoes.ano

      if (opcoes.genero == "FEMININO") condicaoFaixa = true
      else condicaoFaixa == "MASCULINO"
      
      if (opcoes.grauInstrucao == "TODOS") condicaoFaixa = true
      else condicaoFaixa = opcoes.grauInstrucao

      if (opcoes.estadoCivil == "TODOS") condicaoFaixa = true
      else condicaoFaixa = opcoes.estadoCivil

      if (opcoes.raca == "TODOS") condicaoFaixa = true
      else condicaoFaixa = opcoes.raca

      
      if (condicaoFaixa && condicaoGenero && condicaoInstrucao && condicaoCivil && condicaoRaca)   {  // está vendo se a informação do json está batendo com a informação que eu tinha armazaenado lá em cima (que é o genero selecionado)
      contador++         // se as infos baterem, soma 1
      }
   
   }
   

   mostrar(contador)
        
}

function mostrar(contador) {
   
  document.querySelector('.contagem').textContent = contador
  document.querySelector('.porcentagem').textContent = ((contador * 100) / dados.length).toFixed(3)+"%"  
                          // Se começa com letra maiúscula é pq normalmente é uma lcasse, um tipo de objeto 
  
  
}

