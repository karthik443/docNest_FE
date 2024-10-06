import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodyContentService } from 'src/app/body-content.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})




export class ProfileComponent implements OnInit {
  doctorForm: FormGroup;
  public userRole:string='doctor';

  constructor(private fb: FormBuilder,private bodyService: BodyContentService) {
    // Initialize the form
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      specialization: ['', Validators.required],
      description: ['', Validators.required],
      costPerHour: ['', [Validators.required, Validators.min(0)]],
      provenExperience: ['', Validators.required],
      certificatesProof: [null],
    });
  }

  ngOnInit(): void {}

  async onSubmit() {
    if (this.doctorForm.valid) {
      const formData = this.doctorForm.value;
     this.bodyService.updateProfile(formData).subscribe(resp=>{
        console.log(resp)
     })
    
      
      console.log('Form Submitted:', formData);
     
    } else {
      console.log('Form is invalid');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.doctorForm.patchValue({
      certificatesProof: file,
    });
  }
}
