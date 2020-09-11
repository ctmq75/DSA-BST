// 1. Draw a BST

/*
1)
          3
        /  \
      1      4
       \       \
        2        6
                /  \
              5     9
                    /  
                  7
2)
          E
       /     \
      A        S
        \     /  \
         E   Q     Y 
            /  \      
           I    \
            \    \
             O   U       
           /   /   
          N   S 
             \
              T      

*/
// Remove the root
//         4
//       /   \
//      1      6
//       \    / \
//        2  5   9
//              /
//             7
//   


//            E
//           /  \
//          A     S
//              /   \
//            Q         Y
//            \        /
//            \       U
//             \       /
//              I     S
//               \     \
//                O     T
//               /
//              N
// Create a BST class
class BST {
    constructor(key = null, value = null, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.left = null;
      this.right = null;
    }
  
    insert(key, value) {
      if (!this.key) {
        this.key = key;
        this.value = value;
      } else if (key < this.key) {
        if (this.left === null) {
          this.left = new BST(key, value, this);
        } else {
          this.left.insert(key, value);
        }
      } else {
        if (this.right === null) {
          this.right = new BST(key, value, this);
        } else {
          this.right.insert(key, value);
        }
      }
    }
  
    find(key) {
      if (this.key === key) {
        return this.value;
      } else if (key > this.key && this.left) {
        this.left.find(key);
      } else if (key < this.key && this.right) {
        this.right.find(key);
      } else {
        throw new Error('Key Error');
      }
    }
  
    remove(key) {
      if (this.key === key) {
        if (this.left && this.right) {
          const candidate = this.right._findMin();
          this.key = candidate.key;
          this.value = candidate.value;
          candidate.remove(candidate.key);
        } else if (this.left) {
          this._replaceWith(this.left);
        } else if (this.right) {
          this._replaceWith(this.right);
        } else {
          this._replaceWith(null);
        }
      } else if (key > this.key && this.left) {
        this.left.remove(key);
      } else if (key < this.key && this.right) {
        this.right.remove(key);
      } else {
        throw new Error('Key Error');
      }
    }
  }
// 4. What does this program do?
//Returns sum of all values in tree. O(n) runtime.

//5. Height of a BST
function bst_height(tree) {
	return Math.max(tree.left && bst_height(tree.left),
		tree.right && bst_height(tree.right)) + 1;
}
// 6. Is it a BST?
function isItBST(t) {
    if (!t) return false;
  
    if (t.right) {
      if (t.right.key > t.key) {
        isItBST(t.right);
      } else {
        return false;
      }
    }
    if (t.left) {
      if (t.left.key < t.key) {
        isItBST(t.left);
      } else {
        return false;
      }
    }
    return true;
  }
  console.log(isItBST(BST));
// 7. 3rd largest node

function thirdLargest(node, counter = 1){
    if(!node) return console.log('Tree is too young, not enough digits');
    if(counter === 3) return node.value;
    return thirdLargest(node.right, counter +1) || thirdLargest(node.left, counter +1)
  }

// 8. Balanced BST
function isBalanced(t, count = 0) {
    if (!t) {
        return count;
    }

    if (t !== null) {
        count++;
        let left = 0;
        let right = 0;
        right = isBalanced(t.right, count);
        if (right === false) {
            return false;
        }
        left = isBalanced(t.left, count);
        if (left === false) {
            return false;
        }
        return Math.abs(left - right) > 1
            ? false
            : right + left;
    }
}

isBalanced(BST)

console.log('isBalanced(BST)', isBalanced(BST))

// 9. Are they the same BSTs?

function areSameBSTs(arr1, arr2) {

    if (arr1[0] !== arr2[0]) {
        return false
    }
    if (arr1.length !== arr2.length) {
        return false
    }
    if (arr1.length === 1 && arr2.length === 1) {
        return true
    }
    let root = arr1[0]

    let leftArr1 = []
    let rightArr1 = []
    let leftArr2 = []
    let rightArr2 = []
    for (let i = 1; i < arr1.length; i++) {
        if (arr1[i] < root) {
            leftArr1.push(arr1[i]);
        } else if (arr1[i] > root) {
            rightArr1.push(arr1[i]);
        }
        if (arr2[i] < root) {
            leftArr2.push(arr2[i]);
        } else if (arr2[i] > root) {
            rightArr2.push(arr2[i]);
        }
    }
    return areSameBSTs(leftArr1, leftArr2) &&
        areSameBSTs(rightArr1, rightArr2);
}

let arr1 = [3, 5, 4, 6, 1, 0, 2]
let arr2 = [3, 1, 5, 2, 4, 6, 0]

console.log('areSameBSTs(arr1, arr2)', areSameBSTs(arr1, arr2))