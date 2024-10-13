import React, { useEffect, useState } from 'react';

const QuestionsFetcher = ({ setQuestions }) => {

  const urlPath = "https://spiffy-churros-3d8bb5.netlify.app";

  useEffect(() => {

    const fetchQuestions = async () => {

      try {
        const html5Response = await fetch(`${urlPath}/html5_questions/html5_questions.json`);
        const css3Response = await fetch(`${urlPath}/css3_questions/css3_questions.json`);
        const jsResponse = await fetch(`${urlPath}/js_questions/js_questions.json`); 
        const reactResponse = await fetch(`${urlPath}/react_questions/react_questions.json`); 

        // const html5Response = await fetch(`${urlPath}/html5_questions/html5_questions.json`, {
        //   mode: 'no-cors'
        // });
        if (!html5Response.ok) {
          console.error(`HTML5 questions fetch failed: ${html5Response.status} - ${html5Response.statusText}`);
        }
        // const css3Response = await fetch(`${urlPath}/css3_questions/css3_questions.json`, {
        //   mode: 'no-cors'
        // });
        if (!css3Response.ok) {
          console.error(`css3 questions fetch failed: ${css3Response.status} - ${css3Response.statusText}`);
        }
        // const jsResponse = await fetch(`${urlPath}/js_questions/js_questions.json`, {
        //   mode: 'no-cors'
        // });
        if (!jsResponse.ok) {
          console.error(`js questions fetch failed: ${jsResponse.status} - ${jsResponse.statusText}`);
        }
        // const reactResponse = await fetch(`${urlPath}/react_questions/react_questions.json`, {
        //   mode: 'no-cors'
        // });
        if (!reactResponse.ok) {
          console.error(`react questions fetch failed: ${reactResponse.status} - ${reactResponse.statusText}`);
        }

        if (!html5Response.ok || !css3Response.ok || !jsResponse.ok || !reactResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const html5_questions = await html5Response.json();
        const css3_questions = await css3Response.json();
        const js_questions = await jsResponse.json();
        const react_questions = await reactResponse.json();

        // Set the fetched questions in the parent component
        setQuestions({
          html5_questions,
          css3_questions,
          js_questions,
          react_questions,

        });

      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchQuestions();
  }, [setQuestions]); // Pass setQuestions as a dependency

  return null; // This component does not render anything
};

export default QuestionsFetcher;
