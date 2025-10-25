---
title: CS143 P110Week916 03 A+Spilling
---

1
00:00:00,000 --> 00:00:07,200
In this video, we're going to continue our discussion of register allocation.

2
00:00:07,200 --> 00:00:10,480
And this time, we're going to talk about what happens when we can't successfully color

3
00:00:10,480 --> 00:00:17,760
the graph, in which case we have to do something known as spilling.

4
00:00:17,760 --> 00:00:22,320
The graph coloring heuristic that we discussed in the previous video doesn't always succeed

5
00:00:22,320 --> 00:00:28,280
in coloring an arbitrary graph, and it may well get stuck and not be able to find a coloring.

6
00:00:28,280 --> 00:00:32,679
And so in that case, the only conclusion we can reach is that we can't hold all the values

7
00:00:32,679 --> 00:00:34,039
that we'd like to in registers.

8
00:00:34,039 --> 00:00:38,000
We have more temporary values than we have registers to hold them.

9
00:00:38,000 --> 00:00:40,920
And those temporary values have to live somewhere, and so where should they live?

10
00:00:40,920 --> 00:00:42,600
Well, they're going to have to live in memory.

11
00:00:42,600 --> 00:00:45,040
That's the only other kind of storage that we have.

12
00:00:45,040 --> 00:00:48,040
And so we're going to pick some values and spill them into memory.

13
00:00:48,040 --> 00:00:52,520
The idea is that we have the picture in your mind should be of a bucket, and it can hold

14
00:00:52,520 --> 00:00:54,000
a fixed amount of stuff.

15
00:00:54,000 --> 00:00:55,480
Those are the registers.

16
00:00:55,479 --> 00:01:02,439
And when it gets too full, some of the stuff spills over and ends up someplace else.

17
00:01:02,439 --> 00:01:04,640
Now when does a graph coloring heuristic get stuck?

18
00:01:04,640 --> 00:01:08,719
Well, the only situation in which it won't be able to make progress is if all the nodes

19
00:01:08,719 --> 00:01:11,439
have K or more neighbors.

20
00:01:11,439 --> 00:01:15,479
So let's take a look at our favorite register interference graph, the one we've been using

21
00:01:15,479 --> 00:01:16,799
in our examples.

22
00:01:16,799 --> 00:01:21,039
And now let's say that the machine we want to use only has three registers.

23
00:01:21,040 --> 00:01:25,880
And so we instead of finding a four coloring of this graph, we need to find a three coloring.

24
00:01:25,880 --> 00:01:28,560
So let's think about how to find a three coloring of this graph.

25
00:01:28,560 --> 00:01:32,360
Well, if we apply the heuristic, we'll remove A from the graph.

26
00:01:32,360 --> 00:01:35,960
But then we're going to get stuck because once you take A out of the graph and it edges

27
00:01:35,960 --> 00:01:42,840
out, every node that's left has more than as three or more neighbors, as at least three

28
00:01:42,840 --> 00:01:43,840
neighbors.

29
00:01:43,840 --> 00:01:48,360
And so there's no node that we can delete from the graph and be guaranteed to be able to

30
00:01:48,359 --> 00:01:56,719
find a coloring for it with the heuristic that we discussed in the previous video.

31
00:01:56,719 --> 00:02:00,840
So in this situation, what we're going to do is we're going to pick a node as a candidate

32
00:02:00,840 --> 00:02:01,840
for spilling.

33
00:02:01,840 --> 00:02:07,920
This is a node that we, or a temporary, that we are probably, or we think we may have to

34
00:02:07,920 --> 00:02:11,560
assign to a memory location rather than to a register.

35
00:02:11,560 --> 00:02:16,400
And let's just assume for the sake of this example that we pick F. And we'll talk later

36
00:02:16,400 --> 00:02:19,560
about how to choose the node to spill.

37
00:02:19,560 --> 00:02:23,360
There's a number of different ways to choose the particular node to spill.

