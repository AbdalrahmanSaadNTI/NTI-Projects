import { Component, OnInit } from '@angular/core';
import { TaskService, Task } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks: Task[] = [];
  currentTask: Task = {
    title: '',
    description: '',
    completed: false
  };
  isEditing = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.errorMessage = '';
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error loading tasks: ' + (error.error?.error || error.message);
        this.isLoading = false;
      }
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.currentTask.title.trim()) {
      this.errorMessage = 'Title is required';
      return;
    }

    if (this.isEditing && this.currentTask._id) {
      this.updateTask();
    } else {
      this.createTask();
    }
  }

  createTask() {
    this.taskService.createTask(this.currentTask).subscribe({
      next: (task) => {
        this.tasks.unshift(task);
        this.resetForm();
        this.successMessage = 'Task created successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error creating task: ' + (error.error?.error || error.message);
      }
    });
  }

  updateTask() {
    if (!this.currentTask._id) return;

    this.taskService.updateTask(this.currentTask._id, this.currentTask).subscribe({
      next: (task) => {
        const index = this.tasks.findIndex(t => t._id === task._id);
        if (index !== -1) {
          this.tasks[index] = task;
        }
        this.resetForm();
        this.successMessage = 'Task updated successfully!';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error updating task: ' + (error.error?.error || error.message);
      }
    });
  }

  editTask(task: Task) {
    this.currentTask = {
      _id: task._id,
      title: task.title,
      description: task.description,
      completed: task.completed
    };
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteTask(id: string | undefined) {
    if (!id) return;

    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t._id !== id);
          this.successMessage = 'Task deleted successfully!';
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error deleting task: ' + (error.error?.error || error.message);
        }
      });
    }
  }

  toggleComplete(task: Task) {
    if (!task._id) return;

    const updatedTask = {
      ...task,
      completed: !task.completed
    };

    this.taskService.updateTask(task._id, updatedTask).subscribe({
      next: (updated) => {
        const index = this.tasks.findIndex(t => t._id === updated._id);
        if (index !== -1) {
          this.tasks[index] = updated;
        }
      },
      error: (error) => {
        this.errorMessage = 'Error updating task: ' + (error.error?.error || error.message);
      }
    });
  }

  resetForm() {
    this.currentTask = {
      title: '',
      description: '',
      completed: false
    };
    this.isEditing = false;
    this.errorMessage = '';
  }

  cancelEdit() {
    this.resetForm();
  }
}

