const ContentType = require('../models/contentTypes');

class   ContentTypeRepository {

    constructor(){

    }

    async findById(id) {
        return await ContentTypeRepository.findByPk(id);
    }
    
    async findByDescription(description) {
        return await ContentType.findOne({ where: { description } });
    }
}

module.exports = ContentTypeRepository;