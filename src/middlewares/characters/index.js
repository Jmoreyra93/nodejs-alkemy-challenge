const { check } = require('express-validator');
const multer  = require('multer');
const upload = multer();
const AppError = require('../../errors/appError');
const characterService = require('../../services/characterService');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../../constants');
const logger = require('../../loaders/logger');
const {validationResult, imageRequired} = require('../commons');
const { validJWT, hasRole } = require('../auth');

const _nameRequired = check('name', 'Name required').not().isEmpty();
const _roleValid = check('role').optional().custom(
    async (role = '') => {
        if(!ROLES.includes(role)) {
            throw new AppError('Ivalid Role', 400);
        }
    }
);

const _idRequied = check('id').not().isEmpty();
const _idIsNumeric = check('id').isNumeric();
const _idExist = check('id').custom(
    async (id = '') => {
        const cFound = await characterService.findById(id);
        if(!cFound) {
            throw new AppError('The id does not exist in DB', 400);
        }
    }
);


const _histortyRequired = check('history').not().isEmpty();
const _ageIsNumeric = check('age').optional().isNumeric();
const _weigthIsNumeric = check('weigth').optional().isNumeric();

const _nameNotExist = check('name').custom(
    async (name = '') => {
        const cFound = await characterService.findByName(name);
        if(cFound) {
            throw new AppError('The name exist in DataBase', 400);
        }
    }
);

/*
const uploadImage = () => {
    return (req, res, next) => {
        try {
            upload.single('image'),
            next();
        } catch (err) {
            next(err);
        }
    }
}
*/



// POST 
const postRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _nameNotExist,
    _ageIsNumeric,
    _histortyRequired,
    _weigthIsNumeric,
    validationResult
]

// PUT
const putRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsNumeric,
    _nameNotExist,
    _idExist,
    _ageIsNumeric,
    _weigthIsNumeric,
    _roleValid,
    validationResult
]

// DELETE
const deleteRequestValidations = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]

// GET ALL
const getAllRequestValidation = [
    validJWT
]


// GET
const getRequestValidation = [
    validJWT,
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]


// POST IMAGE
const postImageValidations = [
    validJWT,
    hasRole(ADMIN_ROLE, USER_ROLE),
    upload.single('image'),
    _idRequied,
    _idIsNumeric,
    _idExist,
    imageRequired,
    validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageValidations
}