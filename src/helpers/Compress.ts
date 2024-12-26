import { compress as compressImage } from 'image-conversion';

export default class Compress {
    
    static async compress(file: any, amount: number) {
        console.log('Compressing image... ' + amount)
        return await compressImage(file, {
            quality: amount
        })
    }

}