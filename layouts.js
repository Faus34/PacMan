    //Objeto para los niveles del layout
    
    //0 ---> Espacio vacio (clase= vacio)
    //1 ---> Pared (clase=pared)
    //2 ---> Migaja (clase= miga)
    //3 ---> Queso (Clase= queso)
    //4 ---> Casa de fantasmas (clase = casa-fantasma)

// 351 y 377 entradas laterales 

const layout = {
    1 :               [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
                      ,1,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,1
                      ,1,2,1,1,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1,1,2,1
                      ,1,3,1,1,1,1,2,1,1,1,1,1,2,1,2,1,1,1,1,1,2,1,1,1,1,3,1
                      ,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1
                      ,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1
                      ,1,2,2,2,2,2,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,2,2,2,2,2,1
                      ,1,1,1,1,1,1,2,1,2,2,2,1,1,2,1,1,2,2,2,1,2,1,1,1,1,1,1
                      ,0,0,0,0,0,1,2,1,1,1,2,1,1,2,1,1,2,1,1,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,1,1,2,1,1,2,1,1,2,1,1,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,0,1,1,1,1,4,1,1,1,1,0,1,2,1,0,0,0,0,0
                      ,1,1,1,1,1,1,2,1,0,1,1,4,4,4,4,4,1,1,0,1,2,1,1,1,1,1,1
                      ,0,0,2,2,2,2,2,2,0,1,1,4,4,4,4,4,1,1,0,2,2,2,2,2,2,0,0
                      ,1,1,1,1,1,1,2,1,0,1,1,1,1,1,1,1,1,1,0,1,2,1,1,1,1,1,1
                      ,0,0,0,0,0,1,2,1,0,1,1,1,1,1,1,1,1,1,0,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,1,2,1,1,1,1,2,1,1,1,1,2,1,2,1,0,0,0,0,0
                      ,0,0,0,0,0,1,2,2,2,2,2,2,1,2,1,2,2,2,2,2,2,1,0,0,0,0,0
                      ,1,1,1,1,1,1,2,1,1,1,1,2,1,2,1,2,1,1,1,1,2,1,1,1,1,1,1
                      ,1,2,2,2,2,2,2,1,1,1,1,2,1,2,1,2,1,1,1,1,2,2,2,2,2,2,1
                      ,1,2,1,1,1,1,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,1,1,1,1,2,1
                      ,1,3,2,2,2,1,2,1,1,1,1,1,1,2,1,1,1,1,1,1,2,1,2,2,2,3,1
                      ,1,2,1,1,2,1,2,1,2,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1,1,2,1
                      ,1,2,1,1,2,1,2,1,2,1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,1,2,1
                      ,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1
                      ,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
};
//console.log(layout[1].indexOf(9))

//Efectos de sonido.

let beginSound  = new Audio();
beginSound.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2Fpacman_beginning.mp3?alt=media&token=dc00f844-1ae5-4e79-a006-21b49d18d538';
let stopSound = new Audio();
stopSound.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2FstopGame.mp3?alt=media&token=490c4fdf-8530-430c-a5ff-baa3ec0f6af7';
let pacmanNoise = new Audio();
pacmanNoise.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2Fpacman_chomp_(reduced).mp3?alt=media&token=77746610-6adc-4d31-9693-70c8e26e53a3';
let ghostNoises = new Audio();
ghostNoises.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2FGhostNoises.mp3?alt=media&token=9fc6a672-80dc-4985-bf3b-d2283921d350';
ghostNoises.loop  = true;
ghostNoises.volume = 0.3;
ghostNoises.muted = true;
let playSound = new Audio();
playSound.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2FstopGame.mp3?alt=media&token=490c4fdf-8530-430c-a5ff-baa3ec0f6af7';
let deathNoise = new Audio();
deathNoise.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2Fpacman_death.mp3?alt=media&token=086b6b97-8310-4794-9811-0f044eaf227c';
let ghostEatenSound = new Audio();
ghostEatenSound.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2Fpacman_eatghost.mp3?alt=media&token=f9b8141f-0aed-4d6e-ac48-9aa2b816b71c';
let powerEatenSound = new Audio();
powerEatenSound.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2Fpacman_eatfruit.mp3?alt=media&token=d80b090b-d79e-405f-813b-db535f8bb507';
