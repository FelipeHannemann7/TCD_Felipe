const router = require('express').Router();
const _ = require('lodash');

const { Louvor } = require('../models'); // Importação dos Models

router.get('', async (req, res) => {
     const louvors = await Louvor.findAll();
     // res.send({louvors: louvors});
     console.log(louvors)
     res.render('louvores', {
       louvors
     });
   });

module.exports = router;



