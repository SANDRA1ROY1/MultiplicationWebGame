

let playerList=[];
let playerNumberOld=0;
let newPlayerNums=0;
let newPlayers=[];
let audioOn=true;

const printHighScores = () =>{
    //print
    for(let i=0;i<playerList.length;i++){
       document.querySelector("#score_"+`${i+1}`).innerText=playerList[i].playerName;
       document.querySelector("#level_"+`${i+1}`).innerText=playerList[i].level;
   }
}



const saveToStorage = () =>{
   // playerList.pop();
  //remove least level players
  console.log("savetostorage playerlist start");
  console.log(playerList);
  while(playerList.length > 5){
    playerList.pop();
    }

    localStorage.setItem("Multiplication_Scoot",JSON.stringify(playerList));
    localStorage.setItem("playersPrev",`${playerList.length}`);
}


const saveHighScores = () =>{
    if("Multiplication_Scoot" in localStorage){
        playerList=JSON.parse(localStorage.getItem("Multiplication_Scoot"));
        // console.log(playerList);

        if("playersPrev" in localStorage){
            playerNumberOld=parseInt(localStorage.getItem("playersPrev"));
        }

        if(playerList.length !== playerNumberOld){
            newPlayerNums = playerList.length-playerNumberOld;
            
            
            
            let currentNewAdded=false;//currentnew
            for(let i=0;i<newPlayerNums;i++){
                
            
                newPlayers.push(playerList.pop());

             

            }
         
           if(playerList.length === 0){
            playerList.splice(0,0,newPlayers[j]);
            console.log("playerlist === 0 executed");
           }else{
            for(let j=0;j<newPlayers.length;j++){
           
                for(let i=0;i<playerList.length;i++){
                    console.log("loop === 0 executed");
                     if(currentNewAdded){
                     continue;
                    }
                    if(newPlayers[j].level >= playerList[i].level){
                        playerList.splice(i,0,newPlayers[j]);
                         //stop
                        currentNewAdded=true;
                
                     }
                } 
                if(!currentNewAdded){
                    playerList.push(newPlayers[j]);
                }
                currentNewAdded=false;
            }
           }
       

        console.log("playerlist after splice");
        console.log(playerList);

        //sort


        saveToStorage();

        }//
      


    }else{
        console.log("no one played");
    }
}
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
const goToMainScreen = () => {
    window.location.href = "index.html" 
}
const audioPlay = () => {
    if("audioPlaying" in localStorage){
        audioOn=localStorage.getItem("audioPlaying");
        if(audioOn === "true"){
            document.querySelector("#audio").play();
        }else{
            document.querySelector("#audio").pause();
        }
    }else{
        document.querySelector("#audio").play();
    }
}
window.onload=audioPlay();
saveHighScores();
document.querySelector("#audioImage").addEventListener("click",audioImageTapped);
printHighScores();

document.querySelector("#backToMainScreen").addEventListener("click",goToMainScreen);
