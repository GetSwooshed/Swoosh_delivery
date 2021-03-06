
const mockDonations = [
{"_id": "1", "userId":1,"coords":[-121.92900, 37.39900],"item":"Table Cloth 62x114 Colour","pickedUp":false},
{"_id": "2", "userId":2,"coords":[-122.4863, 37.7467],"item":"Mushroom - Oyster, Fresh","pickedUp":false},
{"_id": "3", "userId":3,"coords":[-122.390605, 37.773972],"item":"Juice - Orange 1.89l","pickedUp":false},
{"_id": "4", "userId":4,"coords":[-121.92900, 37.39900],"item":"Foil Wrap","pickedUp":false},
{"_id": "5", "userId":5,"coords":[-122.390605, 37.782190],"item":"Tea - Earl Grey","pickedUp":false},
{"_id": "6", "userId":6,"coords":[-64.296257, -19.268573],"item":"Isomalt","pickedUp":false},

]

const usersItems = {
  claimedDonations: [
    {"userId":1,"coords":[-121.92900, 37.39900],"item":"Table Cloth 62x114 Colour","pickedUp":false},
{"userId":2,"coords":[-122.4863, 37.7467],"item":"Mushroom - Oyster, Fresh","pickedUp":false},
{"userId":3,"coords":[-122.390605, 37.773972],"item":"Juice - Orange 1.89l","pickedUp":false},
{"userId":4,"coords":[-121.92900, 37.39900],"item":"Foil Wrap","pickedUp":false},
{"userId":5,"coords":[-122.390605, 37.782190],"item":"Tea - Earl Grey","pickedUp":false},
{"userId":6,"coords":[-64.296257, -19.268573],"item":"Isomalt","pickedUp":false},
  ],

  postedDonations: [
    {"userId":1,"coords":[-121.92900, 37.39900],"item":"Table Cloth 62x114 Colour","pickedUp":false},
{"userId":2,"coords":[-122.4863, 37.7467],"item":"Mushroom - Oyster, Fresh","pickedUp":true},
{"userId":3,"coords":[-122.390605, 37.773972],"item":"Juice - Orange 1.89l","pickedUp":false},
{"userId":4,"coords":[-121.92900, 37.39900],"item":"Foil Wrap","pickedUp":false},
{"userId":5,"coords":[-122.390605, 37.782190],"item":"Tea - Earl Grey","pickedUp":true},
{"userId":6,"coords":[-64.296257, -19.268573],"item":"Isomalt","pickedUp":false},
  ],
}

export { usersItems };
export default mockDonations;

