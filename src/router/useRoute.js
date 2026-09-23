import { useCallback, useEffect, useState } from "react";

// 地址栏保存当前页面；刷新以及浏览器前进、后退时都从地址栏读取。
export function useRoute() {
  const [path, setPath] = useState(() => window.location.pathname);

  useEffect(() => {
    const syncPath = () => setPath(window.location.pathname);
    window.addEventListener("popstate", syncPath);
    syncPath();
    return () => window.removeEventListener("popstate", syncPath);
  }, []);

  const navigate = useCallback((nextPath) => {
    if (window.location.pathname !== nextPath) {
      window.history.pushState(null, "", nextPath);
    }
    // pushState 不会触发 popstate，需要主动更新 React 状态。
    setPath(window.location.pathname);
  }, []);

  return { path, navigate };
}
