---
title: MIT6042J P10143DigitalLogicVideo
---

1
00:00:00,000 --> 00:00:09,279
Propositional operators play a basic role in the design of digital circuitry.

2
00:00:09,279 --> 00:00:15,519
And we're going to illustrate that in this section by designing a little binary addition circuit.

3
00:00:15,519 --> 00:00:21,199
So let's begin with a review of binary notation and addition in binary.

4
00:00:21,199 --> 00:00:28,160
So the way binary works is like decimal acceptance that if using powers of 10 you're using powers of 2.

5
00:00:28,160 --> 00:00:32,240
So here is the binary representation of the number 39.

6
00:00:32,240 --> 00:00:37,920
The way to understand that is this is the one's place, that's the two's place, that's the four's place.

7
00:00:37,920 --> 00:00:43,600
So at 1 plus 2 plus 4 is 7.

8
00:00:43,600 --> 00:00:49,840
Then this is the eighth place with nothing, this is the 16th place with something, and this is the 32 place with 1.

9
00:00:49,840 --> 00:00:53,519
So we add 32 to 7 and get 39.

10
00:00:53,600 --> 00:00:59,600
Likewise, the binary representation of 28 is 0111 0 0.

11
00:00:59,600 --> 00:01:07,840
I'll let you check how that works with contributing 1, 2, 4, 8, 16 and 32.

12
00:01:07,840 --> 00:01:11,280
And finally, let's add these two numbers in binary.

13
00:01:11,280 --> 00:01:16,879
Now binary addition works just like decimal addition except that the only numbers are ones and 0s,

14
00:01:16,879 --> 00:01:20,800
so that when you get 1 plus 1 you have to carry 1.

15
00:01:20,879 --> 00:01:25,200
Let's do that. So 1 plus 0 is 1, that fills in the first column.

16
00:01:25,200 --> 00:01:29,120
Now we have another 1 plus 0 is 1, that's fine.

17
00:01:29,120 --> 00:01:36,959
Now we have a 1 plus 1, and that's going to do a 0 here and contribute a carry of 1 to the next column.

18
00:01:36,959 --> 00:01:43,120
Now the next column has two ones, so it becomes a 0 and contributes to another carry.

19
00:01:43,120 --> 00:01:48,079
Now we have two ones, we get a 0 and contribute another carry, and now we have two ones,

20
00:01:48,079 --> 00:01:53,840
and we finally get a 1, 0. So this is the binary representation of the sum.

21
00:01:53,840 --> 00:02:01,679
You can check that this is 1 plus 2 is 3 plus 64, so the answer should be 67,

22
00:02:01,679 --> 00:02:05,439
and you can check that it is. So that's how binary addition works.

23
00:02:05,439 --> 00:02:14,879
Now let's try to design a bit of circuitry using the signals of 0 and 1, which will do addition.

24
00:02:15,840 --> 00:02:22,560
And so we're going to try to design a little six bit binary addition circuit, so I'm going to have

25
00:02:22,560 --> 00:02:30,719
his inputs, the six digits of the first binary number, a 5 down to a 0, and then the second

26
00:02:30,719 --> 00:02:36,319
binary number, let's call it b 0 through b 5, so these are two binary numbers that are six

27
00:02:36,319 --> 00:02:43,840
digits long, and I'm going to add them up by thinking of a 1 is 0 or 1 signal, a 0 is a 0, 1

28
00:02:43,840 --> 00:02:51,039
signal, b 0 is a 0, 1 signal, these can be transmitted down wires into some boxes that contain

29
00:02:51,920 --> 00:02:56,719
digital operators that will cause the right signals to come out, and what we want to come out of

30
00:02:56,719 --> 00:03:09,280
here is the possibly seven digit representation of their binary sum, so d 0 is the sum of a 0 and b 0

31
00:03:10,000 --> 00:03:17,520
the lower digit possibly with a carry, and so on, and then c 5 is if the number, if the sum of

