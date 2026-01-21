import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromHistory,
  clearHistory,
  setCurrentPlace,
} from '@/store/slices/placesSlice';
import { SearchHistoryItem } from '@/types/place';
import type { RootState, AppDispatch } from '@/store';

export const useSearchHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchHistory } = useSelector((state: RootState) => state.places);

  const handleSelectPlace = (item: SearchHistoryItem) => {
    dispatch(setCurrentPlace(item.place));
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromHistory(id));
  };

  const handleClearAll = () => {
    dispatch(clearHistory());
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return {
    searchHistory,
    handleSelectPlace,
    handleRemove,
    handleClearAll,
    formatTimestamp,
  };
};
