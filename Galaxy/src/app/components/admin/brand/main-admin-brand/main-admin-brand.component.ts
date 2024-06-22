import { Component, OnInit } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-main-admin-brand',
  templateUrl: './main-admin-brand.component.html',
  styleUrls: ['./main-admin-brand.component.css']
})
export class MainAdminBrandComponent implements OnInit {
  constructor(private unit: UnitService) { }
  brands: any[] = [];
  isloading: boolean = true;

  ngOnInit(): void {
    this.GetBrands();
  }

  DeleteBrand(brand: any) {
    this.unit.brand.DeleteBrand(brand.id).subscribe(() => {
      brand.isDeleted = true;
    }, error => {
      console.error('Error deleting brand', error);
    });
  }

  RetriveBrand(brand: any) {
    this.unit.brand.RetriveBrand(brand.id).subscribe(() => {
      brand.isDeleted = false;
    }, error => {
      console.error('Error retrieving brand', error);
    });
  }

  GetBrands(): void {
    this.unit.brand.GetAdminBrand().subscribe((brands: any) => {
      this.brands = brands;
      this.isloading = false;
    }, error => {
      console.error('Error fetching brands', error);
      this.isloading = false;
    });
  }
}
