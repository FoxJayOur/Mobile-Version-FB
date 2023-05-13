import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss'],
})
export class FormsPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;

  message: string
  title: string
  wtitle: string
  TTitle: string
  bodyTrial: string
  question: string
  comment: string
  changed: string
  building: number
  nullz: object
  expiryDate: Date
  bodyT: JSON
  description: String
  approvedBy: String

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
      expiryDate: [this.expiryDate],
      questions: this.fb.array([]),
      questions2: this.fb.array([]),
      questions3: this.fb.array([])
    })
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  cancel2() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.wtitle, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  onSubmit() {
    alert(this.myForm.value);
  }

  viewForms() {
    this.http.get('https://formana.azurewebsites.net/api/formanaAuth/ListOfForms')
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

    this.http.post('https://formana.azurewebsites.net//api/formanaAuth/title', titleCreds)
    .subscribe(res => {
      localStorage.setItem('data', JSON.stringify(res))
      console.log(res)
      this.nullz = res
      this.TTitle = this.wtitle
      this.bodyTrial = JSON.stringify(res)
      this.data = JSON.parse(this.bodyTrial)
      type ObjectKey = keyof typeof this.bodyTrial;
      const Key = 'expiryDate' as ObjectKey
      const KeyD = 'description' as ObjectKey
      const KeyA = 'approvedBy' as ObjectKey
      console.log(Key)
      this.expiryDate = new Date(res[Key])
      this.description = res[KeyD]
      this.approvedBy = res[KeyA]
      console.log(this.description)
      console.log(this.expiryDate)
      console.log(this.data.questions[0].question)
    }, error => {
       console.log(error)
    })
    await new Promise(f => setTimeout(f, 2000));
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

    this.http.post('https://formana.azurewebsites.net//api/formanaAuth/title2', titleCreds)
    .subscribe(res => {
      localStorage.setItem('data2', JSON.stringify(res))
      console.log(res)
      this.nullz = res
      this.TTitle = this.wtitle
      this.bodyTrial = JSON.stringify(res)
      this.data = JSON.parse(this.bodyTrial)
      type ObjectKey = keyof typeof this.bodyTrial;
      const Key = 'expiryDate' as ObjectKey
      const KeyD = 'description' as ObjectKey
      const KeyA = 'approvedBy' as ObjectKey
      console.log(Key)
      this.expiryDate = new Date(res[Key])
      this.description = res[KeyD]
      this.approvedBy = res[KeyA]
      console.log(this.description)
      console.log(this.expiryDate)
      console.log(this.data.questions[0].question)
    }, error => {
       console.log(error)
    })
    await new Promise(f => setTimeout(f, 2000));
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

    this.http.post('https://formana.azurewebsites.net/api/formanaAuth/title3', titleCreds)
    .subscribe(res => {
      localStorage.setItem('data3', JSON.stringify(res))
      console.log(res)
      this.nullz = res
      this.TTitle = this.wtitle
      this.bodyTrial = JSON.stringify(res)
      this.data = JSON.parse(this.bodyTrial)
      type ObjectKey = keyof typeof this.bodyTrial;
      const Key = 'expiryDate' as ObjectKey
      const KeyD = 'description' as ObjectKey
      const KeyA = 'approvedBy' as ObjectKey
      console.log(Key)
      this.expiryDate = new Date(res[Key])
      this.description = res[KeyD]
      this.approvedBy = res[KeyA]
      console.log(this.description)
      console.log(this.expiryDate)
      console.log(this.data.questions[0].question)
    }, error => {
       console.log(error)
    })
    await new Promise(f => setTimeout(f, 2000));
    if (this.nullz == null) {
      this.presentAlert("Can't find the form", 'Wrong information filled out')
    }
    else {
      console.log("Continue")
    }
    return this.TTitle
  }
  viewTitle(): string {

    this.http.get('https://formana.azurewebsites.net/api/formanaAuth/title')
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
    document.getElementById('description').innerHTML
        = this.description.toString();
    document.getElementById('approvedBy').innerHTML
        = this.approvedBy.toString();
    this.setQuestions()
    this.setQuestions3()
    this.setQuestions4()
    console.log(this.data.questions2[0].comments[0].comment)
    this.building = 0
    this.confirm()

    return this.building
  }
  myGeeks2() {
    this.findTitle2();
    (<HTMLInputElement>document.getElementById('title')).value
        = this.TTitle;
    document.getElementById('description').innerHTML
        = this.description.toString();
    document.getElementById('approvedBy').innerHTML
        = this.approvedBy.toString();
    this.setQuestions()
    this.setQuestions3()
    this.setQuestions4()
    console.log(this.data.questions2[0].comments[0].comment)
    this.building = 1
    this.confirm()

    return this.building
  }
  myGeeks3() {
    this.findTitle3();
    (<HTMLInputElement>document.getElementById('title')).value
        = this.TTitle;
    document.getElementById('description').innerHTML
        = this.description.toString();
    document.getElementById('approvedBy').innerHTML
        = this.approvedBy.toString();
    this.setQuestions()
    this.setQuestions3()
    this.setQuestions4()
    console.log(this.data.questions2[0].comments[0].comment)
    this.building = 2
    this.confirm()

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

    this.http.post('https://formana.azurewebsites.net/api/formanaAuth/title', creds3)
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

  async pass(){
    console.log(this.myForm.value)
    const userData = this.myForm.value
    this.myForm.value.title = this.TTitle
    console.log(this.myForm.value.expiryDate)
    console.log(Date.now())
    if (this.expiryDate < new Date(Date.now())) {
      this.presentAlert("Can't find the form", 'Likely expired')
      await new Promise(f => setTimeout(f, 1000));
    }
    else {
      if (this.building == 0) {
        this.http.post('https://formana.azurewebsites.net/api/formanaAuth/answer', userData)
        .subscribe(res =>{
          localStorage.setItem('data', JSON.stringify(res))
          this.router.navigateByUrl('/home', {replaceUrl: true})
          console.log(res)
        }, error =>{
          console.log(error)
        })
      }
      else if (this.building == 1) {
        this.http.post('https://formana.azurewebsites.net/api/formanaAuth/answer2', userData)
        .subscribe(res =>{
          localStorage.setItem('data', JSON.stringify(res))
          this.router.navigateByUrl('/home', {replaceUrl: true})
          console.log(res)
        }, error =>{
          console.log(error)
        })
      }
      else if (this.building == 2) {
        this.http.post('https://formana.azurewebsites.net/api/formanaAuth/answer3', userData)
        .subscribe(res =>{
          localStorage.setItem('data', JSON.stringify(res))
          this.router.navigateByUrl('/home', {replaceUrl: true})
          console.log(res)
        }, error =>{
          console.log(error)
        })
      }
      else {
        return this.building
      }
    }
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