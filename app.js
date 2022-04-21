    const container = document.querySelector('.container');
    const scoreDisplay = document.getElementById('score');
    const width = 27; // Ancho del board 27 x 27 cuadros de 20px cada uno = 729 cuadros
    let score = 0;
    let scoresList = [];
    let pacmanCurrentIndex = 580; //Donde empieza el pacman
    let level = layout[1];
    let celdas = [];
    let startButton = false;
    let lives = 3;
    let gameOver = false;

    //Función para crear divs dentro del contendor del HTML y asignarles clases según su número en el layout
    function createBoard(level) {
        for(let i = 0; i<level.length; i++){ 
            const celda = document.createElement('div'); //Creamos un div que llamaremos celda dentro del html
            const subElemento = document.createElement('div'); //Sub elemento para cuando queremos div embebidos en las celdas
            container.appendChild(celda); //Añadimos la celda al div con la clase contenedor del HTML
            celdas.push(celda); //Agregamos la celda a un array de elementos llamado celdas (por si necesitamos algún elemento después, se pueda acceder a el)
            //Asignamos una clase a la celda dependiendo del número que tenga el elemento actual del level.
            switch(level[i]){
                case 0:
                    celdas[i].classList.add('vacio');
                break;
                case 1:
                    celdas[i].classList.add('pared');
                break;
                case 2: 
                    celdas[i].classList.add('migaja');
                    celdas[i].classList.add('subElement-back');
                    celdas[i].appendChild(subElemento).classList.add('miga');
                break;
                case 3:
                    celdas[i].classList.add('power');
                    celdas[i].classList.add('subElement-back');
                    celdas[i].appendChild(subElemento).classList.add('queso');
                break;
                case 4:
                    celdas[i].classList.add('casa-fantasma');
                break;
                default:
                    console.warn('createBoard() error, unknown class');
                break;
            }
        }
    }

    createBoard(level);
    celdas[pacmanCurrentIndex].classList.add('pacman'); //Agregamos al pacman al tablero


    class Ghost { //Clase prototipo de fantasmas startIndex es su posicion en level
        constructor(className,startIndex,speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.EatenTimer = NaN;
            this.isScared = false;
        };
    };

    let ghosts = [];
    function crearFantasmas(Ghost){
        ghosts = [ //Generamos 6 fantasmas (pueden ser mas)
        new Ghost('orange',283,650),
        new Ghost('pinky',336,600),
        new Ghost('blue',338,700),
        new Ghost('blue',362,600),
        new Ghost('red',366,600),
        new Ghost('pinky',390,700),
        new Ghost('orange',392,700)
        ];

        ghosts.forEach(ghost => { //funcion para agregar className de cada tipo de fantasma a cuadricula
        celdas[ghost.currentIndex].classList.add('fantasma');
        celdas[ghost.currentIndex].classList.add(ghost.className); //al div que se encuentre en el currentIndex del fantasma se le asigna una clase adicional segun el className de cada tipo de fantasma.
        });

        ghosts.forEach(ghost => {
        moverFantasma(ghost); //Movimiento del fantasma cada ghost.speed segundos
        }); //Movemos los fantasmas
    }
    crearFantasmas(Ghost);
 
    let keyState = {};    
    document.addEventListener('keydown',function(e){
        keyState[e.keyCode || e.which] = true;
    },true);    
    document.addEventListener('keyup',function(e){
        keyState[e.keyCode || e.which] = false;
    },true);
    
    let pacmanStyles = document.getElementsByClassName('pacman')[0];
    function pacmanAnimation (pacmanMoved){
        pacmanStyles.style.animationPlayState = pacmanMoved?'running':'paused';
    };
    //pacmanAnimation(true);
    
    function moverPacman(){
        if(startButton){
        celdas[pacmanCurrentIndex].classList.remove('pacman');
        celdas[pacmanCurrentIndex].classList.add('vacio'); //agregamos espacio vacio por donde pase el pacman
        
            if(keyState[37]){ 
                if(pacmanCurrentIndex % width !==0 
                    && !celdas[pacmanCurrentIndex-1].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex-1].classList.contains('casa-fantasma')){ 
                    //Desplazamiento a la izquierda
                    pacmanCurrentIndex -=1;
                    pacmanNoise.play();
                    if(pacmanCurrentIndex - 1 === 351){ //Si esta en la entrada izquierda se mueve a la de la derecha
                        pacmanCurrentIndex = 375;
                    }
                } 
            }
            
            if(keyState[38]){ 
                if(pacmanCurrentIndex - width >= 0 
                    && !celdas[pacmanCurrentIndex-width].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex-width].classList.contains('casa-fantasma')){ 
                    //Desplazamiento hacia arriba
                    pacmanCurrentIndex -= width;
                    pacmanNoise.play();
                }
            }
            
            if(keyState[39]){
                if(pacmanCurrentIndex % width < width - 1 
                    && !celdas[pacmanCurrentIndex+1].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex+1].classList.contains('casa-fantasma')){ 
                    //Desplazamiento hacia la derecha
                    pacmanCurrentIndex +=1;
                    pacmanNoise.play();
                    if(pacmanCurrentIndex + 1 === 377){ //Si esta en la entrada derecha se mueve a la de la izquierda
                        pacmanCurrentIndex = 353;
                    }
                }
            }
            
            if(keyState[40]){
                if(pacmanCurrentIndex + width < width * width 
                    && !celdas[pacmanCurrentIndex+width].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex+width].classList.contains('casa-fantasma')){ 
                    //Desplazamiento hacia abajo
                    pacmanCurrentIndex += width;
                    pacmanNoise.play();
                }
            }
            comerMigaja();
            comerQueso();
        }
        checkGameOver();
        checkWin();
        celdas[pacmanCurrentIndex].classList.remove(...celdas[pacmanCurrentIndex].classList);
        celdas[pacmanCurrentIndex].classList.add('pacman');
        setTimeout(moverPacman,250);
    }
    moverPacman();

    function comerQueso(){ //Funcion que se ejecuta cuando el pacman come un queso (poder)
        if(celdas[pacmanCurrentIndex].classList.contains('power')){
            //console.log('Comio el queso');
            score += 10;
            scoreDisplay.innerHTML = score;
            ghosts.forEach(ghost => ghost.isScared = true);
            powerEatenSound.play();
            setTimeout(curarDeEspanto,10000); //10 segundos
        }
    }

    function curarDeEspanto(){ //Funcion para quitarle lo espantado a los fantasmas
        ghosts.forEach(ghost => ghost.isScared = false);
    }

    function comerMigaja(){
        if(celdas[pacmanCurrentIndex].classList.contains('migaja')){
            score++;
            scoreDisplay.innerHTML = score;
        }
    }

    function moverFantasma(ghost){ //Funcion para mover fantasmas segun su velocidad 
        const directions = [-1,1,-width,width]; //Se pueden mover un cuadro hacia arriba,derecha,abajo,izquierda
        let direction = directions[Math.floor(Math.random() * directions.length)];//direccion aleatoria
        ghost.timerId = setInterval( ()=> { //funcion anonima que se ejecuta cada X milisegundos definidos por ghost.speed

            if(!celdas[ghost.currentIndex + direction].classList.contains('pared') //Si no encuentra pared
            && !celdas[ghost.currentIndex + direction].classList.contains('fantasma')
            && startButton === true){ //Y no encuentra a otro fantasma
                celdas[ghost.currentIndex].classList.remove(ghost.className,'fantasma');//quitamos fantasma de su currentIndex
                ghost.currentIndex += direction; //Sumamos direccion validada al ghost.currentIndex
                celdas[ghost.currentIndex].classList.add('fantasma', ghost.className);//Agregamos fantasma a nueva direccion
            } else { //Si encontro muro o fantasma entonces...
                if(startButton){
                direction =  directions[Math.floor(Math.random() * directions.length)];//Buscamos otra direccion 
                }
            }

            if(ghost.isScared){ //Si el fantasma esta asustado le asigna esa clase
                celdas[ghost.currentIndex].classList.add('scared-ghost');
            }

            if(celdas[ghost.currentIndex].classList.contains('scared-ghost')&& ghost.isScared===false){ //Remueve la clase scared-ghost despues de curar de espanto
                celdas[ghost.currentIndex].classList.remove('scared-ghost');
            }
            
            checkGameOver();
        }, ghost.speed);
        ghost.EatenTimer = setInterval( ()=> {
            if(ghost.isScared && celdas[ghost.currentIndex].classList.contains('pacman')){ //Que hacer si se lo come el pacman
                celdas[ghost.currentIndex].classList.remove(ghost.className,'fantasma','scared-ghost');//lo desaparecemos del lugar
                ghost.currentIndex = ghost.startIndex; //Lo regresamos a su casa
                score += 100; //sumamos 100 puntos al score
                scoreDisplay.innerHTML = score;
                celdas[ghost.currentIndex].classList.add('fantasma',ghost.className);//Pintamos el fantasma
                ghostEatenSound.play();
            }
        },10);
    }


    let startButtonText = document.getElementById('btn-red-text');
    let buttonCount = 0;
    let neonPopUp = document.getElementById('neon-popup');

    function buttonClicked() {
        startButton = !startButton;
        buttonCount++;
        if(startButton){
            startButtonText.innerHTML= 'Stop';
            if(buttonCount==1){
                beginSound.play();
                backgroundSound(true);
            } else {
                playSound.play();
                backgroundSound(true);
            }
        } else {
            startButtonText.innerHTML= 'Start';
            stopSound.play();
            backgroundSound(false);
        }  
    displayPopUp({visible:false});
    }
    
    beginSound.addEventListener('ended',()=>ghostNoises.muted=false); //Se espera a que termine la musica para agregar la de fondo.
    playSound.addEventListener('ended',()=>ghostNoises.muted=false);

