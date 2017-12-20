/* Here a model is just a Typescript file. We named it recipe.model.ts
as it is an appropriate naming convention.
There is no decorator like @Model in Angular. However we do not need
to do this because we can use vanilla Typescript for this as a model.
In the end a model should just be a blueprint for objects we create
and a Typescript class does just this job. So a class can be
instantiated so we can create new objects based on the setup we provide
in the class Recipe below.
 */
export class Recipe {
    /* A recipe should have a name and we should be explicit to state
    that the name should be publicly available. Therefore we write public
    before name. Finally we state after the colon what type the property
    name should be. In this case the name property should be a string type.
     */
    public name: string;
    // A recipe should also have a description.
    public description: string;
    /* We also should have an image for the recipe. Here we store the path
    of where the image is stored rather than store the actual image.
    */
    public imagePath: string;

    /* A constructor is a method every class has and is run every time a
    this class is created.
     */
    constructor(name: string, desc: string, imagePath: string) {
        this.name = name;
        this.description = desc;
        this.imagePath = imagePath;
    }
}
