import { Component, OnDestroy } from '@angular/core';
import { UnitService } from '../../../../services/unit.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-admin-product-var',
  templateUrl: './add-admin-product-var.component.html',
  styleUrl: './add-admin-product-var.component.css'
})
export class AddAdminProductVarComponent implements OnDestroy {
  constructor(private unit: UnitService) { }
  private subscriptions: Subscription = new Subscription();
  selectedFile: File | null = null;
  selectedFilesList: File[] = [];
  selectedvaluesList: number[] = [];

  subcategories: any;
  brands: any;
  groups: any;
  attributeWithValues: any;
  ngOnInit(): void {
    this.GetCategoies();
    this.GetBrands();
    this.GetGroups();
  }

  GetCategoies() {
   let subcateogrysubscription = this.unit.subcategory.GetAdminSubCategories().subscribe((res: any) => {
      this.subcategories = res;
    })
    this.subscriptions.add(subcateogrysubscription);
    }
    GetBrands() {
      let brandsubscription = this.unit.brand.GetAdminBrand().subscribe((res: any) => {
        this.brands = res;
        })
      this.subscriptions.add(brandsubscription);
      }
      GetGroups() {
        let groupubscription =  this.unit.group.GetAllGroups().subscribe((res: any) => {
          this.groups = res;
          })
        this.subscriptions.add(groupubscription);
        }
        
        onGroupChange(event:any){
          let id = event.target.value;
          let groupwihattributeubscription = this.unit.group.GetGroupWithAttributesValues(id).subscribe((res:any)=>{
            this.attributeWithValues = res.attributeWithValues;
            });
          this.subscriptions.add(groupwihattributeubscription);
  }


  onValuesChange(event:any,valuesList:any[]){
    let SelectedValue = event.target.value;

  // let ExistedValue = valuesList.find((v:any) => v.id === SelectedValue);
  let ExistedValue = this.selectedvaluesList.find((v:any) => valuesList.some((vl:any) => vl.id == v));


    if(ExistedValue){
      this.selectedvaluesList = this.selectedvaluesList.map((value: any) => {
        return value === ExistedValue ? SelectedValue : value;
      });
      
    }else{
      this.selectedvaluesList.push(SelectedValue);
    }

  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(150)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]),
    image: new FormControl(null, [Validators.required]),
    discount: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]),
    subCategoryId: new FormControl(0, [Validators.required, Validators.min(1)]),
    quantity: new FormControl(0, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]),
    brandId: new FormControl(0, [Validators.required, Validators.min(1)]),
    varGroupId: new FormControl(0, [Validators.required, Validators.min(1)]),
    productImages: new FormControl([], [Validators.required, Validators.nullValidator]),
    price: new FormControl(1, [Validators.required, Validators.min(1)]),
  });;


  NameError = () => this.myForm.get('name')?.errors
  descriptionError = () => this.myForm.get('description')?.errors
  ImageError = () => this.myForm.get('image')?.errors
  discountError = () => this.myForm.get('discount')?.errors
  subCategoryError = () => this.myForm.get('subCategoryId')?.errors
  quantityError = () => this.myForm.get('quantity')?.errors
  brandError = () => this.myForm.get('brandId')?.errors
  productImagesError = () => this.myForm.get('productImages')?.errors
  priceError = () => this.myForm.get('price')?.errors
  GroupError = () => this.myForm.get('varGroupId')?.errors
  valuesError = () =>  this.attributeWithValues.length !== this.selectedvaluesList.length;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFilesListSelected(event: any) {
    this.selectedFilesList = Array.from(event.target.files);
  }

  AddImagesAndProduct() {
    if (!this.myForm.valid) return;

    let formDataImage: FormData = new FormData();
    let formDataImages: FormData = new FormData();

    if (this.selectedFile)
      formDataImage.append('image', this.selectedFile);

    if (this.selectedFilesList)
      this.selectedFilesList.forEach((file: File) => {
        formDataImages.append('images', file);
      })

    this.unit.image.ConvertImage(formDataImage).subscribe((res: string) => {
      let insert = { ...this.myForm.value, image: res }

      this.unit.image.ConvertListImage(formDataImages).subscribe((sres: any) => {
        insert = { ...insert, productImages: sres };
        this.AddSimpleProduct(insert);
      })
    });

  }

  AddSimpleProduct(insert: any) {
    insert = {...insert, values:this.selectedvaluesList}
    this.unit.product.AddVarProduct(insert).subscribe(() => {
      alert('Variant Product Added Succssefully')
    }, error => {
      alert(error.error)
    })
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
