import {RootState} from 'store/index';

export const getChurchs = (state: RootState) => state.church.churchs;

const ChurchSelectors = {
  getChurchs,
};

export default ChurchSelectors;
