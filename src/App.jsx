import { useState } from 'react';

import Section from 'components/Section';
import FeedbackOptions from 'components/FeedbackOptions';
import Statistics from 'components/Statistics';
import Notification from 'components/Notification';

function App() {
  const [state, setState] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const { good, neutral, bad } = state;

  function onLeaveFeedback(name) {
    setState(prevState => {
      return {...prevState, 
        [name]: prevState[name] + 1,
      };
    });
  }
  function countTotalFeedback() {
    return good + neutral + bad;
  }
  function countPositiveFeedbackPercentage(total) {
    return Number(((good / total) * 100).toFixed(2));
  }
  
  const total = countTotalFeedback();

  const positivePercentage = countPositiveFeedbackPercentage(total);
  const names = Object.keys(state);
  

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={names}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      {total ? (
        <Section title="Statistics">
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
}
export default App;

