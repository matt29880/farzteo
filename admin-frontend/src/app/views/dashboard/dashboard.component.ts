import {Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { PublishService } from './publish.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  constructor(public publishService: PublishService) { }

  published : boolean = false;

  publish() {
    this.published = false;
    this.publishService.publish().subscribe(res => {
      console.log("Published !!!");
      this.published = true;
    });
  }
  
}