32
00:03:17,520 --> 00:03:22,240
two six digit numbers runs to seven digits, which it might as we saw in the previous example,

33
00:03:22,240 --> 00:03:28,960
then c 5 would become one otherwise 0, so this is the specification. I want a and b to come in,

34
00:03:28,960 --> 00:03:35,360
and I want their binary sum to come out as ds with a high order c if need be.

35
00:03:35,760 --> 00:03:42,880
Now the way we're going to do that is it's clear that the behavior of the inputs for a and b,

36
00:03:42,880 --> 00:03:49,040
which produced a lower digit, might produce a carry, and that carry has to be transmitted to the

37
00:03:49,040 --> 00:03:55,200
next column if it exists, and so I'm going to need a wire that sends a 0, 1 signal from this box

38
00:03:55,200 --> 00:04:01,200
over to that one that can be carrying the carries 0 or 1 and likewise for all of the others,

39
00:04:01,199 --> 00:04:08,079
so this is the kind of basic structure of my binary addition circuit. This is called a ripple carry

40
00:04:08,079 --> 00:04:16,000
organization. It's mimicking exactly the way that we added up the two numbers column by column

41
00:04:16,000 --> 00:04:22,800
possibly propagating a column, a carry of 0 or 1, or really a carry of just one to the next column,

42
00:04:22,800 --> 00:04:27,599
and I've got all the wires in place that I need. What we need to do is design the digital circuit

43
00:04:27,600 --> 00:04:32,080
tree that's in those boxes. Well, this box is different from the others because it's only got two

44
00:04:32,080 --> 00:04:37,600
inputs. All the others have three inputs. So the three input boxes will call full adders and the

45
00:04:37,600 --> 00:04:43,680
two input boxes a half an adder, and the specification of a half an adder again is that the output

46
00:04:43,680 --> 00:04:51,840
is the binary representation of a 0 plus a 0 plus b 0, so it's a two-gid binary representation,

47
00:04:51,840 --> 00:04:57,520
never be bigger than two because there's only two numbers. The output of a full adder is it gets

48
00:04:57,519 --> 00:05:07,279
inputs of three inputs, in this case b1a1 and the carry c0, and it produces the binary representation

49
00:05:07,279 --> 00:05:13,279
of the sum of those three numbers, which is a two-digit binary representation that might be anything

50
00:05:13,279 --> 00:05:20,479
from 0 to 3. Okay, well let's start with the easy case. What's a half adder? Well, a half adder

51
00:05:20,479 --> 00:05:26,159
again has inputs b and a, and it's supposed to produce as output the binary representation of b

52
00:05:26,640 --> 00:05:34,240
plus a. So b is the lower digit, the 0's place, and c is the higher digit, namely the 2's place.

53
00:05:34,960 --> 00:05:39,440
Well, what does that look like? Well, here's the circuit. This is the digital designer's symbol

54
00:05:39,440 --> 00:05:47,200
for a exclusive orgate that returns. So b is going to be the exclusive or of a and b according to

55
00:05:47,200 --> 00:05:54,160
this pictorial diagram. Notice I'm using this colon-colon equal symbol, which is convenient as a

56
00:05:54,160 --> 00:05:59,520
reminder that this is, that I'm defining the thing on the left. So this is, you could replace it

57
00:05:59,520 --> 00:06:04,720
by equal, but it's informative to realize that it's not an equality that you've proved or in some

58
00:06:04,720 --> 00:06:09,360
derivation that two interesting things are proven to be equal, but rather that I'm just defining

59
00:06:09,360 --> 00:06:17,200
what d is. So d is the output d is defined to be a x or b, and likewise this is an AND gate,

60
00:06:17,200 --> 00:06:24,000
so the output c is a AND b. And let's check that. The lower the digit is definitely the mod 2 sum,

61
00:06:24,000 --> 00:06:29,360
the x or of a and b, and one is there a carry, well the only way to is a carry when it is when

