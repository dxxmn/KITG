const BinarySearchTree = require('./BinarySearchTree');

describe('BinarySearchTree Tests', () => {
    let bst;

    beforeEach(() => {
        bst = new BinarySearchTree();
    });

    test('Тест вставки', () => {
        bst.insert(15);
        bst.insert(10);
        bst.insert(20);
        bst.insert(8);
        bst.insert(12);
        bst.insert(17);
        bst.insert(25);

        expect(bst.root.key).toBe(15);
        expect(bst.root.left.key).toBe(10);
        expect(bst.root.right.key).toBe(20);
        expect(bst.root.left.left.key).toBe(8);
        expect(bst.root.left.right.key).toBe(12);
        expect(bst.root.right.left.key).toBe(17);
        expect(bst.root.right.right.key).toBe(25);
    });

    test('Тест поиска', () => {
        const elements = [15, 10, 20, 8, 12, 17, 25];
        elements.forEach(key => bst.insert(key));

        expect(bst.search(15)).toBe(true);
        expect(bst.search(10)).toBe(true);
        expect(bst.search(25)).toBe(true);
        expect(bst.search(5)).toBe(false);
        expect(bst.search(30)).toBe(false);
    });

    test('Тест удаления листового узла', () => {
        bst.insert(15);
        bst.insert(10);
        bst.insert(20);
        bst.insert(8);
        bst.insert(12);
        bst.insert(17);
        bst.insert(25);

        bst.remove(8);

        expect(bst.search(8)).toBe(false);
        expect(bst.root.left.left).toBeNull();
    });

    test('Тест удаления узла с одним ребенком', () => {
        bst.insert(15);
        bst.insert(10);
        bst.insert(20);
        bst.insert(8);
        bst.insert(12);
        bst.insert(17);

        bst.remove(20);

        expect(bst.search(20)).toBe(false);
        expect(bst.root.right.key).toBe(17);
    });

    test('Тест удаления узла с двумя детьми ', () => {
        bst.insert(15);
        bst.insert(10);
        bst.insert(20);
        bst.insert(8);
        bst.insert(12);
        bst.insert(17);
        bst.insert(25);

        bst.remove(10);

        expect(bst.search(10)).toBe(false);
        expect(bst.root.left.key).toBe(12);
        expect(bst.root.left.left.key).toBe(8);
    });

    test('Тест обхода', () => {
        const elements = [15, 10, 20, 8, 12, 17, 25];
        elements.forEach(key => bst.insert(key));

        const traversal = [];
        bst.inOrderTraversal(key => traversal.push(key));

        expect(traversal).toEqual([8, 10, 12, 15, 17, 20, 25]);
    });
});