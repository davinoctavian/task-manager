import TaskItem from "./TaskItem";
import "../styles/TaskList.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  fontColor: string;
  inputBgColor: string;
  listIndex?: number;
}

export default function TaskList({
  tasks,
  onCheck,
  onDelete,
  onEdit,
  fontColor,
  inputBgColor,
  listIndex,
}: TaskListProps) {
  return (
    // <ul className="task-list" style={{ color: fontColor }}>
    //   {tasks.map((t) => (
    //     <TaskItem
    //       key={t.id}
    //       task={t.text}
    //       completed={t.completed}
    //       onCheck={() => onCheck(t.id)}
    //       onEdit={() => onEdit(t.id)}
    //       onDelete={() => onDelete(t.id)}
    //       inputBgColor={inputBgColor}
    //     />
    //   ))}
    // </ul>
    <Droppable droppableId={`list-${listIndex}`}>
      {(provided) => (
        <ul
          className="task-list"
          style={{ color: fontColor }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.length === 0 && <li className="empty-placeholder">&nbsp;</li>}

          {tasks.map((t, index) => (
            <Draggable key={t.id} draggableId={t.id.toString()} index={index}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TaskItem
                    task={t.text}
                    completed={t.completed}
                    onCheck={() => onCheck(t.id)}
                    onEdit={() => onEdit(t.id)}
                    onDelete={() => onDelete(t.id)}
                    inputBgColor={inputBgColor}
                  />
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}
