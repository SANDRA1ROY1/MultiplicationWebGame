document.onreadystatechange = () => {
    if (document.readyState == "complete") {

        let nTotalEnemies = 5;
        let imgHgt = '120px';
        let imgWdt = '120px';
        let nCurrentLevel = 1;
        let nTotalLevels = 5;
        let timeleft = 60;
        let arrCorrectAns = [];
        let arrEnemiesID = [];
        let arrChargeSpeed = [6, 7, 8, 9, 10];
        let enemyID = '';
        let ansID = '';
        let EnemyTimer = null;
        let RemainingTime = null;
        let nLimit = window.innerWidth - 256;
        let nScore = 0;
        let PlayerName = '';

        showPrompt = (txt) => {
            document.getElementById("overlay").style.display = "block";
            document.getElementById("text").innerText = txt;
        }

        hidePrompt = () => {
            document.getElementById("overlay").style.display = "none";
            document.getElementById("text").innerText = '';
        }

        getPlayerName = () => {
            let url = new URL(window.location.href);
            PlayerName = url.searchParams.get("Name");
            
            // Clearing Query String after fetching Name from URL...
            let uri = window.location.toString();
            if (uri.indexOf("?") > 0) {
                let clean_uri = uri.substring(0, uri.indexOf("?"));
                window.history.replaceState({}, document.title, clean_uri);
            }
        }

        generateEnemies = () => {
            let enemy = '';
            for (let i = 0; i < nTotalEnemies; i++) {
                enemy += '<div id=enemy_' + i + ' class="row content">' +
                            '<div class="floatLeft">' +
                                '<img class="padBottom" src="assets/enemy.png" height="' + imgHgt + '" width="' + imgWdt + '" />' +
                                '<div id=equation_' + i + ' class="text">' + equation() + '</div>' +
                            '</div>' +
                        '</div>';
                arrEnemiesID.push('enemy_' + i);
            }
            enemy += '<div class="padBottom">' +
                        '<div class="level">Level ' + nCurrentLevel + ' of ' + nTotalLevels + '</div>' +
                        '<div class="time" id="time">Time remaining: ' + timeleft + '</div>' +
                    '</div>';
            
            document.getElementById('Ememies').innerHTML = enemy;
        }

        equation = () => {
            let eq = generateNum(15) + ' * ' + generateNum(10) + ' = ?';
            let ans = eq.split('*')[0] * eq.split('*')[1].split(' = ?')[0];
            arrCorrectAns.push(ans);
            return eq;
        }

        generateNum = (val) => {
            let num = Math.floor((Math.random() * val) + 1);
            return num;
        }
       
        addPlayer = (enemyID, ansID) => {
            let Player = '<div class=floatRight id=Player>' +
                            '<img class="padBottom" src="assets/player.png" height="166px" width="120px" />' +
                            '<div id="CorrectAns" class="text">' + arrCorrectAns[ansID] + '</div>' +
                        '</div>';
            document.getElementById(arrEnemiesID[enemyID]).innerHTML += Player;
        }

        getRandom = (arr, n) => {
            let result = new Array(n),
                len = arr.length,
                taken = new Array(len);
            if (n > len)
                throw new RangeError("getRandom: more elements taken than available");
            while (n--) {
                var x = Math.floor(Math.random() * len);
                result[n] = arr[x in taken ? taken[x] : x];
                taken[x] = --len in taken ? taken[len] : len;
            }
            return result;
        }

        initiateCharge = () => {
            let speed = [];
            
            for (let c = 0; c < arrChargeSpeed.length; c++) {
                speed = getRandom(arrChargeSpeed, arrChargeSpeed.length);
            }

            EnemyTimer = setInterval(function() {
                for (let i = 0; i < arrEnemiesID.length; i++) {
                    let enemy = document.getElementById(arrEnemiesID[i]);
                    if (enemy.style.marginLeft == "") {
                        enemy.style.marginLeft = speed[i] + "px";
                    } else {
                        enemy.style.marginLeft = (parseInt(enemy.style.marginLeft) + speed[i]) + "px";
                    }
                    
                    if (enemy.offsetLeft >= nLimit) {
                        document.onkeyup = null;
                        clearInterval(EnemyTimer);
                        clearInterval(RemainingTime);
                        console.log('ENEMY WINS!');
                        showPrompt('ENEMY WINS!');
                        saveData();
                    }
                }
            }, 100);
        }

        fnInitiateKeyboardEvents = () => {
            document.onkeyup = (e) => {
                if (e.key === 'ArrowUp') {
                    if (enemyID > 0) {
                        document.getElementById('Player').remove();
                        enemyID--;
                        addPlayer(enemyID, ansID);
                    }
                } else if (e.key === 'ArrowDown') {
                    if (enemyID < 4) {
                        document.getElementById('Player').remove();
                        enemyID++;
                        addPlayer(enemyID, ansID);
                    }
                } else if (e.key === ' ' && nCurrentLevel <= nTotalLevels) {
                    let index = document.getElementById('Player').parentNode.id.split('enemy_')[1];
                    let PlayerAns = document.getElementById('CorrectAns').innerText;
                    
                    if (parseInt(PlayerAns) === parseInt(arrCorrectAns[index])) {
                        nScore++;
                        if (nCurrentLevel != nTotalLevels) {
                            nCurrentLevel++;
                        } else {
                            document.onkeyup = null;
                            clearInterval(EnemyTimer);
                            clearInterval(RemainingTime);
                            console.log('YOUR SCORE - ' + nScore);
                            if (nScore == nTotalLevels) {
                                console.log('YOU WIN!');
                                showPrompt('YOU WIN!');
                            } else {
                                showPrompt('YOU LOOSE!');
                                console.log('YOU LOOSE!');
                            }
                            saveData();
                            return;
                        }
        
                        arrCorrectAns = [];
                        arrEnemiesID = [];
                        clearInterval(EnemyTimer);
        
                        generateEnemies();
                        enemyID = Math.floor(Math.random() * arrEnemiesID.length);
                        ansID = Math.floor(Math.random() * arrCorrectAns.length);
                        addPlayer(enemyID, ansID);
                        initiateCharge();
                    } else {
                        console.log('INCORRECT');
                        arrCorrectAns = [];
                        for (let i = 0; i < nTotalEnemies; i++) {
                            document.getElementById('equation_' + i).innerText = equation();
                        }
                        ansID = Math.floor(Math.random() * arrCorrectAns.length);
                        document.getElementById('CorrectAns').innerHTML = arrCorrectAns[ansID];
                    }
                } else {
                    console.log('ALL DONE!');
                }
            }
        }

        saveData = () => {
            let objPlayer = { 'playerName': PlayerName, 'level': nCurrentLevel, 'score': nScore };

            if ("Multiplication_Scoot" in localStorage){
                let playerList = JSON.parse(localStorage.getItem("Multiplication_Scoot"));
                playerList.push(objPlayer);
                localStorage.setItem('Multiplication_Scoot', JSON.stringify(playerList));
            } else {
                let playerList = [];
                playerList.push(objPlayer);
                localStorage.setItem('Multiplication_Scoot', JSON.stringify(playerList));
            }
        }

        fnResetVals = () => {
            nCurrentLevel = 1;
            timeleft = 60;
            arrCorrectAns = [];
            arrEnemiesID = [];
            enemyID = '';
            ansID = '';
            nScore = 0;
            clearInterval(EnemyTimer);
            clearInterval(RemainingTime);
        }

        fnPlayAgain = () => {
            hidePrompt();
            fnResetVals();
            generateEnemies();
            enemyID = Math.floor(Math.random() * arrEnemiesID.length);
            ansID = Math.floor(Math.random() * arrCorrectAns.length);
            addPlayer(enemyID, ansID);
            initiateCharge();
            fnInitiateKeyboardEvents();

            RemainingTime = setInterval(function(){
                if(timeleft == 1){
                    clearInterval(RemainingTime);
                }
                document.getElementById("time").innerHTML = "Time remaining: " + (timeleft - 1);
                timeleft -= 1;
            }, 1000);
        }

        fnHighScore = () => {
            window.location.href = "scores.html";
        }
        
        fnPlayAgain();
        getPlayerName();
    }
}