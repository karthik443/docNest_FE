import { Component, OnInit } from '@angular/core';
import { BodyContentService } from 'src/app/body-content.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public searchQuery:any= "";
  selectedSortOption:any="";
  type='description'
  searchPlaceholder: string = 'Search by Description';

  doctors: any = []

  constructor(private bodyService: BodyContentService,private router: Router) {

  }
  ngOnInit(): void {
    let obj= {'searchQuery':this.searchQuery, 'type':this.type,'sortBy':this.selectedSortOption}
    this.getDocList(obj)

  }
  async getDocList(data: any) {
    
    let myData = data != null ? data : {};
    this.bodyService.getDocList(myData).subscribe(response => {
      this.doctors = response.data
      console.log(response); // Handle the response data
    });
  }
  navigateToChat(doctorId: string, doctorName: string): void {
    this.router.navigate(['/chats', { id: doctorId, name: doctorName }]);
  }
  search() {
    let string= `${this.searchQuery} , ${this.selectedSortOption} , ${this.type}`
    let obj= {'searchQuery':this.searchQuery, 'type':this.type,'sortBy':this.selectedSortOption}
    console.log(obj)
    // this.getDocList(this.searchQuery)
    this.getDocList(obj)
    console.log(`searching for ${this.searchQuery}`);
  }
  sortResults(){

  }
  setSearchType(type: string) {
    if (type === 'name') {
      this.type='name'
      this.searchPlaceholder = 'Search by Name';
    } else if (type === 'id') {
      this.type='id'
      this.searchPlaceholder = 'Search by ID';
    } else if (type === 'description') {
      this.type='description'
      this.searchPlaceholder = 'Search by Description';
    }
    else if (type === 'specialization') {
      this.type='specialization'
      this.searchPlaceholder = 'Search by specialization ';
    }
  }

}
