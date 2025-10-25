---
title: CS143 P70Week610 03 B+Self+Type+Operations
---

1
00:00:00,000 --> 00:00:02,800
So now let's move on to the least upper bound operation.

2
00:00:02,800 --> 00:00:06,000
And once again T and T prime will be any types except self type.

3
00:00:06,000 --> 00:00:09,919
The least upper bound of self type with itself is just self type.

4
00:00:09,919 --> 00:00:11,720
And I think that that's pretty clear.

5
00:00:11,720 --> 00:00:18,280
The least upper bound of self types of C and T will be the least upper bound of the class C and T.

6
00:00:18,280 --> 00:00:22,879
And once again this is because C is the largest type that self type could be.

7
00:00:22,879 --> 00:00:29,560
And therefore the largest type that's guaranteed to cover both self types of C and T is going to be

8
00:00:29,559 --> 00:00:31,559
the least upper bound of C and T.

9
00:00:31,559 --> 00:00:36,359
And least upper bound is a symmetric operation.

10
00:00:36,359 --> 00:00:39,200
So if I reverse these two arguments the answer is the same.

11
00:00:39,200 --> 00:00:46,560
And finally if self type is not one of the arguments to the least upper bound then we just do what we did before.

12
00:00:46,560 --> 00:00:53,799
The least upper bound definition excuse me has not changed for class names, for type names other than self type.

