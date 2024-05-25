// Given a string    containing just the characters ‘(’,’)’,’{’,‘}’,‘[’,‘]’   determine if the input string is valid.
//     An input string is valid if:
// Open brackets must be closed by the same type of brackets.
//     Open brackets must be closed in correct order.
//     Constraints:
// 1 ≤ string.length ≤ 104
// consists of parentheses only ‘()[]{}’
// Tests and their expected results.
// const testStrings = [ "()", //true - valid "()[]{}", //true - valid "(]", //false - invalid "([)]", //false - invalid "{[]}", //true - valid "([{{{}}}])", //true - valid "({[{({{{{{{{{{{{}}}}}}}}}}})}]})", //true - valid ];

// SOLUTION
//another implied constraint is that the string's length must be divisible by 2
//as it contains pairs of brackets if valid
//conditions that make each character be a valid one:
// 1.it meets both set constraints
// 2.the next character is the current character's closing parenthesis and vice versa
// 3.the current character is an opening bracket and is the same number of positions from the start of the string
//   as its closing bracket on the opposite end of the string
// 4.the current character is a closing bracket and is the same number of positions from the
//   beginning as its opening bracket is from the end of the string


//test constraints
const validBrackets= ['(', '[', '{', '}', ']', ')']
const parenthesisDictionary= {
    '(': ')',
    '[': ']',
    '{': '}',
    ')': '(',
    ']':'[',
    '}': '{'
}
const openingBrackets = ['(', '[', '{']
const closingBrackets = [')', ']', '}']
function checkConstraints(value) {
    //confirm its length is divisible by two
    const isEven = value.length % 2 === 0;
    const isValidLength = value.length>=1 && value.length<=104
    for(let i=0;i<value.length;i++){
        if (!validBrackets.includes(value[i])){
            return false;
        }
    }

    return isValidLength && isEven
}

//implement main solution
function validateParenthesis(value) {
    const isValid = checkConstraints(value)
    if(!isValid){return false}

    //loop through each character confirming it meets at least one of the conditions
    for(let i=0;i<value.length;i++){
        const valueLength = value.length
        const currentChar= value[i];
        const nextChar = value[i + 1];
        const previousChar = value[i-1]
        const oppositeChar= value[valueLength-i-1]
        let isAdjacentPair=false;
        let isValidOpeningBracket=false;
        let isValidClosingBracket=false;
        //validate isAdjacentPair i.e, current char is an opening bracket
        //and next char is its closing bracket, but we should also do the same for vice versa
        if(openingBrackets.includes(currentChar) && nextChar === parenthesisDictionary[currentChar] ){
            isAdjacentPair= true;
        }

        if(closingBrackets.includes(currentChar) && previousChar=== parenthesisDictionary[currentChar]){
            isAdjacentPair=true
        }

        //validate isValidOpeningBracket i.e, current char's an opening bracket i steps away from
        //the beginning and at i steps away from the end, lies its closing bracket & vice versa
        if(openingBrackets.includes(currentChar) && oppositeChar=== parenthesisDictionary[currentChar]){
            isValidOpeningBracket= true;
        }

        //validate isValidClosingBracket i.e, current char's a closing bracket i steps away from
        //the beginning and at i steps away from the end, lies its opening bracket, and vice versa
        if(closingBrackets.includes(currentChar) && currentChar === parenthesisDictionary[oppositeChar]){
            isValidClosingBracket= true;
        }

        //if all 3 conditions are not met, then the string is invalid
        if(!isAdjacentPair && !isValidOpeningBracket && !isValidClosingBracket){
            return false
        }

    }

    //loop has completed meaning each character met one of the three conditions
    //so the string is valid
    return true
}

console.log(`() is: ${validateParenthesis('()')}`)
console.log(`()[]{} is: ${validateParenthesis('()[]{}')}`)
console.log(`(] is: ${validateParenthesis('(]')}`)
console.log(`([)] is: ${validateParenthesis('([)]')}`)
console.log(`{[]} is: ${validateParenthesis('{[]}')}`)
console.log(`([{{{}}}]) is: ${validateParenthesis('([{{{}}}])')}`)
console.log(`({[{({{{{{{{{{{{}}}}}}}}}}})}]}) is: ${validateParenthesis('({[{({{{{{{{{{{{}}}}}}}}}}})}]})')}`)
