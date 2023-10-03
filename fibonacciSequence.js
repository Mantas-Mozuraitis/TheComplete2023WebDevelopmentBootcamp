function fibonacciGenerator (n) {
    var output = [];
    for (var index = 0; index < n; index++) {
        if (index > 1) {
            output.push(output[index-1]+output[index-2]);
        }else{
            output.push(index);
        }
    }
    return output;
}