import React, { useEffect } from 'react';

const QuestionsFetcher = ({ setQuestions }) => {
  useEffect(() => {
    const fetchQuestions = async () => {
      console.log('Response Starting:');
      try {
        const response = await fetch('/.netlify/functions/getQuestions');

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchQuestions();
  }, [setQuestions]);

  
  return null; // This component does not render anything
};

export default QuestionsFetcher;
