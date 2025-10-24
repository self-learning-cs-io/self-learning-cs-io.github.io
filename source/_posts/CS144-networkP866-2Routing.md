---
title: CS144 NetworkP866 2Routing
---

1
00:00:00,000 --> 00:00:05,440
Continuing on a theme of routing, in this video I'm going to tell you about a distance vector protocol.

2
00:00:05,440 --> 00:00:13,919
Distance vector protocols are one in which the routers maintain a vector of their distances to a given or to all of the other routers.

3
00:00:13,919 --> 00:00:25,120
And then iteratively through a distributed algorithm they converge on finding the shortest path or the lowest cost spanning tree from them to every other router.

4
00:00:25,120 --> 00:00:34,719
And we're going to see a specific example of this, what's known as the Bellamann Ford algorithm, which is the most commonly used algorithm in these distance vector protocols.

5
00:00:35,679 --> 00:00:42,400
So the particular problem we're going to address is how can routers work together to find the minimum cost spanning tree?

6
00:00:42,400 --> 00:00:47,840
Here's an example that I've shown in green here as the minimum cost spanning tree for this particular graph.

7
00:00:48,480 --> 00:00:53,520
Notice that this is equivalent to finding the minimum cost spanning tree amongst just the routers.

8
00:00:53,520 --> 00:00:59,359
It didn't matter whether I included the end hosts because really in the end we're just building the spanning tree amongst the routers.

9
00:00:59,359 --> 00:01:03,120
So in the rest of the examples I'm just going to confine myself to that.

10
00:01:03,120 --> 00:01:06,560
So now let's look at the distributed Bellamann Ford algorithm.

11
00:01:06,560 --> 00:01:14,000
And in this example we're going to use the case of trying to find the minimum cost spanning tree to R8.

12
00:01:14,319 --> 00:01:18,959
Just to remind you in the previous slide this was the router in the bottom right hand corner.

13
00:01:18,959 --> 00:01:24,799
So this green spanning tree shown here is the minimum cost spanning tree for everybody to reach R8.

14
00:01:25,439 --> 00:01:32,480
So remember that in general all of the routers are going to be building the lowest cost spanning tree to reach all of the other routers.

15
00:01:32,480 --> 00:01:37,920
So we're just taking one specific case here of finding that minimum cost spanning tree to R8.

16
00:01:38,799 --> 00:01:46,079
So in the Bellamann Ford algorithm we're going to assume that the routers know the cost of the link to each of their neighbors

17
00:01:46,079 --> 00:01:49,680
so that there is a metric and a cost associated with using that link.

18
00:01:49,680 --> 00:01:57,439
And we're going to assume that router R sub i is going to maintain the value of the cost to reach R8.

19
00:01:58,480 --> 00:02:05,040
So at any one instance it's going to keep a sense of its current lowest cost to reach R sub 8.

20
00:02:05,120 --> 00:02:14,879
So router R a is going to be c sub i. So we're going to have a vector c which is going to contain the seven costs of the seven routers R1 through R7

21
00:02:15,680 --> 00:02:21,759
of their current cost to reach R8 and this is the distance vector to reach R8.

22
00:02:22,879 --> 00:02:27,759
Initially the algorithm is going to set this vector to all values of infinity.

23
00:02:28,159 --> 00:02:36,000
And then every t seconds, so starting after the first t seconds R i is going to send c i to its neighbors.

24
00:02:36,000 --> 00:02:41,199
Another of each router is going to send the cost to reach R8 to each of its neighbors.

25
00:02:43,199 --> 00:02:48,879
If R i at any time learns of a lower cost path it's going to update this value c sub i.

26
00:02:48,879 --> 00:02:55,359
So if after t seconds it hears a lower cost path to reach R8 it's going to update its value

27
00:02:55,360 --> 00:02:58,400
and then we're going to repeat and we're just going to keep repeating forever.

28
00:03:00,240 --> 00:03:05,600
Okay let's look at this as how this would work on the graph. And remember there's a natural extension

29
00:03:05,600 --> 00:03:12,560
to calculate this for R1 through R7 we just exchange all of the values. I've just shown you the one example here.

