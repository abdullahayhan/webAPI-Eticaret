// import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
// import { ControlValueAccessor, NgControl } from '@angular/forms';

// @Component({
//   selector: 'app-text-input',
//   templateUrl: './text-input.component.html',
//   styleUrls: ['./text-input.component.css']
// })
// export class TextInputComponent implements OnInit,ControlValueAccessor {
  
//  @ViewChild('input',{static:true}) input:ElementRef; //child dan parenta data gönderirken kullanılıyor.
//  @Input() type='text'; // parentten childa veri gönderirken.
//  @Input() label:string;
 

//   // hangi domda kullanılmışsa orada kontrol yapsın.
//   constructor( @Self() public controlDir:NgControl){
//     this.controlDir.valueAccessor=this;
//   }


//   ngOnInit(){
//     const control = this.controlDir.control;
//     const validator = control.validator ?[control.validator]:[]; // varsa control validator yoksa soru işaretinin sağ tarafı.
//     const asyncValidator = control.asyncValidator ?[control.asyncValidator]:[];
//     control.setValidators(validator);
//     control.setAsyncValidators(asyncValidator);
//     control.updateValueAndValidity();
//   }

//   onChange(event){
//   }


//   onTouched(){

//   }

//   writeValue(obj: any): void {
//     this.input.nativeElement.value = obj || ''; //varsa obj nullsa boş yolla 
//   }
//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }
//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }
  
// }



import { Component, OnInit, ViewChild, ElementRef, Input, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input', { static: true }) input: ElementRef;
  @Input() type = 'text';
  @Input() label: string;

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit() {
    const control = this.controlDir.control;
    const validators = control.validator ? [control.validator] : [];
    const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

    control.setValidators(validators);
    control.setAsyncValidators(asyncValidators);
    control.updateValueAndValidity();
  }

  onChange(event) { }

  onTouched() { }

  writeValue(obj: any): void {
    this.input.nativeElement.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}