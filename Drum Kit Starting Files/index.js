document.addEventListener("keydown", function(event){
    checkKey(event.key);
});

document.querySelectorAll(".drum").forEach((drum)=>{
    drum.addEventListener("click", function(){
        var letterPress = drum.textContent;
        checkKey(letterPress);
    })
})

function checkKey(key){
    switch (key) {
        case 'w':
            playSound("./sounds/crash.mp3", key);
            break;
        case 'a':
            playSound("./sounds/kick-bass.mp3", key);
            break;
        case 's':
            playSound("./sounds/snare.mp3", key);
            break;
        case 'd':
            playSound("./sounds/tom-1.mp3", key);
            break;
        case 'j':
            playSound("./sounds/tom-2.mp3", key);
            break;
        case 'k':
            playSound("./sounds/tom-3.mp3", key);
            break;
        case 'l':
            playSound("./sounds/tom-4.mp3", key);
            break;
        
        default:
            console.log(letterPress);
            break;
    }
}

function playSound(filePath,key){
    var sound = new Audio(filePath);
    sound.play();
    buttonAnimation(key);
}

function buttonAnimation(keyPressed){
    var activeBtn = document.querySelector("."+keyPressed);
    activeBtn.classList.toggle("pressed");
    setTimeout(function(){
        activeBtn.classList.toggle("pressed");
    },100);
}