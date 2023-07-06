var socket = io()
var base = document.getElementById("base")
var basex = base.getBoundingClientRect();
var card = document.getElementById("card1")
var cards = document.getElementsByClass("cards")
var cardimg = document.getElementById("cardimg")
var cardx = card.getBoundingClientRect();
var flg = true; 1

function first(){
    
}

card.addEventListener('click', function () {
    if (flg) {
        socket.emit("cardmove", flg);
        anime({
            targets: card,
            translateX: basex.left - cardx.left,
            translateY: basex.top - cardx.top,
        })

        flg = false;
    } else {
        socket.emit("cardmove", flg);
        anime({
            targets: card,
            translateX: 0,
            translateY: 0,
        })

        flg = true;
    }

})

function name (){
    alert("aa")
}

socket.on("move", (num) => {
    if (num == 1) {
        anime({
            targets: card,
            translateX: basex.left - cardx.left,
            translateY: basex.top - cardx.top,
        })
    } else {
        anime({
            targets: card,
            translateX: 0,
            translateY: 0,
        })
    }
})