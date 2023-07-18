// import { add } from './lib'
function Logger(logString: string) {
  console.log('Logger Factory 111')
  return function (constructor: Function) {
    console.log('logString 444', logString)
    console.log(constructor)
  }
}

function WithTemplate(_: string, hookId: string) {
  console.log('Template Factory 222')
  return function <T extends { new (...args: any[]): { name: string } }>(Constructor: T) {
    console.log('hookId 333', hookId)

    return class extends Constructor {
      constructor(..._: any[]) {
        super(..._)
        const hookEl = document.getElementById(hookId)
        if (hookEl) {
          hookEl.textContent = this.name + Math.random()
        }
      }
    }
  }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max'
  constructor() {
    console.log('Creating person object ...')
  }
}

const man = new Person()
console.log('🚀 ~ file: index.ts:18 ~ man:', man)
setTimeout(() => {
  const man = new Person()
  console.log('🚀 ~ file: index.ts:18 ~ man:', man)
}, 1000)

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
