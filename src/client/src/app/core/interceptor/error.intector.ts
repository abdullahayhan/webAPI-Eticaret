import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";



@Injectable() // bir servis olarak kullanabilmek için bunu eklememiz lazım.
export class ErrorInterceptor implements HttpInterceptor{


    constructor(private router:Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            //rxjs geniş bir kütüphane just like nugepacket
            catchError(error=>{
                if (error) {
                    if (error==='404') {
                        this.router.navigateByUrl('/not-found');
                    }
                    if (error==='500') {
                        this.router.navigateByUrl('/server-error');
                    }   
                }  
                return throwError(error);
            }));
    }
}