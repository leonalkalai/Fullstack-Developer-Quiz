import React, { useEffect, useState } from 'react'; 

const QuestionsFetcher = ({ setQuestions }) => {
    const url = "https://sable-boiled-wedge.glitch.me/api/questions";
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const categories = ['html', 'css', 'js', 'react'];
                const questionsData = {};

                for (const category of categories) {
                    const response = await fetch(`${url}?category=${category}`);
                    if (!response.ok) throw new Error(`Error fetching ${category} questions`);
                    questionsData[`${category}_questions`] = await response.json();
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
