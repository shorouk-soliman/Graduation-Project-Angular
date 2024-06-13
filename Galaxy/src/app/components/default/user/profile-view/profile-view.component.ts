import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css'
})
export class ProfileViewComponent {
  constructor(private unit: UnitService) { }
  @Input() user: any;
  @Output() refreshUser:EventEmitter<any> = new EventEmitter<any>()

  SelectedImage: File | null = null;

  onFileSelected(event: any) {
    this.SelectedImage = event.target.files[0];
    this.ChangeImage();
  }


  ChangeImage() {
    let formDataImage: FormData = new FormData();

    if (this.SelectedImage)
      formDataImage.append('image', this.SelectedImage);
    this.unit.user.UpdateImage(formDataImage).subscribe(() => {
      this.refreshUser.emit();
    })
  }

}
