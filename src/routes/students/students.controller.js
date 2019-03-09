const db = require('../../db');

exports.index = (req, res) => {
  db.collection('students')
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    .then(data => res.json(data))
    .catch(err => console.error('Error getting student data', err));
};
