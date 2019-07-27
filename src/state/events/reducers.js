const initialState = {
  allEvents: [],
  filterColors: [
    {
      icon: 'dream-act-icon',
      filterBy: 'Town Hall',
      color: '#CA4948',
    },
    { icon: 'dark-orange', filterBy: 'Impeachment Inquiry', color: '#DB8011' },
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
