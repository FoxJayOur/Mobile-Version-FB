import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = ""
  email: string = ""
  password: string = ""
  srcode: number = 0
  isAdmin: boolean = false
  department: string = ""
  deptName: string = ""
  program: string = ""
  progName: string = ""

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }
  
  register(){
    let user = {
      name: this.name,
      email: this.email,
      password: this.password,
      srcode: this.srcode,
      isAdmin: this.isAdmin,
      department: {
        deptName: this.deptName,
        program: {
          progName: this.progName
        }
      }
    }
    this.http.post('http://192.168.1.9:8080/api/formanaAuth/register', user)
    .subscribe(res =>{
      localStorage.setItem('user', JSON.stringify(res))
      this.router.navigateByUrl('/login', {replaceUrl: true})
      console.log(res)
    }, error =>{
      console.log(error)
    })

    console.log(user)
  }

}
