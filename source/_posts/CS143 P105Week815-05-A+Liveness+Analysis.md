---
title: CS143 P105Week815 05 A+Liveness+Analysis
---

1
00:00:00,000 --> 00:00:07,000
In this video, we're going to look at another global analysis called

2
00:00:07,000 --> 00:00:11,000
likeness analysis.

3
00:00:11,000 --> 00:00:14,000
So in the past several videos, we've looked at a procedure for

4
00:00:14,000 --> 00:00:17,000
globally propagating constants through a control flow graph.

5
00:00:17,000 --> 00:00:21,000
And let's, here's one of the control flow graphs we've been looking at and

6
00:00:21,000 --> 00:00:25,000
recall that this algorithm that we discussed would be sufficient to show that

7
00:00:25,000 --> 00:00:29,000
we could replace this use of x here by the constant three.

8
00:00:29,000 --> 00:00:35,000
And once we do that, this assignment x might no longer be useful.

9
00:00:35,000 --> 00:00:39,000
It might not be used anywhere and so we could potentially delete this statement

10
00:00:39,000 --> 00:00:43,000
from the program and that would be a real optimization, an important

11
00:00:43,000 --> 00:00:48,000
optimization to do. However, we can only do that if x is not used elsewhere in the

12
00:00:48,000 --> 00:00:50,000
program.

13
00:00:50,000 --> 00:00:54,000
So let's be a little more careful about what we mean by saying that x is not

14
00:00:54,000 --> 00:00:59,000
used. So down here is a use of x, a reference to x in a statement.

15
00:00:59,000 --> 00:01:07,000
And clearly, this particular reference to x is picking up the value that's

16
00:01:07,000 --> 00:01:12,000
defined by this right dex here. So we say that the right of x here is

17
00:01:12,000 --> 00:01:15,000
live. This one is live.

18
00:01:15,000 --> 00:01:19,000
Okay. And what that means is that the value may be used in the future.

19
00:01:19,000 --> 00:01:26,000
So live equals maybe used in the future.

20
00:01:26,000 --> 00:01:29,000
Okay.

21
00:01:29,000 --> 00:01:35,000
So the value written to x at this line of code may be used by some subsequent

22
00:01:35,000 --> 00:01:39,000
instruction. And here it's not just that it may be used, it's actually guaranteed

23
00:01:39,000 --> 00:01:44,000
to be used because it's only one path and that one path has a reference to x on it

24
00:01:44,000 --> 00:01:46,000
before there's another assignment dex.

25
00:01:46,000 --> 00:01:50,000
Okay. So this particular value of x has written here is guaranteed to be used,

26
00:01:50,000 --> 00:01:54,000
but in general, we don't require that. We just mean there has to be a possibility

27
00:01:54,000 --> 00:01:58,000
that it will be used. Now in contrast, let's take a look at this other

28
00:01:58,000 --> 00:02:03,000
statement in this example here. We assign x to value three, but this assignment

29
00:02:03,000 --> 00:02:07,000
dex, this value of x is never used. This one is dead.

30
00:02:07,000 --> 00:02:13,000
All right. Because the value three here is overwritten by the value four before

31
00:02:13,000 --> 00:02:19,000
there's any use of the variable x. Okay. So this particular right dex will never

32
00:02:19,000 --> 00:02:22,000
see the light of day. You'll never get used by any part of the program.

33
00:02:22,000 --> 00:02:25,000
And we say that it is dead.

34
00:02:25,000 --> 00:02:30,000
So to summarize, a variable x is live at a statement s if there exists some

35
00:02:30,000 --> 00:02:34,000
statement that uses x. Okay. So some other statement s prime that uses x.

36
00:02:34,000 --> 00:02:40,000
And there is a path from s to s prime. And there's no intervening assignment on

37
00:02:41,000 --> 00:02:45,000
that path dex. All right. So there needs to be an assignment to x.

38
00:02:45,000 --> 00:02:52,000
At some statement s, there is some path through the program that reaches a

39
00:02:52,000 --> 00:03:01,000
read of x at some statement s prime. And along that path, there is no right to x.

40
00:03:01,000 --> 00:03:07,000
Okay. And if this situation arises, then we say that this value written in this

41
00:03:07,000 --> 00:03:13,000
first statement s is live. Now if a value is not live, then it is dead.

42
00:03:13,000 --> 00:03:18,000
And a statement that assigns dex is going to be dead code if x is dead after the

43
00:03:18,000 --> 00:03:22,000
assignment. So if we know that immediately after the assignment meaning immediately

44
00:03:22,000 --> 00:03:27,000
after this assignment dex, there is no possibility that a value of x will be

