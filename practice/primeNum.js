let primes = [];
let numbers = [];

for (let i = 2; i < 1000; i++){
    numbers.push(i);
}

while(numbers.length > 0){
    let nextPrime = numbers[0];
    primes.push(nextPrime);
    numbers = numbers.filter(function(someNumber) { return someNumber % nextPrime > 0; });
}

console.log(primes);