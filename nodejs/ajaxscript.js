//Post
(function readyJS(win,doc){
    'use strict';

    let form1=doc.querySelector('#form1');
    let comentario=doc.querySelector('#comentario');
    let response=doc.querySelector('.response');

    //Send form to node js
    function sendForm(event){
        let ajax=new XMLHttpRequest();
        let params='comentario='+comentario.value;
        ajax.open('POST','http://localhost:8080/add-comentario');
        ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        ajax.onreadystatechange=function(){
            if(ajax.status === 200 && ajax.readyState===4){
                let arr=JSON.parse(ajax.responseText);
                response.innerHTML=arr.comentario;
            }
        };
        ajax.send(params);
        //ajax.open('GET','http://localhost:8080/coment');
    }
    form1.addEventListener('submit',sendForm,false);
})(window,document);

//Get
(function readyJS(win,doc){
    'use strict';
    let tabela=doc.querySelector('#tabela');
    let ajax=new XMLHttpRequest();
    ajax.open('GET','http://localhost:8080/cad-comentario');
    ajax.setRequestHeader('Content-type','application/json');
    //let comentarios = ajax.getAllResponseHeaders();
    
	ajax.onreadystatechange=function(comentarios){
			for(var i=0;comentarios.length>i;i++){
				//Adicionando registros retornados na tabela
				$(tabela).append('<tr><td>'+comentarios[i].id+'</td><td>'+comentarios[i].comentario+'</td><td>');
			}
        }
})(window,document);
