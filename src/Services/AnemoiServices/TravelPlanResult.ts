interface Route {
    source: string; // cityId as per Kiwi's skypicker API
    destination: string; // cityId as per Kiwi's skypicker API

    startTime: string; // datetime as per ISO 8601 specification
    endTime: string; // datetime as per ISO 8601 specification
}

export default interface TravelPlanResult {
    deepLink: string;

    totalPrice: number;

    routes: Route[];
}