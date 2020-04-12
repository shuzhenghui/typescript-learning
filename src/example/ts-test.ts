// 类型断言
function test(params: string | number) {
    if ((<string>params).length || (params as string).length === 0) {
        return (params as string).length
    } else {
        return params.toString().length
    }
}

// console.log(test('123'))

const sb = Symbol('name')
// console.log(sb)

let obj = {
    [sb]: '123',
    age: 18,
    gender: 'male'
}

obj[sb] = '12322'
// console.log(Object.getOwnPropertyNames(obj))
// console.log(Object.getOwnPropertySymbols(obj))
// console.log(Reflect.ownKeys(obj))
// 使用symbol作为属性名无法用 for...in 或者object.keys()，Object.getOwnPropertyNames()遍历出来的



interface Func {
    // 参数和冒号之间加一个 问号 表示可选参数
    // 可选参数一定要写在后面(和es6中的可选参数有点区别)
    (a: string, b?: string): string
    readonly [prop: string]: string // 只读属性readonly
}

// 类型别名   和上面的接口Func 基本等价
type Func1 = (a: string, b?: string) => string



// 函数重载：根据传入的参数执行不同的逻辑返回不同的结果
function fun(params: string): string[]
function fun(params: number): number[]
function fun(params: any): any {
    if (typeof params === 'string') {
        return params.split('')
    } else {
        return params.toString().split('').map((item: any) => Number(item))
    }
}


// 泛型
const arrFunc = <T, U>(value1: T, value2: U, length: number = 5): (T | U)[] => {
    return new Array(length).fill([value1, value2])
}

// console.log(arrFunc<string, number>('5', 5, 3))


type GetArray = <T>(value: T, length: number) => T[]
// 上（类型别名）下（接口）等价
interface GetArray1<T> {
    (value: T, length: number): T[]
}

const getArray: GetArray = (value, length) => {
    return new Array(length).fill(value)
}

getArray<string>('123', 3)

// 泛型约束结合索引类型keyof
const getProps = <T, K extends keyof T>(obj1: T, propName: K) => {
    return obj1[propName]
}

console.log(getProps({ a: 'a', b: 'b' }, 'a'))

class Abc {
    x: number
    y: number
    protected constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    getPosition() {
        return `(${this.x}, ${this.y})`
    }
}
// 在父类的构造函数前加protected修饰符可以实现父类不能被实例化，只能被子类继承
// 类似 abstract 抽象类的作用（只能被继承，不能实例化）
class Aaa extends Abc {
    constructor(x: number, y: number) {
        super(x, y)
    }
    getAaa() {
        super.getPosition()
    }
}

new Aaa(1, 2).getAaa()


class Bbc {
    // 这种方法是上面类中属性定义的简便写法
    constructor(private name: string, private age: number) { }
}

enum Animal {

}
// 枚举enum前加 const 区别：加const编译后不会创建这个枚举对象，不加会创建一个枚举所对应的对象
const enum Animal1 {

}


window.onmousedown = (e: object): void => {
    console.log(e)
}