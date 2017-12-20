export class Ingredient {
    /* This is a shorthand for defining our properties and having them
    be passed as arguments into the constructor method. In this case
    we want our model to be defined with properties name and amount
    and have the values of these properties be passed into the
    constructor function. This saves us having to write this:
    export class Ingredient {
        public name: string;
        public amount: number;
        constructor(name: string, amount: number) {
            this.name = name;
            this.amount = amount;
        }
    }
     */
    constructor(public name: string, public amount: number) {}
}
