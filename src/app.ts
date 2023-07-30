import axios from 'axios'
const form = document.getElementById('form')!
const addressInput = document.getElementById('address')! as HTMLInputElement
const api_key = 'AIzaSyB9EyPsHKDv2H5eEBhRO7uhqyxwzjGWW4c'

interface GoogleGeocodingResponse {
  results: {
    geometry: {
      location: {
        lat: number
        lng: number
      }
    }
  }[]
  status: 'OK' | 'ZERO_RESULTS'
}

function searchAddressHandler(event: Event) {
  event.preventDefault()
  const enteredAddress = addressInput.value
  axios
    .get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )}&key=${api_key}`
    )
    .then(async res => {
      console.log(res, 'response <=======')
      if (res.data.status !== 'OK') {
        throw new Error('Could not fetch location')
      }
      const coordinates = res.data.results[0].geometry.location
      console.log(
        '🚀 ~ file: app.ts:17 ~ searchAddressHandler ~ coordinates:',
        coordinates,
        google
      )
      // const { Map } = await google.maps.importLibrary('maps')
      // const { AdvancedMarkerElement } = await google.maps.importLibrary(
      //   'marker'
      // )

      // The map, centered at Uluru
      const map = new google.maps.Map(
        document.getElementById('map') as HTMLElement,
        {
          zoom: 4,
          center: coordinates,
        }
      )

      // The marker, positioned at Uluru
      const marker = new google.maps.Marker({
        map: map,
        position: coordinates,
      })
    })
    .catch(err => {
      console.log('🚀 ~ file: app.ts:17 ~ searchAddressHandler ~ err:', err)
    })
}
form.addEventListener('submit', searchAddressHandler)
