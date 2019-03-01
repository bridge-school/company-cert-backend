const db = require('../../db');

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
  db.collection('companies')
    .add({
      name: req.body.companyName,
      interview_date: req.body.interviewDate,
      score: req.body.score,
      created_at: new Date().getTime()
    })
    .then(data => {
      // @TODO define structure for responses as a group
      res.json({
        id: data.id
      });
    })
    .catch(error => console.error('Error adding document: ', error));
};

// exports.show = get one company
// exports.update = update a company
// exports.destroy = delete a company
