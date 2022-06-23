const {hash, compare} = require("bcryptjs");
const knex = require("../database/knex");
const AppErrors = require("../utils/AppErrors");

class UserController {
  async create (request, response) {
    const { name, email, password } = request.body;
    const checkUserExists = await knex("users").where({email}).first();
    if(checkUserExists) {
      throw new AppErrors("Este email já está em uso");
    }
    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword
    });
    return response.status(201).json();
  }
  
  async update (request, response) {
    const { name, email, password, old_password } = request.body;
    const { id } = request.params;

    const user = await knex("users").where({ id }).first();

    if(!user) {
      throw new AppErrors("Usuário não existe")
    }

    const userEmailExist = await knex("users").where({ email }).first();

    if (userEmailExist && userEmailExist.email !== user.email){
      throw new AppErrors("Este email já está cadastrado");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppErrors("É necessario digitar a senha antiga");
    }
    if (password && old_password){
      const checkOldPassword =  await compare(old_password, user.password);
      if (!checkOldPassword){
        throw new AppErrors("A senha não confere");
      }
      user.password = await hash(password, 8);
    }
    await knex("users").update({
      name : user.name,
      email: user.email,
      password: user.password
    }).where({id});
  return response.status(200).json();
  }
}
module.exports = UserController;