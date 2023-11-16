import { createRoot } from "react-dom/client";

function Popup() {
  return (
    <div>
      <h1>Popup Page</h1>
    </div>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(<Popup />);
