export class Task{
  id?: string;
  projectId?: string;
  title?:string;
  parent?: boolean;
  category?: string;
  subTasks?: Task[];
  economyCode?: string;
  estimatedCost?: string;
  assignee?: string;
  employeeId?: string;
  priority?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  isParent?:boolean;
  parentTaskTitle?: string;
  parentTaskId?: string;
  status?: string;
  attachments?: string[];
}
