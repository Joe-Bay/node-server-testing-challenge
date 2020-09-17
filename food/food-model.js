const db = require('../data/connection');

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
};

async function insert(food) {
    return db('food').insert(food, 'id').then(([id]) => {

      return findById(id)
    })
}

async function update(id, changes) {
  return null;
}

function remove(id) {
    return db('food').where({id}).delete()
}

function getAll() {
  return db('food');
}

function findById(id) {
  return db('food').where({id}).first()
}