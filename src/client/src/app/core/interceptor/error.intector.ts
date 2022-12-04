import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { catchError, delay, Observable, throwError } from "rxjs";



@Injectable() // bir servis olarak kullanabilmek için bunu eklememiz lazım.
export class ErrorInterceptor implements HttpInterceptor{


    constructor(private router:Router, private toastr : ToastrService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            //rxjs geniş bir kütüphane just like nugepacket
            delay(1000),
            catchError(error=>{
                if (error) {
                    if (error.status === '400') {
                        this.toastr.error(error.error.message,error.error.statuscode);
                    }
                    if (error.status === '401') {
                        this.toastr.error(error.error.message,error.error.statuscode);
                    }
                    if (error.status==='404') {
                        this.router.navigateByUrl('/not-found');
                    }
                    if (error.status==='500') {
                        this.router.navigateByUrl('/server-error');
                    }   
                }  
                return throwError(error);
            })
            );
    }
}