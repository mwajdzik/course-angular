import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs/Subscription';

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

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    const recipeIngredients: FormArray = new FormArray([]);

    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

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
    const newRecipe = this.recipeForm.value;

    if (this.editMode) {
      this.recipeService.editRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }
}
