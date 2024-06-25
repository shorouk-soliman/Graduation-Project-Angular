import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnitService } from '../../../../services/unit.service';
import { IProductDetails, initialProductDetails } from '../../../../Models/Product/Product-Details-model';
import { IAttributeRead } from '../../../../Models/Attribute/Attribute-Read-model';
import { IValueRead } from '../../../../Models/Values/values-read-model';

@Component({
  selector: 'app-update-admin-product-var',
  templateUrl: './update-admin-product-var.component.html',
  styleUrls: ['./update-admin-product-var.component.css']
})
export class UpdateAdminProductVarComponent implements OnInit, OnDestroy {
  constructor(private unit: UnitService, private route: ActivatedRoute) {}

  private subscriptions: Subscription = new Subscription();
  productId: number = 0;
  productDetails: IProductDetails = initialProductDetails;
  selectedValues: { [key: string]: number[] } = {}; // Initialize selected values list

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
    varGroupId: new FormControl(0, [ Validators.min(1)]),
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
      let productSubscription = this.unit.product.GetProductDetails(id).subscribe((res: any) => {
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
        price: this.productDetails.price,
        image: this.productDetails.image,
        productImages: this.productDetails.productImages
      });

      this.productDetails.versions.forEach(version => {
        version.attributes.forEach(attribute => {
          this.selectedValues[attribute.name] = version.values
            .filter(value => value.attributeId === attribute.id)
            .map(value => value.id);

          const formControl = new FormControl(this.selectedValues[attribute.name], Validators.required);
          this.myForm.addControl(attribute.name, formControl);
        });
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

  onGroupChange(event: any) {
    let id = event.target.value;
    let groupWithAttributeSubscription = this.unit.group.GetGroupWithAttributesValues(id).subscribe((res: any) => {
      this.attributeWithValues = res.attributeWithValues;
    });
    this.subscriptions.add(groupWithAttributeSubscription);
  }

  onValuesChange(event: any, attribute: IAttributeRead) {
    const selectedOptions = event.target.options;
    const selectedValues = [];

    for (let i = 0; i < selectedOptions.length; i++) {
      if (selectedOptions[i].selected) {
        selectedValues.push(parseInt(selectedOptions[i].value));
      }
    }

    // Update selected values for the attribute
    this.selectedValues[attribute.name] = selectedValues;
  }

  isSelected(attributewithvalue: any, value: IValueRead): boolean {
    return this.selectedValues[attributewithvalue.attribute.name]?.includes(value.id);
  }

  onUpdateProduct() {
    if (!this.myForm.valid) return;

    const updateData = { ...this.myForm.value };

    this.unit.product.UpdateProduct(this.productId, updateData).subscribe(() => {
      alert('Product updated successfully');
    }, error => {
      alert('Failed to update product. Please try again.');
    });
  }
}
