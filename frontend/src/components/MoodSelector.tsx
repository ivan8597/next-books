import React from 'react';
import { useDispatch } from 'react-redux';
import { setMood } from '../store/booksSlice';
import styles from '../styles/MoodSelector.module.scss';

const MoodSelector: React.FC = () => {
  const dispatch = useDispatch();
  const moods = ['Inspiration', 'Calm', 'Adrenaline'];

  const handleMoodChange = (mood: string) => {
    dispatch(setMood(mood.toLowerCase()));
  };

  return (
    <div className={styles.moodSelector}>
      <h2>Выберите ваше настроение</h2>
      <div className={styles.buttons}>
        {moods.map((mood) => (
          <button key={mood} onClick={() => handleMoodChange(mood)}>
            {mood}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;