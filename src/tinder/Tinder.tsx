import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, Divider } from "@chakra-ui/react";
import HistoryGroup from "./components/HistoryGroup";
import { HistoryGroups } from "../types/historyGroups"
import Header from "./components/Header";
import customTheme from "../themes/extendTheme";

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
      <Header />
      <Divider />
      {Object.entries(historyGroups).map(([key, group]) => (
        <HistoryGroup key={key} historyGroup={group} />
      ))}
    </>
  );
}

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);
root.render(
  <ChakraProvider theme={customTheme}>
    <Tinder />
  </ChakraProvider>
);
