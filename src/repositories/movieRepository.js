const { Op } = require("sequelize");
const GenderType = require('../models/genderTypes');
const Movie = require('../models/movies');
const Character = require('../models/characters');
const { parseISO } = require('date-fns');


class MovieRepository {

    constructor(){

    }

    // IMPLEMENTAR FILTRO
    async findAll({title, calification, creationDate} , { limit, offset ,order}){
        let where = {}
        if(title){
            where.title = {
                [Op.like]: `%${title}%`
            }
        }
        if(calification){
            where.calification = {
                [Op.eq]: calification
            }
        }
        if(creationDate){
            where.creationDate = {
                [Op.eq]: creationDate
            }
        }
        let config = { 
            where,
            attributes: ['title','image','creationDate'],
        }
        if(order){
            config.order =  [order.split(';')] 
        }
        return await Movie.findAll(config);
    }

    async findById(id) {
        return await Movie.findByPk(id);
    }
    

    async findByIdWithCharacters(id) {
        return await Movie.findByPk(id, {
            include: [
                'characters',
                'gender',
                'type'
            ],
            attributes: ['id', 'title','image','creationDate', 'calification'],
        });
    }
    
    async findByTitle(title) {
        return await Movie.findOne({ where: { title } });

    }

    async save(c) {
        return await Movie.create(c, {
            include: [ GenderType ]
        });
    }

    async update(id, c){
        return await Movie.update(c, {
            where: {
                id
            }
        });
    }

    async remove(id) {
        return await Movie.destroy({
            where: {
                id
            }
        });
    }


}

module.exports = MovieRepository;