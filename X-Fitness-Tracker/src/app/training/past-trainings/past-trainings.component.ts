import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ExerciseService} from '../exercise.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Exercise} from '../exercise.model';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();

  private subscription: Subscription;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.exerciseService.fetchCompletedOrCancelledExercises();
    this.subscription = this.exerciseService.finishedExercisesChange.subscribe((exercises: Exercise[]) => {
      this.dataSource.data = exercises;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
