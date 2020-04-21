import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  values: any;
  valueSubscription: Subscription;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getValues();
  }
  getValues() {
    this.valueSubscription = this.http.get('http://localhost:5000/api/value').subscribe(response => {
      this.values = response;
    }, error => {
      console.log(error);
    });
  }
  ngOnDestroy() {
    this.valueSubscription.unsubscribe();
  }
}
