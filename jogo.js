/* feito com o tutorial do dev soutinho no yt*/
let frames = 0;

const sprites = new Image();
sprites.src = './sprites.png';

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

//chao
    function criaChao() {
        const chao = {
        spriteX: 0,
        spriteY: 610,
        largura: 224,
        altura: 122,
        posicaox:0,
        posicaoy: canvas.height -112,
        atualiza() {
            const movimentoDoChao = 1;
            const repeteEm = chao.largura / 2;
            const movimentacao = chao.posicaox - movimentoDoChao;
            chao.posicaox = movimentacao % repeteEm;

        },

        desenha(){        
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, // Sprite x e Sprite Y
                chao.largura, chao.altura, //Tamanho da pomba
                chao.posicaox, chao.posicaoy, // Sprite x e Sprite Y
                chao.largura, chao.altura,
            );       
            contexto.drawImage(
                sprites,
                chao.spriteX, chao.spriteY, // Sprite x e Sprite Y
                chao.largura, chao.altura, //Tamanho da pomba
                (chao.largura + chao.posicaox), chao.posicaoy, // Sprite x e Sprite Y
                chao.largura, chao.altura,
            );        
        },
        }
        return chao;
    }    


function fazColisao(flappyBird,chao){
    const flappyBirdY = flappyBird.posicaoy + flappyBird.altura;
    const chaoY = chao.posicaoy;
    if(flappyBirdY >= chaoY){
        return true;
    } else {
        return false;
    }
};

function criaFlappyBird(){
    const flappyBird ={
        spriteX:0,
        spriteY:0,
        largura:33,
        altura:24,
        posicaox:10,
        posicaoy:50,
        velocidade: 0,
        gravidade:0.25,
        pulo: 4.6,
        pula(){
            console.log('Pulinho do Raul Gil');
            flappyBird.velocidade =-flappyBird.pulo;
        },
        atualiza() {
            if(fazColisao(flappyBird,globais.chao)){
                console.log("Colidiu");
                som_HIT.play();
                setTimeout(() => {
                    mudaParaTela(Telas.INICIO);
                },500);
                
                return;
            };
            flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
            flappyBird.posicaoy = flappyBird.posicaoy + flappyBird.velocidade;
        },
        movimentos: [
            {spriteX: 0, spriteY: 0, },
            {spriteX: 0, spriteY: 26, },
            {spriteX: 0, spriteY: 52, },
        ],    
        frameAtual:0,
        atualizaOFrameAtual(){
            const intervaloDeFrames = 10;
            const passouIntervalo = frames % intervaloDeFrames === 0;
            console.log('passouIntervalo: ' + passouIntervalo);
            if(passouIntervalo){
                const baseDoIncremento = 1;
                const incremento = baseDoIncremento + flappyBird.frameAtual;
                const baseRepeticao = flappyBird.movimentos.length;
                flappyBird.frameAtual = incremento % baseRepeticao;

            }
        },
        desenha(){        
            flappyBird.atualizaOFrameAtual();
            const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
            contexto.drawImage(
                sprites,
                spriteX, spriteY, // Sprite x e Sprite Y
                flappyBird.largura, flappyBird.altura, //Tamanho da pomba
                flappyBird.posicaox, flappyBird.posicaoy, // Sprite x e Sprite Y
                flappyBird.largura, flappyBird.altura,
            );
        },
    }
    return flappyBird;
};



const planoDeFundo = {
    spriteX:390,
    spriteY:0,
    largura:275,
    altura:204,
    posicaox:0,
    posicaoy:canvas.height - 204,
    desenha(){        
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height);
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite x e Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho da pomba
            planoDeFundo.posicaox, planoDeFundo.posicaoy, // Sprite x e Sprite Y
            planoDeFundo.largura, planoDeFundo.altura,
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite x e Sprite Y
            planoDeFundo.largura, planoDeFundo.altura, //Tamanho da pomba
            (planoDeFundo.largura + planoDeFundo.posicaox), planoDeFundo.posicaoy, // Sprite x e Sprite Y
            planoDeFundo.largura, planoDeFundo.altura,
        );
    },
}

// starting game
const menssagemGetReady = {
    spriteX:134,
    spriteY:0,
    largura:210,
    altura:192,
    posicaox:(canvas.width / 2) - 174/2,
    posicaoy:50,
    desenha() {
        contexto.drawImage(
            sprites,
            menssagemGetReady.spriteX, menssagemGetReady.spriteY,
            menssagemGetReady.largura, menssagemGetReady.altura, 
            menssagemGetReady.posicaox, menssagemGetReady.posicaoy, // Sprite x e Sprite Y
            menssagemGetReady.largura, menssagemGetReady.altura,

        );
    }
}


/// [TELAS / SCREENS]
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela){    
    telaAtiva = novaTela;
    
    if(telaAtiva.inicializa){
        telaAtiva.inicializa();
    }

};

const Telas = {
    INICIO: {
        inicializa(){
            globais.flappyBird = criaFlappyBird();
            globais.chao = criaChao();
        },
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha(); 
            menssagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO)
        },
        atualiza(){
            globais.chao.atualiza();            

        }

    },

    JOGO: {
        desenha(){
            planoDeFundo.desenha();
            globais.chao.desenha();
            globais.flappyBird.desenha(); 
        },
        click(){
            globais.flappyBird.pula();
        },
        atualiza(){       
            globais.flappyBird.atualiza();
        }
    }

}

function loopAnimation() {
    telaAtiva.desenha();
    telaAtiva.atualiza();
    frames = frames+1;
    requestAnimationFrame(loopAnimation);
};

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO)
loopAnimation();