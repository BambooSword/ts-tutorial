import { faker } from '@faker-js/faker'
import type { ITarget } from './CustomMap'
export class User implements ITarget {
  name: string
  location: {
    lat: number // latitude
    lng: number // longitude
  }

  constructor() {
    this.name = faker.person.firstName('male')
    this.location = {
      lat: faker.location.latitude(),
      lng: faker.location.longitude(),
    }
  }
  markerContent() {
    return `Hi, I am ${this.name}`
  }
}
