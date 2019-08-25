import TravelPlanResult from "./TravelPlanResult";
import TravelPlanParameters from "./TravelPlanParameters";

class AnemoiServices {
  private readonly baseUrl = 'http://localhost:3001/';

  calculateTravelPlan(parameters: TravelPlanParameters): Promise<TravelPlanResult> {
    let searchUrl = this.baseUrl + `calculateTravelPlan`;

    return fetch(searchUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
      })
        .then(result => result.json())
        .then(data => data as TravelPlanResult);
  }
}

export default new AnemoiServices();