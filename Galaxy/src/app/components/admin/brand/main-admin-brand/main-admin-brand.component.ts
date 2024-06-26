import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { ConfirmMessageComponent } from '../../../shared-componentes/confirm-message/confirm-message.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main-admin-brand',
  templateUrl: './main-admin-brand.component.html',
  styleUrls: ['./main-admin-brand.component.css']
})
export class MainAdminBrandComponent implements OnInit {
  constructor(private unit: UnitService, private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog) { }
  brands: any[] = [];
  isloading: boolean = true;

  ngOnInit(): void {
    this.GetBrands();
  }

  deleteBrand(brand: any): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to delete ${brand.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.brand.DeleteBrand(brand.id).subscribe(() => {
          brand.isDeleted = true;
        }, error => {
          console.error('Error deleting brand', error);
        });
      }
    });
  }

  retrieveBrand(brand: any): void {
    const dialogRef = this.dialog.open(ConfirmMessageComponent, {
      data: { message: `Are you sure you want to retrieve ${brand.name}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.unit.brand.RetriveBrand(brand.id).subscribe(() => {
          brand.isDeleted = false;
        }, error => {
          console.error('Error retrieving brand', error);
        });
      }
    });
  }

  GetBrands(): void {
    this.unit.brand.GetAdminBrand().subscribe((brands: any) => {
      this.brands = brands.sort((a: any, b: any) => b.id - a.id);
      this.isloading = false;
    }, error => {
      console.error('Error fetching brands', error);
      this.isloading = false;
    });
  }

}
