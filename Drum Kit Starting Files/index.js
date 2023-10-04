document.querySelectorAll(".drum").forEach((drum)=>{
    drum.addEventListener("click", function(){
        var letterPress = drum.textContent;

        switch (letterPress) {
            case 'w':
                playSound("./sounds/crash.mp3");
                break;
            case 'a':
                playSound("./sounds/kick-bass.mp3");
                break;
            case 's':
                playSound("./sounds/snare.mp3");
                break;
            case 'd':
                playSound("./sounds/tom-1.mp3");
                break;
            case 'j':
                playSound("./sounds/tom-2.mp3");
                break;
            case 'k':
                playSound("./sounds/tom-3.mp3");
                break;
            case 'l':
                playSound("./sounds/tom-4.mp3");
                break;
            
            default:
                console.log(letterPress);
                break;
        }
    })
})

function playSound(filePath){
    var sound = new Audio(filePath);
    sound.play();
}