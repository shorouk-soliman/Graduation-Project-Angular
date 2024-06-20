import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
@Input() show:boolean = true;
@Input() msg:string = '';

@Output() confirmResponse:EventEmitter<boolean> = new EventEmitter<boolean>(false);

hide(){
  this.show = false;
  this.confirmResponse.emit(false);
}

YesCondition(){
  this.show = false;
  this.confirmResponse.emit(true);
}


}
