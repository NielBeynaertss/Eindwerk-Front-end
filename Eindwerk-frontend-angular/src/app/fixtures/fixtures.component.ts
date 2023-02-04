import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

declare function getFixtures(id: number): any;

@Component({
  selector: 'app-fixtures',
  templateUrl: './fixtures.component.html',
  styleUrls: ['./fixtures.component.css']
})
export class FixturesComponent implements OnInit {
  id: number = 0;
  
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit() {
  this.route.params.subscribe(params => {
  this.id = +params['id'];
  });
  // expose the component instance to the global scope
  }
  
  getFixtures(id: number) {
  getFixtures(id)
  }


  navigateToResults() {
    this.router.navigate(['/results']);
  }
  }
  
  
  
  
  