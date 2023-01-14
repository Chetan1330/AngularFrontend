import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import Chart from 'chart.js';
import { AuthService, User } from '@auth0/auth0-angular';
import { TutorialService } from "src/app/services/tutorial.service";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: "app-notifications",
  templateUrl: "notifications.component.html"
})
export class NotificationsComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;


  ScenarioName: any;
  SolutionName: any;
  TrainnigDatafile: File;
  TesdtataFile: File;
  FactsheetFile: File;
  ModelFile: File;
  // form: FormGroup;
  tutorial = {
    SelectScenario: '',
    SelectSolution: '',
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
      this.tutorialservice.getsolution(user.sub.split('|')[1]).subscribe((data:any)=>{
        this.SolutionName=data.SolutionName;
        console.log("ScenarioNameList:",data.SolutionName);
      });
      // this.form = this.formBuilder.group({
      //   profile: ['']
      // });
      // console.log("User is:",user);
    });

    
    var gradientBarChartConfiguration: any = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };

    this.canvas = document.getElementById("CountryChart");
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors


    var myChart = new Chart(this.ctx, {
      type: 'bar',
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: ['USA', 'GER', 'AUS', 'UK', 'RO', 'BR'],
        datasets: [{
          label: "Countries",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [53, 20, 10, 80, 100, 45],
        }]
      },
      options: gradientBarChartConfiguration
    });

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }


  saveTutorial(): void {
    const formData = new FormData();
    formData.append('Userid', this.tutorial.Userid);
    formData.append('SelectScenario', this.tutorial.SelectScenario);
    formData.append('SelectSolution', this.tutorial.SelectSolution);

    this.tutorialservice.analyzesolution(formData)
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
