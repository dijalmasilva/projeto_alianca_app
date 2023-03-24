import {RootState} from 'store/index';

const getDepartamentsOnUserLoggedWasNotIncluded = (state: RootState) =>
  state.departament.departamentsOnUserLoggedWasNotIncluded;

const DepartamentSelectors = {
  getDepartamentsOnUserLoggedWasNotIncluded,
};

export default DepartamentSelectors;
