const express = require('express');
const router =  express.Router();

const genres=[
    {id: 1, name: 'Thriller'},
    {id: 2, name: 'Mystery'},
    {id: 3, name: 'Comedy'},
];

router.get('/',(req,res)=>{
    res.send(genres);
});

router.post('/', (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate({name: req.body.name});


    if(result.error) return res.status(400).send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Not available');

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const result = schema.validate({name: req.body.name});

    if(result.error) return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});


router.get('/:id',(req,res)=>{
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Not available');
    res.send(genre);
});

router.delete('/:id',(req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Not available');
    
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

module.export = router; 