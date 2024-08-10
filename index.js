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

function update(value, newValue) {
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

function clear() {
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
        appendNode: appendNode
    }
}
