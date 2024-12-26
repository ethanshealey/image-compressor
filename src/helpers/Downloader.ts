export default class Downloader {
    static download(file: Blob, name: string) {
        var link = document.createElement("a");
        link.download = name.split('.')[0] + '-compressed.' + name.split('.')[1];
        console.log(link)
        link.href = URL.createObjectURL(file);
        link.setAttribute("target", "_blank");
        link.click();
        link.remove();
    }
}