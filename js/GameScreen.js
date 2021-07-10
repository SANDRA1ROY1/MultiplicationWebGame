document.onreadystatechange = function () {
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
        let Timer;

        generateEnemies = () => {
            let enemy = '';
            for (let i = 0; i < nTotalEnemies; i++) {
                enemy += '<div id=enemy_' + i + ' class="row content">' +
                            '<div class="floatLeft">' +
                                '<img class="padBottom" src="assets/enemy.png" height="' + imgHgt + '" width="' + imgWdt + '" />' +
                                '<div class="text">' + equation() + '</div>' +
                            '</div>' +
                        '</div>';
                arrEnemiesID.push('enemy_' + i);
            }
            enemy += '<div class="padBottom">' +
                        '<div class="level">Level ' + nCurrentLevel + ' of ' + nTotalLevels + '</div>' +
                        '<div class="time" id="time">Time remaining: ' + timeleft + '</div>' +
                    '</div>';
            
            document.getElementById('Ememies').innerHTML = enemy;
            
            let Timer = setInterval(function(){
                if(timeleft == 1){
                    clearInterval(Timer);
                }
                document.getElementById("time").innerHTML = "Time remaining: " + (timeleft - 1);
                timeleft -= 1;
            }, 1000);
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

        
        addPlayer = (enemyID) => {
            // TO BE CHANGED, WHEN USER MOVES UP AND DOWN...
            let ansID = Math.floor(Math.random() * arrCorrectAns.length);
            let Player = '<div class=floatRight id=Player>' +
                            '<img class="padBottom" src="assets/player.png" height="' + imgHgt + '" width="' + imgWdt + '" />' +
                            '<div id="CorrectAns" class="text">' + arrCorrectAns[ansID] + '</div>' +
                        '</div>';
            document.getElementById(arrEnemiesID[enemyID]).innerHTML += Player;
        }

        function getRandom(arr, n) {
            var result = new Array(n),
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
            Timer = setInterval(enemyCharge, 100);
            let limit = window.innerWidth - 256;
            let speed = [];
            
            for (let c = 0; c < arrChargeSpeed.length; c++) {
                speed = getRandom(arrChargeSpeed, arrChargeSpeed.length);
            }

            function enemyCharge() {
                for (let i = 0; i < arrEnemiesID.length; i++) {
                    let enemy = document.getElementById(arrEnemiesID[i]);
                    if (enemy.style.marginLeft == "") {
                        enemy.style.marginLeft = speed[i] + "px";
                    } else {
                        enemy.style.marginLeft = (parseInt(enemy.style.marginLeft) + speed[i]) + "px";
                    }
                    
                    if (enemy.offsetLeft >= limit) {
                        clearInterval(Timer);
                        console.log('ENEMY WINS!')
                    }
                }
            }
        }

        generateEnemies();
        enemyID = Math.floor(Math.random() * arrEnemiesID.length);
        addPlayer(enemyID);
        initiateCharge();

        document.onkeyup = (e) => {
            if (e.key === 'ArrowUp') {
                if (enemyID > 0) {
                    document.getElementById('Player').remove();
                    enemyID--;
                    addPlayer(enemyID);
                }
            } else if (e.key === 'ArrowDown') {
                if (enemyID < 4) {
                    document.getElementById('Player').remove();
                    enemyID++;
                    addPlayer(enemyID);
                }
            } else if (e.key === ' ') {
                let index = document.getElementById('Player').parentNode.id.split('enemy_')[1];
                let PlayerAns = document.getElementById('CorrectAns').innerText;
                
                if (parseInt(PlayerAns) === parseInt(arrCorrectAns[index])) {
                    console.log('CORRECT');
                } else {
                    console.log('INCORRECT');
                }
                clearInterval(Timer);
            }
        }
    }
}