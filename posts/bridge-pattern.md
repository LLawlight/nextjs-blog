---
title: '桥接模式'
date: '2021-11-24'
---

桥的作用就是将两个独立结构连接起来。

设计模式中的桥接是将两个独立的层次结构连接起来。

桥接模式是将抽象部分与它的实现部分分离，使它们都可以独立地变化。

这里的抽象与编程语言中的抽象无关，而是指一些实体的高阶控制层。该层自身不完成任何具体的工作， 它需要将工作委派给实现部分层（也被称为平台）。

桥接模式的结构如下：

![https://refactoringguru.cn/images/patterns/diagrams/bridge/structure-zh-2x.png](https://refactoringguru.cn/images/patterns/diagrams/bridge/structure-zh-2x.png)

抽象部分 （Abstraction） 提供高层控制逻辑， 依赖于完成底层实际工作的实现对象。所以抽象部分保存了一个对实现部分（Implementation）的引用，这个引用就是连接抽象部分和实现部分的桥。

比如遥控器，只需要实现控制逻辑，实际的功能都是由所控制的终端提供：

```tsx
class RemoteControl {
  protected device: Device;

	// 遥控器基类声明了一个指向设备对象的引用成员变量。
	// 所有遥控器通过通用设备接口与设备进行交互，使得同一个遥控器可以支持不同类型的设备。
  constructor(device: Device) {
    this.device = device;
  }

  togglePower(): void {
    this.device.isEnabled() ? this.device.disable() : this.device.enable();
  }

  volumeDown(): void {
    this.device.setVolume(this.device.getVolume() - 10);
  }

  volumeUp(): void {
    this.device.setVolume(this.device.getVolume() + 10);
  }

  channelDown(): void {
    this.device.setChannel(this.device.getChannel() - 1);
  }

  channelUp(): void {
    this.device.setChannel(this.device.getChannel() + 1);
  }
}
```

实现部分 （Implementation） 为所有具体实现声明通用接口。 抽象部分仅能通过在这里声明的方法与实现对象交互。

所以作为终端设备，应该为抽象部分提供所需的接口：

```tsx
interface Device {
  isEnabled: () => boolean;
  disable: () => void;
  enable: () => void;
  setVolume: (percent: number) => void;
  getVolume: () => number;
  setChannel: (channel: number) => void;
  getChannel: () => number;
}
```

抽象部分通常声明一些复杂行为， 这些行为依赖于多种由实现部分声明的原语操作。比如控制设备的开启和关闭，实际上是由实现部分的三个功能组成。

具体实现 （Concrete Implementations） 中包括特定于平台的代码。它们必须遵循相同的接口。

```tsx
class Tv implements Device {
  // ...
}

class Radio implements Device {
	 // ...
}
```

有了遥控器和具体的设备，那么就可以对他们实施具体的连接了：

```tsx
const tv = new Tv()
const remote = new RemoteControl(tv)
remote.togglePower()
```

如果我们基于设备接口声明的方法，想扩展一个拥有静音功能的遥控器，我们并不需要去修改设备内部的实现，而只需要单独扩展遥控器类即可：

```tsx
class AdvancedRemoteControl extends RemoteControl {
  mute() {
    this.device.setVolume(0);
  }
}
```

这种功能增强的遥控器被称为精确抽象（Refined Abstraction），提供控制逻辑的变体。与其父类一样， 它们通过通用实现接口与不同的实现进行交互。

## 练习

假如你有一个几何形状 Shape 类， 从它能扩展出两个子类：圆形 Circle 和方形 Square。你希望对这样的类层次结构进行扩展以使其包含颜色， 所以你打算创建名为红色 Red 和蓝色 Blue 的形状子类。但是，由于你已有两个子类，所以总共需要创建四个类才能覆盖所有组合，例如蓝色圆形 Blue­Circle 和红色方形 Red­Square。在层次结构中新增形状和颜色将导致代码复杂程度指数增长。

我们试图在两个独立的维度——形状与颜色——上扩展形状类，就可以使用桥接模式来解决这个问题。

我们可以在形状类中添加一个指向某一颜色对象的引用。形状类可以将所有与颜色相关的工作委派给连入的颜色对象。这样的引用就成为了形状和颜色之间的桥梁。此后，新增颜色将不再需要修改形状类。

```tsx
/** 实现部分接口 */
interface Color {
  drawAPI: (width: number, height: number, radius?: number) => void
}

/** 抽象部分基类 */
class Shape {
  protected color: Color

	// 添加指向颜色对象的引用
  constructor(color: Color) {
    this.color = color
  }

  draw() {}
}

/** 遵循实现部分接口来具体实现颜色子类 */
class Red implements Color {
  drawAPI(width: number, height: number, radius?: number) {
    console.log(`color: red, width: ${width}, height: ${height}, radius: ${radius}`)
  }
}

class Circle extends Shape {
  private width: number
  private height: number
  private radius: number

  constructor(width: number, height: number, radius: number, color: Color) {
    super(color)
    this.width = width
    this.height = height
    this.radius = radius
  }

  draw() {
    this.color.drawAPI(this.width, this.height, this.radius)
  }
}

class Square extends Shape {
  private width: number
  private height: number

  constructor(width: number, height: number, color: Color) {
    super(color)
    this.width = width
    this.height = height
  }

  draw() {
    this.color.drawAPI(this.width, this.height, 0)
  }
}

const redCircel = new Circle(10, 10, 10, new Red())
redCircel.draw()

const redSquare = new Square(5, 5, new Red())
redSquare.draw()

class Blue implements Color {
  drawAPI(width: number, height: number, radius?: number) {
    console.log(`color: blue, width: ${width}, height: ${height}, radius: ${radius}`)
  }
}

const blueCircle = new Circle(5, 5, 5, new Blue())
blueCircle.draw()

const blueSquare = new Square(5, 5, new Blue())
blueSquare.draw()
```