export function checkLength(s) {
  if(s.length > 1) throw new Error("Errorrrrrr!");

  if(/^[0-9]$/.test(s)) return true
  return false

  false

}


