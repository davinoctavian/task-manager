import { useLocalStorage } from "./hooks/useLocalStorage";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./styles/App.css";

interface Task {
  id: number;
  text: string;
  completed: boolean;
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
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [customSettings, setCustomSettings] = useLocalStorage<Settings>(
    "customSettings",
    defaultSettings,
  );

  const addTask = (text: string) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="app" style={{ backgroundColor: customSettings.bgColor }}>
      <div
        className="content"
        style={{ backgroundColor: customSettings.bgTaskColor }}
      >
        <h1 style={{ color: customSettings.fontColor }}>Task Manager</h1>
        <TaskInput
          onAdd={addTask}
          fontColor={customSettings.fontColor}
          inputBgColor={customSettings.inputBgColor}
        />
        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          fontColor={customSettings.fontColor}
          inputBgColor={customSettings.inputBgColor}
        />
      </div>
      <div className="content-custom">
        <h2>Custom Styled Section</h2>
        <div className="custom-setting">
          <div className="d-flex align-center justify-between gap-10 pb-10">
            <label>Bg Color</label>
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
            <label>Bg Task Color</label>
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
            <label>Font Color</label>
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
            <label>Input Bg Color</label>
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
  );
}
