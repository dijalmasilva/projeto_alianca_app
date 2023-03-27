import {RootState} from 'store/index';

const getDepartmentsOnUserLoggedWasNotIncluded = (state: RootState) =>
  state.department.departmentsOnUserLoggedWasNotIncluded;

const DepartmentSelectors = {
  getDepartmentsOnUserLoggedWasNotIncluded,
};

export default DepartmentSelectors;
