// netlify/functions/getQuestions.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const fileNames = [
    'html5_questions/html5_questions.json',
    'css3_questions/css3_questions.json',
    'js_questions/js_questions.json',
    'react_questions/react_questions.json'
  ];

  try {
    const questions = {};

    for (const fileName of fileNames) {
      const jsonFilePath = path.join(__dirname, `../${fileName}`);
      const jsonData = fs.readFileSync(jsonFilePath, 'utf8');
      questions[fileName.split('/')[0]] = JSON.parse(jsonData);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(questions),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'File Not Found' }),
    };
  }
};
