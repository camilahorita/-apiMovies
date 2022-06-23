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

}

module.exports = MovieNotesController;