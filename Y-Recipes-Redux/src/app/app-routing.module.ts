import {NgModule} from '@angular/core';
import {NoPreloading, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './core/home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},                          // lazy loading
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'}    // lazy loading
];

const config = {
  useHash: false,
  preloadingStrategy: NoPreloading
};

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
