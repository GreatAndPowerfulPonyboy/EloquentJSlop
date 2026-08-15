const box = new (class {
  locked = true;
  #content = [];

  unlock() {
    this.locked = false;
  }
  lock() {
    this.locked = true;
  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
})();

function withBoxUnlocked(body) {
  let originallyLocked = box.locked;
  try {
    box.unlock();
    return body();
  } finally {
    if (originallyLocked) {
      box.lock();
    }
  }
}
