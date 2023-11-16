import { createRoot } from "react-dom/client";

function Options() {
  return (
    <div>
      <h1>Options Page</h1>
    </div>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(<Options />);
