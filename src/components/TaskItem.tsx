import "../styles/TaskItem.css";

interface TaskItemProps {
  task: string;
  completed: boolean;
  onCheck: () => void;
  onDelete: () => void;
  onEdit: () => void;
  inputBgColor: string;
}

export default function TaskItem({
  task,
  completed,
  onCheck,
  onDelete,
  onEdit,
  inputBgColor,
}: TaskItemProps) {
  return (
    <li
      className={`task-item ${completed ? "completed" : ""}`}
      style={{ backgroundColor: inputBgColor }}
    >
      <div className="item-content">
        <input type="checkbox" checked={completed} onChange={onCheck} />
        <span onClick={onEdit}>{task}</span>
      </div>
      <img
        className="delete"
        src="/icon-delete.png"
        alt="Delete"
        onClick={onDelete}
      />
    </li>
  );
}
