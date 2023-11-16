import { createRoot } from "react-dom/client";

function Options() {
  return (
    <div>
      <h1>Tab Tinder</h1>
    </div>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(<Options />);
