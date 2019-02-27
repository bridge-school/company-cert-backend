const db = require('../../db');

// const companiesController = (req, res) => {
//   db.collection('companies')
//     .get()
//     .then(snapshot => snapshot.docs.map(doc => doc.data()))
//     .then(data => {
//       res.json({
//         data
//       });
//     })
//     .catch(error => console.error('companies data error', error));
// };

// module.exports = {
//   companiesController
// };

// exports.index = get all the companies
exports.index = (req, res) => {
  // return res.json({ data: 'NOT IMPLEMENTED: Listing of companies' });
  db.collection('companies')
    .get()
    .then(snapshot => snapshot.docs.map(doc => doc.data()))
    .then(data => {
      res.json({
        data
      });
    })
    .catch(error => console.error('companies data error', error));
};

// exports.store = create a new company
exports.store = (req, res) => {
  // return res.json({ data: 'NOT IMPLEMENTED: Create a new company' });
  db.collection('companies')
    .add({
      name: 'Brain Box',
      interview_date: '2019-02-28',
      // created_at: db.FieldValue.serverTimestamp()
      created_at: new Date().getTime()
    })
    .then(data => {
      res.json({
        id: data.id
      });
    })
    .catch(error => console.error('Error adding document: ', error));
};

// exports.show = get one company
// exports.update = update a company
// exports.destroy = delete a company
