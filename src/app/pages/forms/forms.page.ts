import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {

  title: string
  wtitle: string
  TTitle: string
  bodyTrial: string
  question: string
  comment: string
  changed: string
  building: number
  nullz: object

  data = {
    questions: [
      {
        question: "",
        comments: [
          {
            comment: "",
          }
        ]
      }
    ],
    questions2: [
      {
        question: "",
        comments: [
          {
            comment: "",
          }
        ],
        comments2: [
          {
            comment: "",
          }
        ]
      }
    ],
    questions3: [
      {
        question: "",
        comments: [
          {
            comment: "",
          }
        ]
      }
    ]
  }

  myForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private alertController: AlertController) {
    this.myForm = this.fb.group({
      title: [''],
      questions: this.fb.array([]),
      questions2: this.fb.array([]),
      questions3: this.fb.array([])
    })
  }

  onSubmit() {
    alert(this.myForm.value);
  }

  viewForms() {
    this.http.get('http://localhost:8080/api/formanaAuth/ListOfForms')
    .subscribe(req =>{
      localStorage.getItem('data')
      console.log(req)
    }, error =>{
       console.log(error)
    })
  }

  async findTitle() {
    let titleCreds = {
      wtitle: this.wtitle
    }

    this.http.post('http://localhost:8080/api/formanaAuth/title', titleCreds)
    .subscribe(res => {
      localStorage.setItem('data', JSON.stringify(res))
      console.log(res)
      this.nullz = res
      this.TTitle = this.wtitle
      this.bodyTrial = JSON.stringify(res)
      this.data = JSON.parse(this.bodyTrial)
      console.log(this.data.questions[0].question)
    }, error => {
       console.log(error)
    })
    await new Promise(f => setTimeout(f, 1000));
    if (this.nullz == null) {
      this.presentAlert("Can't find the form", 'Wrong information filled out')
    }
    else {
      console.log("Continue")
    }
    return this.TTitle
  }
  async findTitle2() {
    let titleCreds = {
      wtitle: this.wtitle
    }

    this.http.post('http://localhost:8080/api/formanaAuth/title2', titleCreds)
    .subscribe(res => {
      localStorage.setItem('data2', JSON.stringify(res))
      console.log(res)
      this.nullz = res
      this.TTitle = this.wtitle
      this.bodyTrial = JSON.stringify(res)
      this.data = JSON.parse(this.bodyTrial)
      console.log(this.data.questions[0].question)
    }, error => {
       console.log(error)
    })
    await new Promise(f => setTimeout(f, 1000));
    if (this.nullz == null) {
      this.presentAlert("Can't find the form", 'Wrong information filled out')
    }
    else {
      console.log("Continue")
    }
    return this.TTitle
  }
  async findTitle3() {
    let titleCreds = {
      wtitle: this.wtitle
    }

    this.http.post('http://localhost:8080/api/formanaAuth/title3', titleCreds)
    .subscribe(res => {
      localStorage.setItem('data3', JSON.stringify(res))
      console.log(res)
      this.nullz = res
      this.TTitle = this.wtitle
      this.bodyTrial = JSON.stringify(res)
      this.data = JSON.parse(this.bodyTrial)
      console.log(this.data.questions[0].question)
    }, error => {
       console.log(error)
    })
    await new Promise(f => setTimeout(f, 1000));
    if (this.nullz == null) {
      this.presentAlert("Can't find the form", 'Wrong information filled out')
    }
    else {
      console.log("Continue")
    }
    return this.TTitle
  }
  viewTitle(): string {

    this.http.get('http://localhost:8080/api/formanaAuth/title')
    .subscribe(req =>{
      localStorage.getItem('data')
      this.title = req.toString()
      console.log(this.title)
    }, error =>{
       console.log(error)
       console.log("oo nag error")
    })
    return this.title
  }
  myGeeks() {
    this.findTitle();
    (<HTMLInputElement>document.getElementById('title')).value
        = this.TTitle;
    this.setQuestions()
    this.setQuestions3()
    this.setQuestions4()
    console.log(this.data.questions2[0].comments[0].comment)
    this.building = 0

    return this.building
  }
  myGeeks2() {
    this.findTitle2();
    (<HTMLInputElement>document.getElementById('title')).value
        = this.TTitle;
    this.setQuestions()
    this.setQuestions3()
    this.setQuestions4()
    console.log(this.data.questions2[0].comments[0].comment)
    this.building = 1

    return this.building
  }
  myGeeks3() {
    this.findTitle3();
    (<HTMLInputElement>document.getElementById('title')).value
        = this.TTitle;
    this.setQuestions()
    this.setQuestions3()
    this.setQuestions4()
    console.log(this.data.questions2[0].comments[0].comment)
    this.building = 2

    return this.building
  }

  addNewQuestion() {
    let control = <FormArray>this.myForm.controls.questions;
    control.push(
      this.fb.group({
        question: [''],
        comments: this.fb.array([])
      })
    )
  }

  deleteQuestion(index) {
    let control = <FormArray>this.myForm.controls.questions;
    control.removeAt(index)
  }

  addNewComment(control) {
    control.push(
      this.fb.group({
        comment: ['']
      }))
  }

  deleteComment(control, index) {
    control.removeAt(index)
  }

  setQuestions() {
    let control = <FormArray>this.myForm.controls.questions;
    this.data.questions.forEach(x => {
      control.push(this.fb.group({ 
        question: x.question,
        comments: this.setComments(x) }))
    })
  }
  setQuestions3() {
    let control = <FormArray>this.myForm.controls.questions2;
    this.data.questions2.forEach(x => {
      control.push(this.fb.group({ 
        question: x.question,
        comments: this.setComments(x),
        comments2: this.setComments2(x) }))
    })
  }
  setQuestions4() {
    let control = <FormArray>this.myForm.controls.questions3;
    this.data.questions3.forEach(x => {
      control.push(this.fb.group({ 
        question: x.question,
        comments: this.setComments(x) }))
    })
  }

  setQuestions2() {
    let creds3 = {
      TTitle: this.TTitle
    }

    this.http.post('http://localhost:8080/api/formanaAuth/title', creds3)
    .subscribe(res => {
      localStorage.setItem('data', JSON.stringify(res))
      console.log(res)
      return this.TTitle
    }, error => {
       console.log(error)
    })
    let control = <FormArray>this.myForm.controls.questions;
    this.data.questions.forEach(x => {
      control.push(this.fb.group({ 
        question: x.question, 
        comments: this.setComments(x) }))
    })
  }

  setComments(x) {
    let arr = new FormArray([])
    x.comments.forEach(y => {
      arr.push(this.fb.group({ 
        comment: y.comment 
      }))
    })
    return arr;
  }

  setComments2(x) {
    let arr = new FormArray([])
    x.comments2.forEach(y => {
      arr.push(this.fb.group({ 
        comment: y.comment 
      }))
    })
    return arr;
  }
  setComments3(x) {
    let arr = new FormArray([])
    x.comments.forEach(y => {
      arr.push(this.fb.group({ 
        comment: y.comment 
      }))
    })
    return arr;
  }

  ngOnInit() {
  }

  continue() {
    for (let i = 0; i < this.data.questions.length; i++) {
      for (let p = 0; i < this.data.questions[i].comments.length; i++) {
      /*document.getElementById('questionLbl').innerHTML
          = this.data.questions[i].question;
      document.getElementById('commentLbl').innerHTML
          = this.data.questions[i].comments[0].comment;*/
      document.getElementById('comments"{{p*2}}"').setAttribute('type', 
      this.data.questions[i].comments[p*2].comment);

      document.getElementById('comments"{{p*2+1}}"').setAttribute('value', 
      this.data.questions[i].comments[p*2+1].comment);
      }
    }
  }

  pass(){
    console.log(this.myForm.value)
    const userData = this.myForm.value
    this.http.post('http://localhost:8080/api/formanaAuth/answer', userData)
    .subscribe(res =>{
      localStorage.setItem('data', JSON.stringify(res))
      this.router.navigateByUrl('/dashboard', {replaceUrl: true})
      console.log(res)
    }, error =>{
      console.log(error)
    })

  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();

    const { role } = await alert.onDidDismiss();
    
  }

}
const textarea = document.querySelector("textarea");
  if(textarea) {
    textarea.addEventListener("keyup", e =>{
      textarea.style.height = "63px";
      let scHeight = (e.target as HTMLInputElement).scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  }
const textarea2 = document.querySelector("question");
  if(textarea2) {
    textarea.addEventListener("keyup", e =>{
      textarea.style.height = "63px";
      let scHeight = (e.target as HTMLInputElement).scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  }
const textarea3 = document.querySelector("question2");
  if(textarea3) {
    textarea.addEventListener("keyup", e =>{
      textarea.style.height = "63px";
      let scHeight = (e.target as HTMLInputElement).scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  }
const textarea4 = document.querySelector("question3");
  if(textarea4) {
    textarea.addEventListener("keyup", e =>{
      textarea.style.height = "63px";
      let scHeight = (e.target as HTMLInputElement).scrollHeight;
      textarea.style.height = `${scHeight}px`;
    });
  }