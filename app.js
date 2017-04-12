const express = require('express');
const app = express();
const mongoose = require('mongoose')

const router = express.Router()

const port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/test').then(() => {

    const userSchema = new Schema({
        name:  String,
    });
    const users = mongoose.model('user1', userSchema);

 app.route('/user')
	.get((req, res)=>{
        User.find().exec().then((posts) => {
            res.send(posts);
        });
	 })
    .post( (req, res) =>{
        //res.send('Add a user')
        const user1 = new users({
            name: 'Angela',
		});
        user1.save().then( savedUser => console.log(savedUser)).catch(err => console.log(err))
 		res.json(user1)
	})
    .put('/:id', upload.array(), (req, res)=> {
        console.log(req.params.id);
        Cat.findById(req.params.id, (err, user) => {
            if (err)
                res.send(err);
            user.name = req.body.name;

            users.save((err) => {
                if (err)
                    res.send(err);

                res.json(user);
            });
        });
    })
     .delete('/:id', (req, res) => {
        users.findByIdAndRemove(req.params.id, (err) => {
            if (err)
                res.send(err)
            res.json({message: 'user has been deleted!'})
        })
    })


    const requestTime = function (req, res, next) {
        req.requestTime = Date.now()
        next()
    }

    app.use(requestTime)

    app.get('/',  (req, res)=> {
        req.headers['user-agent']
        console.log('User-Agent: ' + req.headers['user-agent']);
        console.log(req.requestTime)
        //console.log(req.connection.remoteAddress)
        console.log(req.originalUrl)

    })

    app.use('/',  (req, res, next)=> {
	console.log('Request Url:' + req.url);
	next();
});


app.listen(port);

}, err => {
    console.log('Connection to db faileed: ' + err)

});
//a custom middle ware I will be using quite often in my project is Body parser. It will be used
//to get inputs and ead datas from the client side or mainly the html.