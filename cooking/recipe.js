/* Checkbuttons */

const change = new Event('change');

function registerCheckList(checkList) {
    if (checkList.children.length == 0) {
        return;
    }

    const header = checkList.children[0]
    const rest = Array.from(checkList.children).slice(1)
    if (header.tagName != "H3") {
        return;
    }

    header.addEventListener("change", () => {
        for (const ele of rest) {
            ele.firstElementChild.checked = header.firstElementChild.checked
        }
        header.firstElementChild.dispatchEvent(change)
    })

    for (const ele of rest) {
        ele.addEventListener("change", () => {
            var isChecked = null

            for (const ele of rest) {
                if (isChecked == null) {
                    isChecked = ele.firstElementChild.checked
                    continue;
                }

                if (isChecked != ele.firstElementChild.checked) {
                    header.firstElementChild.indeterminate = true;
                    header.firstElementChild.checked = false
                    header.firstElementChild.dispatchEvent(change)
                    return;
                }
            }

            if (isChecked == null) {
                return;
            }

            header.firstElementChild.indeterminate = false;
            header.firstElementChild.checked = isChecked;
            header.firstElementChild.dispatchEvent(change)
        })
    }
}

function registerAllCheckList(checkLists, description) {
    description.style.display = 'none'

    function isAllChecked(checkLists) {
        return Array.from(checkLists).every((checkList) => {
            return Array.from(checkList.children).every((value) => value.firstElementChild.checked);
        })
    }

    for (const checkList of checkLists) {
        for (const ele of checkList.children) {
            ele.firstElementChild.addEventListener("change", () => {
                description.style.display = isAllChecked(checkLists) ? 'inline' : 'none'
            })
        }

        registerCheckList(checkList)
    }
}

/* Change batch size */

class OgjNumber {
    constructor(numerator, denominator) {
        this.numerator = numerator;
        this.denominator = denominator;
    }

    simplify() {
        // Greatest common divisor
        function gcd(a, b) {
            if (!b) {
                return a;
            }
            return gcd(b, a % b)
        }

        const div = gcd(this.numerator, this.denominator)
        return new OgjNumber(this.numerator / div, this.denominator / div)
    }

    multiply(other) {
        return new OgjNumber(this.numerator * other.numerator, this.denominator * other.denominator)
    }

    add(other) {
        const [a, b] = this.normalize(other)
        a.numerator += b.numerator
        return a
    }

    normalize(other) {
        if (this.denominator == other.denominator) {
            return [this, other];
        }

        const den = this.denominator * other.denominator
        const thisNum = this.numerator * (den / this.denominator)
        const otherNum = other.numerator * (den / other.denominator)
        return [new OgjNumber(thisNum, den), new OgjNumber(otherNum, den)]
    }

    toString() {
        if (this.numerator > this.denominator) {
            const num = this.numerator % this.denominator;
            const fract = new OgjNumber(num, this.denominator);
            const whole = (this.numerator - num) / this.denominator;
            if (fract.numerator != 0) {
                return whole.toString() + " " + fract.toString()
            } else {
                return whole.toString()
            }
        }
        if (this.numerator == this.denominator) {
            return "1"
        }
        if (this.denominator == 1) {
            return this.numerator.toString()
        }
        return this.numerator + "/" + this.denominator
    }

    static parse(string) {
        var res = OgjNumber.fromWhole(0)
        for (const ele of string.split(" ")) {
            const x = this.parseFragment(ele)
            if (x == null) {
                return null
            }
            res = res.add(x)
        }
        return res
    }

    static parseFragment(string) {
        const x = string.split("/")
        if (x.length == 1) {
            const num = parseFloat(x[0])
            if (isNaN(num)) {
                return null
            }
            return OgjNumber.fromWhole(num)
        } else if (x.length == 2) {
            const num = parseInt(x[0])
            const den = parseInt(x[1])

            // Block fractions
            if (num != parseFloat(x[0])) {
                return null;
            } else if (den != parseFloat(x[1])) {
                return null;
            }

            if (isNaN(num) || isNaN(den)) {
                return null
            }
            return new OgjNumber(num, den)
        } else {
            console.error("invalid number")
        }
    }

    static fromWhole(x) {
        return new OgjNumber(x, 1)
    }
}

class IngredientItem {
    constructor(ele, beforeNum, num, afterNum) {
        this.ele = ele;
        this.beforeNum = beforeNum;
        this.num = num;
        this.afterNum = afterNum;
    }

    setMultiplier(multiplier) {
        if (this.num == null) {
            this.ele.textContent = this.beforeNum + this.afterNum
            return
        }
        this.ele.textContent = this.beforeNum + this.num.multiply(multiplier).simplify() + this.afterNum
    }

    static parseEle(ele) {
        var item = IngredientItem.parseString(ele.textContent)
        item.ele = ele
        return item
    }

    static parseString(string) {
        let beforeNum = "";
        let num = "";

        var index = 0

        function isNum(char) {
            return char >= '0' && char <= '9';
        }

        while (index < string.length && !isNum(string[index])) {
            beforeNum += string[index]
            index += 1
        }

        while (index < string.length && (isNum(string[index]) || string[index] == '/') || (string[index] == ' ' && isNum(string[index+1]))) {
            num += string[index]
            index += 1
        }

        let afterNum = string.substr(index)
        return new IngredientItem(null, beforeNum, OgjNumber.parse(num), afterNum)
    }
}

function registerIngredientItems(batchSizeInput, ingredientLists) {
    let items = []

    var i = 0
    for (const list of ingredientLists) {
        for (const ele of list.children) {
            items[i] = IngredientItem.parseEle(ele.lastChild)
            i += 1
        }
    }

    batchSizeInput.addEventListener("change", () => {
        const multiplier = OgjNumber.parse(batchSizeInput.value)
        for (const item of items) {
            item.setMultiplier(multiplier)
        }
    })
}

/* Setup */

window.onload = () => {
    let ingredientLists = document.body.querySelectorAll(".ingredients")
    let ingredients_desc = document.body.querySelector("#ingredients-desc")
    registerAllCheckList(ingredientLists, ingredients_desc)
    
    let batchSizeInput = document.body.querySelector("#batch-size")
    registerIngredientItems(batchSizeInput, ingredientLists)

    let directions = document.body.querySelectorAll(".directions")
    let directions_desc = document.body.querySelector("#directions-desc")
    registerAllCheckList(directions, directions_desc)
}