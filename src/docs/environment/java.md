---
category: linux
excerpt: 基于 centos7  java1.8
---
# 在linux上配置java环境（附可运行jar包）

> 环境基于 centos7  java1.8

## 安装java环境

环境安装：下面直接给出指令，依次执行即可

```bash
cd /usr/local
mkdir java
sudo yum install -y java-1.8.0-openjdk-devel.x86_64 
```



下载完后，输入 java 查看是否安装成功



## 通过Maven配置jar包运行入口

```xml
<build>
  <!-- 指定最后构建打包成功的压缩包的名字 -->
  <finalName>helloworld-maven-java</finalName>

  <plugins>
    <!-- 1.maven 打包时跳过测试 -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId> <!-- 测试使用到的插件 -->
      <configuration>
        <skip>true</skip><!-- 声明跳过测试 -->
      </configuration>
    </plugin>

    <!-- 2.1 maven 打包时指定main方法 -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-jar-plugin</artifactId>
      <configuration>
        <classesDirectory>target/classes</classesDirectory>
        <archive>
          <manifest>
            <mainClass>com.northcastle.App</mainClass>
            <useUniqueVersions>false</useUniqueVersions>
            <addClasspath>true</addClasspath>
            <classpathPrefix>libs/</classpathPrefix>
          </manifest>
          <manifestEntries>
            <Class-Path>.</Class-Path>
          </manifestEntries>
        </archive>
      </configuration>
    </plugin>
    <!--  2.2 maven 打包时处理依赖的第三方jar包，解决 运行时 ClassNotFoundException 的异常  -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-dependency-plugin</artifactId>
      <executions>
        <execution>
          <id>copy-dependencies</id>
          <phase>package</phase>
          <goals>
            <goal>copy-dependencies</goal>
          </goals>
          <configuration>
            <type>jar</type>
            <includeTypes>jar</includeTypes>
            <outputDirectory>
              ${project.build.directory}/libs
            </outputDirectory>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
</build>

```

若是没有引入第三方jar包，则可简化为

```xml
<build>
  <!-- 指定最后构建打包成功的压缩包的名字 -->
  <finalName>helloworld-maven-java</finalName>

  <plugins>
    <!-- 1.maven 打包时跳过测试 -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-surefire-plugin</artifactId> <!-- 测试使用到的插件 -->
      <configuration>
        <skip>true</skip><!-- 声明跳过测试 -->
      </configuration>
    </plugin>

    <!-- 2.1 maven 打包时指定main方法 -->
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-jar-plugin</artifactId>
      <configuration>
        <classesDirectory>target/classes</classesDirectory>
        <archive>
          <manifest>
            <mainClass>com.northcastle.App</mainClass>
            <useUniqueVersions>false</useUniqueVersions>
            <addClasspath>true</addClasspath>
            <classpathPrefix>libs/</classpathPrefix>
          </manifest>
          <manifestEntries>
            <Class-Path>.</Class-Path>
          </manifestEntries>
        </archive>
      </configuration>
    </plugin>
  
  </plugins>
</build>

```

