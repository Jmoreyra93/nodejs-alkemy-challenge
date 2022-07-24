const bcrypt = require('bcrypt');
const Character = require('../models/characters');
const { Op, sequelize } = require("sequelize");


class CharacterRepository {

    constructor(){

    }

    // IMPLEMENTAR FILTRO DE MOVIE TITLE
    async findAll({name, age, weigth,movieTitle}, { limit, offset ,order}){
        let where = {}
        if(name){
            where.name = {
                [Op.like]: `%${name}%`
            }
        }
        if(age){
            where.age = {
                [Op.eq]: age
            }
        }
        if(weigth){
            where.weigth = {
                [Op.eq]: weigth
            }
        }
        return await Character.findAll({
            where,
            attributes: ['name','image'],
        });
    }

    async findById(id) {
        return await Character.findByPk(id);
    }
    
    async findByName(name) {
        return await Character.findOne({ where: { name } });

    }

    async save(c) {
        return await Character.create(c);
    }

    async update(id, c){
        return await Character.update(c, {
            where: {
                id
            }
        });
    }

    async remove(id) {
        return await Character.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = CharacterRepository;