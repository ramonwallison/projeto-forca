 
var começarJogo = document.querySelector("#botao1");
var adicionarPalavra = document.querySelector("#botao2");
var botaoIniciar = document.querySelector(".botoes-iniciar");
var body = document.querySelector("body");
var botoesEncerrar = document.querySelector(".botoes__encerrar");
var areaJogavel = document.querySelector(".area-jogavel")
var areaCanvas = document.querySelector("#area-canvas");
var tela = document.querySelector("canvas"); // Canvas = 293px
var pincel = tela.getContext("2d");
var botaoSairDoJogo = document.querySelector("#botao-encerrar1");
var botaoSortear = document.querySelector("#botao-encerrar2");
var novaPalavra = document.querySelector(".adicionar__palavra");
var adicionando = document.querySelector(".botao-adicionar");
var inputPalavra = document.querySelector("#palavra-add");
var mensagemNovaPalavra = document.querySelector(".mensagem-add-palavra");
var botaoVoltar = document.querySelector(".botao-voltar");
var finalJogo = document.querySelector(".final-jogo");
var resultado = document.querySelector(".resultado");
var textoFinal = document.querySelector(".texto-venceu")
var erros = [];
var palavraCorreta = [];
var infoP = document.querySelector("#info-p");
var largura = window.screen.width

// teclado
var teclado = document.querySelector(".teclado");
var tdButton = document.getElementsByClassName("teclado__btn")

var geralPalavras = ["LARANJA", "MANGA", "TAMARINDO", "ABACAXI", "CAJU", "BANANA", "MELANCIA", "NECTARINA", "AMEIXA",
     "ADVOGADO", "POLICIAL", "BOMBEIRO", "BARBEIRO", "MANICURE", "ZELADOR", "ATENDENTE", "JUIZ","ALEMANHA", "PORTUGAL", "BRASIL", "URUGUAI", "CHILE", "INGLATERRA", "RUSSIA", "UCRANIA","FLUMINENSE", "JOINVILE", "FLAMENGO", "BARCELONA", "JUVENTUS", "MILAN", "ROMA", "VASCO"]; // Array PALAVRA com várias palavras para serem sorteadas

function desenharTabuleiro(){

    botaoIniciar.classList.add("invisivel");

    botoesEncerrar.classList.remove("invisivel");
    botoesEncerrar.classList.add("botoes-encerrar");

    areaCanvas.classList.remove("invisivel");
    areaCanvas.classList.add("area-canvas");

    pincel.fillStyle = ("#eed1d1bd");
    pincel.fillRect(0, 0, 600, 450);

    sorteiaPalavra();


    if(largura < 400){
        desenhaTraçoMenor()
        // pintaVermelho()
    } else{
        desenhaTraço(); // Chamando função desenha traço com parâmetros = (Palavra sorteada, Posição inicial dos traços, Espaço utilizado por cada traço)
    }

    desenhaForca();

    body.addEventListener("keydown", function(e){ // Keydown = Alertado quando o teclado é digitado
        var teclado = e.keyCode // e.key = Reconhece qual tecla foi digitada
        var tecla = e.key.toUpperCase()
        
        if(teclado >= 65 && teclado <= 90){

            if(palavraSecreta.includes(tecla)){ // Includes = Se a tecla digitada tiver (incluida) dentro do (palavra sorteada)
                
                if(palavraCorreta.includes(tecla)){
                    alert("Você já digitou essa letra");
                    return;
                } else{
                    for(var i = 0; i < palavraSecreta.length; i++){ // (Laço) que percorre a (palavra sorteada)
                        if(palavraSecreta[i] === tecla){ // Se uma (posição) dentro da palavra sorteada for igual a tecla digitada a função é chamada 
                            desenhaLetra(i) // Função chamada na posição onde o (incrementador) igualou com a tecla  
                            palavraCorreta.push(tecla);   
                        }
                    } 
                } if(palavraCorreta.length == palavraSecreta.length){
                        finalDeJogo()
                }
                
            }else{ // Se a tecla digitada não estiver incluida dentro da (palavra sorteada)
                if(erros.includes(tecla)){ // Se a tecla digitada já estiver inclusa dentro do (array erros) função para
                    alert("Você já digitou essa letra")
                    return;
                } else{ // Se nõa estiver inclusa...

                    erros.push(tecla); // tecla digitada é puxada para dentro do (aray erros)

                        for(var i = 0; i < erros.length; i++){ // Laço percorre o (array erros)
                            
                            if(erros[i] == tecla){ // Condição necessária para que o laço chame a função 1 por vez
                                desenhaLetraErrada(tecla, i); // Função chamada com os parâmetros (tecla) e (incrementador) sempre somando (+1)
                                desenhaCabeça()
                            } if(erros.length > 1){
                                desenhaCorpo()
                            } if(erros.length > 2){
                                desenhaBraçoDireito()
                            } if(erros.length > 3){
                                desenhaBraçoEsquerdo()
                            } if(erros.length > 4){
                                desenhaPernaDireita()
                            } if(erros.length > 5){
                                desenhaPernaEsquerda()
                            }
                            
                            
                        } if(erros.length == 6){ // Se o array erros tiver mais que 6 elementos o usuário perde (6 chances)
                                finalDeJogo()
                                textoFinal.textContent = ("Você Perdeu!");
                                textoFinal.classList.remove("texto-venceu");
                                textoFinal.classList.add("texto-perdeu");
                            }
                    
                }
                

            }
        } else{
            alert("Apenas letras de A a Z")
        }
            
                //for(var c = 0; c < palavra.length; c++){
                //   var letra = (palavra[c]); // Uma letra por vez até formar a palavra
                //   if(letra == tecla){ // Compara a letra atual com a tecla digitada
                //       alert("Deu bom");
                //       desenhaLetra(letra, xtotal, pos) // Tentando cetralizar cada letra !!!!!!!
                        
                //   }
            // }
    });

    if(largura < 1000){
        tecladoVirtual()
    }
}

