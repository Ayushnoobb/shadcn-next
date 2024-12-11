export const routes  = {
  SELECT_COMPANY_INDEX : '/select-company' ,

  // auth pages
  ADMIN_LOGIN : `${process.env.NEXT_PUBLIC_IDP_FRONTEND}/auth/login?app=HRMS`,
  USER_LOGIN : '/auth/login',

  // pages
  DASHBOARD_INDEX : '/dashboard',
  EMPLOYEE_INDEX : '/employees',
  EMPLOYEE_ACTION : '/employees/action' ,
  BRANCH_INDEX : '/employees/branches',
  BRANCH_ACTION : '/employees/branches/action',
  DEPARTMENT_INDEX : '/employees/departments' ,
  DEPARTMENT_ACTION : '/employees/departments/action',
  SETTINGS_INDEX : '/settings'
}