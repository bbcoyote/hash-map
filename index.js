function node(key, value, next = null) {
    return {
        key: key,
        value: value,
        next: next
    }
}

function appendNode(value) {
    const newNode = node(value);
    if (!this.head) {
        this.head = newNode;
    } else {
        let current = this.head;
        while (current.next) {
            current = this.next
        }
        current.next = newNode
    }
}

function deleteNode(value) {
    if (!this.head) return null;

    if (this.head.value === value) {
        this.head = this.head.next;
        return;
    }
    let current = this.head;
    while (current.next && current.next.value !== value) {
        current = current.next;
    }
    if (current.next) {
        current.next = current.next.next;
    }
}

function updateNode(value, newValue) {
    let current = this.head;
    while (current) {
        if (current.value === value) {
            current.value = newValue;
            return;
        }
        current = this.next;
    }
}

function isEmpty() {
    return this.head === null;
}

function clearAllNodes() {
    let current = this.head;
    while (current) {
        let nextNode = current.next;
        current.next = null;
        current = nextNode;
    }
    this.head = null;
}

function getAllValues() { // as an array
    let current = this.head
    let values = [];
    while (current) {
        values.push(current.value);
        current = current.next
    }
}


function linkedList() {
    return {
        node: node,
        appendNode: appendNode,
        deleteNode: deleteNode,
        updateNode: updateNode,
        isEmpty: isEmpty,
        clearAllNodes: clearAllNodes,
        getAllValues: getAllValues
    }
}

function hashKey(key, size) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
    }
    return hashCode;
}

console.log(hashKey("tim", 16)) // returns 4136