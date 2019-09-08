export class Barcode {
  access: string;
accList = [
];

barcodeGenerate(accession: number) {
this.access = accession.toString();
this.accList.push(this.access);

  }
}
