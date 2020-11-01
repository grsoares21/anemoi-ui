export interface DateRange {
  startDate: string; // date string as per the ISO 8601 specification
  endDate: string; // date string as per the ISO 8601 specification
}

interface VisitingCity {
  cityId: string; // cityId as per Kiwi's skypicker API
  stayPeriod: [number, number]; // [minDays, maxDays]
}

export default interface TravelPlanParameters {
  departureCities: string[]; // list cityIds as per Kiwi's skypicker API
  arrivalCities: string[]; // list cityIds as per Kiwi's skypicker API

  visitingCities: VisitingCity[];

  locale: string;
  currency: string;

  departureDateRange: DateRange;
  arrivalDateRange: DateRange;

  preferredCriteria: 'price' | 'quality' | 'duration';
  noOfTravelers: number;
  maxStopsPerRoute: number;
}
