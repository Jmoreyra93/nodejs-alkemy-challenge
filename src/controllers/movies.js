const express = require('express');
const movieService = require('../services/movieService');
const imageService = require('../services/imageService')
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



const getAllMovies = async (req, res, next) => {
    try {

        logger.info('Query: ' + JSON.stringify(req.query));

        const {filter = '', options = ''} = req.query;

        const movies = await movieService.findAll(filter, options);
        res.json(new Success(movies));
        
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


const createMovie = async (req, res, next) => {
    try {
        let movie = req.body;
        movie = await movieService.save(movie);

        res.status(201).json(new Success(movie));
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

const updateMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        let m = req.body;

        const movieUpdated = await movieService.update(id, m);

        res.json(new Success(movieUpdated));
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


const getMovieById = async (req, res) => {
    try {
        const m = await movieService.findById(req.params.id);
        res.json(new Success(m));
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

const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const c = await movieService.remove(id);
        res.json(new Success(c));
    } catch (err) {
        next(err);
    }
};

// POST MOVIO

/**
 * 
 * @param {express.Request} req 
 * @param {express.Response} res 
 */


const uploadMovieImage = async (req, res, next) => {
    try {
        const movieId = req.body.id;
        const image = req.file;

        res.json(new Success(await imageService.uploadMovieImage(movieId, image)));
    } catch (err) {
        next(err);
    }
};



module.exports = {
    getAllMovies,
    createMovie,
    updateMovie,
    getMovieById,
    deleteMovie,
    uploadMovieImage
}