const db = require('../../db');

exports.index = (req, res) => {
  db.collection('students')
    .get()
    .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    .then(data => res.json(data))
    .catch(err => console.error('Error getting student data', err));
};

exports.store = (req, res) => {
  db.collection('students')
    .add({
      name: req.body.studentName,
      interview_date: req.body.interviewDate,
      industry: req.body.industry,
      tech: req.body.tech,
      created_at: new Date().toISOString()
    })
    .then(data => {
      // @TODO define structure for responses as a group
      res.json({
        id: data.id
      });
    })
    .catch(error => console.error('Error adding document: ', error));
};

exports.show = (req, res) => {
  db.collection('students')
    .doc(req.params.id)
    .get()
    .then(doc => res.json(doc.data()))
    .catch(error => console.error('Error getting student data: ', error));
};
