export class Product {

  constructor(
    public id: string,
    public name: string, 
    public description: string, 
    public imageUrl: string,
    public quantity: number,
    //public tags?: string[]
    ) {
  }
}