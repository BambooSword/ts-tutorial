export interface ITarget {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}

export class CustomMap {
  private googleMap: google.maps.Map

  constructor(divId: string) {
    const myLatLng = {
      lat: 40.12150192260742,
      lng: -100.45039367675781,
    }
    this.googleMap = new google.maps.Map(document.getElementById(divId)!, {
      zoom: 1,
      center: myLatLng,
      fullscreenControl: false,
      zoomControl: true,
      streetViewControl: false,
    })
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: this.googleMap,
      title: 'My location',
    })
  }

  addMarker(target: ITarget) {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: target.location.lat,
        lng: target.location.lng,
      },
    })

    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: target.markerContent(),
      })
      infoWindow.open(this.googleMap, marker)
    })
  }
}
