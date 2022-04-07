    const container = document.querySelector('.container');
    const scoreDisplay = document.getElementById('score');
    const width = 27; // Ancho del board 27 x 27 cuadros de 20px cada uno = 729 cuadros
    let score = 0;
    let pacmanCurrentIndex = 580; //Donde empieza el pacman
    let level = layout[1];
    let celdas = [];
    let gameOver = false;
    let startButton = false;

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
            this.isScared = false;
        };
    };

    let ghosts = [ //Generamos 6 fantasmas (pueden ser mas)
        new Ghost('blue',362,600),
        new Ghost('pinky',364,700),
        new Ghost('red',366,600),
        new Ghost('orange',283,650),
        new Ghost('pinky',336,600),
        new Ghost('blue',338,700)
    ];

    ghosts.forEach(ghost => { //funcion para agregar className de cada tipo de fantasma a cuadricula
        celdas[ghost.currentIndex].classList.add('fantasma');
        celdas[ghost.currentIndex].classList.add(ghost.className); //al div que se encuentre en el currentIndex del fantasma se le asigna una clase adicional segun el className de cada tipo de fantasma.
    });

    
    ghosts.forEach(ghost => {
        moverFantasma(ghost); //Movimiento del fantasma cada ghost.speed segundos
        //ghostEaten(ghost); //revisa cada X tiempo si el fantasma fue comido 
    }); //Movemos los fantasmas
    
    
    document.addEventListener('keyup',moverPacman);
    function moverPacman(e){
        if(startButton){
        celdas[pacmanCurrentIndex].classList.remove('pacman');
        celdas[pacmanCurrentIndex].classList.add('vacio'); //agregamos espacio vacio por donde pase el pacman
        switch(e.keyCode){
            case 37:
                if(pacmanCurrentIndex % width !==0 
                    && !celdas[pacmanCurrentIndex-1].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex-1].classList.contains('casa-fantasma')){ 
                    //Desplazamiento a la izquierda
                    pacmanCurrentIndex -=1;
                    if(pacmanCurrentIndex - 1 === 351){ //Si esta en la entrada izquierda se mueve a la de la derecha
                        pacmanCurrentIndex = 375;
                    }
                } 
            break;
            case 38:
                if(pacmanCurrentIndex - width >= 0 
                    && !celdas[pacmanCurrentIndex-width].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex-width].classList.contains('casa-fantasma')){ 
                    //Desplazamiento hacia arriba
                    pacmanCurrentIndex -= width;
                }
            break;
            case 39:
                if(pacmanCurrentIndex % width < width - 1 
                    && !celdas[pacmanCurrentIndex+1].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex+1].classList.contains('casa-fantasma')){ 
                    //Desplazamiento hacia la derecha
                    pacmanCurrentIndex +=1;
                    if(pacmanCurrentIndex + 1 === 377){ //Si esta en la entrada derecha se mueve a la de la izquierda
                        pacmanCurrentIndex = 353;
                    }
                }
            break;
            case 40:
                if(pacmanCurrentIndex + width < width * width 
                    && !celdas[pacmanCurrentIndex+width].classList.contains('pared')
                    && !celdas[pacmanCurrentIndex+width].classList.contains('casa-fantasma')){ 
                    //Desplazamiento hacia abajo
                    pacmanCurrentIndex += width;
                }
            break;
        }
        comerMigaja();
        comerQueso();
        celdas[pacmanCurrentIndex].classList.remove(...celdas[pacmanCurrentIndex].classList);
        celdas[pacmanCurrentIndex].classList.add('pacman');
        //checkGameOver()
        //checkWin()
        }
    }

    function comerQueso(){ //Funcion que se ejecuta cuando el pacman come un queso (poder)
        if(celdas[pacmanCurrentIndex].classList.contains('power')){
            console.log('Comio el queso');
            score += 10;
            scoreDisplay.innerHTML = score;
            ghosts.forEach(ghost => ghost.isScared = true);
            console.log('Los fantasmas estan asustados?',ghosts[1].isScared);
            setTimeout(curarDeEspanto,10000); //10 segundos
        }
    }

    function curarDeEspanto(){ //Funcion para quitarle lo espantado a los fantasmas
        ghosts.forEach(ghost => ghost.isScared = false);
        console.log('Los fantasmas estan asustados?',ghosts[1].isScared);
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

            if(ghost.isScared && celdas[ghost.currentIndex].classList.contains('pacman')){ //Que hacer si se lo come el pacman
                celdas[ghost.currentIndex].classList.remove(ghost.className,'fantasma','scared-ghost');//lo desaparecemos del lugar
                ghost.currentIndex = ghost.startIndex; //Lo regresamos a su casa
                score += 100; //sumamos 100 puntos al score
                scoreDisplay.innerHTML = score;
                celdas[ghost.currentIndex].classList.add('fantasma',ghost.className);//Pintamos el fantasma
            }

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

        }, ghost.speed);
    }

    let startButtonText = document.getElementById('btn-red-text');
    function buttonClicked() {
        startButton = !startButton;
        startButton===true?startButtonText.innerHTML= 'Stop':startButtonText.innerHTML= 'Start';
    }



