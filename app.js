    const container = document.querySelector('.container');
    const scoreDisplay = document.getElementById('score');
    const width = 27; // Ancho del board 27 x 27 cuadros de 20px cada uno = 729 cuadros
    
    const layout =    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                      ,1,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1
                      ,1,2,1,1,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1,1,2,1
                      ,1,2,1,1,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1,1,2,1
                      ,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1
                      ,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1
                      ,1,2,2,2,2,2,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,2,2,2,2,2,1
                      ,1,1,1,1,1,1,2,1,2,2,2,1,1,2,1,1,2,2,2,1,2,1,1,1,1,1,1
                      ,0,0,0,0,0,1,2,1,1,1,2,1,1,2,1,1,2,1,1,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,1,1,2,1,1,2,1,1,2,1,1,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,0,1,1,1,1,0,1,1,1,1,0,1,2,1,0,0,0,0,0
                      ,1,1,1,1,1,1,2,1,0,1,0,0,0,0,0,0,0,1,0,1,2,1,1,1,1,1,1
                      ,0,0,2,2,2,2,2,2,0,1,0,0,0,0,0,0,0,1,0,0,2,2,2,2,2,0,0
                      ,1,1,1,1,1,1,2,1,0,1,0,0,0,0,0,0,0,1,0,1,2,1,1,1,1,1,1
                      ,0,0,0,0,0,1,2,1,0,1,1,1,1,1,1,1,1,1,0,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,1,0,0,0,0,0
                      ,1,1,1,1,1,1,2,1,1,1,1,2,1,2,1,2,1,1,1,1,2,1,1,1,1,1,1
                      ,1,2,2,2,2,2,2,1,1,1,1,2,1,2,1,2,1,1,1,1,2,2,2,2,2,2,1
                      ,1,2,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,2,1
                      ,1,2,2,2,2,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,2,2,2,2,1
                      ,1,2,1,1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1,1,2,1
                      ,1,2,1,1,2,1,2,1,2,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,1,2,1
                      ,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1
                      ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    //0 ---> Espacio vacio (clase= vacio)
    //1 ---> Pared (clase=pared)
    //2 ---> Migaja (clase= miga)
    //3 ---> Queso (Clase= queso)
    //4 ---> Casa de fantasmas (clase = casa-fantasma)

    let celdas = [];
    //Función para crear divs dentro del contendor del HTML y asignarles clases según su número en el layout
    function createBoard() {
        for(let i = 0; i<layout.length; i++){ 
            const celda = document.createElement('div'); //Creamos un div que llamaremos celda dentro del html
            const subElemento = document.createElement('div'); //Sub elemento para cuando queremos div embebidos en las celdas
            container.appendChild(celda); //Añadimos la celda al div con la clase contenedor del HTML
            celdas.push(celda); //Agregamos la celda a un array de elementos llamado celdas (por si necesitamos algún elemento después, se pueda acceder a el)
            //Asignamos una clase a la celda dependiendo del número que tenga el elemento actual del layout.
            switch(layout[i]){
                case 0:
                    celdas[i].classList.add('vacio');
                break;
                case 1:
                    celdas[i].classList.add('pared');
                break;
                case 2: 
                    celdas[i].classList.add('miga-back');
                    celdas[i].appendChild(subElemento).classList.add('miga');
                break;
                case 3:
                    celdas[i].classList.add('queso');
                break;
                default:
                    console.log('createBoard() error, unknown class');
                break;
            }
        }
    }

    createBoard();
    console.log(celdas);









