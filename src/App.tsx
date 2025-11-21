import type { ReactNode } from "react";

import styles from "./App.module.css";

function App(): ReactNode {
  return (
    <div className={styles.app}>
      <header>Header</header>
      <main>
        <div className={styles.header}>
          <h1>Boards</h1>
          <button>Create</button>
        </div>
        <ul className={styles.boards}>
          <li>
            <div className={styles.board}>
              <div className={styles.cover}></div>
              <div className={styles.content}>
                <div className={styles.header}>
                  <div className={styles.title}>Board 1</div>
                  <a href={"/board"}>View</a>
                </div>
                <p className={styles.description}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Alias amet, autem consequatur consequuntur cumque dolorum eos
                  esse et harum itaque labore libero minima odit pariatur rem
                  repellat sit vel vitae!
                </p>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.board}>
              <div className={styles.cover}>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <div className={styles.title}>Board 1</div>
                    <a href={"/board"}>View</a>
                  </div>
                  <p className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Alias amet, autem consequatur consequuntur cumque dolorum
                    eos esse et harum itaque labore libero minima odit pariatur
                    rem repellat sit vel vitae!
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className={styles.board}>
              <div className={styles.cover}>
                <div className={styles.content}>
                  <div className={styles.header}>
                    <div className={styles.title}>Board 1</div>
                    <a href={"/board"}>View</a>
                  </div>
                  <p className={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Alias amet, autem consequatur consequuntur cumque dolorum
                    eos esse et harum itaque labore libero minima odit pariatur
                    rem repellat sit vel vitae!
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
