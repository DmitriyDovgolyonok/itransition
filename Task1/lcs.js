function findStem(arr) {let n = arr.length;if (n === 0) return "";let s = arr[0], len = s.length, res = "";for (let i = 0; i < len; i++) {for (let j = i + 1; j <= len; j++) {let stem = s.substr(i, j - i), k = 1;for (k = 1; k < n; k++) if (!arr[k].includes(stem)) break;if (k === n && res.length < stem.length) res = stem;}}return res;}
let arr = process.argv.slice(2)
console.log(findStem(arr));
