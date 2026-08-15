class PGroup {
  #members;
  constructor(members) {
    this.#members = members;
  }
  add(element) {
    if (this.has(element)) return element;
    return new PGroup(this.#members.concat(element));
  }

  delete(element) {
    if (!this.has(element)) return this;
    return new PGroup(this.#members.filter((elt) => elt !== element));
  }

  has(element) {
    return this.#members.inclues(element);
  }
  static empty = new PGroup([]);
}
