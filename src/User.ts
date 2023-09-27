import { faker } from '@faker-js/faker'
export class User {
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
}
