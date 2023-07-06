function Login(){
    const id = idform.value;
    const password = passform.value;

    if(password == "" && id == ""){
        alert("Password・UserIdが入力されていません")
    }else if(id == ""){
        alert("UserIdが入力されていません")
    }else if(password == ""){  
        alert("Passwordが入力されていません")
    }else{
        socket.emit("login", id,password);
        Cookies.set('user', idform.value);
        idform.value = "";
        passform.value = "";
    }
}