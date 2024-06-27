import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { IUserRead, initUserRead } from '../../../../Models/User/user-read';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
  constructor(private unit: UnitService) { }
  @Input() user: IUserRead = initUserRead;

  SelectedImage: File | null = null;
  defaultImage:string = 'https://localhost:7173/images/default-user.jpg'
  onFileSelected(event: any): void {
    this.SelectedImage = event.target.files[0];
    this.ChangeImage();
  };

  ChangeImage(): void{
    let formDataImage: FormData = new FormData();

    if (this.SelectedImage)
      formDataImage.append('image', this.SelectedImage);

    this.unit.user.UpdateImage(formDataImage).subscribe(() => {
      this.unit.user.FetchUser();
    });
  };

}
