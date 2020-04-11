import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public showDialog = false;
  public editingTodo: any = null;
  public fieldValue = '';
  public todoList: any = [];
  public okButtonText = 'Create task';

  todoDialog(todo = null) {
    this.okButtonText = 'Create task';
    this.fieldValue = '';
    this.editingTodo = todo;
    this.showDialog = true;

    if (todo) {
      this.fieldValue = todo.title;
      this.okButtonText = 'Edit task';
    }
  }

  remove(index: number) {
    this.todoList.splice(index, 1);
  }

  editTodo(title) {
    this.editingTodo.title = title;
  }

  updateTodo(title) {
    if (title) {
      title = title.trim();

      if (this.editingTodo) {
        this.editTodo(title);
      } else {
        this.addTodo(title);
      }
    }

    this.hideDialog();
  }

  addTodo(title) {
    this.todoList.push({
      title: title,
      completed: false
    });
  }

  hideDialog() {
    this.showDialog = false;
    this.editingTodo = null;
    this.fieldValue = null;
  }
}
