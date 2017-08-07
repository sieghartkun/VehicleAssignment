
var express = require('express');

var router = express.Router();

/*
router.get('/', (req, res) => {
    
    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') {
       
        return render([]);
    }

    
    var db = require('../../lib/database')();

    db.query('SELECT * FROM tblVehicle', function (err, results, fields) {
        
        if (err) return res.send(err);

        
        render(results);
    });

    function render(tblVehicle) {
        res.render('home/homes/index', { tblVehicle: tblVehicle });
    }
});*/
router.get('/view', (req, res) => {

    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') {
        
        return render([]);
    }

    var db = require('../../lib/database')();

    db.query('SELECT * FROM tblVehicle', function (err, results, fields) {
       
        if (err) return res.send(err);

        render(results);
    });

    function render(tblVehicle) {
        res.render('user/view/view', {tblVehicle:tblVehicle });
    }
});


/*router.get('/delete', (req, res) => {

    if (typeof process.env.ENABLE_DATABASE !== 'undefined' && process.env.ENABLE_DATABASE === 'false') {
        
        return render([]);
    }

    var db = require('../../lib/database')();

    db.query('SELECT * FROM tblVehicle', function (err, results, fields) {
       
        if (err) return res.send(err);

        render(results);
    });

    function render(tblVehicle) {
        res.render('user/delete/delete', {tblVehicle:tblVehicle });
    }
});*/

router.get('/new', (req, res) => {
    res.render('user/add/index');
});

router.post('/new', (req, res) => {
    console.log('Nandito na siya sa POST /new');
    var db = require('../../lib/database')();
    db.query(`INSERT INTO \`tblVehicle\` (\`make\`, \`model\`, \`year\`, \`plateNo\`, \`condi\`) VALUES ("${req.body.make}", "${req.body.model}", ${req.body.year}, "${req.body.plateNo}","${req.body.condi}")`, (err, results, fields) => {
        if (err) console.log(err);
        res.redirect('/index');
    });
});


router.get('/delete', (req,res) => {
    res.render('user/delete/delete');
});
/*
router.post('/delete', (req,res) => {
    console.log('Nandito na siya sa POST /delete!');
    var db = require('../../lib/database')();
    db.query('DELETE FROM \`tblVehicle\` WHERE id='+`${req.body.id}`), (err,results,fields) => {
        if(err) console.log(err);
        console.log('Deleted a Record!');
        res.redirect('/index');
    };
});
*/

router.post('/delete', (req, res) => {
    var db = require('../../lib/database')();

    db.query('DELETE FROM tblVehicle WHERE id='+`${req.body.id}`, function (err, results, fields) {
       
        if (err) return res.send(err);

        render(results);
    });
    console.log('Deleted a Record!');
    function render(tblVehicle) {
            res.redirect('/index');
    }
});


router.get('/viewSpecific', (req,res) => {
    res.render('user/edit/viewSpecific');
});

router.post('/viewSpecific2', (req, res) => {
    var db = require('../../lib/database')();

    db.query('SELECT * FROM tblVehicle WHERE id='+`${req.body.id}`, function (err, results, fields) {
       
        if (err) return res.send(err);

        render(results);
    });

    function render(tblVehicle) {
        res.render('user/edit/viewSpecific2', {tblVehicle:tblVehicle });
    }
});

router.get('/edit', (req,res) => {
    res.render('user/edit/update');
});

router.post('/edit', (req, res) => {
    console.log('Nandito na siya sa POST /edit');
    var db = require('../../lib/database')();
    db.query(`UPDATE tblVehicle SET year = '${req.body.year}',make = '${req.body.make}',model = '${req.body.model}',plateNo = '${req.body.plateNo}',condi = '${req.body.condi}' WHERE id = '${req.body.id}'`,function (err, results, fields) {
       
        if (err) return res.send(err);

        render(results);
    });

    function render(tblVehicle) {
        res.redirect('/index');
    }
});

exports.users = router;