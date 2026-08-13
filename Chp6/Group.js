class Group {
  constructor() {
    this.members = [];
  }

  add(element) {
    if (!this.members.includes(element)) {
      this.members.push(element);
    }
  }

  delete(element) {
    if (!this.members.includes(element)) {
      return;
    } else {
      this.members = this.members.filter((elt) => element !== elt);
    }
  }

  has(element) {
    return this.members.includes(element);
  }

  static from(iterable) {
    let out = new Group();
    for (const elt of iterable) {
      out.add(elt);
    }
    return out;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  index = 0;
  constructor(Group) {
    this.group = Group;
  }

  next() {
    if (this.index >= this.group.members.length) {
      return { done: true };
    }
    let value = this.group.members[this.index];
    this.index += 1;
    return { value, done: false };
  }
}
