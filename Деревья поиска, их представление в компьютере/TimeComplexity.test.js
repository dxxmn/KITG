const { performance } = require("perf_hooks");
const BinarySearchTree = require('./BinarySearchTree');

function generateUniqueRandomKeys(size) {
    const set = new Set();
    while (set.size < size) {
        set.add(Math.floor(Math.random() * 1000000));
    }
    return Array.from(set);
}

function generateOrderedKeys(size) {
    return Array.from({ length: size }, (_, i) => i);
}

function measureOperationTime(operation, keys, iterations, shouldReverseRemove = false) {
    let total_time = 0;
    for (let i = 0; i < iterations; i++) {
        const tree = new BinarySearchTree();
        if (operation === 'search' || operation === 'remove') {
            for (const key of keys) {
                tree.insert(key);
            }
        }
        if (operation === 'remove' && shouldReverseRemove) {
            keys = [...keys].reverse();
        }
        const startTime = performance.now();
        for (const key of keys) {
            switch (operation) {
                case 'insert':
                    tree.insert(key);
                    break;
                case 'search':
                    tree.search(key);
                    break;
                case 'remove':
                    tree.remove(key);
                    break;
                default:
                    throw new Error('Unknown operation');
            }
        }
        const endTime = performance.now();
        total_time += endTime - startTime;
    }
    return total_time / iterations;
}

describe('BinarySearchTree Time Complexity Tests', () => {

    test('Тест производительности для случайной последовательности', () => {
        const treeSizes = [20000, 40000];
        const operations = ['insert', 'search', 'remove'];
        const results = {};
        const iterations = 50;

        for (const size of treeSizes) {
            const keys = generateUniqueRandomKeys(size);
            const opTimes = {};

            for (const op of operations) {
                const shouldReverseRemove = false;
                opTimes[op] = measureOperationTime(op, keys, iterations, shouldReverseRemove);
            }

            results[size] = opTimes;
        }

        const comparisons = [];
        for (let i = 1; i < treeSizes.length; i++) {
            const prevSize = treeSizes[i - 1];
            const currSize = treeSizes[i];

            for (const op of operations) {
                let theoreticalRatio;
                if (op === 'insert' || op === 'search' || op === 'remove') {
                    theoreticalRatio = (currSize * Math.log2(currSize)) / (prevSize * Math.log2(prevSize));
                }
                const actualRatio = results[currSize][op] / results[prevSize][op];
                comparisons.push({
                    'Сравнение': `Дерево ${prevSize} с деревом ${currSize}`,
                    'Операция': op,
                    'Теоретическое соотношение': parseFloat(theoreticalRatio.toFixed(2)),
                    'Реальное соотношение': parseFloat(actualRatio.toFixed(2)),
                });

                const tolerance = 1.5;
                expect(actualRatio).toBeGreaterThanOrEqual(theoreticalRatio / tolerance);
                expect(actualRatio).toBeLessThanOrEqual(theoreticalRatio * tolerance);
            }
        }

        console.log('Результаты для случайной последовательности:', { results, comparisons });
    });

    test('Тест производительности для упорядоченной последовательности', () => {
        const treeSizes = [2000, 4000];
        const operations = ['insert', 'search', 'remove'];
        const results = {};
        const iterations = 50;

        for (const size of treeSizes) {
            const keys = generateOrderedKeys(size);
            const opTimes = {};

            for (const op of operations) {
                const shouldReverseRemove = op === 'remove';
                opTimes[op] = measureOperationTime(op, keys, iterations, shouldReverseRemove);
            }

            results[size] = opTimes;
        }

        const comparisons = [];
        for (let i = 1; i < treeSizes.length; i++) {
            const prevSize = treeSizes[i - 1];
            const currSize = treeSizes[i];

            for (const op of operations) {
                let theoreticalRatio;
                if (op === 'insert' || op === 'search' || op === 'remove') {
                    theoreticalRatio = Math.pow(currSize / prevSize, 2);
                }
                const actualRatio = results[currSize][op] / results[prevSize][op];
                comparisons.push({
                    'Сравнение': `Дерево ${prevSize} с деревом ${currSize}`,
                    'Операция': op,
                    'Теоретическое соотношение': parseFloat(theoreticalRatio.toFixed(2)),
                    'Реальное соотношение': parseFloat(actualRatio.toFixed(2)),
                });

                const tolerance = 1.5;
                expect(actualRatio).toBeGreaterThanOrEqual(theoreticalRatio / tolerance);
                expect(actualRatio).toBeLessThanOrEqual(theoreticalRatio * tolerance);
            }
        }

        console.log('Результаты для упорядоченной последовательности:', { results, comparisons });
    });
});