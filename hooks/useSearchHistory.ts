import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromHistory,
  clearHistory,
  setCurrentPlace,
} from '@/store/slices';
import { searchHistorySelector } from '@/store/selectors';
import { trackHistoryAction, trackPlaceSelection } from '@/utils';
import type { AppDispatch } from '@/store';

export const useSearchHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchHistory = useSelector(searchHistorySelector);

  const handleSelectPlace = (item: SearchHistoryItem) => {
    trackPlaceSelection(item.place.name, 'history');
    trackHistoryAction('view_item');
    dispatch(setCurrentPlace(item.place));
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    trackHistoryAction('remove_item');
    dispatch(removeFromHistory(id));
  };

  const handleClearAll = () => {
    trackHistoryAction('clear_all');
    dispatch(clearHistory());
  };

  return {
    searchHistory,
    handleSelectPlace,
    handleRemove,
    handleClearAll,
  };
};