30
00:03:13,440 --> 00:03:18,160
Now let's look at a concrete example and we're going to look at this particular graph here which

31
00:03:18,160 --> 00:03:22,960
I've annotated with some cost. They're different from the cost before. There's a matter of the particular values

32
00:03:22,960 --> 00:03:29,120
or how they came about whether they're for the represent the delay of using a link or the

33
00:03:29,120 --> 00:03:33,360
the price of using a link. They're just values and we're going to try and find the minimum cost

34
00:03:33,360 --> 00:03:38,159
spanning tree using the Bellman Ford algorithm. So remember in the Bellman Ford algorithm we start out

35
00:03:38,159 --> 00:03:44,240
with a distance vector to reach R8 of all the value set to infinity. So R1 thinks it costs

36
00:03:44,719 --> 00:03:50,719
it's infinite to start with R2 and so on. They all think that the cost is infinite in order to reach

37
00:03:50,719 --> 00:03:55,520
R8. Okay so that's where we're going to begin and we're going to go through and see waves of

38
00:03:55,520 --> 00:04:00,240
information propagating through so that we can update these and steadily converge on what the

39
00:04:00,240 --> 00:04:06,960
minimum cost spanning tree is in order to reach R8. So in the next step that information is going

40
00:04:06,960 --> 00:04:13,919
to propagate outwards from R8. So this information here is going to tell us in that first wave that

41
00:04:14,799 --> 00:04:21,839
R8 can be reached in one hop from these routers. R3 is going to learn that it can get there in 4.

42
00:04:22,479 --> 00:04:28,399
That's over the direct path. R5 will learn it can get there in 6. R6 over here will learn that it can

43
00:04:28,399 --> 00:04:34,479
get there in 2 and R7 will learn that it can get there in 1. So they're the costs in that first step.

44
00:04:35,039 --> 00:04:43,839
And so R3 will update its own value. 4, 6, 1 and 2 respectively. And now they will advertise

45
00:04:43,839 --> 00:04:50,799
those values on in the next round of the algorithm. So that information is going to propagate out here

46
00:04:50,799 --> 00:04:56,799
into the next hop. So R4 is going to learn in the next in the next iteration of the algorithm

47
00:04:56,799 --> 00:05:04,399
that it can get there at a cost of 2 via R7. So 2 via R7 could get also get there at a cost of 6 via

48
00:05:04,399 --> 00:05:09,759
R6. That's a higher value so it's going to ignore that one. R2 can get there at a cost of 7,

49
00:05:09,759 --> 00:05:18,000
6 plus 1. So that's 7 going via R5. And R1 is going to learn that it can get there at a cost of 8

50
00:05:18,000 --> 00:05:23,759
via R3. Okay, so it's tempting to think that we're done at this point because every router is heard of

51
00:05:23,759 --> 00:05:28,639
value. But of course this is going to keep going because this information is going to propagate

52
00:05:28,639 --> 00:05:34,000
further. In the next time this news is going to propagate this way, this news is going to propagate

53
00:05:34,000 --> 00:05:38,879
this way, this news will propagate this way and so on. So everyone is going to hear more values

54
00:05:38,959 --> 00:05:43,600
in the next round. Let me clear that to make it a little bit clearer and see what happens in the

55
00:05:43,600 --> 00:05:51,040
next round. So this is the values that I just showed you. Just as an example, R1 had learned,

56
00:05:51,040 --> 00:06:01,120
if you remember, that it can get to R8 via R3 at a cost of 8. So it has that value 8 going via R3,

57
00:06:01,199 --> 00:06:08,959
for example. Okay, so now what happens, you can see that we found out all of the two hop

58
00:06:08,959 --> 00:06:14,319
information. So this is really like the two hop information. In the next iteration, we're going to

59
00:06:14,319 --> 00:06:21,199
find out the three hop information. Let's see what this three hop information is. Well, based on this,

60
00:06:21,920 --> 00:06:26,240
the ones that are going to change that I've shown in red here, let's focus on those. R2,

61
00:06:27,040 --> 00:06:34,079
which previously thought that the lowest cost path was of cost 7 going via R5, it's going to

