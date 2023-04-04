import {RootState} from 'store/index';

const getLoading = (state: RootState) => state.event.loading;

const EventSelectors = {
  getLoading,
};

export default EventSelectors;
