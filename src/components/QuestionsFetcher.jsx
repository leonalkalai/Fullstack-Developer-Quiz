import React, { useEffect } from 'react';

const QuestionsFetcher = ({ setQuestions }) => {
  const functionUrl = "https://spiffy-churros-3d8bb5.netlify.app/.netlify/functions/getQuestions";

  useEffect(() => {
    const fetchQuestions = async () => {
      console.log('Response Starting:');
      try {
        const response = await fetch(functionUrl);

        console.log('Response Status:', response.status); // Log status

        if (response.status !== 200) {
          console.error(`Fetch failed: ${response.status} - ${response.statusText}`);
          throw new Error('Network response was not ok');
        }

        const questionsData = await response.json();
        console.log('Questions Data:', questionsData); // Log the data

        // Set the fetched questions in the parent component
        setQuestions(questionsData);

      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchQuestions();
  }, [setQuestions]); // Pass setQuestions as a dependency

  return null; // This component does not render anything
};

export default QuestionsFetcher;
