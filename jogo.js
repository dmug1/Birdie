const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 122,
    posicaox:0,
    posicaoy: canvas.height -112,

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

function fazColisao(flappyBird,chao){
    const flappyBirdY = flappyBird.posicaoy + flappyBird.altura;
    const chaoY = chao.posicaoy;
    if(flappyBirdY >= chaoY){
        return true;
    } else {
        return false;
    }
};

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
        if(fazColisao(flappyBird,chao)){
            console.log("Colidiu");
            mudaParaTela(Telas.INICIO);
            return;
        };
        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        flappyBird.posicaoy = flappyBird.posicaoy + flappyBird.velocidade;
    },    
    desenha(){        
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY, // Sprite x e Sprite Y
            flappyBird.largura, flappyBird.altura, //Tamanho da pomba
            flappyBird.posicaox, flappyBird.posicaoy, // Sprite x e Sprite Y
            flappyBird.largura, flappyBird.altura,
        );
    },
}

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
let telaAtiva = {};
function mudaParaTela(novaTela){
    telaAtiva = novaTela;
};

const Telas = {
    INICIO: {
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha(); 
            menssagemGetReady.desenha();
        },
        click(){
            mudaParaTela(Telas.JOGO)
        },
        atualiza(){

        }

    },

    JOGO: {
        desenha(){
            planoDeFundo.desenha();
            chao.desenha();
            flappyBird.desenha(); 
        },
        click(){
            flappyBird.pula();
        },
        atualiza(){       
            flappyBird.atualiza();
        }
    }

}

function loopAnimation() {
    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loopAnimation);
};

window.addEventListener('click', function(){
    if(telaAtiva.click){
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO)
loopAnimation();