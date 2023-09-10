import { useState } from 'react';

export default function useRefreshControl() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      finishRefresh();
    }, 3000);
  };

  const finishRefresh = () => {
    setIsRefreshing(false);
  };

  return {
    isRefreshing,
    onRefresh,
    finishRefresh,
  };
}
