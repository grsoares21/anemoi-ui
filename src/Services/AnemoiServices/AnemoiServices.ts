import TravelPlanResult from "./TravelPlanResult";
import TravelPlanParameters from "./TravelPlanParameters";

class AnemoiServices {
  private readonly baseUrl = 'https://api.anemoi.app/.netlify/functions/server/';

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
        .then(result => {
          if(!result.ok) {
            throw Error(result.statusText);
            // general treatment for every error
          }
          return result.json();
        })
        .then(data => data as TravelPlanResult);
  }
}

export default new AnemoiServices();