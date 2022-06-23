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

  async index(request, response) {
    const {user_id, title, tags} = request.query;
    let notes;
     
    if(tags) {
      // transform to an array
      const filterTags = tags.split(",").map(tag => tag.trim());

      notes = await knex("movieTags")
      .select([
        "movieNotes.id",
        "movieNotes.title",
        "movieNotes.user_id",
      ])
      .where("movieNotes.user_id", user_id)
      .whereLike("movieNotes.title", `%${title}%`)
      .whereIn("name", filterTags)
      .innerJoin("movieNotes", "movieNotes.id", "movieTags.note_id")
      .orderBy("movieNotes.title")

    }else{

    notes = await knex("movieNotes")
    .where({ user_id })
    .whereLike("title", `%${title}%`)
    .orderBy("title");
    }

    const userTags = await knex("movieTags").where({ user_id });

    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter( tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWithTags)
  }


}


module.exports = MovieNotesController;