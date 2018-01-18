import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},                          // lazy loading
  {path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'}    // lazy loading
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: false})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
