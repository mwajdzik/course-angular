import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import {RecipeFeatureState} from '../store/recipe.reducers';
import {AddRecipe, UpdateRecipe} from '../store/recipe.actions';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  private subscription: Subscription;

  constructor(private store: Store<RecipeFeatureState>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;

      this.store.select('recipe')
        .take(1)
        .subscribe((recipeState) => {
          this.initForm(this.editMode ? recipeState.recipes[this.id] : null);
        });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm(recipe: Recipe) {
    const recipeIngredients: FormArray = new FormArray([]);

    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';

    if (this.editMode) {
      if (recipe.hasOwnProperty('ingredients')) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(this.createIngredientFormControl(ingredient.name, ingredient.amount));
        }
      }

      recipeName = recipe.name;
      recipeImageUrl = recipe.imagePath;
      recipeContent = recipe.description;
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeContent, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getIngredientsFormArray() {
    return <FormArray> this.recipeForm.get('ingredients');
  }

  createIngredientFormControl(name: string, amount: number) {
    return new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [Validators.required, Validators.pattern(/\d+/)])
    });
  }

  onAddItem(name: string, amount: number) {
    this.getIngredientsFormArray()
      .push(this.createIngredientFormControl(name, amount));
  }

  onRemoveIngredient(index: number) {
    this.getIngredientsFormArray()
      .removeAt(index);
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe({index: this.id, updatedRecipe: this.recipeForm.value}));
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
    }

    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }
}
