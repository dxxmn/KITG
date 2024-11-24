//КЛАСС УЗЛА ДЕРЕВА
class TreeNode {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

//КЛАСС БИНАРНОГО ДЕРЕВА ПОИСКА
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    //ВСТАВКА НОВОГО УЗЛА
    insert(key) {
        const newNode = new TreeNode(key);
        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (key < current.key) {
                if (current.left === null) {
                    current.left = newNode;
                    break;
                }
                current = current.left;
            } else if (key > current.key) {
                if (current.right === null) {
                    current.right = newNode;
                    break;
                }
                current = current.right;
            } else {
                //ЕСЛИ КЛЮЧ СУЩЕСТВУЕТ ТО НЕ ВСТАВЛЯЕМ ДУБЛИКАТ
                break;
            }
        }
    }

    //ПОИСК УЗЛА ПО КЛЮЧУ
    search(key) {
        let current = this.root;
        while (current !== null) {
            if (key === current.key) {
                return true;
            }
            current = key < current.key ? current.left : current.right;
        }
        return false;
    }

    //УДАЛЕНИЕ УЗЛА ПО КЛЮЧУ
    remove(key) {
        this.root = this._removeNode(this.root, key);
    }

    _removeNode(node, key) {
        if (node === null) return null;

        if (key < node.key) {
            node.left = this._removeNode(node.left, key);
        } else if (key > node.key) {
            node.right = this._removeNode(node.right, key);
        } else {
            //УЗЕЛ НАЙДЕН

            //УЗЕЛ БЕЗ ДЕТЕЙ
            if (node.left === null && node.right === null) {
                return null;
            }

            //УЗЕЛ С ОДНИМ РЕБЕНКОМ
            if (node.left === null) {
                return node.right;
            }
            if (node.right === null) {
                return node.left;
            }

            //УЗЕЛ С ДВУМЯ ДЕТЬМИ
            const minRight = this._findMin(node.right);
            node.key = minRight.key;
            node.right = this._removeNode(node.right, minRight.key);
        }
        return node;
    }

    //ПОИСК МИНИМАЛЬНОГО УЗЛА В ПОДДЕРЕВЕ
    _findMin(node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    //ОБХОД ДЕРЕВА IN-ORDER С ВЫЗОВОМ CALLBACK-ФУНКЦИИ ДЛЯ КАЖДОГО УЗЛА
    inOrderTraversal(callback) {
        this._inOrder(this.root, callback);
    }

    _inOrder(node, callback) {
        if (node !== null) {
            this._inOrder(node.left, callback);
            callback(node.key);
            this._inOrder(node.right, callback);
        }
    }

    //МЕТОД ДЛЯ ВЫВОДА ДЕРЕВА В КОНСОЛЬ
    printInOrder() {
        const result = [];
        this.inOrderTraversal(key => result.push(key));
        console.log(result.join(' '));
    }
}
module.exports = BinarySearchTree