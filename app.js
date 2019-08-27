/* jshint esversion: 6 */

(function(){

    'use strict';

    const express = require('express');
    const bodyParser = require('body-parser');
    const { validateAll } = require('./utils/middleware');
    
    const port = process.env.PORT || 3000;

    const app = express();
    const users = require('./mock/users');
    
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    app.get('/users', function( req, res){
    
        const response = {
            ok: true,
            results: [...users]
        };
        res.status(200);
        res.json(response);
    });
    
    app.get('/users/:id', function( req, res ){
        
        const response = {
            ok: false
        };
    
        for(const user of users){
            if( user.id == req.params.id ){
                response.ok = true;
                response.result = user;
                break;
            }
        }
        res.status(200);
        res.json(response);
    });
    
    app.post('/users', function( req, res ){
    
        const response = {
            ok: false,
            errors: validateAll( req )
        };

        req.body.age = parseInt( req.body.age );
    
        if( !response.errors.length ){
    
            response.ok = true;
            response.result = req.body;
            response.result.id = users.size + 1;
            delete response.errors;
            users.add(response.result);
            res.status(201);
    
        } else {
            res.status(400);
        }
        res.json(response);
    });
    
    app.put('/users/:id', function(req, res){
    
        const response = {
            ok: false,
            errors: validateAll( req )
        };

        req.body.age = parseInt( req.body.age );
    
        for(const user of users){
    
            if( user.id == req.params.id ){
                
                if( !response.errors.length ){ 
    
                    delete response.errors;
                    response.ok = true;
                    Object.assign( user, req.body );
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
    
        const response = {
            ok: false
        };
    
        for(const user of users){
    
            if( user.id == req.params.id ){
    
                response.ok = true;
                users.delete(user);
                res.status(204);
                break;
            }
        }
        res.json(response);
    });
    
    app.listen(port, () => {
        console.log(`Listening to requests on port ${ port }`);
    });

}());