62
00:06:34,079 --> 00:06:40,639
learn about this three hop path because R4 is going to advertise to it the value 6. And so it's

63
00:06:40,639 --> 00:06:45,600
going to hear about this value that it can get there at a cost of 6 going via R4. So that's going

64
00:06:45,600 --> 00:06:52,560
to be its new value and that's the one here. Similarly, R5 is going to learn about the three hop

65
00:06:53,199 --> 00:06:58,959
path, which goes via R4. It's going to learn about this one here. So previously, the lowest cost path

66
00:06:58,959 --> 00:07:07,439
was a value 6. Now it's going to learn one of value 4 of cost 4 going via R4. So that's this entry

67
00:07:07,439 --> 00:07:12,319
here that it just learned about. So the first three hop path that was actually lower cost than the two

68
00:07:12,319 --> 00:07:18,160
hop path. Let's see what happens in the next iteration. In the next iteration of the algorithm,

69
00:07:18,160 --> 00:07:23,680
the news is spreading out further to the four hop paths. And in the four hop paths, for example,

70
00:07:23,680 --> 00:07:33,520
R1 is going to learn of the four hop path that goes 1, 2, 3, 4, which is of cost 7 because R2

71
00:07:33,520 --> 00:07:39,120
will have propagated on the information that it can get there at a cost of 6. So 6 plus 1 is 7.

72
00:07:39,120 --> 00:07:44,320
So if it goes via R2, it can get there at a cost of 7. So that's this one here.

73
00:07:44,319 --> 00:07:53,680
R2 has just learned in this next hop that there is an even better path. And we can see this one here.

74
00:07:53,680 --> 00:07:58,399
I'm going to draw this one in green to make it a little bit clearer, which goes via here. And that

75
00:07:58,399 --> 00:08:05,920
is a cost 1, 2, 3, 4, 5. So it's just learning that it can get there at 5 if it goes via R5.

76
00:08:07,120 --> 00:08:11,759
So the interesting thing here is these two bits of information are actually inconsistent because

77
00:08:11,759 --> 00:08:17,199
the algorithm hasn't converged. The news of this particular opportunity hasn't made it to R1 yet.

78
00:08:17,199 --> 00:08:25,120
So we'll see that happen in the next step. In the next step, R1 is going to learn of the newer value,

79
00:08:25,120 --> 00:08:36,159
which is to go via that it can reach it in a cost of 6 going on this path here. 1, 2, 3, 4, 5, 6,

80
00:08:36,159 --> 00:08:43,519
cost of 6 going via R2. Oops, I've got a little bit of a mistake there. Okay, that should be via R2.

81
00:08:46,159 --> 00:08:51,279
So now it appears that we're done. How do we know that we're done? Well, we can look at it and see

82
00:08:51,279 --> 00:08:56,399
that we can't find any lower cost paths. That tells us that we're done. But you could also see that

83
00:08:56,399 --> 00:09:02,480
this will finish. It can't go any further. So long as we've explored the maximum hop length in

84
00:09:02,480 --> 00:09:07,440
the network and the maximum hop length here, you can see that there's a longer one that goes

85
00:09:07,440 --> 00:09:16,960
like this. That's probably about the longest. So that's 1, 2, 3, 4, 5, 6. So that will be another

86
00:09:16,960 --> 00:09:24,639
hop for that information to propagate. So it's the longest loop free path. We know that a path that

87
00:09:24,639 --> 00:09:28,720
has a loop in it must have a higher cost. So we're never going to pick that one. So so long as we've

88
00:09:28,720 --> 00:09:33,519
gone as many hops as the longest loop free path, we know that we'll finish. The question is how do

89
00:09:33,519 --> 00:09:38,240
we know that we'll end up with the right answer? In fact, there's a couple of questions that are worth

90
00:09:38,240 --> 00:09:43,279
asking here. The first one is what is the maximum runtime of the algorithm? Just told you that.

91
00:09:43,279 --> 00:09:47,920
It's going to be the longest loop free path. It's going to be the hop count of the longest loop free path.

92
00:09:49,680 --> 00:09:55,920
Will the algorithm always converge? Intuitive late is actually pretty clear that it must converge,

