import React, { useEffect } from 'react'; 

const QuestionsFetcher = ({ setQuestions }) => {
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const url = "https://sable-boiled-wedge.glitch.me/api/questions";
                const collections = ['html5', 'css3', 'js', 'react'];
                const questionsData = {};

                // Fetch data for each collection
                for (const collection of collections) {

                  const response = await fetch(`${url}/${collection}_questions`, {
                      headers: {
                          'x-api-key': apiKey, // Include the API key in the request headers
                      },
                  });
                    
                    // Check if the response is ok
                    if (!response.ok) throw new Error(`Error fetching ${collection} questions`);
                    
                    questionsData[collection] = await response.json(); // Store the data
                }

                // Set the fetched questions in the parent component
                setQuestions(questionsData);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };

        fetchQuestions();
    }, [setQuestions]);

    return null; // This component does not render anything
};

export default QuestionsFetcher;
