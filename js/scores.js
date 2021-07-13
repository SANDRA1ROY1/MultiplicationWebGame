let playerNumberOld=0;
let playerList=[];

const printHighScores = () =>{
    //print
    for(let i=0;i<playerList.length;i++){
       document.querySelector("#score_"+`${i+1}`).innerText=playerList[i].playerName+", level:"+playerList[i].level;
   }
}

const sort = (playerList) => {
    for(let i=0;i<playerList.length-1;i++){
        for(let j=0;j<playerList.length-i-2;j++){
            if(playerList[j].level<playerList[j+1].level){
               // swap
               let temp=playerList[j];
               playerList[j]=playerList[j+1];
               playerList[j+1]=temp;
            }
        }

    }
    return playerList;
}

const saveToStorage = () =>{
    playerList.pop();
  //remove least level players
  while(playerList.length > 5){
    playerList.pop();
    }

    localStorage.setItem("Multiplication_Scoot",JSON.stringify(playerList));
    localStorage.setItem("playersPrev",`${playerList.length}`);
}

const findIfPlayerPresent = () =>{
    let newName=playerList[playerList.length-1].playerName;
    let ifPlayerAvail=false;
    for(let i=0;i<playerList.length-1;i++){
            if(newName === playerList[i].playerName){
                playerList[i]=playerList[playerList.length-1];
                ifPlayerAvail=true;
                break;
            }
    }
    return ifPlayerAvail;
}

const addNewPlayerInOrder = () =>{
 //add the last item added in btw
 let newPlayer=playerList[playerList.length-1];
 for(let i=0;i<playerList.length-1;i++){
       if(newPlayer.level >= playerList[i].level){
           playerList.splice(i,0,newPlayer);
           //stop
           break;
       }
 } 
}

 export const saveHighScores = () => {
    if("Multiplication_Scoot" in localStorage){
        playerList = JSON.parse(localStorage.getItem("Multiplication_Scoot"));
        if("playersPrev" in localStorage){
            playerNumberOld=parseInt(localStorage.getItem("playersPrev"));
        }
    if(playerList.length !== playerNumberOld){
        let ifPlayerAvail=findIfPlayerPresent();
        playerList=sort(playerList);
        if(!ifPlayerAvail){
          addNewPlayerInOrder(); 
        }
       
        saveToStorage();
}
       


}else{
    console.log("no player played the game");
}
}

window.onload=printHighScores();