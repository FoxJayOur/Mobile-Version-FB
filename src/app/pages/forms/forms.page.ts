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
  data1: any

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
  temptitleObj: any[]
  temptitleObj2: any[]
  temptitleObj3: any[]
  title1: string[] = []
  title2: string [] = []
  title3: string [] = []
  expiryDate1: string [] = []
  expiryDate2: string [] = []
  expiryDate3: string [] = []

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private alertController: AlertController) {
    this.myForm = this.fb.group({
      title: [''],
      expiryDate: [this.expiryDate],
      questions: this.fb.array([]),
      questions2: this.fb.array([]),
      questions3: this.fb.array([])
    })
  }

  onSubmit() {
    alert(this.myForm.value);
  }

  viewForms() {
    this.http.get('https://formana.azurewebsites.net//api/formanaAuth/viewAll')
    .subscribe(req =>{
      localStorage.getItem('data')
      console.log(req)
      this.data1 = JSON.stringify(req)
      type ObjectKey = keyof typeof this.data1;
      const Key = 'formDataAll' as ObjectKey
      this.temptitleObj = req[Key]
      const Key1 = 'formData2All' as ObjectKey
      this.temptitleObj2 = req[Key1]
      const Key2 = 'formData3All' as ObjectKey
      this.temptitleObj3 = req[Key2]
      for (let i = 0; i < Object.keys(this.temptitleObj).length; i++) {
        console.log("Error")
        if (this.temptitleObj[i].title == null) {
          this.title1[i] = "Null"
        }
        else {
          this.title1[i] = this.temptitleObj[i].title
        }
        if (this.temptitleObj[i].expiryDate == null) {
          this.expiryDate1[i] = "Null"
        }
        else{
          this.expiryDate1[i] = this.temptitleObj[i].expiryDate
          console.log(this.title1[i])
        }
      }
      for (let i = 0; i < Object.keys(this.temptitleObj2).length; i++) {
        console.log("Error")
        if (this.temptitleObj2[i].title == null) {
          this.title2[i] = "Null"
        }
        else {
          this.title2[i] = this.temptitleObj2[i].title
        }
        if (this.temptitleObj2[i].expiryDate == null) {
          this.expiryDate2[i] = "Null"
        }
        else{
          
          this.expiryDate2[i] = this.temptitleObj2[i].expiryDate
          console.log(this.title2[i])
        }
      }
      for (let i = 0; i < Object.keys(this.temptitleObj3).length; i++) {
        console.log("Error")
        if (this.temptitleObj3[i].title == null) {
          this.title3[i] = "Null"
        }
        else {
          this.title3[i] = this.temptitleObj3[i].title
        }
        if (this.temptitleObj3[i].title == null) {
          this.expiryDate3[i] = "Null"
        }
        else{
          this.expiryDate3[i] = this.temptitleObj3[i].expiryDate
          console.log(this.title3[i])
        }
      }
      console.log(Object.keys(this.temptitleObj).length)
      console.log(this.temptitleObj[0].name)
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
      this.presentAlert("FORM STATUS:", 'Form Found')
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
      this.presentAlert("FORM STATUS:", 'Form Found')
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
      this.presentAlert("FORM STATUS:", 'Form Found')
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
    this.presentAlert("FORM STATUS:", 'Proceed to answering the form by pressing back button')

    return this.building
  }
  myGeeks2() {
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
    this.presentAlert("FORM STATUS:", 'Proceed to answering the form by pressing back button')

    return this.building
  }
  myGeeks3() {
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
    this.presentAlert("FORM STATUS:", 'Proceed to answering the form by pressing back button')

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