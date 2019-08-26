/* jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');

function isValid( field, value ){
    switch (value) {
        case undefined:
            response.errors.push({
                field,
                message: 'It is mandatory'
            });
            break;
        case '':
            response.errors.push({
                field,
                message: 'Must be a non-empty string'
            });
            break;
        default:
            if( !isNaN(parseInt( value ))) {
                response.errors.push({
                    field,
                    message: 'Must be a non-empty string'
                });
            } else{
                return true;
            }
            break;
    } 
    return false;
}

function isValidAge( age ){
    if ( age === undefined ){
        response.errors.push({
            field: 'age',
            message: 'It is mandatory'
        });
    } else {
        age = parseInt(age);
        if( isNaN(age) || age < 0 ){
            response.errors.push({
                field: 'age',
                message: 'Must be a positive number or zero'
            });
        } else {
            return true;
        }
    }
    return false;
}

function validateAll( req ){
    const { firstName, lastName, age } = req.body;
    let check = true;
    if( !isValid('firstName', firstName) ){
        check = false;
    }
    if( !isValid('lastName', lastName) ){
        check = false;
    }
    if( !isValidAge(age) ){
        check = false;
    }
    return check;
}

function clearResponse(){
    response = {
        ok: false
    };
}

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let data = new Set([{
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    age: 21
}, {
    id: 2,
    firstName: 'Jenny',
    lastName: 'Doe',
    age: 21
}]);

let response = {
    ok: false
};

app.get('/users', function(req, res){

    clearResponse();

    if(data.size > 0){
        response.ok = true;
        response.results = [...data];
        res.status(200);
    } else{
        res.status(204);
    }
    res.json(response);
});

app.get('/users/:id', function(req, res){
    
    clearResponse();

    for(const user of data){
        if( user.id == req.params.id ){
            response.ok = true;
            response.result = user;
            break;
        }
    }
    if(response.ok){
        res.status(200);
    } else{
        res.status(204);
    }
    res.json(response);
});

app.post('/users', function(req, res){

    clearResponse();
    response.errors = [];

    if(validateAll(req)){

        response.ok = true;
        response.result = req.body;
        response.result.id = data.size + 1;
        response.result.age = parseInt(req.body.age);
        delete response.errors;
        data.add(response.result);
        res.status(201);

    } else {
        res.status(400);
    }
    res.json(response);
});

app.put('/users/:id', function(req, res){

    clearResponse();
    response.errors = [];

    for(let user of data){

        if( user.id == req.params.id ){
            
            if(validateAll(req)){ 

                delete response.errors;
                response.ok = true;
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.age = parseInt(req.body.age);
                response.result = user;
                res.status(200);

            } else {
                res.status(400);
            }
            break;
        }
    }
    res.json(response);
});

app.delete('/users/:id', function(req, res){

    clearResponse();

    for(let user of data){

        if( user.id == req.params.id ){

            response.ok = true;
            data.delete(user);
            res.status(204);
            break;
        }
    }
    res.json(response);
});

app.listen(80);