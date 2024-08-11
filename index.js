function node(key, value, next = null) {
    return {
        key: key,
        value: value,
        next: next
    }
}

function appendNode(key, value) {
    const newNode = node(key, value);
    if (!this.head) {
        this.head = newNode;
    } else {
        let current = this.head;
        while (current.next) {
            current = current.next
        }
        current.next = newNode
    }
}

function deleteNode(key) {
    if (!this.head) return null;

    if (this.head.key === key) {
        this.head = this.head.next;
        return true;
    }
    let current = this.head;
    while (current.next && current.next.key !== key) {
        current = current.next;
    }
    if (current.next) {
        current.next = current.next.next;
        return true;
    }
    return false
}

function updateNode(key, newValue) {
    let current = this.head;
    while (current) {
        if (current.key === key) {
            current.value = newValue;
            return;
        }
        current = current.next;
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
    return values;
}


function linkedList() {
    return {
        head: null,
        appendNode: appendNode,
        deleteNode: deleteNode,
        updateNode: updateNode,
        isEmpty: isEmpty,
        clearAllNodes: clearAllNodes,
        getAllValues: getAllValues
    }
}

function hashMap() {
    const buckets = Array(16).fill(null).map(() => linkedList());
    const bucketSize = 16;
    let size = 0;

    function hashKey(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % bucketSize;
        }
        return hashCode;
    }

    function resize() {
        const newBucketSize = bucketSize * 2;
        const newBuckets = Array(newBucketSize).fill(null).map(() => linkedList());

        buckets.forEach(list => {
            let currentNode = list.head;
            while (currentNode) {
                const newIndex = hashKey(currentNode.key, newBucketSize);
                newBuckets[newIndex].appendNode(currentNode.key, currentNode.value);
                currentNode = currentNode.next;
            }
        });
        buckets = newBuckets;
        bucketSize = newBucketSize;
    }

    return {
        set(key, value) {
            if (size / bucketSize > 0.75) {
                resize();
            }

            const index = hashKey(key);
            const list = buckets[index];

            if (list.isEmpty()) {
                list.appendNode(key, value);
                size++;
            } else {
                let currentNode = list.head;
                let keyExists = false;

                while (currentNode) {
                    if (currentNode.key === key) {
                        currentNode.value = value;
                        keyExists = true;
                        break;
                    }
                    currentNode = currentNode.next;
                }
                if (!keyExists) {
                    list.appendNode(key, value);
                    size++
                }
            }
        },

        get(key) {
            const index = hashKey(key);
            const list = buckets[index];

            let currentNode = list.head;
            while (currentNode) {
                if (currentNode.key === key) {
                    return currentNode.value;
                }
                currentNode = currentNode.next;
            }
            return null;
        },

        remove(key) {
            const index = hashKey(key);
            const list = buckets[index];

            const result = list.deleteNode(key);
            if (result) {
                size--;
                return true;
            }
            return false;
        },

        getBuckets() {
            return buckets.map(list => list.getAllValues());
        }
    }
}

const map = hashMap();

map.set('name', 'John')
map.set('age', 30)
map.set('location', 'New York')
// map.set('name', 'Jane')

console.log(map.getBuckets())