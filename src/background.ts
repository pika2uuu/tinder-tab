chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: "/src/tinder/tinder.html" }); //絶対パスだった
});

chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab : chrome.tabs.Tab) => {
  if (changeInfo.status === "complete" && tab.width && tab.height) {
    const aspect = tab.width / tab.height; // カスタムページでスクショ一覧を表示するときアスペクト比にそってサイズを決めることで見栄えよく表示する
    const currentDate = new Date().toJSON();
    // tabDataをcaptureVisibleTabコールバック内で定義したら保存できないキーが出てくる。非同期関数が原因？
    const tabData = { id: tabId, title: tab.title, url: tab.url, favicon: tab.favIconUrl, aspect: aspect, lastseen: currentDate, screenShot: "" };

    // 新しいタブを開いたときにスクショを撮ると発生するエラー対策のアーリーリターン エラー名:Unchecked runtime.lastError: The 'activeTab' permission is not in effect because this extension has not been in invoked.
    if (!tab.url || !(tab.url.startsWith("http://") || tab.url.startsWith("https://"))) {
      return;
    }

    chrome.tabs.captureVisibleTab((imageURl) => {
      tabData.screenShot = imageURl;
      // グループ化してないタブの一覧に追加する 
      // タブIDをキーにしているので同じタブでリンク移動したら上書きすることで最新情報を保てる
      // "ungrouped"{ (tabのID): { ...(tabの情報)...}, (tabのID): { ...(tabの情報)... } }
      chrome.storage.local.get("ungrouped", (result) => {
        let currentTabs = result.ungrouped ?? {};
        currentTabs[tabId] = tabData;
        chrome.storage.local.set({ ungrouped: currentTabs });
      });
      console.log(`[${tab.id}] をスクショしました`);
    });
  }
});

// タブを削除したらスクショを削除
chrome.tabs.onRemoved.addListener((tabId: number) => {
  const key = String(tabId); // キーはstringのみ可能

  chrome.storage.local.get(key, (result: { [key: string]: any }) => {
    
    if (result.hasOwnProperty(key)) {
      chrome.storage.local.remove(key, () => {
        console.log(`[${tabId}] を削除しました`);
      });
    } else {
      // 拡張機能インストール前に開いてたタブだったり、http/https以外のタブを開いて閉じた場合は保存しないから削除もしない
      console.log(`[${tabId}] は存在しないため削除しませんでした`);
    }
  });
});
