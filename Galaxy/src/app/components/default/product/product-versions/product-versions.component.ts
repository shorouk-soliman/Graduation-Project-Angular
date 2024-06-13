import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrl: './product-versions.component.css'
})
export class ProductVersionsComponent implements OnInit, OnChanges {
  @Input() versions: any;
  @Input() productId: number = 0;
  @Output() onChangeValue = new EventEmitter<number[]>();

  currentValues: any[] = [];
  attributes: any[] = [];
  values: any[] = [];

  constructor(private router:Router){}

  isValueCurrent(valueId: number): boolean {
    return this.currentValues.some((v: any) => v.id === valueId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.AssignAttributes()

  }

  ngOnInit(): void {
    this.AssignAttributes()
  }

  ChangeVersion(valueId: number, attributeId: number): void {
    let changedArray = this.ChangeCurrentValueArray(valueId, attributeId);
    let x = changedArray.map((e) => e.id)
    this.onChangeValue.emit(x);
  }

  checkValueForOtherVersions(valueId: number, attributeId: number): boolean {
    let changedArray = this.ChangeCurrentValueArray(valueId, attributeId);
    return this.checkAnyVersionMatch(changedArray)
  }

  ChangeCurrentValueArray(valueId: number, attributeId: number) {

    return this.currentValues.map((element) => {
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
    let productVersion = this.versions?.find((x: any) => x?.productId === this.productId)
    this.currentValues = productVersion?.values;

    this.versions?.forEach((version: any) => {

      version?.attributesReadDTO?.forEach((attribute: any) => {
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

    this.attributes?.forEach(element => {
      element.values = [];
      this.values?.forEach((value: any) => {
        if (value?.attributeId === element?.id) {
          element?.values?.push(value)
        }
      })
    });

  }

}
