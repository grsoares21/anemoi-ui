interface Location {
  id: string;
  name: string;
  slug: string;
  code: string;
}

interface City extends Location {
  active: boolean;
  country: Location;
}

class LocationServices {
  private readonly baseUrl = 'https://api.skypicker.com/locations?';

  searchCities(term: string, locale: string = "en-US", limit: number = 10): Promise<Array<City>> {
    let searchUrl = this.baseUrl + `location_types=city&locale=${locale}&limit=${limit}&term=${term}`;

    return fetch(searchUrl)
            .then(result => result.json())
            .then(data => data.locations)
            .then(locations => <Array<City>>locations)
  }
}

export default new LocationServices();