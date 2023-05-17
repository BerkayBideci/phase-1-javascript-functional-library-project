function standardize(collection) {
    return (collection instanceof Array) ? collection.slice() : Object.values(collection)
}

function myEach(collection, callback) {
    for (let item of standardize(collection)) {
        callback(item)
    }

    return collection
}

function myMap(collection, callback) {
    const modifiedArray = []
    for (let item of standardize(collection)) {
        modifiedArray.push(callback(item))
    }

    return modifiedArray
}

function myReduce(collection, callback, acc) {
    let standardized = standardize(collection);
    if (!acc) {
        acc = standardized[0];
        standardized = standardized.slice(1);
    }
    for (let item of standardized) {
        acc = callback(acc, item, standardized);
    }

    return acc;
}

function myFind(collection, predicate) {
    for (let item of standardize(collection)) {
        if (predicate(item)) {
            return item
        }
    }
    return undefined
}

function myFilter(collection, predicate) {
    const filterArr = []
    for (let item of standardize(collection)) {
        if (predicate(item)) {
            filterArr.push(item)
        }
    }
    return filterArr
}

function mySize(collection) {
    return standardize(collection).length
}

function myFirst(arr, n) {
    return (n) ? arr.slice(0, n) : arr[0]
}

function myLast(arr, n) {
    return (n) ? arr.slice(arr.length - n, arr.length) : arr[arr.length - 1]
}

const mySortBy = function (arr, callback) {
    const newArr = [...arr];
    return newArr.sort((a, b) => {
        if (callback(a) > callback(b)) {
            return 1;
        } else if (callback(b) > callback(a)) {
            return -1;
        } else {
            return 0;
        }
    });
}

// *start of solution*
// unpack is a helper function for myFlatten that is used when shallow is true
// It takes each element of the input array (whether it's a primitive value or
// an array) and pushes it into the output array
const unpack = function (receiver, arr) {
    for (let val of arr) {
        receiver.push(val);
    }
}

// myFlatten handles two separate cases: shallow=true and shallow=false
// For the true case, the top-level elements are simply pushed into newArr using
// the unpack helper function
// For the false case, myFlatten is called recursively for each element
const myFlatten = function (collection, shallow, newArr = []) {
    if (shallow) {
        for (let val of collection) {
            Array.isArray(val) ? unpack(newArr, val) : newArr.push(val);
        }
    } else {
        // shallow = false (recursive case)
        for (let val of collection) {
            if (Array.isArray(val)) {
                // Below, we pass newArr as an argument when we call myFlatten recursively 
                // because we need to retain the values that were pushed in previous calls
                myFlatten(val, false, newArr);
            } else {
                newArr.push(val);
            }
        }
    }
    return newArr;
}
// *end of solution*

function myKeys(obj) {
    const newArr = []
    for (let key in obj) {
        newArr.push(key)
    }
    return newArr
}

function myValues(obj) {
    const newArr = []
    for (let key in obj) {
        newArr.push(obj[key])
    }
    return newArr
}