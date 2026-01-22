/**
 * Analytics tracking utilities
 * Ready for integration with Google Analytics, Mixpanel, or other analytics services
 */

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

/**
 * Tracks a search event
 * @param query - The search query
 * @param resultFound - Whether a result was found
 */
export const trackSearch = (query: string, resultFound: boolean): void => {
  const event: AnalyticsEvent = {
    category: 'Search',
    action: resultFound ? 'Search Success' : 'Search Failed',
    label: query,
  };
  
  logAnalyticsEvent(event);
};

/**
 * Tracks a place selection from autocomplete
 * @param placeName - The name of the selected place
 * @param source - Where the selection came from
 */
export const trackPlaceSelection = (
  placeName: string, 
  source: 'autocomplete' | 'history' | 'history-autocomplete' | 'fallback-autocomplete' | 'enter'
): void => {
  const event: AnalyticsEvent = {
    category: 'Place Selection',
    action: `Selected from ${source}`,
    label: placeName,
  };
  
  logAnalyticsEvent(event);
};

/**
 * Tracks an error occurrence
 * @param errorContext - Where the error occurred
 * @param errorMessage - The error message
 */
export const trackError = (errorContext: string, errorMessage: string): void => {
  const event: AnalyticsEvent = {
    category: 'Error',
    action: errorContext,
    label: errorMessage,
  };
  
  logAnalyticsEvent(event);
};

/**
 * Tracks history interactions
 * @param action - The action performed ('clear_all' | 'remove_item' | 'view_item')
 */
export const trackHistoryAction = (action: 'clear_all' | 'remove_item' | 'view_item'): void => {
  const event: AnalyticsEvent = {
    category: 'History',
    action: action.replace('_', ' '),
  };
  
  logAnalyticsEvent(event);
};

/**
 * Tracks map interactions
 * @param action - The action performed ('marker_click' | 'info_window_open' | 'info_window_close')
 * @param placeName - The place name if applicable
 */
export const trackMapInteraction = (action: string, placeName?: string): void => {
  const event: AnalyticsEvent = {
    category: 'Map Interaction',
    action,
    label: placeName,
  };
  
  logAnalyticsEvent(event);
};

/**
 * Internal function to log analytics events
 * Can be extended to send to actual analytics service
 * @param event - The analytics event to log
 */
function logAnalyticsEvent(event: AnalyticsEvent): void {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event);
  }
  
  // TODO: Integrate with actual analytics service
  // Example for Google Analytics:
  // if (window.gtag) {
  //   window.gtag('event', event.action, {
  //     event_category: event.category,
  //     event_label: event.label,
  //     value: event.value,
  //   });
  // }
  
  // Example for Mixpanel:
  // if (window.mixpanel) {
  //   window.mixpanel.track(event.action, {
  //     category: event.category,
  //     label: event.label,
  //     value: event.value,
  //   });
  // }
}
