import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromHistory,
  clearHistory,
  setCurrentPlace,
} from '@/store/slices/placesSlice';
import { searchHistorySelector } from '@/store/selectors';
import { SearchHistoryItem } from '@/types/place';
import type { AppDispatch } from '@/store';

export const useSearchHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchHistory = useSelector(searchHistorySelector);

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

  return {
    searchHistory,
    handleSelectPlace,
    handleRemove,
    handleClearAll,
  };
};
