const { Router } = require('express');


const {
    getAllCharacters, 
    createCharacter, 
    updateCharacter, 
    getCharacterById, 
    deleteCharacter,
    uploadCharacterImage
} = require('../controllers/characters');
const { 
    postRequestValidations,
    putRequestValidations,
    getAllRequestValidation,
    getRequestValidation,
    deleteRequestValidations,
    postImageValidations
} = require('../middlewares/characters');


const router = Router();

router.get('/', getAllRequestValidation, getAllCharacters);
router.post('', postRequestValidations, createCharacter);
router.put('/:id(\\d+)/', putRequestValidations, updateCharacter);
router.get('/:id(\\d+)/', getRequestValidation, getCharacterById);
router.delete('/:id(\\d+)/', deleteRequestValidations, deleteCharacter);
router.post('/image', postImageValidations, uploadCharacterImage);


module.exports = router;