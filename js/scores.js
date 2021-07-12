let playerNumberOld=0;
const sort = (playerList) => {
    let swap=0;
    for(let i=0;i<playerList.length-1;i++){
        
        for(let j=0;j<playerList.length-i-2;j++){
            if(playerList[j].level<playerList[j+1].level){
               // swap
               swap=1;
               let temp=playerList[j];
               playerList[j]=playerList[j+1];
               playerList[j+1]=temp;
            }
        }

        if(swap==0){
            //stop sorting
            break;
        }
    }

    return playerList;
}
const loadData = () => {
    // let obj={playerName:"Sandra",level:5};
    // let obj2={playerName:"Sandra_2",level:4};
    // let array=[];
    // array.push(obj);
    // array.push(obj2);
    // localStorage.setItem("Multiplication_Scoot",JSON.stringify(array));
    if("Multiplication_Scoot" in localStorage){
        let playerList = JSON.parse(localStorage.getItem("Multiplication_Scoot"));
       if("playersPrev" in localStorage){
         playerNumberOld=parseInt(localStorage.getItem("playersPrev"));
       }

        if(playerList.length !== playerNumberOld){
            //sort
            playerList = sort(playerList);
            //add the last item added in btw
          let newPlayer=playerList[playerList.length-1];
          for(let i=0;i<playerList.length-1;i++){
                if(newPlayer.level >= playerList[i].level){
                    playerList.splice(i,0,newPlayer);
                    //stop
                    break;
                }
          }


            while(playerList.length > 5){
                playerList.pop();
            }

        localStorage.setItem("Multiplication_Scoot",JSON.stringify(playerList));
        localStorage.setItem("playersPrev",`${playerList.length}`);
        }
        //print
        playerList = JSON.parse(localStorage.getItem("Multiplication_Scoot"));
        
      for(let i=0;i<playerList.length;i++){
            document.querySelector("#score_"+`${i+1}`).innerText+=playerList[i].playerName;
      }
        
    }else{
        console.log("mult scoot not in local storage");
    }
}

window.onload = loadData;