45
00:03:27,000 --> 00:03:31,000
used in the future. Well, then the assignment was useless and the entire

46
00:03:31,000 --> 00:03:34,000
statement can be removed. All right. So dead statements can be deleted from the

47
00:03:34,000 --> 00:03:39,000
program. But notice that in order to do that, we have to have the liveness

48
00:03:39,000 --> 00:03:44,000
information. We need to know whether x is dead at this point.

49
00:03:44,000 --> 00:03:48,000
So once again, what we want to do is to have global information about the control

50
00:03:48,000 --> 00:03:52,000
flow graph. In this case, the property is whether x will be used in the future.

51
00:03:52,000 --> 00:03:56,000
We want to make that information local to a specific point in the program so we can

52
00:03:56,000 --> 00:04:01,000
make a local optimization decision. All right. And just like for constant

53
00:04:01,000 --> 00:04:06,000
propagation, we're going to define an algorithm for performing liveness analysis.

54
00:04:06,000 --> 00:04:11,000
And it's going to follow the same framework. We're going to express liveness in terms of

55
00:04:11,000 --> 00:04:15,000
information transferred between adjacent statements just as we did for a copy or

56
00:04:15,000 --> 00:04:19,000
constant propagation. And it's going to turn out that liveness is actually quite a bit

57
00:04:19,000 --> 00:04:22,000
simpler or somewhat simpler than constant propagation since it's just a boolean

58
00:04:22,000 --> 00:04:28,000
property. It's either true or false. All right. So let's take a look at some of

59
00:04:28,000 --> 00:04:35,000
the rules for liveness. So here, we're defining what it means for x to be live

60
00:04:35,000 --> 00:04:41,000
at this point here. So immediately after p is x live. And it's going to be live.

61
00:04:41,000 --> 00:04:46,000
Remember what the intuition is. The intuition is that the variable x is live right

62
00:04:46,000 --> 00:04:53,000
after p. If the value of x is used on some path on one of the paths that begin at

63
00:04:53,000 --> 00:04:58,000
p. All right. And so in order to know whether it's live, we're going to take the

64
00:04:58,000 --> 00:05:03,000
liveness information at each of the input points. So that would be here, here,

65
00:05:03,000 --> 00:05:07,000
here, and here. So each of the successor statements after p. And we're going to ask,

66
00:05:07,000 --> 00:05:12,000
is x live at any of those points? So it's just a big or over the liveness of x at all

67
00:05:12,000 --> 00:05:18,000
of the successors of p. And that's the liveness of x at the out of p.

68
00:05:18,000 --> 00:05:23,000
Next, let's consider the effect of individual statements on the liveness of x.

69
00:05:23,000 --> 00:05:27,000
So the first rule is that if we have a statement and it reads the value of x.

70
00:05:27,000 --> 00:05:31,000
Okay. So here we have an assignment statement and on the right hand side it refers to x.

71
00:05:31,000 --> 00:05:37,000
So it's reading x. Then x is live before that statement. Clearly, x is just about to be

72
00:05:37,000 --> 00:05:41,000
used on the end of this statement. And so x is live at that point. All right.

73
00:05:41,000 --> 00:05:49,000
So if a statement reads the value of x, then the end of that statement x is true.

74
00:05:49,000 --> 00:05:53,000
Sorry, the liveness of x is true.

75
00:05:53,000 --> 00:05:58,000
A second case is when a statement writes the value of x. So here we have an assignment

76
00:05:58,000 --> 00:06:03,000
dex. And the rest of the statement does not refer to x, does not read the value of x.

77
00:06:03,000 --> 00:06:10,000
So there's no x in e. Okay. So in this situation, x is not live.

78
00:06:10,000 --> 00:06:18,000
Before the statement x is not live or we could say that x is dead before the statement.

79
00:06:18,000 --> 00:06:25,000
And why is that? Well, we're overriding the value of x. So whatever value x had before this statement is never

80
00:06:25,000 --> 00:06:30,000
going to be read. Okay. Because the e here, the right hand side of the assignment doesn't refer to x.

81
00:06:30,000 --> 00:06:35,000
And so immediately before the statement, the current value of x is never going to be used in the future.

82
00:06:35,000 --> 00:06:45,000
And so x is dead at that point. And finally, the last case is what if we have a statement that does not refer to x.

83
00:06:45,000 --> 00:06:54,000
Okay. So it neither reads nor writes x. Well, then whatever the liveness is of x after the statement, it has the same

84
00:06:54,000 --> 00:07:03,000
liveness before the statement. So if x is live here, then x will be live here.

85
00:07:03,000 --> 00:07:10,000
Okay. And similarly, if x is dead after the statement, then x must be dead before the statement.

