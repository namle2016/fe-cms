export enum AppActionEnum {
  create = 'create',
  update = 'update',
  delete = 'delete',
  reset = 'reset',
}

export interface ParameterGet {
  order?: string;
  page?: number;
  take?: number;
  searchKey?: string;
}

export enum NotificationTypeEnum {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'error',
}

export enum AppConfirmModalEnum {
  delete = 'delete',
  confirm = 'confirm',
  info = 'info',
  warning = 'warning',
}