interface RouteCity {
  cityName: string; // cityId as per Kiwi's skypicker API
  countryName: string;
  countryCode: string;
}

export interface Route {
  source: RouteCity;
  destination: RouteCity;

  startTime: string; // datetime as per ISO 8601 specification
  endTime: string; // datetime as per ISO 8601 specification
}

export default interface TravelPlanResult {
  deepLink: string;

  totalPrice: number;

  routes: Route[];
}
