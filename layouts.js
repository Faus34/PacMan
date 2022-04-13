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
                      ,0,0,2,2,2,2,2,2,0,1,1,4,1,1,1,4,1,1,0,2,2,2,2,2,2,0,0
                      ,1,1,1,1,1,1,2,1,0,1,1,4,4,4,4,4,1,1,0,1,2,1,1,1,1,1,1
                      ,0,0,0,0,0,1,2,1,0,1,1,1,1,4,1,1,1,1,0,1,2,1,0,0,0,0,0
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
//console.log(layout[1].indexOf(7)) 390 392

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
let yeyy = new Audio();
yeyy.src = 'https://firebasestorage.googleapis.com/v0/b/pacman-19a45.appspot.com/o/SoundEffects%2FYayyy.mp3?alt=media&token=e2196577-b884-474a-bf71-05dcf076a1b9';
yeyy.volume = 0.3;
let cricket = new Audio();
cricket.src = 'https://www.myinstants.com/media/sounds/awkward-cricket-sound-effect.mp3';
cricket.volume = 0.3;

let popupContent = [
    'Luz, cuando estaba haciendo este juego no paraba de pensar que soy muy afortunado, porque últimamente descubrí que estoy seguro de tres cosas. La primera es que me apasiona lo que hago (aunque aun tenga mucho por aprender).',
    'La segunda es que definitivamente estoy enamorado de ti. Y la tercera es que eres la compañera perfecta para múltiples aventuras que me gustaría vivir a tu lado.',
    'No se si fue solo tu hermosa y calida sonrisa o tu tierna mirada también, pero cautivaste mi atención desde el primer día que te vi.',
    'Afortunadamente he podido conocerte mejor, y me dí cuenta que eres una mujer increíble, cada día que paso a tu lado aprendo un poco más y termino queriendo saber mas de ti.',
    'Cuando sujeto tu mano y me abrazas siento que arde mi corazón y lo único que puedo pensar es en llenarte de besos.',
    '¿Quieres ser mi novia?'
]
