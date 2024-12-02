class Graph {
    constructor(numberOfVertices) {
        this.V = numberOfVertices;
        // Создаём матрицу смежности и инициализируем все пропускные способности нулями
        this.adjMatrix = Array.from({ length: this.V }, () => Array(this.V).fill(0));
    }

    // Метод для добавления ребра с пропускной способностью
    addEdge(from, to, capacity) {
        this.adjMatrix[from][to] = capacity;
    }

    // Получаем пропускную способность между двумя вершинами
    getCapacity(from, to) {
        return this.adjMatrix[from][to];
    }

    // Устанавливаем пропускную способность между двумя вершинами
    setCapacity(from, to, capacity) {
        this.adjMatrix[from][to] = capacity;
    }

    // Получаем список смежных вершин для данной вершины
    getNeighbors(v) {
        const neighbors = [];
        for (let i = 0; i < this.V; i++) {
            if (this.adjMatrix[v][i] > 0) {
                neighbors.push(i);
            }
        }
        return neighbors;
    }
}

module.exports = Graph;