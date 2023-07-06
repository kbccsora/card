function turnend() {
    let target = document.getElementById(clntcard);


    if (turn == mynum) {
        if (clntcard == "") {
            alert("カードが選択されていません")
            return
        } else {
            document.getElementById("mycard").src = "/img/" + mycard[clntcard.substr(4) - 1] + ".png";
            socket.emit("mycard", mycard[clntcard.substr(4) - 1])
        }
    } else if (counter == mynum) {
        if (clntcard == "") {
            document.getElementById("mycard").src = "/img/toumei.png";
            socket.emit("nocounter", turn)
            return
        } else {
            document.getElementById("mycard").src = "/img/" + mycard[clntcard.substr(4) - 1] + ".png";
            socket.emit("countercard", mycard[clntcard.substr(4) - 1], turn)
        }
    }

    change();
    card1.src = "/img/" + mycard[0] + ".png";
    card2.src = "/img/" + mycard[1] + ".png";
    card3.src = "/img/" + mycard[2] + ".png";
    card4.src = "/img/" + mycard[3] + ".png";
    card5.src = "/img/" + mycard[4] + ".png";

    anime({
        targets: target,
        translateX: 0,
        translateY: 0,
        duration: 0
    })
    clntcard = ""
    // document.getElementById("mycard").src = "/img/toumei.png";
    flg = 0;
}

function change() {
    for (let i = clntcard.substr(4) - 1; i < mycard.length; i++) {
        mycard[i] = mycard[i + 1]
    }
    mycard[mycard.length - 1] = Math.floor(Math.random() * (15 - 1)) + 1;

}

function move(id) {
    let target = document.getElementById(id);
    if (turn == mynum) {
        if (flg == 0) {//カードがフィールドにあるかの判断
            cardx = target.getBoundingClientRect();
            fieldx = field.getBoundingClientRect();
            if (clntcard != "") {
                let remove = document.getElementById(clntcard);
                anime({
                    targets: remove,
                    translateX: 0,
                    translateY: 0,
                    duration: 400,
                    easing: "easeOutSine",
                })
                clntcard = "";
            }
            anime({
                targets: target,
                translateX: fieldx.left - cardx.left,
                translateY: fieldx.top - cardx.top,
                duration: 400,
                easing: "easeOutSine",
            })
            clntcard = id;
            flg = 1;
        } else {
            if (clntcard != id) {
                cardx = target.getBoundingClientRect();
                fieldx = field.getBoundingClientRect();
                let remove = document.getElementById(clntcard);
                anime({
                    targets: remove,
                    translateX: 0,
                    translateY: 0,
                    duration: 400,
                    easing: "easeOutSine",
                })
                anime({
                    targets: target,
                    translateX: fieldx.left - cardx.left,
                    translateY: fieldx.top - cardx.top,
                    duration: 400,
                    easing: "easeOutSine",
                })
                clntcard = id;
                return;
            }
            anime({
                targets: target,
                translateX: 0,
                translateY: 0,
                duration: 400,
                easing: "easeOutSine",
            })
            flg = 0;
            clntcard = "";
        }
    } else if (counter == mynum) {
        if (flg == 0) {
            cardx = target.getBoundingClientRect();
            fieldx = field.getBoundingClientRect();
            if (clntcard != "") {
                let remove = document.getElementById(clntcard);
                anime({
                    targets: remove,
                    translateX: 0,
                    translateY: 0,
                    duration: 400,
                    easing: "easeOutSine",
                })
                clntcard = "";
            }
            anime({
                targets: target,
                translateX: fieldx.left - cardx.left,
                translateY: fieldx.top - cardx.top,
                duration: 400,
                easing: "easeOutSine",
            })
            clntcard = id;
            flg = 1;
        } else {
            if (clntcard != id) {
                cardx = target.getBoundingClientRect();
                fieldx = field.getBoundingClientRect();
                let remove = document.getElementById(clntcard);
                anime({
                    targets: remove,
                    translateX: 0,
                    translateY: 0,
                    duration: 400,
                    easing: "easeOutSine",
                })
                anime({
                    targets: target,
                    translateX: fieldx.left - cardx.left,
                    translateY: fieldx.top - cardx.top,
                    duration: 400,
                    easing: "easeOutSine",
                })
                clntcard = id;
                return;
            }
            anime({
                targets: target,
                translateX: 0,
                translateY: 0,
                duration: 400,
                easing: "easeOutSine",
            })
            flg = 0;
            clntcard = "";
        }
    }


}


function slash(tag) {
    // タイムスタンプを取得
    var date = new Date();
    var timestamp = date.getTime();

    // 追加するimgを生成
    var img = document.createElement('img');
    img.src = '/img/slash.gif?' + timestamp;

    // 追加エリアの中身を空にしてimgを追加]
    wrapper = document.getElementById(tag);
    wrapper.textContent = null;
    wrapper.appendChild(img);
}