38
00:02:23,360 --> 00:02:26,200
But for the illustration of this example, it doesn't matter how we pick it, we just have

39
00:02:26,200 --> 00:02:28,879
to pick one to remove from the graph.

40
00:02:28,879 --> 00:02:33,400
Okay, so we're going to say we're going to remove, that we're going to spill F. So what

41
00:02:33,400 --> 00:02:38,599
we'll do then is we'll remove F from the graph just like before and then we'll continue

42
00:02:38,599 --> 00:02:39,599
with our simplification.

43
00:02:39,599 --> 00:02:43,159
And this will now succeed because once we remove F from the graph, we can see that all

44
00:02:43,159 --> 00:02:49,400
the nodes, well actually several of the nodes have fewer than three neighbors.

45
00:02:49,400 --> 00:02:54,759
And so B, C, and D, sorry B and D both only have two neighbors.

46
00:02:54,759 --> 00:02:58,120
Once they're deleted, E and C will only have one neighbor each.

47
00:02:58,120 --> 00:03:00,439
And so clearly coloring will now succeed.

48
00:03:00,439 --> 00:03:07,400
And here's one order that will succeed with this reduced graph.

49
00:03:07,400 --> 00:03:13,079
After we decide to spill F and we successfully color the subgraph, now we have to try to

50
00:03:13,080 --> 00:03:19,320
assign a color to F. And it could be, we could get lucky and discover that even though F

51
00:03:19,320 --> 00:03:25,480
had more than three neighbors or three or more neighbors, when we removed it from the

52
00:03:25,480 --> 00:03:31,400
graph, it could be that when we go and start coloring for the subgraph, that those neighbors

53
00:03:31,400 --> 00:03:33,439
actually don't use all of the registers.

54
00:03:33,439 --> 00:03:37,400
It could wind up being that all those neighbors, for example, are assigned to the same register.

55
00:03:37,400 --> 00:03:41,760
And so there are plenty of registers left over to assign to F.

56
00:03:41,759 --> 00:03:44,639
And so this is called optimistic coloring.

57
00:03:44,639 --> 00:03:46,560
So we pick a candidate for spilling.

58
00:03:46,560 --> 00:03:50,439
We try to color the subgraph once we have a coloring for the subgraph, then we see if we

59
00:03:50,439 --> 00:03:58,039
just get lucky and are able to assign a register to F, in which case we can just go ahead and

60
00:03:58,039 --> 00:04:00,959
continue to color the rest of the graph as if nothing had happened.

61
00:04:00,959 --> 00:04:03,560
So in this case, let's take a look what happens.

62
00:04:03,560 --> 00:04:10,799
We're going to add F back into the graph and look at all and look at its neighbors and we

63
00:04:10,800 --> 00:04:16,879
see that we have a neighbor that's using R1, we have a neighbor that's using R2, and

64
00:04:16,879 --> 00:04:18,879
we have a neighbor that's using R3.

65
00:04:18,879 --> 00:04:21,759
And so in this case, optimistic coloring will not work.

66
00:04:21,759 --> 00:04:27,960
So in fact, F had more than K neighbors and after we color the subgraph, it turns out that

67
00:04:27,960 --> 00:04:33,199
those neighbors are using all K, in this case, three, all three of the register names.

68
00:04:33,199 --> 00:04:37,879
And so F, well there is no register left over for F, and we're going to have to actually

69
00:04:37,879 --> 00:04:42,079
spill it and store it in memory.

70
00:04:42,079 --> 00:04:46,600
So if optimistic coloring fails as it does in this example, then we spill F. So what we're

71
00:04:46,600 --> 00:04:50,839
going to do is allocate a memory location for F, and typically what that means is that

72
00:04:50,839 --> 00:04:54,319
it will allocate a position in the current stack frame.

73
00:04:54,319 --> 00:04:59,199
Let's call this address FAA for the address of F.

