import { Component, OnInit } from '@angular/core';
import {Chart} from 'chart.js';
import { All } from '../app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  IssueData: any = [];
  ReceiveData = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['24 Hours', 'This Week', ' Last Week', 'This Month' , 'Last Year(This Month)'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: this.IssueData, label: 'Issued'},
    {data: this.ReceiveData, label: 'Received'}
  ];

  constructor(private app: All) { }

  ngOnInit() {

    this.app.getTodayReport().subscribe(result => {
      this.IssueData.push(result.issueData);
      this.ReceiveData.push(result.receiveData);
      this.app.getThisWeek().subscribe(result2 => {
  this.IssueData.push(result2.issueData);
  this.ReceiveData.push(result2.receiveData);
  this.app.getLastWeek().subscribe(result3 => {
    this.IssueData.push(result3.issueData);
    this.ReceiveData.push(result3.receiveData);
    this.app.getThisMonth().subscribe(result4 => {
      this.IssueData.push(result4.issueData);
      this.ReceiveData.push(result4.receiveData);
      this.app.getLastYearThisMonth().subscribe(result5 => {
        this.IssueData.push(result5.issueData);
        this.ReceiveData.push(result5.receiveData);


        });

      });
    });
  });
});


}
}
