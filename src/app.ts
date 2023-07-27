// import _ from 'lodash'

// declare var GLOBAL: any
// console.log('====================================')
// console.log(_.shuffle([1, 2, 3]))
// console.log(GLOBAL)
// console.log('====================================')

import { Product } from './product.model'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'

const products = [
  {
    title: 'A Carpet',
    price: 29.99,
  },
  {
    title: 'A Novel',
    price: 10.99,
  },
]

const instances = plainToInstance(Product, products)

const newProd = new Product('', -5.0)
validate(newProd).then(error => {
  if (error.length > 0) {
    console.log('🚀 ~ file: app.ts:27 ~ validate ~ error:', error)
  } else {
    console.log(
      '🚀 ~ file: app.ts:26 ~ ins.getInformation():',
      newProd.getInformation()
    )
  }
})
for (const ins of instances) {
	console.log(
		'🚀 ~ file: app.ts:26 ~ ins.getInformation():',
		ins.getInformation()
	)
}