74
00:04:59,199 --> 00:05:02,399
And then we're going to modify the control flow graph.

75
00:05:02,399 --> 00:05:05,839
We're going to change the code that we're compiling.

76
00:05:05,839 --> 00:05:12,479
So before each operation that reads F, we're going to insert a load that loads from that

77
00:05:12,479 --> 00:05:16,079
address the current value of F into a temporary name.

78
00:05:16,079 --> 00:05:20,279
Okay, and that makes sense because if the value is out in memory, then if we have an operation

79
00:05:20,279 --> 00:05:24,439
that needs to actually use the value, we're going to have to load it from memory first

80
00:05:24,439 --> 00:05:27,039
into a register.

81
00:05:27,039 --> 00:05:31,279
And similarly, after each operation that writes F, we're going to insert the store.

82
00:05:31,279 --> 00:05:39,719
So we're going to save the current value of F into its location in memory.

83
00:05:39,719 --> 00:05:43,839
So here's the original code from which we constructed the register interference graph.

84
00:05:43,839 --> 00:05:48,119
And notice that there's a few references to F in here and we just highlight them.

85
00:05:48,119 --> 00:05:51,519
All right, so we have a couple of reads and we have a write.

86
00:05:51,519 --> 00:05:55,000
And so now what are we going to do?

87
00:05:55,000 --> 00:06:00,279
So here we have here we had the use of F, the read of F in this statement.

88
00:06:00,279 --> 00:06:01,879
Now we've proceeded that by a load.

89
00:06:01,879 --> 00:06:03,679
And notice that I've given a new name here.

90
00:06:03,679 --> 00:06:05,559
I've called this F1.

91
00:06:05,559 --> 00:06:10,079
And that's because the different uses of F in the control of the graph don't all have

92
00:06:10,079 --> 00:06:12,319
to have the same temporary name.

93
00:06:12,319 --> 00:06:14,919
And actually it will be a good idea to separate them.

94
00:06:14,919 --> 00:06:17,839
So each distinct use of F will get its own name.

95
00:06:17,839 --> 00:06:21,919
So here we load the value of F and then it gets used in this statement.

96
00:06:21,919 --> 00:06:26,319
Here we have a write to F and so we store the current value of F. And now as I hear, I've

97
00:06:26,319 --> 00:06:27,919
given a different name F2.

98
00:06:27,920 --> 00:06:31,759
So the temporary that's computed here is going to be stored is called F2.

99
00:06:31,759 --> 00:06:38,160
And finally, the third use of F, there's another load of F right here which is then used

100
00:06:38,160 --> 00:06:42,000
in this computation here of B.

101
00:06:42,000 --> 00:06:50,879
Okay, so that is a systematic way to modify the code to use F in storage.

102
00:06:50,879 --> 00:06:54,360
And now we have to recompute the liveness of F.

103
00:06:54,360 --> 00:06:55,759
And so what happens there?

104
00:06:56,599 --> 00:07:00,959
Well, here's the original liveness information from which we computed the register interference

105
00:07:00,959 --> 00:07:01,959
graph.

106
00:07:01,959 --> 00:07:02,800
Okay.

107
00:07:02,800 --> 00:07:06,319
And now notice that F is gone.

108
00:07:06,319 --> 00:07:11,319
We no longer use F in the program so we can delete all the places where we mentioned that

109
00:07:11,319 --> 00:07:12,800
F was live.

110
00:07:12,800 --> 00:07:16,120
And now we have the three new names, F1, F2 and F3.

111
00:07:16,120 --> 00:07:18,839
And we have to add in their liveness information.

112
00:07:18,839 --> 00:07:23,159
So it created some new program points here where we inserted statements.

113
00:07:23,160 --> 00:07:29,160
And of course where we have a load of the current value of F, that value is live right

114
00:07:29,160 --> 00:07:31,560
before the use in the next statement.

115
00:07:31,560 --> 00:07:37,080
Here we have the right of the current value of F and that's li right before the store.