function tecladoVirtual(){

    teclado.classList.remove("invisivel");

    for(var i = 0; i < tdButton.length; i++){
        tdButton[i].addEventListener("click", button)
    }

    function button(e){
        var btValor = document.getElementById(e.target.id).dataset.v;
        var btValorId = document.getElementById(e.target.id);
        
        if(palavraSecreta.includes(btValor)){ // Includes = Se a tecla digitada tiver (incluida) dentro do (palavra sorteada)
                
            if(palavraCorreta.includes(btValor)){
                alert("Você já digitou essa letra");
                return;
            }else{
                for(var i = 0; i < palavraSecreta.length; i++){ // (Laço) que percorre a (palavra sorteada)
                    if(palavraSecreta[i] === btValor){ // Se uma (posição) dentro da palavra sorteada for igual a tecla digitada a função é chamada 
                        desenhaLetra(i) // Função chamada na posição onde o (incrementador) igualou com a tecla 
                        btValorId.classList.remove("teclado__btn");
                        btValorId.classList.add("tecla__certa");
                        palavraCorreta.push(btValor);   
                    }
                } 
            }   if(palavraCorreta.length == palavraSecreta.length){
                    finalDeJogo()
                }
            
        }else{ // Se a tecla digitada não estiver incluida dentro da (palavra sorteada)
            if(erros.includes(btValor)){ // Se a tecla digitada já estiver inclusa dentro do (array erros) função para
                alert("Você já digitou essa letra")
                return;
            } else{ // Se nõa estiver inclusa...

                erros.push(btValor); // tecla digitada é puxada para dentro do (aray erros)

                    for(var i = 0; i < erros.length; i++){ // Laço percorre o (array erros)
                        
                        if(erros[i] == btValor){ // Condição necessária para que o laço chame a função 1 por vez
                            desenhaLetraErrada(btValor, i); // Função chamada com os parâmetros (tecla) e (incrementador) sempre somando (+1)
                            btValorId.classList.remove("teclado__btn");
                            btValorId.classList.add("tecla__errada");
                            desenhaCabeça()
                        } if(erros.length > 1){
                            desenhaCorpo()
                        } if(erros.length > 2){
                            desenhaBraçoDireito()
                        } if(erros.length > 3){
                            desenhaBraçoEsquerdo()
                        } if(erros.length > 4){
                            desenhaPernaDireita()
                        } if(erros.length > 5){
                            desenhaPernaEsquerda()
                        }
                        
                        
                    } if(erros.length == 6){ // Se o array erros tiver mais que 6 elementos o usuário perde (6 chances)
                            finalDeJogo()
                            textoFinal.textContent = ("Você Errou!");
                            textoFinal.classList.remove("texto-venceu");
                            textoFinal.classList.add("texto-perdeu");
                        }
                
            }
            

        }
    }
}

