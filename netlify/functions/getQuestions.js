const fetch = require("node-fetch"); // Ensure you have node-fetch installed

exports.handler = async (event, context) => {
  const questions = ["html5", "css3", "js", "react"];
  const responses = {};

  
  try {
    for (const question of questions) {
      const response = await fetch(`https://spiffy-churros-3d8bb5.netlify.app/${question}_questions/${question}_questions.json`);

      if (response.ok) {
        responses[`${question}_questions`] = await response.json();
      } else {
        console.error(`Error fetching ${question}:`, response.statusText);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify(responses),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch questions" }),
    };
  }
};