86
00:07:10,000 --> 00:07:17,000
And that's because x, if x is not used in the future after the statement s, then it still won't be used in the future

87
00:07:17,000 --> 00:07:22,000
before the statement s since the statement s neither reads nor writes x.

88
00:07:22,000 --> 00:07:30,000
So those are the only four rules. And now we can give the algorithm. So initially, we let the liveness information for x be false at all

89
00:07:30,000 --> 00:07:36,000
program points. And then we repeat the following until all the statements satisfy the rules one through four.

90
00:07:36,000 --> 00:07:44,000
And just as it's the same algorithm that we used for constant propagation, we pick some statement where the information is inconsistent and then

91
00:07:44,000 --> 00:07:49,000
update the information at that statement with the appropriate rule.

92
00:07:49,000 --> 00:07:57,000
So let's do a simple example, something with a loop. So let's begin say by initializing x to zero.

93
00:07:57,000 --> 00:08:09,000
And then what should our loop body do? Well, we can check whether x is equal to 10. And if it is, we'll exit the loop.

94
00:08:10,000 --> 00:08:24,000
And let's assume that x is dead on exit. So x is not referred to outside of the loop. And otherwise, if x is not 10, then we will increment x and we'll branch back to the top of the loop.

95
00:08:24,000 --> 00:08:33,000
So this is a very, very silly little program. It just counts to 10 and exits. But let's do the liveness analysis to see where x is live.

96
00:08:34,000 --> 00:08:45,000
So since x is dead here on exit, it's clearly going to be dead on the out of this conditional on this branch.

97
00:08:45,000 --> 00:08:59,000
So I should say that x is not live. So we're using Boolean's here. So x's liveness would be false. And we're assuming that x is also not live every place else initially.

98
00:08:59,000 --> 00:09:04,000
And so there's a program point in there also where the liveness of x is false.

99
00:09:04,000 --> 00:09:13,000
Okay, so now let's propagate the information. Well, so here we have a read of x. And let me switch colors here. So here we have a read of x.

100
00:09:13,000 --> 00:09:20,000
So in fact, the information is inconsistent here because right before this statement, since we have a read of x, x must be live.

101
00:09:20,000 --> 00:09:27,000
So in fact, x is live at this point. Now notice that this statement both reads and writes x.

102
00:09:27,000 --> 00:09:36,000
Okay, but the rule that says x is live before when we do a read takes priority here because the read happens before the right.

103
00:09:36,000 --> 00:09:42,000
So we'll read the old value of x before we write the new value of x. Okay, so the old value of x does get used.

104
00:09:42,000 --> 00:09:45,000
And that's why x is live merely before this statement.

105
00:09:46,000 --> 00:09:50,000
So then here's another read of x.

106
00:09:50,000 --> 00:09:59,000
Okay, so on the, so at the point immediately before this while left out one program point here, x is also live.

107
00:09:59,000 --> 00:10:08,000
Okay, and then following edges backwards, well, that means x is going to be live on the back edge of the loop. And it's also going to be live.

108
00:10:08,000 --> 00:10:11,000
Going into the initialization block.

109
00:10:11,000 --> 00:10:20,000
Right. Now we come back around here and we see that we're done because x is already known to be live within the loop body.

110
00:10:20,000 --> 00:10:28,000
And now x is also live here. And then the question is, you know, what about this point on the entrance at the entrance to the control flow graph?

111
00:10:28,000 --> 00:10:36,000
Well, there's a right of x. And with no read of x on the right hand side. So in fact, x is not live on entry to this control flow graph.

112
00:10:36,000 --> 00:10:43,000
So in fact, x is dead at this point. So whatever value x has when we enter the control of the graph, it will never be used in the future.

113
00:10:43,000 --> 00:10:52,000
Right. And so that is the correct liveness information for every program point in this example.

114
00:10:52,000 --> 00:11:01,000
Now another thing you can see from our little example is that the values change from false to true, but not the other way around.

115
00:11:01,000 --> 00:11:10,000
So every value starts at false and it can change it most once to say that the values actually live that the property becomes true.

116
00:11:10,000 --> 00:11:16,000
And then it won't ever change back to false again. So going back to orderings.

117
00:11:16,000 --> 00:11:22,000
We only have two values in this analysis, false and true. And the ordering is at false is less than true.

118
00:11:22,000 --> 00:11:30,000
Okay. And so everything starts at the lowest possible element of the ordering and they only move up and so they can be promoted to true, but not vice versa.

119
00:11:30,000 --> 00:11:40,000
And so since each value can only change once termination is guaranteed, eventually we're guaranteed to have consistent information throughout the control flow graph and the analysis will terminate.