116
00:07:37,080 --> 00:07:42,440
And then here's another load of the current value of F which is live until the store,

117
00:07:42,440 --> 00:07:45,720
sorry, until the use in the next statement.

118
00:07:45,720 --> 00:07:46,720
Okay.

119
00:07:46,760 --> 00:07:53,640
So notice here that F used to be live in many, many, many places in the code.

120
00:07:53,640 --> 00:08:02,720
And now not only is F or the different versions of F live in fewer places, also we've distinguished

121
00:08:02,720 --> 00:08:03,720
them.

122
00:08:03,720 --> 00:08:06,440
So we've actually separated the different uses of F. And so these will have their own

123
00:08:06,440 --> 00:08:11,360
nodes and their own set of interferences in the graph and they won't share them with

124
00:08:11,360 --> 00:08:12,600
the other uses of F.

125
00:08:12,600 --> 00:08:18,879
And that will actually also reduce the number of edges in the graph.

126
00:08:18,879 --> 00:08:21,680
So summarize the example on the previous slide.

127
00:08:21,680 --> 00:08:26,720
Once we have decided that we're actually going to spill a temporary F, that means we're

128
00:08:26,720 --> 00:08:30,000
going to change the program, we're going to have loads and stores to the program and

129
00:08:30,000 --> 00:08:33,720
now we're going to have a different program and that's going to change our register allocation

130
00:08:33,720 --> 00:08:34,720
problems.

131
00:08:34,720 --> 00:08:37,320
We're going to have to recompute the live disinformation, we're going to have to rebuild

132
00:08:37,320 --> 00:08:42,360
the register interference graph and then we're going to have to try again to color that

133
00:08:42,360 --> 00:08:43,360
graph.

134
00:08:43,360 --> 00:08:48,840
Now it turns out that this new live disinformation is almost the same as it was before.

135
00:08:48,840 --> 00:08:55,440
So all the temporary names other than F are not much affected by the new statements that

136
00:08:55,440 --> 00:08:56,440
are added.

137
00:08:56,440 --> 00:08:59,759
There's a few new program points where they might be live, but every place they were live

138
00:08:59,759 --> 00:09:02,120
before, they're still live.

139
00:09:02,120 --> 00:09:06,680
And F itself has changed fairly dramatically.

140
00:09:06,680 --> 00:09:09,200
Its live disinformation has changed fairly dramatically.

141
00:09:09,200 --> 00:09:14,840
Certainly the old name F is no longer used and so its live disinformation goes away.

142
00:09:14,840 --> 00:09:20,280
And then we've also split F into three, in this case, three different temporaries, one

143
00:09:20,280 --> 00:09:24,320
for each of the different uses of F in the control flow graph.

144
00:09:24,320 --> 00:09:29,320
And now notice that each of these new uses of F or these new versions of F is live in

145
00:09:29,320 --> 00:09:31,879
a very, very small area.

146
00:09:31,879 --> 00:09:38,400
So a load, for a load instruction, the thing that we're loading, the temporary that we're

147
00:09:38,399 --> 00:09:44,319
loading F i is live only between the load and the next instruction where it's used.

148
00:09:44,319 --> 00:09:50,840
And similarly for a store, the store of a temporary F i is live only between the store itself

149
00:09:50,840 --> 00:09:54,360
and the preceding instruction, the one that created F i.

150
00:09:54,360 --> 00:09:59,679
And the effect of this is to greatly reduce the live range of the spill variable.

151
00:09:59,679 --> 00:10:04,360
So whatever name we decide to spill by adding the loads and stores right next to the places

152
00:10:04,360 --> 00:10:08,720
where those values are used, we dramatically reduce the live range.

153
00:10:08,720 --> 00:10:13,879
And in addition, as I mentioned on the previous slide, by splitting the name F into multiple

154
00:10:13,879 --> 00:10:22,399
different names, we also avoid sharing those different live ranges between the different

