var _moment = require("moment");

module.exports = () => {
  const moment = _moment;
  const city = [
    { id: 1, name: "Bydgoszcz", key: "BZG" },
    { id: 2, name: "Gdańsk", key: "GDN" },
    { id: 3, name: "Katowice", key: "KTW" },
    { id: 4, name: "Kraków", key: "KRK" },
    { id: 5, name: "Lublin", key: "LUZ" },
    { id: 6, name: "Łódź", key: "LCJ" },
    { id: 7, name: "Olsztyn-Mazury", key: "SZY" },
    { id: 8, name: "Poznań", key: "POZ" },
    { id: 9, name: "Rzeszów", key: "RZE" },
    { id: 10, name: "Szczecin", key: "SZZ" },
    { id: 11, name: "Warszawa", key: "WAW" },
    { id: 12, name: "Wrocław", key: "WRO" },
    { id: 13, name: "Zielona Góra", key: "IEG" },
  ];
  const data = { city: [], flight: [] };

  city.forEach((item) => {
    data.city.push(item);
  });
  city.forEach((item) => {
    for (let i = 0; i < 2000; i++) {
      let arrivalId = 0;
      let departureId = item.id;
      do {
        arrivalId = Math.floor(Math.random() * city.length);
      } while (arrivalId === departureId);
      const arrivalRandomCity = city[arrivalId];
      const departureRandomCity = item;
      const randomDate = moment(
        new Date(
          new Date(2021, 9, 20).getTime() +
            Math.random() *
              (new Date().getTime() - new Date(2021, 9, 20).getTime())
        )
      );
      const date = randomDate.format("YYYY-MM-DD");
      const time = randomDate.format("HH:mm");
      const arrival = randomDate.add(3, 'hours');
      const arrivalDate = arrival.format("YYYY-MM-DD");
      const arrivalTime = arrival.format("HH:mm");
      const newItem = {
        departure: `${departureRandomCity.name} (${departureRandomCity.key})`,
        departureKey: departureRandomCity.key,
        arrival: `${arrivalRandomCity.name} (${arrivalRandomCity.key})`,
        arrivalKey: arrivalRandomCity.key,
        departureDate: date,
        departureTime: time,
        arrivalDate: arrivalDate,
        arrivalTime: arrivalTime,
      };
      data.flight.push(newItem);
    }
  })
  return data;
};
