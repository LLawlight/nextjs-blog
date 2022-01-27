---
title: '什么是 TypeScript 泛型'
date: '2021-12-25'
---

## 相关问题

- TypeScript 泛型的作用是什么

## 回答关键点

`工具` `复用` `使用时指定类型`

TypeScript 泛型是一种工具，它让开发者在定义时不指定类型，而在使用时指定类型。

## 知识点深入

### 泛型类

泛型类型参数在类名后面的尖括号中指定。泛型类可以具有泛型字段或方法。

```tsx
class HZFEMember<T, U> {
  private id!: T;
  private name!: U;

  setMember(id: T, name: U): void {
    this.id = id;
    this.name = name;
  }

  show(): void {
    console.log(`ID: ${this.id}, Name: ${this.name}`);
  }
}

const member1 = new HZFEMember<number, string>();
member1.setMember(1, "QingZhen");
member1.show();  // ID: 1, Name: QingZhen

const member2 = new HZFEMember<string, string>();
member2.setMember("02", "Aki");
member2.show();  // ID: 02, Name: Aki
```

### 泛型接口

```tsx
interface HZFEMember<T, U> {
  id: T;
  name: U;
}

const member1: HZFEMember<number, string> = {
  id: 1,
  name: "QingZhen",
};
console.log(`ID: ${member1.id}, Name: ${member1.name}`)  // ID: 1, Name: QingZhen

const member2: HZFEMember<string, string> = {
  id: "02",
  name: "Aki",
};
console.log(`ID: ${member2.id}, Name: ${member2.name}`)  // ID: 02, Name: Aki
```

### 函数类型的泛型接口

```tsx
interface ShowHZFEMember<T, U> {
  (id: T, name: U): void;
}

const showHZFEMember: ShowHZFEMember<number, string> = function (id, name) {
  console.log(`ID: ${id}, Name: ${name}`);
};
showHZFEMember(1, "QingZhen"); // ID: 1, Name: QingZhen

const showHZFEMember2: ShowHZFEMember<string, string> = function (id, name) {
  console.log(`ID: ${id}, Name: ${name}`);
};
showHZFEMember2("02", "Aki"); // ID: 02, Name: Aki
```

### 泛型约束

在下面的例子中访问 member 的 id 属性，因为编译器并不能证明 member 中有 id 属性，所以会报错。

```tsx
function getHZFEMember<T>(member: T): T {
  console.log(`ID: ${member.id}`);  // Property 'id' does not exist on type 'T'.
  return member;
}
```

如果我们想要限制函数只能处理带有 id 属性的类型，就需要列出对于 T 的约束要求。我们可以定义一个接口来描述约束条件，创建一个包含 id 属性的接口，使用这个接口和`extends`关键字来实现约束。

```tsx
interface Member {
  id: number;
}

function getHZFEMember<T extends Member>(member: T): T {
  console.log(`ID: ${member.id}`);
  return member;
}

getHZFEMember("QingZhen");  // Argument of type 'string' is not assignable to parameter of type 'Member'.
getHZFEMember({ id: 1, name: "QingZhen" });  // ID: 1
```