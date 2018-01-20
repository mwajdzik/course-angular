import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import {HttpResponse} from '@angular/common/http';
import {RecipeService} from '../../recipes/recipe.service';
import {Recipe} from '../../recipes/recipe.model';
import {AuthService} from '../../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducers';
import {Observable} from 'rxjs/Observable';
import {AuthState} from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<AuthState>;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private store: Store<AppState>,
              public authService: AuthService) {
  }

  ngOnInit() {
    this.authState = this.store.select('auth');
    this.authState.subscribe((auth) => {
      console.log(auth);
    });
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

  onLogout() {
    this.authService.signoutUser();
  }
}
