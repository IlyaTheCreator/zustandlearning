import React, { useCallback, useState } from "react";

import styles from "./index.module.scss";

interface InputPlusProps {
  onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const addTask = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const handleButtonClick = () => {
    addTask();
  };

  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        className={styles.inputPlusValue}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type here"
      />
      <button
        onClick={handleButtonClick}
        aria-label="Add"
        className={styles.inputPlusButton}
      />
    </div>
  );
};
