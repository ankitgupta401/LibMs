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

  public barChartLabels = ['Today', 'This Week', ' Last Week', 'This Month', 'Last Month', 'This Year', 'Last Year'];
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
      this.app.getIssueData()
      .subscribe(postData => {
        this.IssueData.push(postData.issueData);
        this.ReceiveData.push(postData.receiveData);
        this.app.getLastWeek()
        .subscribe(data => {
          this.IssueData.push(data.issueData);
          this.ReceiveData.push(data.receiveData);
          this.app.getThisMonth()
          .subscribe(data2 => {
            this.IssueData.push(data2.issueData);
            this.ReceiveData.push(data2.receiveData);
            this.app.getLastMonth()
          .subscribe(data3 => {
            this.IssueData.push(data3.issueData);
            this.ReceiveData.push(data3.receiveData);
            this.app.getThisYear()
          .subscribe(data4 => {
            this.IssueData.push(data4.issueData);
            this.ReceiveData.push(data4.receiveData);
            this.app.getLifetime()
            .subscribe(data5 => {
              this.IssueData.push(data5.issueData);
              this.ReceiveData.push(data5.receiveData);
            });
          });
          });
          });
        });
          });
    });

}
}
