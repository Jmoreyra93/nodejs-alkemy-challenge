const express = require('express');
const characterService = require('../services/characterService');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger');




/*************************
*                        *
*        CRUD            *
*                        *
**************************/


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

// GET ALL



const getAllCharacters = async (req, res, next) => {
    try {

        logger.info('Query: ' + JSON.stringify(req.query));

        const {filter = '', options = ''} = req.query;


        const c = await characterService.findAll(filter, options);
        res.json(new Success(c));
        
    } catch (err) {
        next(err);
    }
};


/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


// CREATE


const createCharacter = async (req, res, next) => {
    try {
        let c = req.body;
        c = await characterService.save(c);

        res.status(201).json(new Success(c));
    } catch (err) {
        next(err);
    }
};

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */



// UPDATE

const updateCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        let c = req.body;

        const characterUpdated = await characterService.update(id, c);

        res.json(new Success(characterUpdated));
    } catch (err) {
        next(err);
    }
};



/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


// GET


const getCharacterById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        res.json(new Success(user));
    } catch (err) {
        next(err);
    }
};



/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */



// DELETE

const deleteCharacter = async (req, res, next) => {
    try {
        const { id } = req.params;
        const c = await characterService.remove(id);
        res.json(new Success(c));
    } catch (err) {
        next(err);
    }
};



module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    getCharacterById,
    deleteCharacter
}