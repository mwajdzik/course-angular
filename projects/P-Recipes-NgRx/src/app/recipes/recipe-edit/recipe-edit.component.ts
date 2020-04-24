import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {map} from "rxjs/operators";
import {AddRecipe, UpdateRecipe} from "../store/recipe.actions";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  public id: number;
  public editMode: boolean;
  public recipeForm: FormGroup;
  private subscription: Subscription;
  private storeSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  private initForm() {
    const recipeIngredients: FormArray = new FormArray([]);

    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';

    if (this.editMode) {
      this.storeSubscription = this.store.select('recipe').pipe(
        map(
          recipesState => {
            return recipesState.recipes.find((recipe, index) => {
              return this.id === index;
            })
          }
        )
      ).subscribe(recipe => {
        if (recipe.hasOwnProperty('ingredients')) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(this.createIngredientFormControl(ingredient.name, ingredient.amount));
          }
        }

        recipeName = recipe.name;
        recipeImageUrl = recipe.imagePath;
        recipeContent = recipe.description;
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImageUrl, Validators.required),
      description: new FormControl(recipeContent, Validators.required),
      ingredients: recipeIngredients
    });
  }

  getIngredientsFormArray() {
    return <FormArray>this.recipeForm.get('ingredients');
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
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;

    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe(newRecipe, this.id));
    } else {
      this.store.dispatch(new AddRecipe(newRecipe));
    }

    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }
}
