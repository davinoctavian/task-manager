import "../styles/TaskItem.css";

interface TaskItemProps {
  task: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  inputBgColor: string;
}

export default function TaskItem({
  task,
  completed,
  onToggle,
  onDelete,
  inputBgColor,
}: TaskItemProps) {
  return (
    <li
      className={`task-item ${completed ? "completed" : ""}`}
      style={{ backgroundColor: inputBgColor }}
    >
      <span onClick={onToggle}>{task}</span>
      <button onClick={onDelete}>✕</button>
    </li>
  );
}
