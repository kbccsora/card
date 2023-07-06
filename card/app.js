const express = require('express');
const mysql = require('mysql');
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
app.use(express.static('public'));
const PORT = 3000;
var room1 = 0;
let room1turn = 1;


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/room", (req, res) => {
    res.sendFile(__dirname + "/room.html");
});

app.get("/room/dev", (req, res) => {

    res.sendFile(__dirname + "/dev.html");
});

app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/gametest.html");
});



io.on("connection", (socket) => {
    console.log("ユーザーが接続しました");
    socket.on("login", (id, pass) => {
        auth(id, pass)
    })

    socket.on("register", (id, pass) => {
        register(id, pass);
    })

    socket.on("join1", () => {
        console.log("join1")
        room1 += 1;
        console.log("online:" + room1);
        if (room1 > 2) {
            socket.emit("full1");
        } else {
            if (room1 <= 1) {
                socket.emit("joined1", room1)
            } else {
                socket.emit("joined1", room1)
                io.emit("matchFound1")
            }
        }

    })

    socket.on("init1", () => {
        io.emit("initturn1", room1turn)
    })

    function auth(id, pass) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sotuken'
        });

        connection.connect((err) => {
            if (err) {
                console.log('error connecting: ' + err.stack);
                return;
            }
            console.log('success');

            connection.query(
                'SELECT id FROM user WHERE id = "' +
                id +
                '" AND password = "' +
                pass +
                '";'
                , function (err, result) {
                    if (err || !result || result.length == 0 || result.affectedRows == 0) {
                        //flg = false;
                        console.log("不正");
                        socket.emit("unauthenticated");
                        return;
                    } else {
                        console.log("承認");
                        socket.emit("authenticated");
                        return;
                    }
                });
            connection.end();
            return;
        });
    }

    function register(id, pass) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sotuken'
        });

        connection.connect((err) => {
            if (err) {
                console.log('error connecting: ' + err.stack);
                return;
            }
            console.log('success');
            //const sql = 'INSERT INTO user (id, password) VALUES ('id', 'pass');';
            connection.query(
                'INSERT INTO user (id, password) VALUES ("' +
                id +
                '", "' +
                pass +
                '");'
                , (err, rows) => {
                    if (err) {
                        console.log("error");
                    }
                    console.log(rows);
                })
            connection.end();
        });
    }

    function getcard(id) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sotuken'
        });

        connection.connect((err) => {
            if (err) {
                console.log('error connecting: ' + err.stack);
                return;
            }
            console.log('success');

            connection.query(
                'SELECT * FROM card WHERE id = "card' +
                id +
                '";'
                , function (err, result, rows, fields) {
                    if (err || !result || result.length == 0 || result.affectedRows == 0) {
                        console.log("error" + result);
                        return;
                    } else {
                        if (result[0].type == "heal") {
                            socket.emit("heal", result[0].dp)
                        } else {
                            socket.broadcast.emit('cardinfo', id, result[0].ap, result[0].dp, result[0].type);
                            console.log("ノーマル送信")
                        }
                        return;
                    }
                });
            connection.end();
            return;
        });
    }

    function cgetcard(id) {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sotuken'
        });

        connection.connect((err) => {
            if (err) {
                console.log('error connecting: ' + err.stack);
                return;
            }
            console.log('success');

            connection.query(
                'SELECT * FROM card WHERE id = "card' +
                id +
                '";'
                , function (err, result, rows, fields) {
                    if (err || !result || result.length == 0 || result.affectedRows == 0) {
                        console.log("error" + result);
                        return;
                    } else {
                        io.emit('counterinfo', id, result[0].ap, result[0].dp, result[0].type);
                        console.log("カウンター送信" + result[0].dp)
                        io.emit("changeturn",  room1turn,)
                        return;
                    }
                });
            connection.end();
            return;
        });
    }

    socket.on("mycard", (id) => {
        getcard(id)
        console.log("ノーマル攻撃")
    })

    socket.on("countercard", (id, turn) => {
        room1turn = turn;
        console.log("before" + room1turn)
        if (room1turn == 1) {
            room1turn = 2;
        } else {
            room1turn = 1;
        }
        console.log("after" + room1turn)
        cgetcard(id)
    })

    socket.on("nocounter", (turn) => {
        room1turn = turn;
        console.log("before" + room1turn)
        if (room1turn == 1) {
            room1turn = 2;
        } else {
            room1turn = 1;
        }
        console.log("after" + room1turn)
        io.emit("changeturn",  room1turn,)
        io.emit('nocounterinfo');
    })

    socket.on("emithp", (hp) => {
        socket.broadcast.emit("enemyhp", hp)
    })
})

server.listen(PORT, () => {
    console.log("open")
});