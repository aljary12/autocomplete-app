import Place from './place';

class Api {
  place: Place;

  constructor() {
    this.place = new Place();
  }
}

export default new Api();
