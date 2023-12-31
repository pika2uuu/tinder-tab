// 何を保存するタブ(ungrouped)として決めるかによって処理が変わってくる。ブラウザの差異とcaptureできるurlを見極めねば

// インストール時にすべてのタブ情報を取得
chrome.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    // インストール時にすべてのタブを取得
    chrome.tabs.query({}, (tabs) => {
      const allTabData: { [key: string]: any } = {};

      tabs.forEach((tab) => {
        if (tab.id !== undefined) {
          const currentDate = new Date().toISOString();
          const tabIdStr = tab.id.toString();

          allTabData[tabIdStr] = {
            id: tab.id,
            title: tab.title,
            url: tab.url,
            favicon: tab.favIconUrl,
            aspect: 0, // インストール時に開いているタブのスクリーンショットは撮れないので空欄
            lastseen: currentDate,
            screenShot: "", // インストール時に開いているタブのスクリーンショットは撮れないので空欄
          };
        }
      });

      // タブのデータをchrome.storageに保存
      chrome.storage.local.set({ ungrouped: allTabData }, () => {
        console.log("タブのデータが保存されました");
      });
    });
  }
});

chrome.action.onClicked.addListener(() => {
  chrome.storage.local.get("ungrouped", (result) => {
    const currentTime = Date.now();
    // タブが0のときは保存しない
    const numTabs = Object.keys(result.ungrouped).length;
    if (numTabs !== 0) {
      chrome.storage.local.set({ [currentTime]: result.ungrouped }, () => {
        // Tinderタブを開いておく
        let tinderTabId;
        chrome.tabs.create({
          url: "/src/tinder/tinder.html", //絶対パスで指定
          pinned: true,
        }, (newTab) => {
          chrome.storage.local.set({ tindertab: newTab.id });
          tinderTabId = newTab.id
        });
        // Tinderタブ以外のタブを閉じる
        chrome.tabs.query({}, (tabs) => {
          for (const tab of tabs) {
            if (tab.id === tinderTabId!) {
              continue;
            }
            chrome.tabs.remove(tab.id!, () => {
              if (chrome.runtime.lastError) {
                console.error("タブの削除に失敗しました: ", chrome.runtime.lastError);
              }
            });  
          }
        });

        // 'ungrouped' キーを削除
        chrome.storage.local.remove("ungrouped", () => {
          if (chrome.runtime.lastError) {
            console.error("削除に失敗しました: ", chrome.runtime.lastError);
          }
        });
      });
    }
  });
});

chrome.tabs.onUpdated.addListener((tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
  if (changeInfo.status === "complete" && tab.width && tab.height) {
    const aspect = tab.width / tab.height; // カスタムページでスクショ一覧を表示するときアスペクト比にそってサイズを決めることで見栄えよく表示する
    const currentDate = new Date().toJSON();
    // tabDataをcaptureVisibleTabコールバック内で定義したら保存できないキーが出てくる。非同期関数が原因？
    const tabData = { id: tabId, title: tab.title, url: tab.url, favicon: tab.favIconUrl, aspect: aspect, lastseen: currentDate, screenShot: "" };

    // 新しいタブを開いたときにスクショを撮ると発生するエラー対策のアーリーリターン エラー名:Unchecked runtime.lastError: The 'activeTab' permission is not in effect because this extension has not been in invoked.
    // 新しいタブとTinderタブ保存しても意味がないので保存しない(ungrouped に入れない)
    // chrome:// のURLはブラウザによって差異があるので全て保存する方針で
    // 新しいタブや chrome:// のをクリックしても開かないのでhttp系しか保存しないことにした
    if (!tab.url || !(tab.url.startsWith("http://") || tab.url.startsWith("https://"))) {
      return;
    }

    chrome.tabs.captureVisibleTab((imageURl) => {
      tabData.screenShot = imageURl;
      // グループ化してないタブの一覧に追加する
      // タブIDをキーにしているので同じタブでリンク移動したら上書きすることで最新情報を保てる
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

chrome.windows.onCreated.addListener((newWindow) => {
  // 新しいウィンドウの初期アクティブタブを取得
  chrome.tabs.query({ windowId: newWindow.id, active: true }, (initialTabs) => {
    if (initialTabs.length > 0) {
      const initialActiveTabId = initialTabs[0].id;

      // 'tinder.html' のタブを開く
      chrome.tabs.create({
        url: "/src/tinder/tinder.html",
        pinned: true,
        windowId: newWindow.id,
      });

      // 元のアクティブタブにフォーカスを戻す。この処理をしなければ tinder.html にフォーカスがされてしまう。
      chrome.tabs.update(initialActiveTabId!, { active: true });
    }
  });
});
