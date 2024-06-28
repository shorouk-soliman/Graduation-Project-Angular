import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnitService } from '../../../../services/unit.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';

@Component({
  selector: 'app-add-admin-brand',
  templateUrl: './add-admin-brand.component.html',
  styleUrls: ['./add-admin-brand.component.css']
})

export class AddAdminBrandComponent implements OnInit {
  notificationMessage: string | null = null;

  myForm: FormGroup = new FormGroup({
    Name: new FormControl("", [Validators.required, Validators.minLength(2), Validators.maxLength(150)]),
    image: new FormControl(null, [Validators.required]),
  });

  @ViewChild('addForm', { static: true }) addForm!: NgForm;

  selectedFile: File | null = null;

  constructor(private unit: UnitService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  AddImageAndBrand() {
    if (!this.myForm.valid) return;

    let formDataImage: FormData = new FormData();

    if (this.selectedFile) {
      formDataImage.append('image', this.selectedFile);
    }

    this.unit.image.ConvertImage(formDataImage).subscribe((res: string) => {
      let insert = { ...this.myForm.value, image: res };
      if (this.myForm.value.Name !== this.myForm.value) {
        this.unit.brand.GetAdminBrand().subscribe(
          (adminBrands: any) => {
            const exists = adminBrands.some((b: any) => b.name.toLowerCase() === this.myForm.value.Name.toLowerCase());
            if (exists) {
               this.notificationMessage =`Brand with name '${this.myForm.value.Name}' already exists.`;
            } else {
              this.AddBrand(insert);
            }
          },
          (error) => {
            console.error('Error fetching admin brands:', error);
              this.notificationMessage ='Failed to update brand. Please try again later.';
          }
        );
      } else {
        this.AddBrand(insert);
      }
    });
  }

  confirmAddBrand(): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { title : 'Add Brand',
         message: 'Are you sure you want to add this brand?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.AddImageAndBrand();
      }
    });
  }

  AddBrand(insert: any) {
    this.unit.brand.AddBrand(insert).subscribe(() => {
      this.myForm.reset();
      this.addForm.resetForm();
      this.router.navigateByUrl('/admin/brand');
    }, error => {
      alert(error.error);
    });
  }
}