// Função da Vitória
function finalDeJogo(){
    areaJogavel.classList.remove("area-jogavel"); // Section principal perder a classe comum
    areaJogavel.classList.add("area-jogavel-venceu"); // Adicionando um padding-top e um box-sizing
    resultado.textContent = (`${palavraSecreta}`); // Palavra sorteada é revelada
    areaCanvas.classList.add("invisivel"); // Tela do canvas removida
    finalJogo.classList.remove("invisivel"); // Div da vitória é exibida
    teclado.classList.add("invisivel");
}

// Lógica de adicionar palavra ainda incompleta
function adicionandoPalavra(){
    botaoIniciar.classList.add("invisivel"); // Removendo os botões de ínicio

    areaCanvas.classList.add("invisivel"); // Removendo tela do canvas

    finalJogo.classList.add("invisivel"); // Removendo Div da vitória

    botoesEncerrar.classList.add("invisivel"); // Removendo os botões de encerrar

    areaJogavel.classList.remove("area-jogavel-venceu"); // Section principal perdendo função específica
    areaJogavel.classList.add("area-jogavel"); // Section principal recebendo função comum

    novaPalavra.classList.remove("invisivel"); // Div de adição de palavra é exibida

    teclado.classList.add("invisivel");

    adicionando.addEventListener("click", function(){ // Clicando no botão de adicionar palavra
        var palavraAdicionada = inputPalavra.value // Palavra digitada

        if(palavraAdicionada.length < 4){
            alert("Mínimo 3 letras para adicionar");
        }
        else if(palavraAdicionada.length > 10){
            alert("Limite de letras atingido");
        }else {

            geralPalavras.push(palavraAdicionada.toUpperCase()) // Entregando a palavra em maiúsculo

            // Mudando estilo e texto do botão de adicionar
            adicionando.classList.remove("botao-adicionar"); 
            adicionando.classList.add("botao-verde");
            adicionando.textContent = ("Adicionado")  
        }  
    })
}




// Sorteia a palavra aleatoriamente dentro do array (PALAVRA)
function sorteiaPalavra(){
   
    
    var i = Math.round(Math.random() * (geralPalavras.length)); // Lógica do sorteio
    var palavra = (geralPalavras[i])
    palavraSecreta = palavra
        
    // Função que posiciona os traços no centro do canvas
   
    return palavra

   // desenhaLetra()

   // Função que reconhece a tecla que foi digitada e compara com as letras da palavra sorteada
   

}

   
//function desenhaMeio(){
 //   pincel.fillStyle = ("red");
 //   pincel.fillRect(0, 0, 58, 450)
//}

//function teste(palavra){
 //   for(var c = 0; c < palavra.length; c++){
 //       var letra = palavra[c];
 //       var pos = palavra.indexOf(letra);
 //       alert(letra)
 //       alert(pos + 1)
 //   }
//}

// Função que desenha a quantidade de traços de acordo com a palavra sorteada
function desenhaTraço(){

    var xcanva = (600);
    var xpalavra = (58 * palavraSecreta.length);
    var xinicial = ((xcanva - xpalavra )/2);

    if(palavraSecreta.length > 9){
        xinicial = 0
    }

    for(var i = 0; i < palavraSecreta.length; i++){

        pincel.fillStyle = ("black");
        pincel.fillRect(xinicial, 400, 45, 5);
        xinicial = xinicial + 62
    }
    
}

function desenhaTraçoMenor (){
    var xcanva = (300);
    var xpalavra = (29* palavraSecreta.length);
    var xinicial = ((xcanva - xpalavra ));

    for(var i = 0; i < palavraSecreta.length; i++){

        pincel.fillStyle = ("black");
        pincel.fillRect(xinicial, 400, 45, 5);
        xinicial = xinicial + 60
    }
}

