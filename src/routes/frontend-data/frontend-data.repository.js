const db = require('../../db');

exports.getQuestionsCount = () => {
  // we want to get the questions count from the front_end_data collection
  return db
    .collection('front_end_data')
    .doc('company_checklist')
    .get()
    .then(doc => doc.data())
    .then(data => {
      return data.checklist.length;
    })
    .catch(error => console.error('Error retrieving company checklist questions count.', error));
};
