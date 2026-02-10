import { useState } from "react";
import "../styles/TaskInput.css";
import { adjustColor, getContrastColor } from "../utils/colorUtils";

interface TaskInputProps {
  onAdd: (task: string) => void;
  fontColor: string;
  inputBgColor: string;
}

export default function TaskInput({
  onAdd,
  fontColor,
  inputBgColor,
}: TaskInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim());
    setText("");
  };

  const buttonColor = getContrastColor(fontColor);
  const placeholderColor = adjustColor(
    fontColor,
    buttonColor == "#000000" ? -60 : 60,
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="task-input"
      style={
        {
          "--placeholder-color": placeholderColor,
          "--focus-color": fontColor,
        } as React.CSSProperties
      }
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        style={{
          color: fontColor,
          backgroundColor: inputBgColor,
          borderColor: fontColor,
        }}
      />
      <button
        type="submit"
        style={{
          color: fontColor,
          backgroundColor: buttonColor,
          borderColor: fontColor,
        }}
      >
        Add
      </button>
    </form>
  );
}
