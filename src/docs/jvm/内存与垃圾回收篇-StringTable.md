# StringTable

## String 基本特性

- String 声明为 final，不可被继承
- String
  -  实现了 Serializable 接口，表示字符串是支持序列化的。
  - 实现了 Comparable 接口，表示 String 可以比较大小
- **String 在 jdk8 及以前内部定义了 final char[] value 用于存储字符串数据。在 jdk 9 时改为 byte[]**

- String 代表不可变的字符序列。简称：不可变性
  - 当对字符串重新赋值时，需要重写指定内存区域赋值，不能使用原有的 value 进行赋值。
  - 当对现有的字符串进行链接操作时，也需要重新指定内存区域赋值，不能使用原有的 value 进行赋值
  - 当调用 Stirng 的 replace() 方法修改指定字符或字符串时，也需要重新指定内存区域赋值，不能使用原有的 value 进行赋值
- 通过字面量的方式（区别于 new）给一个字符串赋值，此时的字符串值声明在字符串常量池中。
- **字符串常量池时不会存储相同内容的字符串的**。
  - String 的 String Pool 是一个固定大小的 HashTable，默认值大小长度是1009.如果放进 String Pool 的 String 非常多，就会造成 Hash 冲突严重，从而导致链表会很长，而链表长了后直接会凿成的影响就是当调用 String.intern 时性能会大幅下降。
  - 使用 `-XX:StringTableSize` 可设置 StringTable 的长度
  - 在 jdk6 中 StringTable 是固定的，就是 1009 的长度，所以如果常量池中的字符串过多就会导致效率下降很快，StringTable设置没有要求。
  - 在 jdk7 中， StringTable 的长度默认值是60013，StringTable设置没有要求。
  - jdk8 开始， 1009是可设置的最小值



## String 的内存分配

- 在 Java 语言中有 8 种基本数据类型和一种比较特殊的类型 String。这些类型为了使它们在运行过程种速度更快、更节省内存，都提供了一种常量池的概念。

- 常量池就类似一个 Java 系统级别提供的缓存。8种基本数据类型的常量池都是系统协调的，Stirng 类型的常量池比较特殊。他的主要使用方法有两种。

  - 直接使用双引号声明出来的 String 对象会直接存储在常量池中

    比如： `Stirng info = "atguigu.com"`;

  - 如果不是用双引号声明的 String 对象，可以使用 String 提供的 intern() 方法。  

​	Java  语言规范里要求完全相同的字符串字面量，应该包含同样的 Unicode 字符序列（包含同一份码点序列的常量），并且不许是指向同一个String类实例。



## 字符串的拼接操作

- 常量与常量的拼接结果在常量池，原理是编译期优化

   ```java
   String s1 = "a" + "b" + "c"; // 编译后 -> String s1 = "abc";
   ```

- 常量池中不会存在相同内容的常量

- 只要其中有一个是变量，结果就在堆中，变量拼接的原理是 StringBuilder

- 如果拼接的结果调用 intern() 方法，则主动将常量池中还没有的字符串对象放入池中，并返回此对象地址。

### 🚀面试题

 ```java
 public void test(){
     String s1 = "javaEE";
     String s2 = "hadoop";
     
     String s3 = "javaEEhadoop";
     // 编译器优化
     String s4 = "javaEE" + "hadoop";
     // 如果拼接符号的前后出现了变量，则相当于在堆空间中 new String()，具体的内容为拼接的结果。
     String s5 = s1 + "hadoop";
     String s6 = s1 + s2;
     
     System.out.println(s3 == s4);// true
     System.out.println(s3 == s5);// false
     System.out.println(s3 == s6);// false
     System.out.println(s5 == s6);// false
     // 判断字符串常量池中是否存在值，如果存在，则返回对应地址，反之，则加载一份
     String s7 = s6.intern();
     System.out.println(s3 == s7);// true
 }
 ```

> 从字节码层面解析 `String s6 = s1 + s2;`
>
> 将字节码反汇编后，得到
>
>  33 new #5 <java/lang/StringBuilder>
>  36 dup
>  37 invokespecial #6 <java/lang/StringBuilder.<init> : ()V>
>  40 aload_0
>  41 invokevirtual #7 <java/lang/StringBuilder.append : (Ljava/lang/String;)Ljava/lang/StringBuilder;>
>  44 aload_1
>  45 invokevirtual #7 <java/lang/StringBuilder.append : (Ljava/lang/String;)Ljava/lang/StringBuilder;>
>  48 invokevirtual #8 <java/lang/StringBuilder.toString : ()Ljava/lang/String;>
>  51 astore 5
>
> 翻译一下，则是

```java
StringBuilder s = new StringBuilder();
s.append("javaEE");
s.append("hadoop");
s.toString() // -> 类似于 new String("javaEEhadoop"); 其实还是有区别滴
```

```java
// 注意点
public void test2(){
    final String s1 = "a";
    final String s2 = "b";
    String s3 = "ab";
    // 此时 s1 s2 已经不再是变量 等同于 String s4 = "a" + "b";
    Sring s4 = s1 + s2;
    System.out.println(s3 == s4) // true
}
```



