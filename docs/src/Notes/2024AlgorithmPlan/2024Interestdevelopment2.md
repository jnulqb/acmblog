---
title: "2024兴趣培养计划Day2"
desc: "2024兴趣培养计划2"
updateTime: 2024-10-12
tags: ["hobbies", "passion"]
---
# 算法兴趣培养计划第二日

## 三叉树问题解答题

出现的主要错误
没有把根节点当作一层，这样会算出来的层数会少一层
没有在第一题写出最后算出的答案
小问题
拍图能正过来不，我脖子要断了

## 三叉树问题编程题

小问题

- 比如没有初始化sum等，会出现警告

预期解答

```cpp
#include <bits/stdc++.h>
using namespace std;
void solve1() // O(log(n))
{
    int n;
    int tmp = 1;
    int ans = 0;
    int sum = 0;
    cin >> n;
    while (sum < n)
    {
        ans++;
        sum += tmp;
        tmp *= 3;
    }
    cout << ans;
}
double log3(double x)
{
    return log(x) / log(3);
}
void solve2() // O(1)
{
    int n;
    cin >> n;
    cout << ceil(log3(2 * n + 1));
}
int main()
{

    solve2();
}
```

非预期解答

```cpp
#include <bits/stdc++.h>
using namespace std;
int n, l = -1, r = 13, sum;
bool check(int mid)
{
    int res = 0, now = 1;
    for (int i = 0; i <= mid; i++)
    {
        res += now;
        now *= 3;
    }
    if (res >= n)
        return true;
    else
        return false;
}

int main()
{
    cin >> n;
    while (l + 1 != r)
    {
        int mid = (l + r) >> 1;
        if (check(mid))
            r = mid;
        else
            l = mid;
    }
    cout << r + 1 << endl;
    return 0;
}
```

这里稍微介绍一下这个人的写法，
初始时，左右边界分别为 l = -1 和 r = 13。
通过 `mid = (l + r) / 2` 计算中间值，然后调用 `check(mid)` 来判断前 `mid` 项的和是否满足条件。
如果满足条件，则说明我们可能找到一个满足条件的 `mid`，但我们还需要进一步缩小范围，所以将 `r` 移动到 `mid`。
如果不满足条件，则需要增大 `mid`，因此将 `l` 移动到 `mid`。
`check` 函数计算等比数列的和，并用于判断当前 `mid` 是否满足条件

## 评分区间

### 95的例子

```
有8层
这个题思路比较简单
在输入了树的节点个数n后，使用以初始值i=0为控制因子的for循环，将3的i次幂累加至新的变量p以达到模拟树的效果

可以用pow函数来获取3的i次幂

之后在每一次循环中都将p的值与n进行比较

若p恰等于n，则说明该三叉树最后一层刚好满了，输出层数（i+1），并结束程序

若p小于n，并且下一次循环的p大于n，则说明最后一层未能填满，输出层数（i+2），结束程序
```

### 90上下的例子

```
答案：8

思路：这题本质上是求通项公式为3的n-1次方的数列的和，将前n项的和与输入的数据比较大小，数列的和要大于等于输入的数据，此时输出当前的n

首先先定义变量：输入的数据：x，n和数列的和a，先用pow函数计算a，再用for循环，每次循环n要加1，直至a大于等于x，在循环内部用if语句判断一下即可，若满足a大于等于x，用break跳出循环，并输出此时的n
```

### 85以上的例子

较可惜的是如果没有点名答案是多少，则最多分数为89分

以下是89分例子

```
这是一个数列，完全分叉情况下，在完全三叉树中，第 n 层的节点数是3的（n-1）次方。因此，前 n 层节点总数的公式为：（3的n次方-1）/2

总节点数为2024时：（3的n次方-1）/2<2024

第一个想到的方法是递归，调用calculateheight函数进行运算，当累加节点数大于等于给定的值时，即说明可填满。

步骤：从layer1开始计算current节点数，然后累加，存储到sum里；检查累加后的节点数大于等于n，则返回current，即为高度，终止递归。反之，利用递归调用calculateheight函数继续计算下一层。（即判断height>=n）

代码实现： for循环依据layer计算当前节点数，假定每层节点数均为上一层的3倍：

    for (i=1; i<layer; i++) {

        current *= 3;

}

然后累加：number+=current;

判断：if(number>=sum)

return layer;

else

return calculateheight函数（calculateheight(sum,layer+1,number)）

递归还是复杂了点，第二个方法是直接用循环：

用while循环计算层数，直到sum大于等于n为止；

在循环中将current累加，储存进sum中

乘3计算下一层节点数

layer++

循环终止后，输出高度
```

### 80分

基本没有逻辑错误，写了思路

```
计算出空指针总数

共3n个指针 非空指针数是n-1 空指针总数是3n-（n-1）=2n+1————仅作参考 

 

 

按照定义 第一层一个节点 第二层三个节点 易知节点数成等比数列 1=3^0 3=3^1…… 以3为首项 3为公比的等比数列

可以编程 输入变量n 令x=3^0+3^1+3^2+……+3^n  y=3^0+3^1+3^2+……+3^（n-1）使用if语句（若x>2024且y<2024 则结果错误   若x<2024且y<2024 则输出结果k） 可取得临界值k   k+1即为层数

另法 

由等比数列求和公式可知  随便取一个较大的数 比如取n=9 设置取值范围1到9遍历  if语句筛选

 

另外if筛选可取x>2024 y>2024的最小n值  即得出结果

另法 见文件法二  

、具体见程序
```

### 70分+

可惜没有回答正确或思路有问题或态度不端正
