import TaskInput from "../components/TaskInput";
import TaskList from "../components/TaskList";

interface TaskContentProps {
  openPopupTitle: () => void;
  addTask: (text: string) => void;
  checkTask: (id: number) => void;
  editTask: (id: number) => void;
  deleteTask: (id: number) => void;
  deleteTaskContent: () => void;
  customSettings: any;
  tasks: any[];
  title: string;
  listIndex?: number;
}

export default function TaskContent({
  openPopupTitle,
  addTask,
  checkTask,
  editTask,
  deleteTask,
  deleteTaskContent,
  customSettings,
  tasks,
  title,
  listIndex,
}: TaskContentProps) {
  return (
    <div
      className="content"
      style={{ backgroundColor: customSettings.bgTaskColor }}
    >
      <img
        className="delete-task-content"
        src="/icon-delete.png"
        alt="Delete"
        onClick={deleteTaskContent}
      />
      <h1 style={{ color: customSettings.fontColor }}>
        {title}
        <img
          className="edit-icon"
          src="/icon-edit.png"
          alt="edit"
          onClick={openPopupTitle}
        ></img>
      </h1>
      <TaskInput
        onAdd={addTask}
        fontColor={customSettings.fontColor}
        inputBgColor={customSettings.inputBgColor}
      />
      <TaskList
        tasks={tasks}
        onCheck={checkTask}
        onDelete={deleteTask}
        onEdit={editTask}
        listIndex={listIndex}
        fontColor={customSettings.fontColor}
        inputBgColor={customSettings.inputBgColor}
      />
    </div>
  );
}
