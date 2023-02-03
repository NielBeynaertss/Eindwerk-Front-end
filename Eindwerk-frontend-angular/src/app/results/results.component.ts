import { Component } from '@angular/core';

declare function fixtureToMenu(): any;
declare function showDropdown(): any;
declare function checkboxToURL(finalCoordinates: any): any;

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {
  fixtureToMenu() {
    fixtureToMenu()
  }

  showDropdown() {
    showDropdown()
  }

  checkboxToURL(finalCoordinates: any) {
    checkboxToURL(finalCoordinates)
  }
}
