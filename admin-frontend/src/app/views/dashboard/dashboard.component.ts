import {Component, OnInit, OnDestroy, TemplateRef} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { PublishService } from './publish.service';
import { PublishType } from './publishType';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  constructor(public publishService: PublishService) { }

  publishType = PublishType;
  published : boolean = false;

  publish(publishType : PublishType) {
    this.published = false;
    this.publishService.publish(publishType).subscribe(res => {
      console.log("Published !!!");
      this.published = true;
    });
  }
  
}