93
00:09:55,919 --> 00:10:02,159
because we start out with the values infinity and we only ever replace them with lower values

94
00:10:02,159 --> 00:10:08,479
and we keep reducing the value until the algorithm has run. So we only have a replace a value with a

95
00:10:08,479 --> 00:10:14,799
lower cost value and eventually we should hear from all of our neighbors their lowest cost path.

96
00:10:15,679 --> 00:10:20,319
And so eventually we will reach the lowest value and we will converge. So the algorithm will

97
00:10:20,320 --> 00:10:26,879
always converge. It's the clever thing about this algorithm. So what happens when link costs change

98
00:10:26,879 --> 00:10:33,600
or when links and routers fail? We'll see an example of that in a minute when actually things can go

99
00:10:33,600 --> 00:10:39,440
wrong when that happens, but in general it will continue to converge because when something fails,

100
00:10:39,440 --> 00:10:45,440
if a lower cost path should suddenly appear, then it will find it and start using it. Things are

101
00:10:45,440 --> 00:10:51,200
a little bit more complicated when things fail and there is no longer a path to somewhere. And I'll

102
00:10:51,200 --> 00:10:56,640
see you show you an example of this in right now. This is a well-known problem with the Bellman

103
00:10:56,640 --> 00:11:02,800
Ford algorithm and it's sometimes characterized as bad news travels slowly. Let's see what that's

104
00:11:02,800 --> 00:11:08,400
what's going on here. We're going to look at this really simple four router network here that are

105
00:11:08,400 --> 00:11:14,320
all connected in a line and the cost from one router to the next is one. So nice simple trivial

106
00:11:14,320 --> 00:11:19,920
example. So initially everything's working fine. We've converged on these values down here at time

107
00:11:19,920 --> 00:11:26,960
zero. We happen to know that we can get to R4. So this is all about the costs to reach R4 in this case.

108
00:11:28,240 --> 00:11:35,440
We that R1 can get there in a cost of three. So that's its value. If it goes via R2,

109
00:11:35,840 --> 00:11:43,280
R2 can get there at a cost of two. That's this plus this. If it goes via R3,

110
00:11:44,640 --> 00:11:50,000
R3 can get there in a cost of one and it's directly connected to R4. So everything is good.

111
00:11:50,880 --> 00:11:57,440
But then suddenly the link from three to four is going to break. So this link over here has broken.

112
00:11:58,080 --> 00:12:07,040
What happens next? Well, what's going to happen is they're going to keep advertising their cost.

113
00:12:07,520 --> 00:12:14,240
R3 is going to start advertising. Hey, I was under the impression that I could get there with a cost

114
00:12:14,240 --> 00:12:21,440
of one before. That's here. But I don't have that link anymore. I know that that link is broken.

115
00:12:21,520 --> 00:12:29,360
But I did hear from R2 that R2 could get there at a cost of two. Now I am one hop away from R2.

116
00:12:29,360 --> 00:12:34,000
So therefore I must be able to get there in a cost of three if I send my packets to R2.

117
00:12:34,640 --> 00:12:40,000
Clearly this is wrong. R3 is delusional. Can't really do that. But because it's being hearing

118
00:12:40,000 --> 00:12:46,080
this value advertised from R2 that says if you send packets to me, I'll deliver them to R4 at a cost

119
00:12:46,080 --> 00:12:53,200
of two plus the cost from me to you. And so therefore a cost of three. Our one doesn't know anything

120
00:12:53,200 --> 00:13:01,920
about the failure yet. Let's see what happens in the next step. So the question is will it eventually

121
00:13:01,920 --> 00:13:10,960
converge and settle down on the correct value? So in the next step, because R3 is now advertising

122
00:13:10,960 --> 00:13:21,120
its cost as being three if it goes via R2, that news is going to reach R2. And R2 is going to say,

123
00:13:21,120 --> 00:13:27,120
hey, you were previously saying to me that it was a cost of three, but you're now, sorry, a cost

124
00:13:27,120 --> 00:13:33,120
of one. Now you're telling me it's a cost of three. So therefore it must be costing me four to get

