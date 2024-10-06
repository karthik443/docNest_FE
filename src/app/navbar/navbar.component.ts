import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jqxNavBarComponent } from 'jqwidgets-ng/jqxnavbar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit ,OnInit{
  height: number = 40;
  columns: string[] = ['25%', '25%','25%','25%'];
  theme: string = 'material';
  public user:any;
  @ViewChild('firstNavBar', { static: false }) firstNavBar!: jqxNavBarComponent;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.user= localStorage.getItem('User')
    this.user= JSON.parse(this.user)

  }

  ngAfterViewInit(): void {
    this.firstNavBar.setOptions({
      theme: 'material',
      backgroundColor: 'lightblue',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'blue'
    });
  }

  // Navigate to the selected route
  navigateTo(route: string): void {
    if(route=='/'){
      localStorage.clear()
    }
    this.router.navigate([route]);
  }
}
