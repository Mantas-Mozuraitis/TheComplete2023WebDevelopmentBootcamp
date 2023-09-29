function bmiCalculator(weight, height){
    return console.log(weight/(height*height));
}

function getWeight(){
    return prompt("Please enter your weight in kilograms (kg): ");
}

function getHeight(){
    return prompt("Please enter your height in meters (m): ")
}

function main(){
    bmiCalculator(getWeight(), getHeight());
    
    return 0;
}