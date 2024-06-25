import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IVersion } from '../../../../Models/Version/version-read-model';
import { IAttributeRead } from '../../../../Models/Attribute/Attribute-Read-model';

@Component({
  selector: 'app-product-admin-versions',
  templateUrl: './product-admin-versions.component.html',
  styleUrl: './product-admin-versions.component.css'
})
export class ProductAdminVersionsComponent implements OnInit, OnChanges {
  @Input() versions: IVersion[] = [];
  @Input() productId: number = 0;
  @Output() onChangeValue = new EventEmitter<number[]>();

  currentValues: any;
  attributes: any[] = [];
  values: any[] = [];

  constructor(private router: Router) {}

  isValueCurrent(valueId: number): boolean {
    return this.currentValues.some((v: any) => v.id === valueId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.AssignAttributes();
  }

  ngOnInit(): void {
    this.AssignAttributes();
    console.log("product id is " + this.productId);
  }

  ChangeVersion(valueId: number, attributeId: number): void {
    let changedArray = this.ChangeCurrentValueArray(valueId, attributeId);
    let x = changedArray.map((e: any) => e.id);
    this.onChangeValue.emit(x);
  }

  checkValueForOtherVersions(valueId: number, attributeId: number): boolean {
    let changedArray = this.ChangeCurrentValueArray(valueId, attributeId);
    return this.checkAnyVersionMatch(changedArray);
  }

  ChangeCurrentValueArray(valueId: number, attributeId: number) {
    return this.currentValues.map((element: any) => {
      let e = { ...element };
      if (e.attributeId === attributeId) e.id = valueId;
      return e;
    });
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
    this.currentValues = productVersion?.values || [];

    this.attributes = [];
    this.values = [];

    this.versions.filter(v => v.productId === this.productId).forEach((version: any) => {
      version.attributes.forEach((attribute: IAttributeRead) => {
        if (!this.attributes.some(a => a.id === attribute.id)) {
          this.attributes.push(attribute);
        }
      });

      version.values.forEach((value: any) => {
        if (!this.values.some(v => v.id === value.id)) {
          this.values.push(value);
        }
      });
    });

    this.attributes.forEach((element) => {
      element.values = [];
      this.values.forEach((value: any) => {
        if (value.attributeId === element.id) {
          element.values.push(value);
        }
      });
    });
  }
}
