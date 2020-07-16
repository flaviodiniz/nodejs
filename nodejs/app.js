const express = require("express");
const app = express();
app.use(express.static('public'));
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const moment = require('moment');
const Comentario = require("./models/Comentario");
const fs = require('fs');
const getStat = require('util').promisify(fs.stat);
//const lowdb = require('lowdb');
//const db = lowdb('banco.json');

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers: {
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY');
        }
    }
}))
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Rotas 
app.get('/cad-comentario', function(req, res){
    Comentario.findAll({order: [['id', 'DESC']]}).then(function(comentarios){
        res.render('cad-comentario', {comentarios: comentarios});
    })
}); 

//app.get('/cad-comentario', function(req, res){
//    Comentario.connect(function(err) {
//        if (err) throw err;
//        //Select all customers and return the result object:
//        Comentario.query("SELECT * FROM comentarios", function (err, result, fields) {
//          if (err) throw err;
//          console.log(result);
//        });
//      });
//}); 

app.post('/add-comentario', function(req, res){
    Comentario.create({
        comentario: req.body.comentario,
    }).then(function(){
        res.redirect('/cad-comentario');
    }).catch(function(erro){
        res.send("Erro: Pagamento não foi cadastrado com sucesso!" + erro)
    });
});

// 10 * 1024 * 1024 // 10MB
// usamos um buffer minúsculo! O padrão é 64k
const highWaterMark =  2;

app.get('/audio', async (req, res) => {

    var coment = req.body.name;
    console.log(coment);

    const filePath = './audio.ogg';
    // usou a instrução await
    const stat = await getStat(filePath);
    // exibe uma série de informações sobre o arquivo
    console.log(stat);
    // informações sobre o tipo do conteúdo e o tamanho do arquivo
    res.writeHead(200, {
        'Content-Type': 'audio/ogg',
        'Content-Length': stat.size
    });
    const stream = fs.createReadStream(filePath);
    // só exibe quando terminar de enviar tudo
    stream.on('end', () => console.log('acabou'));
    // faz streaming do audio 
    stream.pipe(res);
});

app.listen(8080);
