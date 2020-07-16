import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  public task: any;
  public mode: number;

  constructor(private authService:AuthenticationService) { }

  ngOnInit(): void {
  }

  onSaveTask(task) {
    this.authService.saveTask(task)
      .subscribe(resp =>{
        this.task = resp;
        console.log(this.task);
         this.mode = 2;
      }, error =>{
         this.mode = 0;
        console.log(error);
      });

  }
}