// Função que desenha a letra quando o usuário acerta
function desenhaLetra(i){
    var xcanva = (600);
    var xpalavra = (57 * palavraSecreta.length);
    var xinicial = ((xcanva - xpalavra )/2);

    if(palavraSecreta.length > 9){
        xinicial = 0
    }

   // var ajuste = pos * 62
    pincel.font=("50px arial");
    pincel.fillStyle=("#06a306");
    pincel.fillText(palavraSecreta[i], xinicial+(62*i), 395) // Tentando acertar a posição correta de cara letra
    

}

function desenhaLetraMenor(){

}

function desenhaLetraErrada(tecla, i){
    var xcanva = (600);
    var xpalavra = (58 * palavraSecreta.length);
    var xinicial = ((xcanva - xpalavra )/2);
    var pontoPartida = xinicial + 115;

    pincel.font = ("30px arial");
    pincel.fillStyle = ("red");
    pincel.fillText(tecla, pontoPartida+(40*i), 440);    
}

function desenhaForca(){
    // Area da forca (Estática)
    pincel.fillStyle = ("black");
    pincel.fillRect(225, 225, 160, 3);

    pincel.fillStyle = ("black");
    pincel.fillRect(220, 7, 170, 25); 
    pincel.clearRect(223, 10, 164, 19);

    pincel.fillStyle = ("black");
    pincel.fillRect(240, 0, 20, 225);
    pincel.clearRect(243, 2, 14, 223);

    pincel.fillStyle = ("black");
    pincel.fillRect(380, 30, 5, 30);
    
}

function pintaBranco(){
    pincel.fillStyle = ("White");
    pincel.fillRect(0, 0, 590, 300)
}

function ajustePontoReferencia(){
    //Ajustando ponto de referência
    pincel.translate(0, 445)

    pincel.setTransform(1, 0, 0, 1, 0, 0);
}
function desenhaCabeça(){
    // Area da cabeça (1º erro)
    pincel.strokeStyle = ("blue")
    pincel.beginPath();
    pincel.arc(382, 83, 23, 0, 2*Math.PI);
    pincel.stroke();
}

function desenhaCorpo(){
    // Area do corpo (2º erro)
    pincel.fillStyle = ("blue");
    pincel.fillRect(380, 106, 5, 70);
}

function desenhaBraçoDireito(){
    ajustePontoReferencia()
    // Area do braço direito( 3º erro)
    pincel.rotate(45*Math.PI /180);
    pincel.fillStyle = ("blue");
    pincel.fillRect(345, -190, 5, 30);

    pincel.setTransform(1, 0, 0, 1, 0, 0);
}

function desenhaBraçoEsquerdo(){
    ajustePontoReferencia()
    //Area do braço esquerdo (4º erro)
    pincel.rotate(145*Math.PI /180);
    pincel.fillStyle = ("blue");
    pincel.fillRect(-255, -342, 5, 30)

    pincel.setTransform(1, 0, 0, 1, 0, 0);
}

function desenhaPernaDireita(){
    ajustePontoReferencia()
    // Area da perna direita(5º erro)
    pincel.rotate(45*Math.PI /180);
    pincel.fillStyle = ("blue");
    pincel.fillRect(388, -147, 5, 30);

    pincel.setTransform(1, 0, 0, 1, 0, 0);
}

function desenhaPernaEsquerda(){
    ajustePontoReferencia()
    // Area perna esquerda (6º erro)
    pincel.rotate(145*Math.PI /180);
    pincel.fillStyle = ("blue");
    pincel.fillRect(-220, -390, 5, 30)

    pincel.setTransform(1, 0, 0, 1, 0, 0);
}

function sairDoJogo(){
    window.history.go(0)
}

adicionarPalavra.addEventListener("click", adicionandoPalavra);

botaoSortear.addEventListener("click", adicionandoPalavra);

botaoSairDoJogo.addEventListener("click", sairDoJogo);

botaoVoltar.addEventListener("click", sairDoJogo);

começarJogo.addEventListener("click", desenharTabuleiro);





//var a = 65
//function verificaPalavra(e){
//    if(e.which == a){
//        alert("Deu bom")
 //   }
// }



 















