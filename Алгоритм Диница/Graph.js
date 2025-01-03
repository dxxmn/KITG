class Graph {
    constructor(numberOfVertices) {
        this.V = numberOfVertices;
        this.adjMatrix = Array.from({ length: this.V }, () => Array(this.V).fill(0));
    }

    addEdge(from, to, capacity) {
        this.adjMatrix[from][to] = capacity;
    }

    getCapacity(from, to) {
        return this.adjMatrix[from][to];
    }

    setCapacity(from, to, capacity) {
        this.adjMatrix[from][to] = capacity;
    }
}

module.exports = Graph;
