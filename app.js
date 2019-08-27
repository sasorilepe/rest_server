/* jshint esversion: 6 */

"use strict";

const express = require('express');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

function isValid( field, value, response ){
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

function isValidAge( age, response ){
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

function validateAll( req, response ){
    const { firstName, lastName, age } = req.body;
    let check = true;
    if( !isValid('firstName', firstName, response) ){
        check = false;
    }
    if( !isValid('lastName', lastName, response) ){
        check = false;
    }
    if( !isValidAge(age, response) ){
        check = false;
    }
    return check;
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

app.get('/users', function(req, res){

    let response = {
        ok: true,
        results: [...data]
    };
    res.status(200);
    res.json(response);
});

app.get('/users/:id', function(req, res){
    
    let response = {
        ok: false
    };

    for(const user of data){
        if( user.id == req.params.id ){
            response.ok = true;
            response.result = user;
            break;
        }
    }
    res.status(200);
    res.json(response);
});

app.post('/users', function(req, res){

    let response = {
        ok: false
    };
    response.errors = [];

    if(validateAll(req, response)){

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

    let response = {
        ok: false
    };
    response.errors = [];

    for(let user of data){

        if( user.id == req.params.id ){
            
            if(validateAll(req, response)){ 

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

    let response = {
        ok: false
    };

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

app.listen(port, () => {
    console.log(`Listening to requests on port ${ port }`);
});