//Traemos los iconos de vida
let vida_1 = document.getElementById('live-1');
let vida_2 = document.getElementById('live-2');
let vida_3 = document.getElementById('live-3');

//Traemos el high score scoreboard
let main_scoreboard = document.getElementById('high-score-scoreboard');

function checkGameOver(){
    
    if(celdas[pacmanCurrentIndex].classList.contains('fantasma') &&
    celdas[pacmanCurrentIndex].classList.contains('scared-ghost')===false){
        lives -= 1;
        celdas[pacmanCurrentIndex].classList.remove('pacman');
        celdas[pacmanCurrentIndex].classList.add('vacio');
        pacmanCurrentIndex = 580;
        deathNoise.play();
        celdas[pacmanCurrentIndex].classList.remove(...celdas[pacmanCurrentIndex].classList);
        celdas[pacmanCurrentIndex].classList.add('pacman');
    }
    switch (lives){
        case 2:
            vida_3.classList.add('hidden');
        break;
        case 1:
            vida_2.classList.add('hidden');
        break;
        case 0:
            vida_1.classList.add('hidden');
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener('keyup',moverPacman);
            main_scoreboard.innerHTML = 'GAME OVER';
            gameOver = true;
            buttonClicked(); //Pausamos el juego
            displayPopUp({visible:true,mensaje:'You Lost!'});
            newGame();
        break;
        default:
            if(lives!=3){
                ghosts.forEach(ghost => clearInterval(ghost.timerId));
                document.removeEventListener('keyup',moverPacman);
                main_scoreboard.innerHTML = 'GAME OVER';
                gameOver = true;
                buttonClicked(); //Pausamos el juego
                displayPopUp({visible:true,mensaje:'You Lost!'});
                newGame();
            }
        break;
    }
}

