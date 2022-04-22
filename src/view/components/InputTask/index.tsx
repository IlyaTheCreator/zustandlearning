import React, { useEffect, useRef, useState } from "react";

import styles from "./index.module.scss";

interface InputTaskProps {
  id: string;
  title: string;
  onDone: (id: string) => void;
  onEdited: (id: string, value: string) => void;
  onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({
  id,
  title,
  onDone,
  onEdited,
  onRemoved,
}) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(title);

  const editTitleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditMode]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);

    if (e.target.checked) {
      onDone(id);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleRemoveClick = () => {
    if (confirm("Are you sure?")) {
      onRemoved(id);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSaveClick = () => {
    onEdited(id, inputValue);
    setIsEditMode(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSaveClick();
    }
  };

  const taskText = isEditMode ? (
    <input
      value={inputValue}
      className={styles.inputTaskEditTitle}
      onChange={handleEditChange}
      onKeyDown={handleKeyDown}
      ref={editTitleInputRef}
    />
  ) : (
    <h3 className={styles.inputTaskTitle}>{title}</h3>
  );

  const buttons = (
    <>
      {!isEditMode ? (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={handleEditClick}
        />
      ) : (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={handleSaveClick}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={handleRemoveClick}
      />
    </>
  );

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          disabled={isEditMode}
          className={styles.inputTaskCheckbox}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {taskText}
      </label>
      {buttons}
    </div>
  );
};