155
00:10:22,399 --> 00:10:25,840
versions of F.

156
00:10:25,840 --> 00:10:31,399
So because the live range of F is reduced by spilling, it has fewer interferences in the

157
00:10:31,399 --> 00:10:34,199
new program than it did in the old program.

158
00:10:34,199 --> 00:10:38,039
And what that means in particular is that in the rebuilt register interference graph, F will

159
00:10:38,039 --> 00:10:40,120
have fewer neighbors.

160
00:10:40,120 --> 00:10:46,319
Some of the neighbors that it had before have gone away because it just live in fewer places.

161
00:10:46,319 --> 00:10:50,159
So if we look at the new register interference graph, we can see that among all the different

162
00:10:50,159 --> 00:10:56,319
versions of F, remember that F has been split into three temporaries in this graph, we see

163
00:10:56,320 --> 00:11:03,560
that they only interfere now with the Nc, whereas before F had several other neighbors

164
00:11:03,560 --> 00:11:04,560
in the graph.

165
00:11:04,560 --> 00:11:07,960
And now in fact, this new graph is three colorable.

166
00:11:07,960 --> 00:11:13,640
Now, of course, it might be the case that we can't just spill one name.

167
00:11:13,640 --> 00:11:18,440
We might have to spill several different temporaries before our coloring is found.

168
00:11:18,440 --> 00:11:21,520
And the tricky part is deciding what to spill.

169
00:11:21,520 --> 00:11:25,920
So this is the hard decision that has to be made during register allocation.

170
00:11:25,919 --> 00:11:27,439
Now any choice is correct.

171
00:11:27,439 --> 00:11:29,519
It's only a question of performance.

172
00:11:29,519 --> 00:11:35,399
So some choices of spilling will lead to better code than others, but any choice of spilling

173
00:11:35,399 --> 00:11:38,199
is going to result in a correct program.

174
00:11:38,199 --> 00:11:43,879
And there are some heuristics that people use to pick which temporaries to spill.

175
00:11:43,879 --> 00:11:47,079
And here are a few, or I think three of the most popular ones.

176
00:11:47,079 --> 00:11:50,759
One is to spill the temporaries and have the most conflicts.

177
00:11:50,759 --> 00:11:56,360
And the reason for that is that this is the temporary, the one thing that you can move

178
00:11:56,360 --> 00:12:01,639
into memory that will most affect the number of interferences in the graph.

179
00:12:01,639 --> 00:12:06,840
So the idea is by possibly spilling just this one variable will remove enough edges from

180
00:12:06,840 --> 00:12:11,120
the graph that it becomes colorable with the number of registers we have.

181
00:12:11,120 --> 00:12:16,159
Another possibility is to spill temporaries that have few definitions and uses.

182
00:12:16,159 --> 00:12:21,839
And here the idea is that by spilling those, since they're not used very much, the number

183
00:12:21,839 --> 00:12:25,519
of loads and stores will have to add will be relatively small.

184
00:12:25,519 --> 00:12:30,399
And so if a variable disinsisting it in very many places, then the actual cost in terms

185
00:12:30,399 --> 00:12:37,439
of additional instructions that are going to be executed to spill it is relatively small.

186
00:12:37,439 --> 00:12:41,839
And another one, and this is actually one that I think that all the compiler's implement

187
00:12:41,839 --> 00:12:44,039
is to avoid spilling in inter loops.

188
00:12:44,039 --> 00:12:49,799
So if you have a choice between spilling a variable that's used within the intermost

189
00:12:49,799 --> 00:12:55,439
loop of the program and one that's used someplace else, you probably prefer to spill the one

190
00:12:55,439 --> 00:13:00,679
that's used not in the intermost loop because again, that will result in fewer loads and

191
00:13:00,679 --> 00:13:01,679
stores.

192
00:13:01,679 --> 00:13:05,199
You really want to avoid adding additional instructions to your interloop.

