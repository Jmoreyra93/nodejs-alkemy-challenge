const CharacterRepository = require('../repositories/characterRepository');
const repository = new CharacterRepository();
const ImageRepository = require('../repositories/imageRepository');
const imageRepository = new ImageRepository();



//ENCONTRAR POR ID

const findById = async(id) => {
    return await repository.findByIdWhitMovies(id);
}

//ENCONTRAR POR NOMBRE

const findByName = async(name) => {
    return await repository.findByName(name);
}

//ENCONTRAR TODOS

const findAll = async(filter, options) => {
    return await repository.findAll(filter, options);
}

//GUARDAR

const save = async(c) => {
    return await repository.save(c);
}

//ACTUALIZAR

const update = async(id, c) => {
    return await repository.update(id, c);
}

//ELIMINAR

const remove = async(id) => {
    const c = await repository.findById(id)
    imageRepository.deleteImage(c.image);
    return await repository.remove(id);
}

module.exports = {
    findById,
    findByName,
    findAll,
    save,
    update,
    remove
}