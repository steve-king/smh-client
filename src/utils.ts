/**
 * Usage: Array().sort(sortArrayByKey('theKey'))
 * @param key
 * @returns
 */
export const sortArrayByKey = (key: string) => (a: any, b: any) => {
  if (a[key] < b[key]) return -1 // a should come before b
  if (a[key] > b[key]) return 1 // b should come before a
  return 0 // names are equal
}

/**
 *
 * @param hexArray
 * @returns
 */
export const hexArrayToBase64 = (hexArray: number[]): string => {
  // Convert hex array to binary string
  let binaryString = ''
  for (let i = 0; i < hexArray.length; i++) {
    binaryString += String.fromCharCode(hexArray[i])
  }

  // Encode binary string to Base64
  const base64String = btoa(binaryString)

  return base64String
}

export const byteArrayToHexString = (byteArray: number[]): string => {
  // Assuming 'hexArray' is a byte array
  const hexArray = new Uint8Array(byteArray)

  // Convert to a hexadecimal string
  const hexString =
    '0x' +
    Array.from(hexArray)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('')
  // console.log(hexString)
  return hexString
}

/**
 *
 * @param obj1
 * @param obj2
 * @returns
 */
export const objectsAreEqual = (obj1: any, obj2: any): boolean => {
  const stringObj1 = JSON.stringify(obj1)
  const stringObj2 = JSON.stringify(obj2)

  return stringObj1 === stringObj2
}

/**
 * Usage: isoDateString = secondsAndNanosToISOString(seconds, nanos)
 * @param seconds
 * @param nanos
 * @returns
 */
export const secondsAndNanosToISOString = (
  seconds: number,
  nanos: number
): string => {
  const milliseconds = seconds * 1000 + Math.floor(nanos / 1000000)
  const date = new Date(milliseconds)
  const isoString = date.toISOString()
  return isoString
}
