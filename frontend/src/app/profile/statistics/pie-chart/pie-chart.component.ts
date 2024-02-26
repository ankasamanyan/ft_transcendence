// pie-chart.component.ts
import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})

export class PieChartComponent implements AfterViewInit {
  
  @ViewChild('pieChartCanvas', { static: false }) pieChartCanvas!: ElementRef;

  @Input() wins: any;

  @Input() losses: any;

  ngAfterViewInit(): void {
    this.drawPieChart();
  }

  drawPieChart(): void {
    const canvas: HTMLCanvasElement = this.pieChartCanvas.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Could not get 2D context for canvas.');
      return;
    }
  
    const total = this.wins + this.losses;
    const winsPercentage = (this.wins / total) * 100;
    const lossesPercentage = (this.losses / total) * 100;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY);

    const winsAngle = (winsPercentage / 100) * (2 * Math.PI);
    const lossesAngle = (lossesPercentage / 100) * (2 * Math.PI);

    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, 0, lossesAngle);
    context.fillStyle = '#c76262';
    context.fill();
    
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.arc(centerX, centerY, radius, lossesAngle, winsAngle + lossesAngle);
    context.fillStyle = '#8c84e7';
    context.fill();
  }
}
