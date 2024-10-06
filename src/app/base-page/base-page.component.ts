import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.css']
})
export class BasePageComponent {
  constructor(private router: Router) {}
}
