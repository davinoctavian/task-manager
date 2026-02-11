import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskContent from "./components/TaskContent";
import "./styles/App.css";
import { useState } from "react";
import Popup from "./utils/Popup";
import { getContrastColor } from "./utils/colorUtils";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskContent {
  title: string;
  tasks: Task[];
}

interface Settings {
  bgColor: string;
  bgTaskColor: string;
  fontColor: string;
  inputBgColor: string;
}

const defaultSettings = {
  bgColor: "#f0f0f0",
  bgTaskColor: "#ffffff",
  fontColor: "#000000",
  inputBgColor: "#ffffff",
};

export default function App() {
  const [taskContent, setTaskContent] = useLocalStorage<TaskContent[]>(
    "taskContent",
    [{ title: "Task Manager", tasks: [] }],
  );
  const [customSettings, setCustomSettings] = useLocalStorage<Settings>(
    "customSettings",
    defaultSettings,
  );
  const [draftTitle, setDraftTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState<number | null>(null);
  const [draftTaskText, setDraftTaskText] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceListIndex = parseInt(
      result.source.droppableId.split("-")[1],
      10,
    );
    const destListIndex = parseInt(
      result.destination.droppableId.split("-")[1],
      10,
    );

    const newTaskContent = [...taskContent];

    // same list reorder
    if (sourceListIndex === destListIndex) {
      const tasks = Array.from(newTaskContent[sourceListIndex].tasks);
      const [moved] = tasks.splice(result.source.index, 1);
      tasks.splice(result.destination.index, 0, moved);
      newTaskContent[sourceListIndex].tasks = tasks;
    } else {
      // cross-list move
      const sourceTasks = Array.from(newTaskContent[sourceListIndex].tasks);
      const [moved] = sourceTasks.splice(result.source.index, 1);
      const destTasks = Array.from(newTaskContent[destListIndex].tasks);
      destTasks.splice(result.destination.index, 0, moved);
      newTaskContent[sourceListIndex].tasks = sourceTasks;
      newTaskContent[destListIndex].tasks = destTasks;
    }

    setTaskContent(newTaskContent);
  };

  const addTask = (text: string, index: number) => {
    const newTaskContent = [...taskContent];
    newTaskContent[index].tasks.push({
      id: Date.now(),
      text,
      completed: false,
    });
    setTaskContent(newTaskContent);
  };

  const checkTask = (id: number, index: number) => {
    const newTaskContent = [...taskContent];
    const taskIndex = newTaskContent[index].tasks.findIndex((t) => t.id === id);
    if (taskIndex !== -1) {
      newTaskContent[index].tasks[taskIndex].completed =
        !newTaskContent[index].tasks[taskIndex].completed;
    }
    setTaskContent(newTaskContent);
  };

  const editTask = (id: number, index: number) => {
    setIsEditingTask(id);
    setEditingTaskIndex(index);
    setDraftTaskText(
      taskContent[index].tasks.find((t) => t.id === id)?.text || "",
    );
  };

  const saveTask = (id: number, index: number) => {
    if (isEditingTask !== null) {
      const newTaskContent = [...taskContent];
      const taskIndex = newTaskContent[index].tasks.findIndex(
        (t) => t.id === id,
      );
      if (taskIndex !== -1) {
        newTaskContent[index].tasks[taskIndex].text = draftTaskText;
      }
      setTaskContent(newTaskContent);
      setIsEditingTask(null);
      setDraftTaskText("");
    }
  };

  const deleteTask = (id: number, index: number) => {
    setTaskContent((prev) => {
      const newTaskContent = [...prev];
      newTaskContent[index].tasks = newTaskContent[index].tasks.filter(
        (t) => t.id !== id,
      );
      return newTaskContent;
    });
  };

  const openPopupTitle = (index: number) => {
    setEditingTaskIndex(index);
    setDraftTitle(taskContent[index].title);
    setIsEditingTitle(true);
  };

  const saveTitle = (index: number) => {
    const newTaskContent = [...taskContent];
    newTaskContent[index].title = draftTitle;
    setTaskContent(newTaskContent);
    setIsEditingTitle(false);
  };
  const buttonColor = getContrastColor(customSettings.fontColor);

  return (
    <div className="app" style={{ backgroundColor: customSettings.bgColor }}>
      <button
        className="add-button"
        style={{
          color: customSettings.fontColor,
          backgroundColor: buttonColor,
          borderColor: customSettings.fontColor,
        }}
        onClick={() => {
          setTaskContent([...taskContent, { title: "Task List", tasks: [] }]);
        }}
      >
        New Task List
      </button>
      <div className="content-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="tasklist-content">
            {taskContent.map((content, index) => (
              <TaskContent
                key={index}
                openPopupTitle={() => openPopupTitle(index)}
                addTask={(text) => addTask(text, index)}
                checkTask={(id) => checkTask(id, index)}
                editTask={(id) => editTask(id, index)}
                deleteTask={(id) => deleteTask(id, index)}
                deleteTaskContent={() => {
                  const newTaskContent = [...taskContent];
                  newTaskContent.splice(index, 1);
                  setTaskContent(newTaskContent);
                }}
                customSettings={customSettings}
                tasks={content.tasks}
                title={content.title}
                listIndex={index}
              />
            ))}
          </div>
        </DragDropContext>

        <div
          className="content-custom"
          style={{ backgroundColor: customSettings.bgTaskColor }}
        >
          <h2 style={{ color: customSettings.fontColor }}>
            Custom Styled Section
          </h2>
          <div className="custom-setting">
            <div className="d-flex align-center justify-between gap-10 pb-10">
              <label style={{ color: customSettings.fontColor }}>
                Bg Color
              </label>
              <input
                type="color"
                value={customSettings.bgColor}
                onChange={(e) =>
                  setCustomSettings({
                    ...customSettings,
                    bgColor: e.target.value,
                  })
                }
              />
            </div>
            <div className="d-flex align-center justify-between gap-10 pb-10">
              <label style={{ color: customSettings.fontColor }}>
                Bg Task Color
              </label>
              <input
                type="color"
                value={customSettings.bgTaskColor}
                onChange={(e) =>
                  setCustomSettings({
                    ...customSettings,
                    bgTaskColor: e.target.value,
                  })
                }
              />
            </div>
            <div className="d-flex align-center justify-between gap-10 pb-10">
              <label style={{ color: customSettings.fontColor }}>
                Font Color
              </label>
              <input
                type="color"
                value={customSettings.fontColor}
                onChange={(e) =>
                  setCustomSettings({
                    ...customSettings,
                    fontColor: e.target.value,
                  })
                }
              />
            </div>
            <div className="d-flex align-center justify-between gap-10 pb-10">
              <label style={{ color: customSettings.fontColor }}>
                Input Bg Color
              </label>
              <input
                type="color"
                value={customSettings.inputBgColor}
                onChange={(e) =>
                  setCustomSettings({
                    ...customSettings,
                    inputBgColor: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
      {isEditingTitle && (
        <Popup isOpen={isEditingTitle} onClose={() => setIsEditingTitle(false)}>
          <h2>Edit Title</h2>
          <div className="popup-body">
            <input
              type="text"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
            />
            <button onClick={() => saveTitle(editingTaskIndex!)}>Save</button>
          </div>
        </Popup>
      )}
      {isEditingTask !== null && (
        <Popup
          isOpen={isEditingTask !== null}
          onClose={() => setIsEditingTask(null)}
        >
          <h2>Edit Task</h2>
          <div className="popup-body">
            <input
              type="text"
              value={draftTaskText}
              onChange={(e) => setDraftTaskText(e.target.value)}
            />
            <button onClick={() => saveTask(isEditingTask, editingTaskIndex!)}>
              Save
            </button>
          </div>
        </Popup>
      )}
    </div>
  );
}
