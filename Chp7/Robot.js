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

//runRobot(WorldState.createRandomState(10, roadGraph), randomRobot, roadGraph);

const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

function routeRobot(state, graph, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

//runRobot(
// WorldState.createRandomState(10, roadGraph),
//routeRobot,
//roadGraph,
//mailRoute,
//);

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph.edges.get(at)) {
      if (place === to) return route.concat(place);
      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ initialRobotLocation, parcels }, graph, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place !== initialRobotLocation) {
      route = findRoute(graph, initialRobotLocation, parcel.place);
    } else {
      route = findRoute(graph, initialRobotLocation, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

runRobot(
  WorldState.createRandomState(10, roadGraph),
  goalOrientedRobot,
  roadGraph,
  [],
);

function measureRobot(state, robot, graph, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, graph, memory);

    state = state.move(graph, action.direction);
    memory = action.memory;
  }
}
function compareRobots(graph, robot1, memory1, robot2, memory2) {
  const tasks = [];
  for (let i = 0; i < 99; i++) {
    tasks.push(WorldState.createRandomState(10, graph));
  }
  let robot1Turns = 0;
  let robot2Turns = 0;
  for (let task of tasks) {
    robot1Turns += measureRobot(task, robot1, graph, memory1);
    robot2Turns += measureRobot(task, robot2, graph, memory2);
  }
  console.log(`Average number of steps for ${robot1} was ${robot1Turns / 100}, \n,
              Average number of steps for ${robot2} was ${robot2Turns / 100}`);
}

compareRobots(roadGraph, goalOrientedRobot, [], routeRobot, mailRoute);
