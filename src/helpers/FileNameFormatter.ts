export default class FileNameFormatter {
  static format(name: string): string {
    if(name.length > 15) {
      return name.substring(0, 5) + '...' + name.substring(name.length-5)
    }
    return name
  }
}