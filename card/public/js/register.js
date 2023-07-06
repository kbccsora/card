function Register(){
    const id = Register_id.value;
    const Pass1 = RegisterPass1.value;
    const Pass2 = RegisterPass2.value;

    
    if(id =="" && Pass1 =="" && Pass2==""){
        alert("Userid・PassWord・Confirm PassWordが入力されていません");
    }
    else if (id ==""){
        alert("Useridが入力されていません");
    }
    else if (id =="" && Pass1 ==""){
        alert("Userid・PassWordが入力されていません");
    }
    else if (id == "" && Pass2 == ""){
        alert("Userid・Confirm PassWordが入力されていません");
    }
    else if (Pass1 =="" && Pass2 ==""){
        alert("PassWord・Confirm PassWordが入力されていません");
    }
    else if (Pass1 ==""){
        alert("PassWordが入力されていません");
    }
    else if (Pass2 ==""){
        alert("Confirm PassWordが入力されていません");
    }else{
        socket.emit("register", id,Pass1,Pass2);
        Register_id.value = "";
        RegisterPass1.value = "";
        RegisterPass2.value = "";
        location.href = "/room";
    }

}