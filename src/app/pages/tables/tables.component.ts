import { Component, OnInit } from "@angular/core";
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  ScenarioName: any;
  SolutionName: any;

  tutorial = {
    SelectScenario: '',
    SelectSolution: '',
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
      this.tutorialservice.getsolution(user.sub.split('|')[1]).subscribe((data:any)=>{
        this.SolutionName=data.SolutionName;
        console.log("ScenarioNameList:",data.SolutionName);
      });
    });
  }

  saveTutorial(): void {
    const formData = new FormData();
    formData.append('Userid', this.tutorial.Userid);
    formData.append('SelectScenario', this.tutorial.SelectScenario);
    formData.append('SelectSolution', this.tutorial.SelectSolution);

    this.tutorialservice.comparesolution(formData)
      .subscribe(
        response => {
          console.log("Response data:", response);
        },
        error => {
          console.log(error);
        }
      );
  };
}
