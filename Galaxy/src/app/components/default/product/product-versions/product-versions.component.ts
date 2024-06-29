import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IVersion } from '../../../../Models/Version/version-read-model';
import { IAttributeRead } from '../../../../Models/Attribute/Attribute-Read-model';

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrl: './product-versions.component.css'
})
export class ProductVersionsComponent implements OnChanges {
  @Input() versions: IVersion[] = [];
  @Input() productId: number = 0;
  @Output() onChangeValue = new EventEmitter<number>();

  currentValues: any;
  attributes: any[] = [];
  values: any[] = [];
  

  constructor(private router:Router){}

  isValueCurrent(valueId: number): boolean {
    return this.currentValues.some((v: any) => v.id === valueId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.AssignAttributes()
    this.CheckAll();
  }


  CheckAll():void{

    let othervalues = this.values.filter(e => 
      !this.currentValues.some((i: any) => i.id === e.id)
    );
    
    othervalues.forEach(e => {
      this.checkValueForOtherVersions(e.id,e.attributeId)
    });

    let y = this.countUncheckedValues();

    if(y === othervalues.length)
      this.convertUncheckedValues()
  }

  findFirstProductByValueId(valueId: number): number {
    for (const version of this.versions) {
      if (version.values.some(value => value.id === valueId)) {
        let productId = version.productId;
        return productId;
      }
    }

    return 0
  }

  convertUncheckedValues() {
    this.attributes = this.attributes.map(attribute => {
      return {
        ...attribute,
        values: attribute.values.map((value:any) => {
          if (value.checked === false) {
            return { ...value, checked: true };
          }
          return value;
        })
      };
    });
  }

  countUncheckedValues(): number {
    let count = 0;
    this.attributes.forEach(attribute => {
      attribute.values.forEach((value:any) => {
        if (value.checked === false) {
          count++;
        }
      });
    });
    return count;
  }


  ChangeVersion(valueId: number, attributeId: number): void {
    let changedArray = this.ChangeCurrentValueArray(valueId, attributeId);
    let x = changedArray.map((e:any) => e.id)
    
   let newproductId:number = this.findMatchingProductId(this.versions,x)

   if(newproductId === 0){
  this.onChangeValue.emit(this.findFirstProductByValueId(valueId));
   }else{
     this.onChangeValue.emit(newproductId);
   }
  }

  /* get the product Id of the changed values */
  findMatchingProductId(versions: any[], x: number[]): number {
    for (const version of versions) {
      const versionValuesIds = version.values.map((value: any) => value.id);
      const isMatch = x.every(valueId => versionValuesIds.includes(valueId));
      
      if (isMatch) {
        return version.productId;
      }
    }
  
    return 0; 
  }

  checkValueForOtherVersions(valueId: number, attributeId: number): boolean {
    let changedArray = this.ChangeCurrentValueArray(valueId, attributeId);
    let avalable = this.checkAnyVersionMatch(changedArray)
    this.updateValueById(valueId,avalable)
    return avalable
  }

  ChangeCurrentValueArray(valueId: number, attributeId: number) {

    return this.currentValues.map((element:any) => {
      let e = { ...element };

      if (e.attributeId === attributeId) e.id = valueId;
      return e;
    })
  }


  checkAnyVersionMatch(changedArray: any[]): boolean {

    let match: boolean = false;

    this.versions.forEach((element: any) => {
      let counter: number = 0;
      let matchedValue: number = 0;

      element.values.forEach((value: any) => {
        counter++;
        if (changedArray.some(x => x.id === value.id)) {
          matchedValue++;
        }
      });
      if (counter === matchedValue) {
        match = true;
        return;
      }
    });
    return match;
  }

  AssignAttributes() {
    let productVersion = this.versions.find((v: any) => v.productId === this.productId);
    this.currentValues = productVersion?.values;

    this.versions?.forEach((version: any) => {

      version?.attributes?.forEach((attribute: IAttributeRead) => {
        if (!this.attributes?.some(a => a?.id === attribute?.id)) {
          this.attributes?.push(attribute);
        }
      })

      version?.values?.forEach((value: any) => {
        if (!this.values?.some(v => v?.id === value?.id)) {
          this.values?.push(value);
        }
      })

    });

    this.attributes?.forEach((element) => {
      element.values = [];
      this.values?.forEach((value: any) => {
        if (value?.attributeId === element?.id) {
          element?.values?.push(value)
        }
      })
    });

  }


  updateValueById(id: number, avl: boolean) {
    this.attributes = this.attributes.map((attribute: any) => {
      return {
        ...attribute,
        values: attribute.values.map((value: any) => {
          if (value.id === id) {
            return { ...value, checked: avl };
          }
          return value;
        }),
      };
    });
  }
  
  
}
