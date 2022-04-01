    const container = document.querySelector('.container');
    const scoreDisplay = document.getElementById('score');

    const width = 27; // Ancho del board 27 x 27 cuadros de 20px cada uno = 729 cuadros
    let pacmanCurrentIndex = 580; //Donde empieza el pacman
    let level = layout[1];
    let celdas = [];
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
                    celdas[i].classList.add('subElement-back');
                    celdas[i].appendChild(subElemento).classList.add('miga');
                break;
                case 3:
                    celdas[i].classList.add('subElement-back');
                    celdas[i].appendChild(subElemento).classList.add('queso');
                break;
                case 4:
                    celdas[i].classList.add('casa-fantasma');
                break;
                default:
                    console.log('createBoard() error, unknown class');
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
        };
    };

    let ghosts = [
        new Ghost('blue',362,250),
        new Ghost('pinky',364,400),
        new Ghost('red',366,300),
        new Ghost('orange',283,500)
    ];

    ghosts.forEach(ghost => { //funcion para agregar className de cada tipo de fantasma a cuadricula
        celdas[ghost.currentIndex].classList.add('fantasma');
        celdas[ghost.currentIndex].classList.add(ghost.className); //al div que se encuentre en el currentIndex del fantasma se le asigna una clase adicional segun el className de cada tipo de fantasma.
    });

    document.addEventListener('keyup',moverPacman);
    function moverPacman(e){
        //celdas[pacmanCurrentIndex].classList.remove(...celdas[pacmanCurrentIndex].classList); //quitamos todas las clases
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
        celdas[pacmanCurrentIndex].classList.remove(...celdas[pacmanCurrentIndex].classList);
        celdas[pacmanCurrentIndex].classList.add('pacman');
        //comerMigaja()
        //comerQueso() *Podrían ser una sola
        //checkGameOver()
        //checkWin()
    }







