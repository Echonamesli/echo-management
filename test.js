function deepClone(obj, hash = new WeakMap()) {
    if (obj === null) return obj; // 如果是null或者undefined我就不进行拷贝操作
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
   if (typeof obj === 'symbol') return Symbol(obj.description)    // 处理 Symbol

      // 可能是对象或者普通的值  普通值不需要深拷贝
     if (typeof obj !== "object") return obj;
     // 是对象的话就要进行深拷贝
     if (hash.get(obj)) return hash.get(obj);  
      let cloneObj = new obj.constructor();
// 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
hash.set(obj, cloneObj);   //缓存拷贝的对象，用于处理循环引用的情况
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    // 实现一个递归拷贝
    cloneObj[key] = deepClone(obj[key], hash);
  }
}
return cloneObj;
}
let obj = { name: 1, address: { x: 100 } };
obj.o = obj; // 对象存在循环引用的情况
let d = deepClone(obj);
obj.address.x = 200;
console.log(d);   //彻底断绝联系，x还是100
console.log(obj)