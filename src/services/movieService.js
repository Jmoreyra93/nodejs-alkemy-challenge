const MovieRepository = require('../repositories/movieRepository');
const CharacterRepository = require('../repositories/characterRepository');
const GenderTypeRepository = require('../repositories/genderTypeRepository');
const ContentTypeRepository = require('../repositories/contentTypeRepository');
const repository = new MovieRepository();
const characterRepository = new CharacterRepository();
const genderTypeRepository = new GenderTypeRepository();
const contentTypeRepository = new ContentTypeRepository();

//ENCONTRAR POR ID

const findById = async(id) => {
    return await repository.findByIdWithCharacters(id);
}

//ENCONTRAR POR TITULO

const findByTitle = async(title) => {
    return await repository.findByTitle(title);
}

//ENCONTRAR TODOS

const findAll = async(filter, options) => {
    return await repository.findAll(filter, options);
}

//GUARDAR verificar m

const save = async(m) => {
    const genderType = await genderTypeRepository.findByDescription(m.genderType);
    const contentType = await contentTypeRepository.findByDescription(m.contentType);
    m.genderTypeId = genderType.id;
    m.contentTypeId = contentType.id;
    return await repository.save(m);
}

//ACTUALIZAR

const update = async(id, m) => {
    if(m.genderType) {
        const genderType = await genderTypeRepository.findByDescription(m.genderType);
        const contentType = await contentTypeRepository.findByDescription(m.contentType);
        m.genderTypeId = genderType.id;
        m.contentTypeId = contentType.id;
    }
    return await repository.update(id, m);
}

//ELIMINAR

const remove = async(id) => {
    return await repository.remove(id);
}


// ASOCIAR MOVIE CON CHARACTER 

const asociate = async(movie, character )=> {
    await movie.addCharacter(character);

}

module.exports = {
    findById,
    findByTitle,
    findAll,
    save,
    update,
    remove,
    asociate
}