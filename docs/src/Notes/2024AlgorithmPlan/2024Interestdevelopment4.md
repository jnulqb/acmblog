---
title: 2024兴趣培养计划Day4
description: 兴趣培养计划4
date: 2024-10-12
tags: ["hobbies", "passion"]
---
# 算法兴趣培养计划Day4

## 问题描述

对于一个长度为 $n$ ($n \leq 10^5$) 的单调不减数组，要找到数组中第一个大于 $x$ 的元素，可以采用**二分查找**来优化查询次数。由于数组是有序的，我们可以利用二分查找在 $O(\log n)$ 的时间复杂度内找到第一个大于 $x$ 的位置。

### 解题思路

1. **初始化边界**：设置二分查找的左右边界 $\text{left}$ 和 $\text{right}$ 分别为数组的起始位置和终止位置。
2. **进行二分查找**：
   - 计算中间位置：
     $$
     \text{mid} = \frac{\text{left} + \text{right}}{2}
     $$
   - 如果 $\text{array[mid]} \leq x$，则将左边界移动到 $\text{mid} + 1$：
     $$
     \text{left} = \text{mid} + 1
     $$
   - 如果 $\text{array[mid]} > x$，则将右边界移动到 $\text{mid}$ 以继续在左侧查找：
     $$
     \text{right} = \text{mid}
     $$
3. **终止条件**：当 $\text{left} = \text{right}$ 时，数组中第一个大于 $x$ 的元素即为 $\text{array[left]}$。

这其实就是upper_bound的实现

```cpp
//upper_bound
    int upper_bound1(vector<int> &nums, int target) {
        int left = 0, right = nums.size() - 1; 
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left; 
    }
    // 开区间 (left, right)
    int upper_bound2(vector<int> &nums, int target) {
        int left = 0, right = nums.size(); 
        while (left < right) { 
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target)
                left = mid + 1;
            else
                right = mid;
        }
        return left;
    }
    // 开区间 (left, right)
    int upper_bound3(vector<int> &nums, int target) {
        int left = -1, right = nums.size(); 
        while (left + 1 < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] <= target)
                left = mid;
            else
                right = mid;
        }
        return right;
    }
```

```cpp

    int lower_bound1(vector<int> &nums, int target) {
        int left = 0, right = nums.size() - 1; 
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left; 
    }

    int lower_bound2(vector<int> &nums, int target) {
        int left = 0, right = nums.size(); 
        while (left < right) { 
            int mid = left + (right - left) / 2;
            if (nums[mid] < target)
                left = mid + 1;
            else
                right = mid;
        }
        return left;
    }

    // 开区间 (left, right)
    int lower_bound3(vector<int> &nums, int target) {
        int left = -1, right = nums.size(); 
        while (left + 1 < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] < target)
                left = mid;
            else
                right = mid;
        }
        return right;
    }
```

## 典型的小错误

介绍一下回答中这位同学的答案

用二分法查找，可保证数组的有序性，减少询问次数，二分查找的时间复杂度是 O(log n)

