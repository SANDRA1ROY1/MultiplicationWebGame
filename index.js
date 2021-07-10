document.querySelector("#audio").play();
const audioImageTapped = () =>{
    if(document.querySelector("#audioImage").classList.contains("paused")){
        document.querySelector("#audioImage").classList.remove("paused");
        document.querySelector("#audio").play();
        document.querySelector("#audioImage").src="assets/audioImage.png";

    }else{
        
        document.querySelector("#audioImage").classList.add("paused");
        document.querySelector("#audio").pause();
        document.querySelector("#audioImage").src="assets/audioOff.png";

    }

}
document.querySelector("#audioImage").addEventListener("click",audioImageTapped);