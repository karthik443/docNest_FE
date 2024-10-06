import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageLoaderService } from '../image-loader.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginPage:boolean=true;
  loginForm: FormGroup;
  signupForm:FormGroup;
  logoUrl: string = '';
  userRole: string = 'user';
  setRole(role: string) {
    this.userRole = role;
  }

  constructor(private formBuilder: FormBuilder,private authService: ImageLoaderService,private router: Router,private Auth:AuthService) {
    this.loginForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.logoUrl = 'assets/doctor.png';
  }
  
  ngOnInit(): void {
    this.loadLogo();
  }
  changePage(){
    this.loginPage=!this.loginPage
  }
  loadLogo() {
    const logoUrl = 'https://avatars.githubusercontent.com/u/124091983';
    this.authService.loadImage(logoUrl).subscribe((blob: Blob) => {
      this.logoUrl = URL.createObjectURL(blob);
      this.logoUrl = 'assets/doctor.png';
    });
  }
  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Login form submitted');
      let user={
      userName:this.loginForm.value.name,
      password:this.loginForm.value.password,
     
      }
      this.authService.login(user).subscribe(resp=>{
         if(resp.status==0){
          // localStorage.setItem("isLoggedIn","true");
          this.Auth.storeToken(resp.data.token)
          localStorage.setItem('User',JSON.stringify(resp.data.user))
          // localStorage.setItem('jwt',resp.data.token)
          this.router.navigate(['/main']);
         }
      },(e)=>{
        console.log(e)
      })
    } else {
      return;
    }
  }
  onSignUp():void{
    if (this.signupForm.valid) {
      console.log('Login form submitted');
      let user={
        userName:this.signupForm.value.name,
        password:this.signupForm.value.password,
        role:this.userRole
      }
      this.authService.signUp(user).subscribe(resp=>{
        console.log(resp);
      })
    } else {
      return;
    }
  }
}


