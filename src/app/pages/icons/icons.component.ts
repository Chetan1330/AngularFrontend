import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-icons",
  templateUrl: "icons.component.html",
})
export class IconsComponent implements OnInit {
  ScenarioName: any;
  TrainnigDatafile: File;
  TesdtataFile: File;
  FactsheetFile: File;
  ModelFile: File;
  // form: FormGroup;
  tutorial = {
    SelectScenario: '',
    NameSolution: '',
    DescriptionSolution: '',
    // TrainingFile: '',
    // TesdtataFile: '',
    // FactsheetFile: '',
    // ModelFile: '',
    Targetcolumn: '',
    // TrainnigDatafile: File,
    ScenarioName: '',
    ModelLinks: '',
    LinktoDataset: '',
    Description: '',
    emailid: '',
    Userid: '',
  };

  constructor(public auth: AuthService, private tutorialservice: TutorialService) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.tutorial.Userid = user.sub.split('|')[1];
      this.tutorialservice.get(user.sub.split('|')[1]).subscribe((data:any)=>{
        this.ScenarioName=data.ScenarioName;
        console.log("ScenarioNameList:",data.ScenarioName);
      });
      // this.form = this.formBuilder.group({
      //   profile: ['']
      // });
      // console.log("User is:",user);
    });
  }

  onTrainnigDatafile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.TrainnigDatafile = event.target.files[0];
  }
  onTesdtatafile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.TesdtataFile = event.target.files[0];
  }
  onFactsheetfile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.FactsheetFile = event.target.files[0];
  }
  onModelfile(event: any){
    // const file = event.target.files[0];
    // this.form.get('profile').setValue(file);
    this.ModelFile = event.target.files[0];
  }

  saveTutorial(): void {
    const formData = new FormData();
    formData.append('Userid', this.tutorial.Userid);
    formData.append('SelectScenario', this.tutorial.SelectScenario);
    formData.append('NameSolution', this.tutorial.NameSolution);
    formData.append('DescriptionSolution', this.tutorial.DescriptionSolution);
    formData.append('TrainingFile', this.TrainnigDatafile);
    formData.append('TesdtataFile', this.TesdtataFile);
    formData.append('FactsheetFile', this.FactsheetFile);
    formData.append('ModelFile', this.ModelFile);
    formData.append('Targetcolumn', this.tutorial.Targetcolumn);
    const data = {
      SelectScenario: this.tutorial.SelectScenario,
      TrainnigDatafile: this.TrainnigDatafile,
      // TrainnigDatafile: this.form.get('profile').value,
      DatafileName: this.TrainnigDatafile.name,
      ModelLinks: this.tutorial.ModelLinks,
      LinktoDataset: this.tutorial.LinktoDataset,
      Description: this.tutorial.Description,
      emailid: this.tutorial.emailid,
      Userid: this.tutorial.Userid
    };

    this.tutorialservice.uploadsolution(formData)
      .subscribe(
        response => {
          console.log("Response data:", response);
        },
        error => {
          console.log(error);
        }
      );
  };

  Getdata(id): void {
    this.tutorialservice.get(id)
      .subscribe(
        response => {
          console.log("Response data:", response);
        },
        error => {
          console.log(error);
        }
      );
  }
}
