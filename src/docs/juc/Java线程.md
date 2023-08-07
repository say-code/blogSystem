# Java线程

## Thread与Runnable的关系

通过Thread创建线程与Runnable创建线程没有本质上的区别，Thread在获取Runnable对象后，会将其赋值给成员变量 `target`，Thread原本的 `run` 方法在target不为空的情况下，会调用target.run()即Runnable的run()方法。而通过Thread创建则是直接覆写了run方法

**小结**

- 方法1  是把线程和任务合并在了一i去，方法 2 是把线程和任务分开了
- 用 Runnable 更容易与线程池等高级 API 配合
- 用 Runnable 让任务类脱离了 Thread 继承体系，更灵活





## linux/java 命令

- jps 查看进程
- ps -fe 查看进程信息 => ps -fe | grep java
- kill {pid} 杀死进程
- top -H -p {pid} 查看进程中线程信息
- jstack {pid} 抓取瞬间进程信息

## 线程运行原理

### 栈与栈帧

- 每个栈由多个栈帧（Frame）组成，对应着每次方法调用时所占的内存
- 每个线程只能有一个活动栈帧，对应着当前正在执行的那个方法

### 线程上下文切换(Thread Context Switch)