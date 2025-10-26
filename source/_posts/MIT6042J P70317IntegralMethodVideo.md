---
title: MIT6042J P70317IntegralMethodVideo
---

1
00:00:00,000 --> 00:00:08,199
So we figured out that you can get the bookstack, the overhang of the books, to be half the

2
00:00:08,199 --> 00:00:14,839
harmonic sum. With end books you can get out hn over 2 where hn is this harmonic sum or

3
00:00:14,839 --> 00:00:20,440
harmonic number. The question is how are we going to estimate or calculate what this

4
00:00:20,440 --> 00:00:25,440
sum is? Now it turns out there is no simple formula for exactly what this sum is, but there

5
00:00:25,440 --> 00:00:32,039
is a simple formula that estimates it quite accurately. And we get the estimation by bounding

6
00:00:32,039 --> 00:00:39,359
the sum by integrals. And so let's look at this integral method for estimating sums. Remember

7
00:00:39,359 --> 00:00:44,480
what I wanted was the sum of 1 plus a half plus a third down to 1 over n. So let's form

8
00:00:44,480 --> 00:00:50,680
some unit width rectangles of heights equal to the amount that I want. So here's a rectangle

9
00:00:50,680 --> 00:00:55,040
of height 1, rectangle of height of half, rectangle of height of third. I'm going out here

10
00:00:55,039 --> 00:01:01,280
if you can actually count to 8, but let's propose that this is a height 1 over n. And what

11
00:01:01,280 --> 00:01:08,480
I know is that the total area of these rectangles is actually equal to the number that I want.

12
00:01:08,480 --> 00:01:14,680
The total area of these rectangles is the harmonic number. And I'm interested in a lower bound

13
00:01:14,680 --> 00:01:20,840
for hn because I want to know how far I can get out. I want to take lower bound. It says

14
00:01:20,840 --> 00:01:26,000
hn is larger than a certain amount. That's the amount that I'm sure that I can stack out

15
00:01:26,000 --> 00:01:31,480
and books. So the way I'm going to get a lower bound on this number hn is by looking at this

16
00:01:31,480 --> 00:01:36,760
curve that goes through the corners of the rectangles. And if you check it, that curve is 1 over

17
00:01:36,760 --> 00:01:50,000
x plus 1. That is the point here is when x is 0, I'm at 1 over 1. When x is 1, I'm at

18
00:01:50,000 --> 00:01:56,640
1 half the height of the second rectangle and so on. So 1 over x plus 1 is a curve that is

19
00:01:56,640 --> 00:02:04,319
strictly below the boundaries of all these rectangles. That means that the area under 1 over x plus 1

20
00:02:04,319 --> 00:02:12,639
going from 0 to n is a lower bound on hn because it's a lower bound on the area of the rectangles.

21
00:02:12,639 --> 00:02:18,879
So hn equals the area of the rectangles. It's greater than the area over 1 over x plus 1, which of

22
00:02:18,879 --> 00:02:25,759
course is equal to the integral from 0 to n of 1 over x plus 1, which shifting variables is the

23
00:02:25,759 --> 00:02:31,680
same as the integral from 1 to n plus 1 of 1 over x dx, which of course we know is the natural

24
00:02:31,680 --> 00:02:39,759
logarithm of n plus 1. So there we have it. The overhang that you need for three books, which is

25
00:02:39,759 --> 00:02:46,400
bn greater than or equal to 3, means that hn has to be greater than or equal to 6. So by this

26
00:02:46,400 --> 00:02:53,280
estimate, I need log of n plus 1 greater than or equal to 6 in order to get three books out.

27
00:02:53,280 --> 00:03:00,159
I know that the back end of the top book is two books past the edge of the table and the right hand

28
00:03:00,159 --> 00:03:06,800
of the furthest out book is three book lengths past the edge of the table. So my bound tells me that

29
00:03:06,800 --> 00:03:12,480
I need n books such that log of n plus 1 is greater than or equal to 6. Well, expedentuating both

30
00:03:12,479 --> 00:03:17,840
sides, the right hand side becomes e to the sixth and I figure out that as long as n is greater than

31
00:03:17,840 --> 00:03:23,120
or equal to e to the sixth minus 1 books, round it up, of course, because there's only, you can't have

32
00:03:23,120 --> 00:03:30,799
fractions of a book. You get an estimate that with 403 books, I can actually get my stack to stick out

33
00:03:30,799 --> 00:03:36,560
three book lengths past the edge of the table. Well, if you do the actual calculation instead of the

34
00:03:36,560 --> 00:03:42,879
estimate, it turns out that 227 books are enough. But so this estimate is a little off, but for our

35
00:03:42,879 --> 00:03:49,759
purposes, it tells us a dramatic fact, which is that we know that log of n plus 1 approaches infinity

36
00:03:49,759 --> 00:03:56,560
as n approaches infinity. And that means that with enough books, I can get out as far as I want.

37
00:03:56,560 --> 00:04:02,319
You tell me how many book lengths you want to be out. I'll use the log n formula to calculate

38
00:04:02,400 --> 00:04:10,400
how many books I need to get that far out. So here's an example of some students in the class

39
00:04:10,400 --> 00:04:15,280
some years ago decided to do this as an experiment. Now, when we used to do this in class, we first tried

40
00:04:15,280 --> 00:04:19,600
to do it with a big, heavy textbook that we used. And we kept trying to get them to balance and go

41
00:04:19,600 --> 00:04:23,600
out over the edge of the table and they failed because it turns out the textbooks are heavy and they

42
00:04:23,600 --> 00:04:30,879
compress. They're not the rigid rectangular cross sections that our model was based on. But CDKs

