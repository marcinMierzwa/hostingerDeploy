import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { User } from './User-model';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, JsonPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private readonly api:ApiService = inject(ApiService);
  private readonly fb:FormBuilder = inject(FormBuilder);

  form:FormGroup = this.fb.group({
    userName: new FormControl(null, Validators.required)
  })  

  users$!:Observable<User[]>


  ngOnInit(): void {
    this.getUsers()
  }

  getUsers(){
    this.users$ = this.api.getUsers();
  }
  
  sendUser() {
    const userInput = this.form.value
    this.api.createUser(userInput).subscribe(Response => {
      this.getUsers()
    })
  }

}
