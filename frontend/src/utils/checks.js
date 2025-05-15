/** 
 * Checks if provided object is empty, t.i., {}
 * @param {*} obj 
 * @returns 
 */ 
export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}