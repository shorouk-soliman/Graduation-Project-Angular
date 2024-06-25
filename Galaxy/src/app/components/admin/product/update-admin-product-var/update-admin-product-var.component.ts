import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-update-admin-product-var',
  templateUrl: './update-admin-product-var.component.html',
  styleUrls: ['./update-admin-product-var.component.css']
})
export class UpdateAdminProductVarComponent implements OnInit, OnDestroy {
  constructor(private unit: UnitService, private route: ActivatedRoute) { }

  private subscriptions: Subscription = new Subscription();
  productId: number = 0;
  productDetails: any ;

  subcategories: any;
  brands: any;
  groups: any;
  attributeWithValues: any;

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    image: new FormControl(null),
    discount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    subCategoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
    brandId: new FormControl(0, [Validators.required, Validators.min(1)]),
    varGroupId: new FormControl(0, [Validators.required, Validators.min(1)]),
    productImages: new FormControl([]),
    price: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.GetProductDetails(this.productId);
    });
    this.GetCategories();
    this.GetBrands();
    this.GetGroups();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  GetProductDetails(id: number) {
    if (this.productId) {
      let productSubscription = this.unit.product.GetProductDetails(this.productId).subscribe((res: any) => {
        this.productDetails = res;
        this.populateForm();
      });
      this.subscriptions.add(productSubscription);
    }
  }

  populateForm() {
    if (this.productDetails) {
      this.myForm.patchValue({
        name: this.productDetails.name,
        description: this.productDetails.desctiption,
        discount: this.productDetails.discount,
        quantity: this.productDetails.quantity,
        subCategoryId: this.productDetails.subCategoryId,
        brandId: this.productDetails.brandId,
        varGroupId: this.productDetails.variantGroupId,
        values: this.productDetails.valuesList,
        price: this.productDetails.price,
        image :this.productDetails.image,
        productImages: this.productDetails.productImages
      });

    }
  }

  GetCategories() {
    let subcategorySubscription = this.unit.subcategory.GetAdminSubCategories().subscribe((res: any) => {
      this.subcategories = res;
    });
    this.subscriptions.add(subcategorySubscription);
  }

  GetBrands() {
    let brandSubscription = this.unit.brand.GetAdminBrand().subscribe((res: any) => {
      this.brands = res;
    });
    this.subscriptions.add(brandSubscription);
  }

  GetGroups() {
    let groupSubscription = this.unit.group.GetAllGroups().subscribe((res: any) => {
      this.groups = res;
    });
    this.subscriptions.add(groupSubscription);
  }

  onUpdateProduct() {
    if (!this.myForm.valid) return;

    const updateData = this.myForm.value;
    // Adjust updateData as per your API requirements, e.g., handling images, etc.

    this.unit.product.UpdateProduct(this.productId, updateData).subscribe(() => {
      alert('Product updated successfully');
      // Optionally, navigate to a different route or handle success scenario
    }, error => {
      alert('Failed to update product. Please try again.'); // Handle error appropriately
    });
  }
}
