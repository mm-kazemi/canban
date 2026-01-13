import type { BoardType } from "../types/board.ts";

export const boardsData: BoardType[] = [
  {
    id: "board-1",
    title: "Personal Tasks",
    description: "My daily and weekly tasks",
    color: "blue",
    lists: [
      {
        id: "list-1-1",
        title: "To Do",
        items: [
          {
            id: "item-1-1",
            title: "Grocery Shopping",
            description: "Buy milk, eggs, and bread",
            dueDate: "2026-01-15",
          },
          {
            id: "item-1-2",
            title: "Laundry",
            description: "Wash and fold clothes",
            dueDate: "2026-01-14",
          },
          {
            id: "item-1-3",
            title: "Call Mom",
            description: "Check in with Mom",
            dueDate: "2026-01-13",
          },
          {
            id: "item-1-4",
            title: "Pay Bills",
            description: "Pay electricity and internet bills",
            dueDate: "2026-01-16",
          },
          {
            id: "item-1-5",
            title: "Walk the dog",
            description: "Take dog for a walk",
            dueDate: "2026-01-12",
          },
        ],
      },
      {
        id: "list-1-2",
        title: "In Progress",
        items: [
          {
            id: "item-1-6",
            title: "Write Report",
            description: "Draft the monthly report",
            dueDate: "2026-01-18",
          },
          {
            id: "item-1-7",
            title: "Design Mockups",
            description: "Create mockups for new website",
            dueDate: "2026-01-20",
          },
          {
            id: "item-1-8",
            title: "Code Feature X",
            description: "Implement feature X",
            dueDate: "2026-01-22",
          },
          {
            id: "item-1-9",
            title: "Review Documents",
            description: "Review project documents",
            dueDate: "2026-01-25",
          },
          {
            id: "item-1-10",
            title: "Testing",
            description: "Testing Feature X",
            dueDate: "2026-01-27",
          },
        ],
      },
      {
        id: "list-1-3",
        title: "Completed",
        items: [
          {
            id: "item-1-11",
            title: "Project Alpha",
            description: "Completed Phase 1",
            dueDate: "2026-01-10",
          },
          {
            id: "item-1-12",
            title: "Meeting with Team",
            description: "Team meeting",
            dueDate: "2026-01-08",
          },
          {
            id: "item-1-13",
            title: "Code Review",
            description: "Code Review",
            dueDate: "2026-01-06",
          },
          {
            id: "item-1-14",
            title: "Documentation",
            description: "Updated Documentation",
            dueDate: "2026-01-04",
          },
          {
            id: "item-1-15",
            title: "Deployment",
            description: "Deployed to production",
            dueDate: "2026-01-02",
          },
        ],
      },
    ],
  },
  {
    id: "board-2",
    title: "Work Projects",
    description: "Current work projects",
    color: "green",
    lists: [
      {
        id: "list-2-1",
        title: "Project A",
        items: [
          {
            id: "item-2-1",
            title: "Task 1",
            description: "Description of task 1",
            dueDate: "2026-01-17",
          },
          {
            id: "item-2-2",
            title: "Task 2",
            description: "Description of task 2",
            dueDate: "2026-01-19",
          },
          {
            id: "item-2-3",
            title: "Task 3",
            description: "Description of task 3",
            dueDate: "2026-01-21",
          },
          {
            id: "item-2-4",
            title: "Task 4",
            description: "Description of task 4",
            dueDate: "2026-01-23",
          },
          {
            id: "item-2-5",
            title: "Task 5",
            description: "Description of task 5",
            dueDate: "2026-01-25",
          },
        ],
      },
      {
        id: "list-2-2",
        title: "Project B",
        items: [
          {
            id: "item-2-6",
            title: "Task 6",
            description: "Description of task 6",
            dueDate: "2026-01-16",
          },
          {
            id: "item-2-7",
            title: "Task 7",
            description: "Description of task 7",
            dueDate: "2026-01-18",
          },
          {
            id: "item-2-8",
            title: "Task 8",
            description: "Description of task 8",
            dueDate: "2026-01-20",
          },
          {
            id: "item-2-9",
            title: "Task 9",
            description: "Description of task 9",
            dueDate: "2026-01-22",
          },
          {
            id: "item-2-10",
            title: "Task 10",
            description: "Description of task 10",
            dueDate: "2026-01-24",
          },
        ],
      },
      {
        id: "list-2-3",
        title: "Blocked",
        items: [
          {
            id: "item-2-11",
            title: "Task 11",
            description: "Blocked by dependency",
            dueDate: "2026-01-11",
          },
          {
            id: "item-2-12",
            title: "Task 12",
            description: "Waiting for review",
            dueDate: "2026-01-13",
          },
          {
            id: "item-2-13",
            title: "Task 13",
            description: "Needs clarification",
            dueDate: "2026-01-15",
          },
          {
            id: "item-2-14",
            title: "Task 14",
            description: "Technical issue",
            dueDate: "2026-01-17",
          },
          {
            id: "item-2-15",
            title: "Task 15",
            description: "Needs more information",
            dueDate: "2026-01-19",
          },
        ],
      },
    ],
  },
  {
    id: "board-3",
    title: "Shopping List",
    description: "Items to buy from the store",
    color: "yellow",
    lists: [
      {
        id: "list-3-1",
        title: "Project A",
        items: [
          {
            id: "item-3-1",
            title: "Task 1",
            description: "Description of task 1",
            dueDate: "2026-01-17",
          },
          {
            id: "item-3-2",
            title: "Task 2",
            description: "Description of task 2",
            dueDate: "2026-01-19",
          },
          {
            id: "item-3-3",
            title: "Task 3",
            description: "Description of task 3",
            dueDate: "2026-01-21",
          },
          {
            id: "item-3-4",
            title: "Task 4",
            description: "Description of task 4",
            dueDate: "2026-01-23",
          },
          {
            id: "item-3-5",
            title: "Task 5",
            description: "Description of task 5",
            dueDate: "2026-01-25",
          },
        ],
      },
      {
        id: "list-3-2",
        title: "Project B",
        items: [
          {
            id: "item-3-6",
            title: "Task 6",
            description: "Description of task 6",
            dueDate: "2026-01-16",
          },
          {
            id: "item-3-7",
            title: "Task 7",
            description: "Description of task 7",
            dueDate: "2026-01-18",
          },
          {
            id: "item-3-8",
            title: "Task 8",
            description: "Description of task 8",
            dueDate: "2026-01-20",
          },
          {
            id: "item-3-9",
            title: "Task 9",
            description: "Description of task 9",
            dueDate: "2026-01-22",
          },
          {
            id: "item-3-10",
            title: "Task 10",
            description: "Description of task 10",
            dueDate: "2026-01-24",
          },
        ],
      },
      {
        id: "list-3-3",
        title: "Blocked",
        items: [
          {
            id: "item-3-11",
            title: "Task 11",
            description: "Blocked by dependency",
            dueDate: "2026-01-11",
          },
          {
            id: "item-3-12",
            title: "Task 12",
            description: "Waiting for review",
            dueDate: "2026-01-13",
          },
          {
            id: "item-3-13",
            title: "Task 13",
            description: "Needs clarification",
            dueDate: "2026-01-15",
          },
          {
            id: "item-3-14",
            title: "Task 14",
            description: "Technical issue",
            dueDate: "2026-01-17",
          },
          {
            id: "item-3-15",
            title: "Task 15",
            description: "Needs more information",
            dueDate: "2026-01-19",
          },
        ],
      },
    ],
  },
];