> 在实际开发中，如果基本确定要前前后后添加的字符串长度不高于某个限定值 highLevel 的情况下，建议使用构造器实例化 -> `StringBuilder s = new StringBuilder(highLevel); // new char[highLevel]`



## intern() 的使用

​	如果 String 对象不是字面量，可以使用 String 提供的 intern 方法；intern 方法会从字符串常量池中查询当前字符串是否存在，若不存在就会将当前字符串放入常量池中。

> 比如：`String myInfo = new String("I love atguigu").intern();`
>
> 此时：`myInfo == "I love atguigu" `

​	通俗地讲，Interned String 就是确保字符串在内存里只有一份拷贝，这样可以节约内存空间，加快字符串操作任务地执行速度。注意，这个值会被存放在字符串内部池 （String Intern Pool）



### 🚀 面试题

**new String("ab") 会创建几个对象**

两个 从字节码层面解析

```java
 0 new #2 <java/lang/String>
 3 dup
 4 ldc #3 <ab>
```

即一个 new 对象和一个存放在常量池的对象

**String s = new String("a") + new String("b")会创建几个对象**

不算虚方法中创建的话是5个 ，包含的话是6个

```java
 0 new #2 <java/lang/StringBuilder>
 3 dup
 4 invokespecial #3 <java/lang/StringBuilder.<init> : ()V>
 7 new #4 <java/lang/String>
10 dup
11 ldc #5 <a>
13 invokespecial #6 <java/lang/String.<init> : (Ljava/lang/String;)V>
16 invokevirtual #7 <java/lang/StringBuilder.append : (Ljava/lang/String;)Ljava/lang/StringBuilder;>
19 new #4 <java/lang/String>
22 dup
23 ldc #8 <b>
25 invokespecial #6 <java/lang/String.<init> : (Ljava/lang/String;)V>
28 invokevirtual #7 <java/lang/StringBuilder.append : (Ljava/lang/String;)Ljava/lang/StringBuilder;>
31 invokevirtual #9 <java/lang/StringBuilder.toString : ()Ljava/lang/String;>
34 astore_1
```

首先是5个：

- new `StringBuilder`

- new 出来的 `a`
- 在字符串常量池中存储 `a`
- new 出来的 b
- 在字符串常量池中存储 `b`

对于：

> invokevirtual #9 <java/lang/StringBuilder.toString : ()Ljava/lang/String;> 查看其源码的字节码

```java
 0 new #41 <java/lang/String>
 3 dup
 4 aload_0
// 仅仅截取部分
```

特别的，在这里的 toString 方法并不会触发 ldc，即在字符串常量池中存储。

所以仅增加一个对象，即 new 出来的 `ab` 

#### 面试题升级

```java
public class StringIntern {

    public static void main(String[] args) {

        String s = new String("1");
        s.intern();// 调用此方法之前，字符串常量池中已经存在了"1"
        String s2 = "1";
        System.out.println(s == s2);// jdk6 -> false  jdk7/8 -> false

        // s3变量记录的地址为：new String("11")
        String s3 = new String("1") + new String("1");
        // 执行完上一行代码以后，字符串常量池中，是否存在"11"呢？答案：不存在
        /*
         *  在字符串常量池中生成"11"。如何理解: jdk6 -> 创建了一个新的对象”11“，也就是新的地址
         *                                jdk7 -> 此时常量池中并没有创建"11"，而是创建了一个指向s3的地址 
         */
        s3.intern();
        
        String s4 = "11";
        System.out.println(s3 == s4);
    }

}
```

**总结 String 的 intern() 的使用**

- `jdk1.6`中，将这个字符串独享尝试放入串池：
  - 如果串池中有，则并不会放入。返回以由的串池中的对象地址
  - 如果没有，会把此**对象复制一份**，放入串池，并返回串池中的对象地址
- `jdk1.7`起，将这个字符串对象尝试放入串池
  - 如果串池中有，则并不会放入，返回已有的串池中的对象地址
  - 如果没有，则会把 **对象的引用地址复制一份**，放入串池，并返回串池中的引用地址

### Intern()的空间效率

对于程序中大量存在的字符串，尤其其中存在很多重复字符串时，使用 intern() 可以节省内存空间

### Intern()的垃圾回收

`-XX:+PrintStringTableStatistics`：打印字符串常量池统计信息

**G1中 String 去重操作**

- 当垃圾收集器工作的时候，会访问堆上存活的对象。 **对每一个访问的对象都会检查是否是候选的要去重的 Stirng 对象**。
- 如果是，把这个对象的一个引用插入到队列中等待后续的处理。一个去重的线程在后台运行，处理这个队列。处理队列的一个元素意味着从队列删除这个元素，然后尝试去重它引用的 String 对象。
- 使用一个 hashtable 来记录所有的被 Stirng 对象使用的不重复的 char 数组。当去重的时候，会查这个 hashtable，来看堆上是否已经存在一个一模一样的 char 数组。
- 如果存在， Stting 对象会被调整引用那个数组，释放对原来的数组的引用，最终会被垃圾收集器回收掉
- 如果查找失败，char 数组会被插入到 hashtable，这样以后就可以共享这个数组了。 



