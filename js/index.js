
document.onreadystatechange = () => {
   
    if (document.readyState == 'complete') {
        localStorage.setItem("audioPlaying","true");

        
       
        const audioImageTapped = () =>{
            if(document.querySelector("#audioImage").classList.contains("paused")){
                document.querySelector("#audioImage").classList.remove("paused");
                localStorage.setItem("audioPlaying","true");
                document.querySelector("#audio").play();
                document.querySelector("#audioImage").src="assets/audioImage.png";
        
            }else{
                
                document.querySelector("#audioImage").classList.add("paused");
                localStorage.setItem("audioPlaying","false");
                document.querySelector("#audio").pause();
                document.querySelector("#audioImage").src="assets/audioOff.png";
        
            }
        
        }
        document.querySelector("#audioImage").addEventListener("click",audioImageTapped);

      const startGame = () => {
            if(document.querySelector("#player").value === ""){
                alert("Please enter your name");
            }else{
                let quertString = '?Name=' + document.getElementById('player').value;
            window.location.href = "GameScreen.html" + quertString;
            }
            
        }
        
        document.querySelector("#start").addEventListener("click",startGame);
    }
}