62
00:06:29,360 --> 00:06:35,680
the value is 2, in which case the output c would be 1 and d would be 0, and that's exactly when

63
00:06:35,680 --> 00:06:40,959
both a and b are 1, that is c is a and b. So that's a half error, that was easy.

64
00:06:42,399 --> 00:06:47,519
Well, a full error looks like this. It's a little bit more complicated, and I'm going to write

65
00:06:47,519 --> 00:06:52,000
out the equations without trying to justify them completely, but I need a name in order to describe

66
00:06:52,000 --> 00:06:57,120
this with propositional operators. I need a name for that important signal, call it s,

67
00:06:58,000 --> 00:07:04,959
which is what we were not calling in the previous one, but now this is a half error with inputs a

68
00:07:04,959 --> 00:07:12,639
and b, and outputs s, which is a x or b, and another output here, which we know is just going to be a

69
00:07:12,639 --> 00:07:19,120
and b. Okay, how do I express this set of connections as formula as well? First of all, s is the

70
00:07:19,120 --> 00:07:28,319
output of this first half error, which is a x or b. Okay, the output d I get by taking s,

71
00:07:28,879 --> 00:07:36,000
and it's the first output of the second half error, which means it's c in x or s, that's easy.

72
00:07:36,480 --> 00:07:43,759
And what about c out? Well, c out is getting, and this is an or gate, by the way, so c out is

73
00:07:43,759 --> 00:07:52,800
going to be an or of what comes out of this half error, which is c in and c s, and or with the

74
00:07:52,800 --> 00:07:59,439
output of this half error, which is just a and b. So there are a bunch of equations that completely

75
00:07:59,439 --> 00:08:05,279
characterize the structure of this little bit of digital logic and how it is wired up and fits

76
00:08:05,279 --> 00:08:13,680
together. Now, let's go back to describing our ripple carry circuit of what was

77
00:08:13,759 --> 00:08:18,000
going on here. Now that we have the equations that characterize the behavior of these full

78
00:08:18,000 --> 00:08:23,439
errors and half errors, I can explain to you what the formulas are for all of these outputs,

79
00:08:23,439 --> 00:08:29,120
the c's and the d's, and that goes as follows. So the first one, looking at this half error with a

80
00:08:29,120 --> 00:08:39,360
0 b 0 coming in and c 0 d 0 coming out, I know that d 0 is a 0 x or b 0 and c 0 is a 0 and b 0,

81
00:08:39,360 --> 00:08:45,440
that's just the formulas that we have for the half error when the inputs are a 0 and b 0 and I

82
00:08:45,440 --> 00:08:53,279
call the outputs d 0 and c 0. Now, the more general case of the full error, what's coming in here is

83
00:08:54,000 --> 00:09:01,039
an a and a b with the same subscript a i and b i, and what's coming out is the i th digit of the

84
00:09:01,039 --> 00:09:09,200
binary sum d i and the carry c i. And I can describe those just by using the formulas for the

85
00:09:09,200 --> 00:09:14,400
full error. So what it means is that I'm going to introduce a new convenient variable Si,

86
00:09:14,400 --> 00:09:21,520
which I'm going to define to be a i or x or b i. The i is then going to be ci minus 1 the carry

87
00:09:21,520 --> 00:09:31,200
from the previous place x or with Si. And the new carry ci is going to be the output of the second

88
00:09:31,759 --> 00:09:37,920
half error of the first half error, which is ci minus 1 and Si, or the output of the first half

89
00:09:37,920 --> 00:09:44,800
error, which is a i and b i. So the point is that I've just taken the wiring and translated into

90
00:09:44,800 --> 00:09:54,720
equations like this. And you can see how these equations might be better to use than the particular

91
00:09:54,720 --> 00:09:59,120
way that you drew the picture with all the wires connected because the logical behavior of the

92
00:09:59,120 --> 00:10:04,320
circuit doesn't depend on how it's laid out, it just depends on these logical connectives between

93
00:10:04,320 --> 00:10:12,560
the values of these different variables.

