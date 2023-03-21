import {RootState} from 'store/index';

export const loading = (state: RootState) => state.church.loading;
export const getChurchs = (state: RootState) => state.church.churchs;

const ChurchSelectors = {
  getChurchs,
  loading,
};

export default ChurchSelectors;
