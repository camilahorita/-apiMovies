const knex = require("../database/knex");
const AppErrors = require("../utils/AppErrors");

class MovieNotesController {
  
  async create( request, response ) {
    const { title, description, rating, user_id, tags } = request.body;

    const note_id = await knex("movieNotes").insert({
      title,
      description,
      rating,
      user_id
    })

    const tagsToInsert = tags.map(name => {
      return{
        note_id,
        user_id,
        name,
      }
    })
    await knex("movieTags").insert(tagsToInsert);

    response.json()
  }

  async delete(request, response) {

    const { id } = request.params;
    
    await knex("movieNotes").where({id}).delete();

    return response.json();
  }

  async show (request, response) {
    const {id} = request.params;

    const movie = await knex("movieNotes").where({id}).first();
    const tags = await knex("movieTags").where({note_id: id}).orderBy("name");

    if(!movie){
      throw new AppErrors("O filme não existee");
    }

    return response.json({
      ...movie,
      tags
    });   
  }

}

module.exports = MovieNotesController;