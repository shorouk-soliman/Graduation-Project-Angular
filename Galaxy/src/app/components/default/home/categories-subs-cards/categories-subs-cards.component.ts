import { Component, Input, OnInit } from '@angular/core';
import { ICategorySubs } from '../../../../Models/Category/category-with-subs';
import { UnitService } from '../../../../services/unit.service';

@Component({
  selector: 'app-categories-subs-cards',
  templateUrl: './categories-subs-cards.component.html',
  styleUrl: './categories-subs-cards.component.css'
})
export class CategoriesSubsCardsComponent implements OnInit {
  constructor(private unit: UnitService) { }

  categoriesSubs: ICategorySubs[] = [];

  ngOnInit(): void {
    this.unit.category.getCategoriesWithSubs().subscribe((categoriesSubs: any[]) => {
      this.categoriesSubs = categoriesSubs;
    })
  }

}
