import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import HistoryGroup from "./components/HistoryGroup";
import { HistoryGroups } from "../types/historyGroups"


function Tinder() {
  const [historyGroups, setHistoryGroups] = useState<HistoryGroups>({});

  // 初回ロードのみ
  useEffect(() => {
    chrome.storage.local.get(null, (result) => {
      setHistoryGroups(result as HistoryGroups);
    });
  }, []);  

  return (
    <>
      {Object.entries(historyGroups).map(([key, group]) => (
        <HistoryGroup key={key} historyGroup={group} />
      ))}
    </>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <ChakraProvider>
    <Tinder />
  </ChakraProvider>
);
