Task2

<!--
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 0;
    if (n === 2) return 1;

    let f1 = 0; // f(0)
    let f2 = 1; // f(1)
    let fn; // f(n)

    for (let i = 3; i <= n; i++) {
        fn = f1 + f2;
        f1 = f2;
        f2 = fn;
    }

    return fn;
}

console.log(fibonacci(4));  -->
