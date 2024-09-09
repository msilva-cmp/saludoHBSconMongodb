var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Pagina inicial' });
});

router.post('/', async function(req, res) {
  const body = req.body;
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const dbo = client.db('datos');
    const query = { dni: body.dni };
    const result = await dbo.collection('personas').findOne(query);

    const res_body = {
      nombre: result ? result.nombre : 'No Name',
      apellido: result ? result.apellido : 'No Surname',
      titulo: 'ejemplo 7'
    };

    res.render('saludar', res_body);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

module.exports = router;