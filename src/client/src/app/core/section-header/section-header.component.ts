import { Component,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-section-header', // bunu app.comp.html e koy ki görebilesin
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit {
  
  
  breadcrumbs$! : Observable<any[]>;


  constructor(private breadCrumbService:BreadcrumbService){}
  
  ngOnInit(): void {
    this.breadcrumbs$ = this.breadCrumbService.breadcrumbs$;
  }

}