125
00:13:33,120 --> 00:13:38,400
there. It's your cost which was three that you were advertising to me plus the one. So it's costing

126
00:13:38,720 --> 00:13:44,639
me four to get there if I go via R3. And you can see what's going to happen is this is going to

127
00:13:44,639 --> 00:13:50,559
gradually, they're going to gradually keep feeding each other bad information iteratively and it's

128
00:13:50,559 --> 00:13:55,840
going to increase at every step. And this is just going to spiral out of control. So in the next round,

129
00:13:57,519 --> 00:14:03,759
R2 is going to say, hey, you're telling me that I can get there at four plus the cost from me to you.

130
00:14:03,759 --> 00:14:08,159
That's five. If I send packets to you and so it goes to five and then you know it's going to go to six

131
00:14:09,200 --> 00:14:14,000
and so on and it's just going to keep increasing as we go around. This is known as the counting to

132
00:14:14,000 --> 00:14:22,319
infinity problem or bad news travel slowly. There's a fairly simple fix to this which is, it seems a

133
00:14:22,319 --> 00:14:27,679
bit of a, bit of a clue, but we could set into infinity to be some small number and say 16 and

134
00:14:27,679 --> 00:14:31,679
stop when you get to a count of 16. If you get to a count of 16, it actually means that there's no

135
00:14:31,679 --> 00:14:37,359
path at all. There are various other methods. There's one that's called split horizon. You'll find

136
00:14:37,359 --> 00:14:43,439
this described in textbook. Essentially, because R2 received the lowest cost path from R3,

137
00:14:44,799 --> 00:14:51,039
it does not advertise that cost to R3. In other words, because R2 was originally receiving that lowest

138
00:14:51,039 --> 00:14:59,919
cost path from R3, it doesn't send those advertisements to R3. And so R3 will never think that it can

139
00:14:59,919 --> 00:15:06,959
reach R4 via R2. So that's one way. Another one is called split horizon with poison reverse.

140
00:15:07,919 --> 00:15:16,159
In this case, R2 will actively advertise infinity to R3. So it says, because I heard the lowest

141
00:15:16,159 --> 00:15:22,399
cost path from you, I'm going to actively send you the value infinity. So you will absolutely never

142
00:15:22,399 --> 00:15:29,679
think that you can get there via me. So these are kind of fixes to what is really an elegant algorithm,

143
00:15:29,679 --> 00:15:34,479
but in practice, it takes quite a few things like this to make it work. Let's take a look at

144
00:15:34,479 --> 00:15:40,319
Belmanford in practice. Belmanford is an example of a distance vector algorithm. In other words,

145
00:15:40,319 --> 00:15:46,399
there's a distance vector that is maintained by all of the routers of the distance from them to

146
00:15:46,399 --> 00:15:52,319
every other router. And then they iteratively converge on the correct answer. In other words,

147
00:15:52,319 --> 00:15:57,599
the correct minimum cost distance. This is an example of, therefore, of a distance vector algorithm

148
00:15:57,600 --> 00:16:03,279
and formed the heart of one of the first routing protocols used in the internet, called RIP.

149
00:16:03,759 --> 00:16:08,720
And the RIP stood for the routing information protocol. And it was used very widely for a

150
00:16:08,720 --> 00:16:13,200
quite a long time. And this was because it requires very little computation on the routers. It could

151
00:16:13,200 --> 00:16:17,759
be calculated in a distributed way, requiring very little burden, computational burden on each

152
00:16:17,759 --> 00:16:22,399
of the routers. And we knew that it would eventually converge with a few little fixes here like

153
00:16:22,959 --> 00:16:28,159
the split horizon technique and preventing it from counting to infinity. Over time, though, it was

154
00:16:28,159 --> 00:16:33,600
replaced by other algorithms, other techniques that collect together the entire state of the network

155
00:16:33,600 --> 00:16:39,600
on each router. And then independently, on their own, calculate the minimum cost spanning tree.

156
00:16:39,600 --> 00:16:45,199
So no longer a distributed algorithm. We'll see an example of that in another video on Dijkstra's

157
00:16:45,200 --> 00:16:46,800
shortest path first algorithm.

