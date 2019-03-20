const axios = require('axios');
const db = require('../../db');
const matchCompanyWithStudents = require('../../matches');
const frontendDataRespository = require('../frontend-data/frontend-data.repository');

exports.index = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    resolve(frontendDataRespository.getQuestionsCount());
  });

  promise
    .then(count => {
      const score = Math.round(count * 0.6);

      // Create a reference to the companies collection
      const companiesRef = db.collection('companies');

      // Create a query against the collection
      let dbQuery = companiesRef;
      if (req.query.filter === 'certified') {
        dbQuery = companiesRef.where('score', '>=', score).orderBy('score', 'desc');
      }
      return dbQuery
        .orderBy('name', 'asc')
        .get()
        .then(snapshot =>
          snapshot.docs.map(doc => {
            return { ...doc.data(), id: doc.id };
          })
        )
        .then(data => {
          res.json({
            data
          });
        })
        .catch(error => console.error('companies data error', error));
    })
    .catch(error => console.error('companies data error', error));
};

exports.store = (req, res) => {
  // Save the results of a promise for later use
  let companyId;
  db.collection('companies')
    .add({
      name: req.body.companyName,
      interview_date: req.body.interviewDate,
      score: req.body.score,
      checked_checklist_ids: req.body.checkedIds,
      industry: req.body.industry,
      tech: req.body.tech,
      created_at: new Date().toISOString()
    })
    .then(company => {
      companyId = company.id;
      res.json({
        id: companyId
      });
    })
    .then(() => {
      // Get checklist questions count to calculate minimum score
      return frontendDataRespository.getQuestionsCount();
    })
    .then(count => {
      const minScore = Math.round(count * 0.6);

      if (req.body.score >= minScore) {
        // Get students for matching
        db.collection('students')
          .get()
          .then(snapshot =>
            snapshot.docs.map(doc => {
              return { ...doc.data(), id: doc.id };
            })
          )
          .then(students => {
            // Run the matching algorithm
            const company = req.body;
            return matchCompanyWithStudents.matches(company, students);
          })
          .then(matches => {
            // Post message to Slack
            const numberOfMatches = matches.length;
            const noun = numberOfMatches === 1 ? 'student' : 'students';

            if (numberOfMatches > 0) {
              axios
                .post(process.env.SLACK_WEBHOOK, {
                  text: `*${
                    req.body.companyName
                  }* has been matched up with *${numberOfMatches} ${noun}*.\nView the matches here: http://company-cert-frontend.bridgeschoolapp.io/companies/${companyId}`
                })
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.log(error);
                });
            }
          });
        // .catch(err => console.error('Error getting student data', err));
      }
    })
    .catch(error => console.error('Error adding document: ', error));
};

exports.show = (req, res) => {
  db.collection('companies')
    .doc(req.params.id)
    .get()
    .then(doc => res.json(doc.data()))
    .catch(error => console.error('Error getting company data: ', error));
};

// exports.update = update a company
// exports.destroy = delete a company
