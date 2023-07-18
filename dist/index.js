"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// import { add } from './lib'
function Logger(logString) {
    console.log('Logger Factory 111');
    return function (constructor) {
        console.log('logString 444', logString);
        console.log(constructor);
    };
}
function WithTemplate(_, hookId) {
    console.log('Template Factory 222');
    return function (Constructor) {
        console.log('hookId 333', hookId);
        return class extends Constructor {
            constructor(..._) {
                super(..._);
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.textContent = this.name + Math.random();
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'Max';
        console.log('Creating person object ...');
    }
};
Person = __decorate([
    Logger('LOGGING - PERSON'),
    WithTemplate('<h1>My Person Object</h1>', 'app')
], Person);
const man = new Person();
console.log('🚀 ~ file: index.ts:18 ~ man:', man);
setTimeout(() => {
    const man = new Person();
    console.log('🚀 ~ file: index.ts:18 ~ man:', man);
}, 1000);
// function Log(log: string) {
//   console.log('in Log upper', log)
//   return function (constructor: any, propertyName: string) {
//     console.log('in Log inner')
//     console.log(constructor, propertyName)
//   }
// }
// function AccessorLog(
//   constructor: any,
//   propertyName: string,
//   descriptor: PropertyDescriptor
// ) {
//   console.log('in Accessor descriptor Log')
//   console.log(constructor, propertyName, descriptor)
// }
// function MethodLog(
//   constructor: any,
//   propertyName: string,
//   descriptor: PropertyDescriptor
// ) {
//   console.log('in Method descriptor Log')
//   console.log(constructor, propertyName, descriptor)
// }
// function ParameterLog(
//   constructor: any,
//   propertyName: string,
//   position: number
// ) {
//   console.log('in Parameter position Log')
//   console.log(constructor, propertyName, position)
// }
// class Product {
//   @Log('log')
//   title: string
//   private _price: number
//   @AccessorLog
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val
//     } else {
//       throw new Error('Invalid price - should be positive!')
//     }
//   }
//   constructor(t: string, price: number) {
//     this.title = t
//     this._price = price
//   }
//   @MethodLog
//   getPriceWithTax(@ParameterLog tax: number) {
//     return this._price * (1 + tax)
//   }
// }
// const noodle = new Product('noodle', 10)
// console.log('🚀 ~ file: index.ts:66 ~ noodle:', noodle)
