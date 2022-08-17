/* console.log('hello world');

let gameboard = [
    "x",  "x",  "x",
    "o",  "o",  "x",
    "x",  "o",  "o"
];

console.log(gameboard[0], gameboard[1], gameboard[2]);
console.log(gameboard[3], gameboard[4], gameboard[5]);
console.log(gameboard[6], gameboard[7], gameboard[8]);

function checkIfEqual(){

if(gameboard[0]==gameboard[1] && gameboard[0]==gameboard[2]){
    console.log("equal");
}
else{
    console.log('not equal');
}

}; */

/* const personFactory = (name, age) => {
    const sayHello = () => console.log('hello!');
    return { name, age, sayHello };
};

const jeff = personFactory('jeff', 27);

console.log(jeff.name);
console.log(jeff.age);

jeff.sayHello();

const name1 = 'Maynard';
const color = 'red';
const number = 34;
const food = 'rice';

console.log(name1, color, number, food);

console.log({name1, color, number, food}); */

/* const FactoryFunction = string => {
    const capitalizeString = () => string.toUpperCase();
    const printString = () => console.log(`-----${capitalizeString()}-----`);
    return {printString};
};

const taco = FactoryFunction('taco');

taco.printString();

console.log("test") */

const counterCreator = () => {
    let count = 0;
    return () => {
        console.log(count);
        count++;
    };
};

const counter = counterCreator();

counter();