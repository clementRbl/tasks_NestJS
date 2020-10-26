import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]
  transform(value: any) {
    value = value.toUpperCase();
    
    if (!this.isStatusvalid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }

    return value;
  }
  
  private isStatusvalid(status: any) {
    const index = this.allowStatuses.indexOf(status);
    return index !== -1;
  }
}