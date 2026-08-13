const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

class RoadGraph {
  constructor() {
    this.edges = new Map();
    this.nodes = new Set();
  }

  addNode(elt) {
    this.nodes.add(elt);
  }

  addEdge(from, to) {
    if (!this.nodes.has(from)) {
      this.nodes.add(from);
    }
    if (!this.nodes.has(to)) {
      this.nodes.add(to);
    }

    if (!this.edges.has(from)) {
      this.edges.set(from, []);
    }

    if (!this.edges.has(to)) {
      this.edges.set(to, []);
    }

    this.edges.get(from).push(to);
  }

  static from(edges) {
    let newGraph = new RoadGraph();
    for (let [from, to] of edges.map((r) => r.split("-"))) {
      newGraph.addEdge(from, to);
      newGraph.addEdge(to, from);
    }
    return newGraph;
  }
}

class WorldState {
  constructor(initialRobotLocation, parcels) {
    this.initialRobotLocation = initialRobotLocation;
    this.parcels = parcels;
  }

  move(graph, destination) {
    if (!graph.edges.get(this.initialRobotLocation).includes(destination)) {
      return this;
    }
    const newLocation = destination;

    const newParcels = [];

    for (const parcel of this.parcels) {
      if (parcel.place !== this.initialRobotLocation) {
        newParcels.push(JSON.parse(JSON.stringify(parcel)));
      } else {
        newParcels.push({ place: destination, address: parcel.address });
      }
    }

    const undeliveredParcels = newParcels.filter(
      (parcel) => parcel.address !== destination,
    );

    return new WorldState(newLocation, undeliveredParcels);
  }
  static createRandomState(parcelCount = 5, graph) {
    let parcels = [];
    const locations = Array.from(graph.nodes);
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(locations);
      let place;

      do {
        place = randomPick(locations);
      } while (place == address);
      parcels.push({ place, address });
    }
    return new WorldState("Post Office", parcels);
  }
}
const roadGraph = RoadGraph.from(roads);
const Village = new WorldState("Post Office", [
  { place: "Post Office", address: "Alice's House" },
]);
let next = Village.move(roadGraph, "Alice's House");
function runRobot(state, robot, graph, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }

    let action = robot(state, graph, memory);

    state = state.move(graph, action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state, graph) {
  return { direction: randomPick(graph.edges.get(state.initialRobotLocation)) };
}

runRobot(WorldState.createRandomState(10, roadGraph), randomRobot, roadGraph);
