const Graph = require('./Graph');
const Dinitz = require('./Dinitz');

describe('Dinitz Algorithm Tests', () => {
    test('Тест 1: Простой граф с двумя непротиворечивыми путями', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 10);
        graph.addEdge(0, 2, 5);
        graph.addEdge(1, 3, 10);
        graph.addEdge(2, 3, 5);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 3);
        expect(maxFlow).toBe(15);
    });

    test('Тест 2: Граф с обратными ребрами', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 1000);
        graph.addEdge(1, 2, 1);
        graph.addEdge(2, 1, 1);
        graph.addEdge(2, 3, 1000);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 3);
        expect(maxFlow).toBe(1);
    });

    test('Тест 3: Граф без путей от источника к стоку', () => {
        const graph = new Graph(3);
        graph.addEdge(0, 1, 10);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 2);
        expect(maxFlow).toBe(0);
    });

    test('Тест 4: Граф с циклом', () => {
        const graph = new Graph(4);
        graph.addEdge(0, 1, 3);
        graph.addEdge(1, 2, 4);
        graph.addEdge(2, 1, 3);
        graph.addEdge(2, 3, 2);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 3);
        expect(maxFlow).toBe(2);
    });

    test('Тест 5: Большой граф с несколькими путями и пересекающимися потоками', () => {
        const graph = new Graph(6);
        graph.addEdge(0, 1, 16);
        graph.addEdge(0, 2, 13);
        graph.addEdge(1, 2, 10);
        graph.addEdge(1, 3, 12);
        graph.addEdge(2, 1, 4);
        graph.addEdge(2, 4, 14);
        graph.addEdge(3, 2, 9);
        graph.addEdge(3, 5, 20);
        graph.addEdge(4, 3, 7);
        graph.addEdge(4, 5, 4);

        const dinitz = new Dinitz(graph);
        const maxFlow = dinitz.maxFlow(0, 5);
        expect(maxFlow).toBe(23);
    });
})