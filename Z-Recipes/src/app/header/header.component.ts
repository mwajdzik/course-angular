import {Component} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {HttpResponse} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {
  }

  onStore() {
    this.dataStorageService.storeRecipes()
      .subscribe((res: HttpResponse<void>) => {
        console.log(res);
      });
  }

  onFetch() {
    this.dataStorageService.getRecipes()
      .subscribe((data: Recipe[]) => {
        this.recipeService.setRecipes(data);
      });
  }
}