43
00:04:30,879 --> 00:04:36,240
has worked very well. They are more rigid. They don't compress easily and they're very lightweight

44
00:04:36,240 --> 00:04:42,879
so that they don't cause problems with distortions because of the size of the stack. And so you can

45
00:04:42,879 --> 00:04:50,959
actually get CDKs to stick out pretty far. This is an example where it's 43 CDKs is high. And the top four

46
00:04:51,759 --> 00:04:59,759
cases are completely past the edge of the table. The leftmost edge is about 1.8 or 1.9 case lengths.

47
00:05:01,439 --> 00:05:08,240
Past the table. There's another view of it from the guy who made the stack.

48
00:05:09,439 --> 00:05:16,319
And of course they were right on the edge of stability in trying to get the CDKs to stick out as far

49
00:05:16,319 --> 00:05:21,680
as possible. So if you notice these little spaces there in terms of the balancing, it's really just

50
00:05:21,680 --> 00:05:27,120
on the brink of falling over if you sneeze at it'll tip. But if you don't sneeze at it, it's stable

51
00:05:27,120 --> 00:05:32,879
and you get the top CD out that far. So while we're at it, let's get an upper bound for HN. We

52
00:05:32,879 --> 00:05:38,240
just got a lower bound of HN. But the same kind of logic of using an integral will give you an upper

53
00:05:38,240 --> 00:05:45,600
bound for HN. What I do now is I run a curve from the upper right corners of the rectangles. And

54
00:05:45,600 --> 00:05:54,879
that curve is simply 1 over X. So an upper bound for the harmonic number HN is the area under 1 over

55
00:05:54,879 --> 00:06:03,199
X out to N plus this 1. And so I get an upper bound that says that the harmonic number HN is

56
00:06:03,199 --> 00:06:11,279
less than the integral from 1 to N of 1 over X dx plus 1 or it's equal to 1 plus log of N. So combining

57
00:06:11,279 --> 00:06:16,719
those two bounds that I got by looking at a curve that's a lower bound on the area and a curve

58
00:06:16,719 --> 00:06:22,639
that's an upper bound on the area and integrating, I discover that HN is bracketed between the natural

59
00:06:22,639 --> 00:06:30,000
log of N plus 1 and 1 plus the lat natural log of N. Now these two numbers, log of N plus 1 and 1

60
00:06:30,000 --> 00:06:37,039
plus log of N are very close and they get closer and closer as N grows. So it turns out to what we

61
00:06:37,039 --> 00:06:44,240
can say pretty accurately is that HN is asymptotically equal to log N. It's approximately equal to log N.

62
00:06:44,240 --> 00:06:50,479
And the precise definition of this tilde symbol that I've highlighted in magenta is called asymptotically equal.

63
00:06:51,360 --> 00:06:57,600
And the general definition of asymptotically equal that HN is asymptotically equal to log N is

64
00:06:58,400 --> 00:07:04,480
that a function f of N is asymptotically equal to a function g of N when the limit of their

65
00:07:04,480 --> 00:07:13,600
quotient goes to 1 that is to say as a multiplicative factor each is within a constant one of the

66
00:07:13,600 --> 00:07:21,600
other in the limit. 1 plus epsilon of 1 plus or minus epsilon of gN is going to bracket fN

67
00:07:21,600 --> 00:07:29,920
and vice versa. Asymptotic equivalents are asymptotic equality. Let's do an example. So the

68
00:07:29,920 --> 00:07:36,000
a remark would be for example that N squared plus N is asymptotically equal to N squared. Why? Well

69
00:07:36,800 --> 00:07:42,640
let's look at the limit as N approaches infinity of N squared plus N over N squared. It's the same

70
00:07:42,639 --> 00:07:48,560
as simplifying algebraically the limit of 1 over 1 plus N as N approaches infinity. That term

71
00:07:48,560 --> 00:07:55,439
goes to 0. Sure enough the limit is 1 and so these two terms are asymptotically equal. The idea

72
00:07:55,439 --> 00:08:00,800
of asymptotically equal is that what we care about is the high order term. The low order terms will

73
00:08:00,800 --> 00:08:07,279
disappear and we're looking at the principal term that controls the growth rate of the functions when

74
00:08:07,439 --> 00:08:15,039
we look at them up to asymptotic equivalents. So let's step back for just a moment and generalize

75
00:08:15,039 --> 00:08:19,439
what we've done here with estimating the harmonic sum. There's a general method called the

76
00:08:19,439 --> 00:08:25,679
integral method where in this particular case suppose we have a function f of the positive real

77
00:08:25,679 --> 00:08:33,839
valued function that's weakly decreasing like 1 over x then let's let s be the sum from i equals

78
00:08:33,840 --> 00:08:43,280
1 to N of f of i. So I was interested where f of x was 1 over x and I wanted the sum from 1 to

79
00:08:43,280 --> 00:08:51,200
N of 1 over i which was the nth harmonic number and I was comparing that to the integral from 1 to

80
00:08:51,200 --> 00:08:58,639
N of f of x or 1 over x in our example. So if i is the integral and s is the sum that I want

81
00:08:59,199 --> 00:09:05,199
what we can conclude really is that in general the sum is bracketed between the integral plus the

82
00:09:05,199 --> 00:09:14,159
first term of f of 1 in the sum and the integral plus the last term of the sum. Remember f is

83
00:09:14,159 --> 00:09:19,759
weakly decreasing so f of n is smaller than f of 1. There's a similar theorem actually just

84
00:09:19,759 --> 00:09:26,559
reverse f of 1 and f of n to use an integral estimate to get a bound on a weakly increasing function

85
00:09:26,559 --> 00:09:36,559
and that gives us a general tool for estimating the growth rate of sums.