function checkWin(){
    let win = !celdas.some(div => div.classList.contains('migaja')||div.classList.contains('power'));
    if(win){
        ghosts.forEach(ghost => clearInterval(ghost.timerId));
        document.removeEventListener('keyup',moverPacman);
        main_scoreboard.innerHTML = 'YOU WON !!';
        gameOver = true;
        buttonClicked(); //cambiamos estado de boton a falso
        displayPopUp({visible:true,mensaje:'You Won!'});
        newGame();
    }
}
//Funcion para reiniciar el juego tras ganar o perder
    //Reiniciamos: 
    //Tablero, vidas, estado gameOver, fantasmas, pacman, score
    //Se registra la score en una lista y si fue la mejor score se coloca en tablero
function newGame(){
    setInterval( () => {
        if(gameOver && startButton){
        lives = 3;
        vida_1.classList.remove('hidden');
        vida_2.classList.remove('hidden');
        vida_3.classList.remove('hidden');
        container.innerHTML = '';
        celdas = [];
        createBoard(level);
        ghosts = [];
        crearFantasmas(Ghost);
        pacmanCurrentIndex = 580;
        celdas[pacmanCurrentIndex].classList.add('pacman');
        document.addEventListener('keyup',moverPacman);
        scoresList.push(score); //Guardamos score en lista temporal (se borra al refrescar la pagina)
        main_scoreboard.innerHTML = Math.max(...scoresList); //Ponemos max score en en panel high score
        score = 0;
        scoreDisplay.innerHTML = score;
        gameOver = false;
        buttonCount = 0;
        beginSound.play();
    } 
    },500);
}

function backgroundSound(state){
    ghostNoises.currentTime = 0;
    if(state){
        ghostNoises.play();
    } else {
        ghostNoises.pause();
        ghostNoises.muted = true;
    }
}

const neonHeader = document.getElementById('neon-header');
let neonText = document.getElementById('neon-body');
let nextButtonCounter = 0;

function displayPopUp({visible=false,mensaje=''}){
    visible? neonPopUp.style.visibility = 'visible' : neonPopUp.style.visibility = 'hidden';
    // if(visible){
    //     neonPopUp.style.visibility = 'visible'
    //     nextButton.style.visibility = 'visible'
    //     neonHeader.style.display = 'block';
    // } else {
    //     neonPopUp.style.visibility = 'hidden';
    //     nextButton.style.visibility = 'hidden';
    // }
    neonHeader.innerHTML = mensaje;
}

// let nextButton = document.getElementById('next');
//nextButton.style.visibility = 'visible';

// function nextScreen() {
//     neonHeader.style.display = 'none';
//     if(nextButtonCounter<popupContent.length){
//         neonText.innerHTML = popupContent[nextButtonCounter];
//         neonText.style.display = 'block';
//         nextButtonCounter++;
//     } 
//     if(nextButtonCounter==popupContent.length){
//         nextButton.style.visibility = 'hidden';
//     }
// }