只有在数组有序的情况下，才能使用二分查找，否则无法保证查找的正确性
来看下面的图
![image.png](https://s2.loli.net/2024/10/17/JlbYRGQ17Pw395T.png)

因为是无序的所以我们想要找到21并不可以用二分查找

有一种写法是这样的

```cpp
 int upper_bound1(vector<int> &nums, int target) {
        int left = 0, right = nums.size() - 1; 
        while (left <= right) {
            int mid = (left + right) >> 1;
            if (nums[mid] <= target)
                left = mid + 1;
            else
                right = mid - 1;
        }
        return left; 
    }
```

介绍一下这里的`>>`操作符
`>>`是右移操作符，对于一个数进行右移操作，相当于除以2的n次方，这里是除以1，所以相当于除以2

### 回复

Q:我不理解！！为什么群里的大佬时间那么短，我的这么长QAQ
A:你用的是java。。。

### 出乎意料的回答

Q:可以使用随机二分
A:你是真要成为运气大师了

### 优秀的回答

95昏

```

上次我文字太单薄了，这次我 多水 多写一点

做题历程
看到这道题，我的第一反应就是：这不就是一道简单的查数的题目吗，用二分法不是轻轻松松就可以ac吗

我满怀自信地写完代码然后提交，赫然呈现在我眼前的是30组数据全部输出错误

我仔细地检查了我的代码，审查题目所给的条件

我知道我犯下了傲慢之罪

其一：我忽视了“大于x”这个条件，当数组中满足一个数等于询问的数时，我直接输出了这个数

其二：我忽视了单调不减这个条件，单调不减意味着数组中可能有相同的数，当a[low]==x时，输出a[low+1]也有可能会输出一个相同的数

一步步修改代码解决以上几个问题，我数据的通过量也从0一步步到了30,体验到了改进代码带来的收获感

解题思路
首先，定义使用的变量，使用scanf函数依次读入

这里需要注意的是，在读入数组a[ ]时，我们可以使用如下方法来压缩掉其中相同的量
```

代码

```c
 for(int i=0;i<n;i++)
    {   
        scanf("%d",&a[i]);
        if(a[i]==a[i-1] && i>0)
        {
            n--;
            i--;
        }
    }
```

```
这样所得的数组a[ ]中就不会再有相同的数据干扰我们ac了

然后，我们使用for循环对所询问的数x依次求解

定义low为数组a[ ]的最小下标，high为最大下标，mid始终为它们的中值

先看x是否在a[low]到a[high]的范围内，若不在，则输出-1，直接结束此次循环

若在则比较a[mid]与x的大小关系：

      若a[mid]等于x则输出a[mid+1]，结束此次循环

      若a[mid]比x小则使low = (mid+1)，若此时的a[low]大于等于x，直接输出正确结果并结束此次循环，否则继续循环

      若a[mid]比x大则使high = mid，若此时的a[high-1]小于x，直接输出正确结果并结束此次循环，否则继续循环

持续进行以上循环，则我们可以在比较少的循环次数内找到数组中符合题目条件的数
```

代码实现

```c
int main(void)
{
    int n;
    scanf("%d",&n);
    int t;
    scanf("%d",&t);
    int a[100003];
    for(int i=0;i<n;i++)
    {
        scanf("%d",&a[i]);
        if(a[i]==a[i-1] && i>0)
        {
            n--;
            i--;
        }
    }
    int x[t];
    for(int i=0;i<t;i++)
    {
        scanf("%d",&x[i]);
    }

    for(int i=0;i<t;i++)
    {
        int low = 0, high = n-1, mid;
        if(x[i]<a[0] || x[i]>a[n-1])
        {
            printf("-1\n");
            continue;
        }
        while(low<high)
        {
            mid = (low+high)/2;
            if(a[mid]==x[i])
            {
                printf("%d\n",a[mid+1]);
                break;        
            }        
            if(a[mid]<x[i])
            {
                low = mid+1;
                if(a[low]==x[i])
                {   
                    printf("%d\n",a[low+1]);
                    break;
                }
                else if(a[low]>x[i])
                {
                    printf("%d\n",a[low]);
                    break;
                }

            }
            if(a[mid]>x[i])
            {   
                high = mid;
                if(a[high-1]<x[i])
                {
                    printf("%d\n",a[high]);
                    break;
                }  
            }
        }
    }
    return 0;
}

```

90上下

```
对于这个问题，可以采用二分法来解决

因为数组内元素单调不减

不妨取一个特殊的长度为8的数组{ 1, 1, 4, 5, 14, 19, 19, 81}

假设x=18;

那么第一个查询的就是第8 / 2 = 4个元素  5;

这时判断5小于18就继续查询(5 + 8) / 2 = 6个元素  19;（左边加一为了防止死循环）

于是就找到了答案18.

事实上对于题设的数组，最坏的情况就是查询log2(n)次

即时间复杂度是O(logn)
```

### 番外

位运算
异或运算

```cpp
int a = 1;
int b = 4；
int ans = a ^ b;
// ans = 5
//0 0 0 1
//0 1 0 0
//0 1 0 1
```

或运算

```cpp
int a = 1;
int b = 4；
int ans = a | b;
// ans = 5
//0 0 0 1
//0 1 0 0
//0 1 0 1
```

与运算

```cpp
int a = 1;
int b = 4；
int ans = a & b;
// ans = 0
//0 0 0 1
//0 1 0 0
//0 0 0 0
```

### 番番番外

俱乐部的网站上线了

[俱乐部网站](https://www.jnuacm.online/)
