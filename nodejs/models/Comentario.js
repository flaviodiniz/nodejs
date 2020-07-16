const db = require('./db')

const Comentario = db.sequelize.define('comentarios', {
    comentario: {
        type: db.Sequelize.STRING
    }
})

//Criar a tabela, acabei criando no proprio mysql
//Pagamento.sync({force: true})
/** 
exports.findAll = (req, res) => {
    console.log("Get All comentarios");
	Comentario.findAll({
        attributes: ['id', 'comentario']
	}).then(comentarios => {
        res.send(comentarios);
	});
};
*/
module.exports = Comentario;