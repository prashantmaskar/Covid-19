export const fetchReport = async country => {
    const response = await fetch(
      `https://covid19.mathdro.id/api/countries/${country}/`,
    );
    const data = await response.json();
    return {
      Confirmed: data.confirmed.value,
      Recovered: data.recovered.value,
      Deaths: data.deaths.value,
      Country:country,
    };
  };