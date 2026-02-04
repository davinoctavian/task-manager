import TaskItem from "./TaskItem";
import "../styles/TaskList.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  fontColor: string;
  inputBgColor: string;
}

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  fontColor,
  inputBgColor,
}: TaskListProps) {
  return (
    <ul className="task-list" style={{ color: fontColor }}>
      {tasks.map((t) => (
        <TaskItem
          key={t.id}
          task={t.text}
          completed={t.completed}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          inputBgColor={inputBgColor}
        />
      ))}
    </ul>
  );
}
