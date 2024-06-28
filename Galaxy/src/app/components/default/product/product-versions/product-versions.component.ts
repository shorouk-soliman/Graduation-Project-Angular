import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

interface IValue {
  id: number;
  name: string;
  attributeId: number;
}

interface IAttribute {
  id: number;
  name: string;
  values: IValue[];
}

interface IVersion {
  productId: number;
  attributes: IAttribute[];
  values: IValue[];
}

@Component({
  selector: 'app-product-versions',
  templateUrl: './product-versions.component.html',
  styleUrls: ['./product-versions.component.css']
})
export class ProductVersionsComponent implements OnInit, OnChanges {
  @Input() versions: IVersion[] = [];
  @Input() productId: number = 0;
  @Output() onChangeValue = new EventEmitter<number[]>();

  currentValues: IValue[] = [];
  attributes: IAttribute[] = [];
  values: IValue[] = [];

  constructor(private router: Router) {}

  isValueCurrent(valueId: number): boolean {
    return this.currentValues.some((v: IValue) => v.id === valueId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.assignAttributes();
  }

  ngOnInit(): void {
    this.assignAttributes();
  }

  changeVersion(valueId: number, attributeId: number): void {
    this.currentValues = this.currentValues.map(value => 
      value.attributeId === attributeId ? { ...value, id: valueId } : value
    );
    this.onChangeValue.emit(this.currentValues.map(value => value.id));
  }

  checkValueForOtherVersions(valueId: number, attributeId: number): boolean {
    const changedValues = this.currentValues.map(value => 
      value.attributeId === attributeId ? { ...value, id: valueId } : value
    );
    return this.checkAnyVersionMatch(changedValues);
  }

  checkAnyVersionMatch(changedValues: IValue[]): boolean {
    return this.versions.some(version => 
      version.values.every(value => 
        changedValues.some(changedValue => changedValue.id === value.id)
      )
    );
  }

  assignAttributes(): void {
    const productVersion = this.versions.find(version => version.productId === this.productId);
    this.currentValues = productVersion ? productVersion.values : [];

    this.versions.forEach(version => {
      version.attributes.forEach(attribute => {
        if (!this.attributes.some(attr => attr.id === attribute.id)) {
          this.attributes.push(attribute);
        }
      });
    });

    this.attributes.forEach(attribute => {
      attribute.values = this.versions
        .flatMap(version => version.attributes)
        .find(attr => attr.id === attribute.id)?.values || [];
    });
  }
}
