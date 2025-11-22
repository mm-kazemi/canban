import type { ReactNode } from "react";

import BoardCard from "./components/BoardCard/BoardCard.tsx";

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
            <BoardCard
              id={1}
              title={"Sprint Task"}
              description={
                "A board to keep track of the team’s work during each sprint, " +
                "including planned user stories, tasks in progress, blocked items, " +
                "and completed work. Great for monitoring the pace of delivery, " +
                "ensuring transparency across the team, and identifying any bottlenecks " +
                "before they affect deadlines."
              }
              color={"gray"}
            />
          </li>

          <li>
            <BoardCard
              id={2}
              title={"Product Roadmap"}
              description={
                "A board designed to visualize the product's strategic direction over time. " +
                "It outlines upcoming features, high-priority fixes, and improvement initiatives, " +
                "linked with milestones and estimated delivery windows. Perfect for aligning " +
                "all stakeholders—from developers and designers to marketing—with the shared " +
                "vision and long-term goals of the product."
              }
              color={"blue"}
            />
          </li>

          <li>
            <BoardCard
              id={3}
              title={"Bug Tracking"}
              description={
                "A dedicated board for logging, triaging, and resolving reported bugs or issues. " +
                "It categorizes problems by severity, impact, and affected components, " +
                "allowing teams to prioritize fixes efficiently. Combined with testing workflows, " +
                "this board ensures that critical system errors are resolved quickly and " +
                "user experience is protected while maintaining release quality."
              }
              color={"red"}
            />
          </li>
        </ul>
      </main>
      <footer>Footer</footer>
    </div>
  );
}

export default App;
