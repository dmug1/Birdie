console.log('[DevSoutinho] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/channel/UCzR2u5RWXWjUh7CwLSvbitA');
console.log('Canal top me ensinou mt')

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

const flappyBird ={
    spriteX:0,
    spriteY:0,
    largura:33,
    altura:24,
    posicaox:10,
    posicaoy:50,
    velocidade: 0,
    gravidade:0.25,
    atualiza() {
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


function loopAnimation() {
    planoDeFundo.desenha();
    chao.desenha();
    flappyBird.desenha();    
    flappyBird.atualiza();


    requestAnimationFrame(loopAnimation);
};

loopAnimation();