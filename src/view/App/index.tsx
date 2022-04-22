import React from "react";

import { useTodoStore } from "../../data/stores/useTodoStore";
import { InputPlus } from "../../view/components/InputPlus";
import { InputTask } from "../components/InputTask";

import styles from "./index.module.scss";

export const App: React.FC = () => {
  const { tasks, createTask, updateTask, removeTask } = useTodoStore(
    (state) => state
  );

  const addHandler = (title: string) => {
    createTask(title);
  };

  const doneHandler = (id: string) => {
    removeTask(id);
  };

  const removeHandler = (id: string) => {
    removeTask(id);
  };

  const editHandler = (id: string, title: string) => {
    updateTask(id, title);
  };

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>ToDo App</h1>
      <section className={styles.articleSection}>
        <InputPlus onAdd={addHandler} />
      </section>
      <section className={styles.articleSection}>
        {!tasks.length && <p className={styles.articleText}>No tasks.</p>}
        {tasks &&
          tasks.map((task) => (
            <InputTask
              onDone={doneHandler}
              onRemoved={removeHandler}
              onEdited={editHandler}
              key={task.id}
              id={task.id}
              title={task.title}
            />
          ))}
      </section>
    </article>
  );
};
