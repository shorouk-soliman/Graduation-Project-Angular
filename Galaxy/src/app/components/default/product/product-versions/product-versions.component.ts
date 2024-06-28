import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrls: ['./product-versions.component.css']
})
export class ProductVersionsComponent implements OnInit, OnChanges {
  @Input() versions: any[] = [];
  @Input() productId: number = 0;
  @Output() onChangeValue = new EventEmitter<number[]>();

  currentValues: any[] = [];
  attributes: any[] = [];
  values: any[] = [];

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.AssignAttributes();
  }

  ngOnInit(): void {
    this.AssignAttributes();
  }

  isValueCurrent(valueId: number): boolean {
    return this.currentValues.some((v: any) => v.id === valueId);
  }

  ChangeVersion(valueId: number, attributeId: number): void {
    this.currentValues = this.ChangeCurrentValueArray(valueId, attributeId);
    const currentIds = this.currentValues.map((e: any) => e.id);
    this.onChangeValue.emit(currentIds);
    this.AssignAttributes();
  }

  checkValueForOtherVersions(valueId: number, attributeId: number): boolean {
    const changedArray = this.ChangeCurrentValueArray(valueId, attributeId);
    return this.checkAnyVersionMatch(changedArray);
  }

  ChangeCurrentValueArray(valueId: number, attributeId: number): any[] {
    return this.currentValues.map((element: any) => {
      const e = { ...element };
      if (e.attributeId === attributeId) {
        e.id = valueId;
      }
      return e;
    });
  }

  checkAnyVersionMatch(changedArray: any[]): boolean {
    return this.versions.some((element: any) => {
      return changedArray.every(changedValue =>
        element.values.some((value: any) => value.id === changedValue.id)
      );
    });
  }

  AssignAttributes(): void {
    const productVersion = this.versions.find((v: any) => v.productId === this.productId);
    this.currentValues = productVersion ? [...productVersion.values] : [];

    this.attributes = [];
    this.values = [];

    this.versions.forEach((version: any) => {
      version.attributes.forEach((attribute: any) => {
        if (!this.attributes.some(a => a.id === attribute.id)) {
          this.attributes.push({ ...attribute, values: [] });
        }
      });

      version.values.forEach((value: any) => {
        if (!this.values.some(v => v.id === value.id)) {
          this.values.push(value);
        }
      });
    });

    this.attributes.forEach(attribute => {
      attribute.values = this.values.filter(value => value.attributeId === attribute.id);
    });
  }
}
