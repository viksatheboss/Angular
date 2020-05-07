import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  Designation: string;
  Username: string;
  NoOfTeamMembers: number;
  TotalCostOfAllProjects: number;
  PendingTasks: number;
  UpComingProjects: number;
  ProjectCost: number;
  CurrentExpenditure: number;
  AvailableFunds: number;
  ToDay: Date;

  Clients: string[];
  Projects: string[];
  Years: number[]=[];
  TeamMembersSummary=[];
  TeamMembers = [];

  constructor(private dashboardService:DashboardService)
   {

   }

  ngOnInit(): void{
    this.Designation="Team Leader";
    this.Username="John Smith";
    this.NoOfTeamMembers=67;
    this.TotalCostOfAllProjects=240;
    this.PendingTasks=15;
    this.UpComingProjects= 0.2;
    this.ProjectCost=2113507;
    this.CurrentExpenditure=96788;
    this.AvailableFunds=52536;
    this.ToDay = new Date();

    this.Clients = [
      "ABC Infotech", "DEF Software Solutions", "GHI Industries"
    ];

    this.Projects=[
      "Project A", "Project B", "Project C", "Project D"
    ];
    
    for(var i=2019; i>2010; i--){
      this.Years.push(i);
    }

    this.TeamMembersSummary= this.dashboardService.getTeamMemberSummary();

    this.TeamMembers=[
      {
        Region: "East", Members:[
        {Id: 1, Name:"Ford", Status:"Available"},
        {Id: 2, Name:"Miller", Status:"Available"},
        {Id: 3, Name:"Jones", Status:"Busy"},
        {Id: 4, Name:"James", Status:"Busy"}
        ]
      },
      {
        Region: "West", Members:[
        {Id: 1, Name:"Ford", Status:"Available"},
        {Id: 2, Name:"Miller", Status:"Busy"},
        {Id: 3, Name:"Jones", Status:"Available"},
        {Id: 4, Name:"James", Status:"Busy"}
        ]
      },
      {
        Region: "South", Members:[
        {Id: 1, Name:"Ford", Status:"Busy"},
        {Id: 2, Name:"Miller", Status:"Available"},
        {Id: 3, Name:"Jones", Status:"Busy"},
        {Id: 4, Name:"James", Status:"Available"}
        ]
      },
      {
        Region: "North", Members:[
        {Id: 1, Name:"Ford", Status:"Busy"},
        {Id: 2, Name:"Miller", Status:"Busy"},
        {Id: 3, Name:"Jones", Status:"Available"},
        {Id: 4, Name:"James", Status:"Available"}
        ]
      }

    ]
  }

  onProjectChange($event: { target: { innerHTML: any; }; }){
    if($event.target.innerHTML == "Project A"){
      this.ProjectCost= 2113507;
      this.CurrentExpenditure = 96788;
      this.AvailableFunds =52436;
    }
    else if($event.target.innerHTML == "Project B"){
      this.ProjectCost= 5123507;
      this.CurrentExpenditure = 109788;
      this.AvailableFunds =152436;
    }
    else if($event.target.innerHTML == "Project C"){
      this.ProjectCost= 983507;
      this.CurrentExpenditure = 98008;
      this.AvailableFunds =72436;
    }
    else if($event.target.innerHTML == "Project D"){
      this.ProjectCost= 5123507;
      this.CurrentExpenditure = 109788;
      this.AvailableFunds =152436;
    }
  }

}
