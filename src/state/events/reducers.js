const initialState = {
  allEvents: [],
  filterColors: [
    {
      icon: 'trump-tax-scam-icon',
      filterBy: 'Town Hall',
      color: '#2a4b6c',
    },
    {
      icon: 'dark-orange',
      filterBy: 'Impeachment Inquiry',
      color: '#ff914d',
    },
  ],
};

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EVENTS':
      return {
        ...state,
        allEvents: [...state.allEvents, ...action.events],
      };
    case 'UPDATE_COLORS':
      return {
        ...state,
        filterColors: action.colorMap,
      };
    default:
      return state;
  }
};

export default eventsReducer;
