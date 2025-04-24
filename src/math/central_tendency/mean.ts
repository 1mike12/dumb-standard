export function mean(input : number[]) {
   let total = 0
   for ( const x of input){
      total += x
   }
   return total / input.length
}
