import "../styles/TaskItem.css";

interface TaskItemProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({
  task,
  completed,
  onToggle,
  onDelete,
}: TaskItemProps) {
  return (
    <li className={`task-item ${completed ? "completed" : ""}`}>
      <span onClick={onToggle}>{task}</span>
      <button onClick={onDelete}>✕</button>
    </li>
  );
}
