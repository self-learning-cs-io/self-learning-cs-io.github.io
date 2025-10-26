---
title: MIT6042J P48261DAGsVideo20版
---

1
00:00:00,000 --> 00:00:12,439
Directed acyclic graphs are a special clasped graphs that really haven't warrant the theory

2
00:00:12,439 --> 00:00:14,320
of their own.

3
00:00:14,320 --> 00:00:18,760
Of course, directed acyclic graphs is a lot of syllables, so they're called dags for short.

4
00:00:18,760 --> 00:00:21,879
Okay, so here's where they come up all the time.

5
00:00:21,879 --> 00:00:24,760
Let's look at a diagram that may be familiar to you.

6
00:00:24,760 --> 00:00:30,520
This shows the prerequisite structure of required courses in the 6-3 program of MIT,

7
00:00:30,520 --> 00:00:33,039
electrical engineering and computer science department.

8
00:00:33,039 --> 00:00:37,359
There are similar charts for the other sub majors of EECS and in other departments as

9
00:00:37,359 --> 00:00:38,359
well.

10
00:00:38,359 --> 00:00:39,520
So, what does it mean?

11
00:00:39,520 --> 00:00:45,600
Well, let's look at this vertex corresponding to the first term calculus class 1801, and

12
00:00:45,600 --> 00:00:51,600
there's an edge that points to 6042, and that's because if you look at the catalog, 6042

13
00:00:51,600 --> 00:00:55,719
lists 1801 as a prerequisite.

14
00:00:55,719 --> 00:00:59,840
If you look at the algorithms, introductory algorithms class 606, you'll find if you look

15
00:00:59,840 --> 00:01:07,719
in the catalog that it has listed 2 prerequisites, 6042 and 601, and the fact that they're explicitly

16
00:01:07,719 --> 00:01:15,840
listed in the catalog as prerequisites is why there's an arrow from 601 to 606 and from 6042

17
00:01:15,840 --> 00:01:16,840
to 606.

18
00:01:17,840 --> 00:01:23,159
Now, when you're planning on, when you want to take 606, of course, you have to attend

19
00:01:23,159 --> 00:01:28,520
to not just the fact that you have to take 6042 first and 601 first, but you've got to

20
00:01:28,520 --> 00:01:30,800
take the prerequisites of those prerequisites first.

21
00:01:30,800 --> 00:01:37,920
So you really have to take 1801 before you can take 606 and you need to take 802 before

22
00:01:37,920 --> 00:01:40,120
you can take 606.

23
00:01:40,120 --> 00:01:41,800
There are co-requisites here.

24
00:01:41,800 --> 00:01:45,080
Let's just ignore those and pretend that they were prerequisites because they're kind

25
00:01:45,079 --> 00:01:48,599
of another kind of arrow that didn't distract us.

26
00:01:48,599 --> 00:01:54,920
Okay, so that's what this diagram is telling us and this is a dag.

27
00:01:54,920 --> 00:01:56,439
It's simply a bunch of vertices.

28
00:01:56,439 --> 00:02:05,439
The course labels in rectangular boxes and directed arrows showing catalog listings.

29
00:02:05,439 --> 00:02:09,400
And what I said was that when you're planning your coursework, you're really interested in

30
00:02:09,400 --> 00:02:11,280
the indirect prerequisites.

31
00:02:11,280 --> 00:02:17,960
So one class U is an indirect prerequisite of another class V, means that there's a sequence

32
00:02:17,960 --> 00:02:21,360
of prerequisites starting from U and going to V.

33
00:02:21,360 --> 00:02:27,280
It means that you really have to have taken U some time before you took V. And that's a

34
00:02:27,280 --> 00:02:34,039
crucial fact and thing that you need to take account of when you're planning a course schedule.

35
00:02:34,039 --> 00:02:39,439
So in terms of graph-degraph language, U is an indirect prerequisite of V. Just means

36
00:02:39,439 --> 00:02:45,359
that there's a positive length walk that goes from U to V in the diagram.

37
00:02:45,359 --> 00:02:49,280
In this case, we're talking about the 6-3 diagram of prerequisites.

38
00:02:49,280 --> 00:02:56,079
So there's a positive length walk from 1801 to 6-006, means that you really have to have

39
00:02:56,079 --> 00:03:00,719
taken 1801 before you take 6-006.

40
00:03:00,719 --> 00:03:05,280
And of course, we're talking then about the positive length walk relation, D plus of

41
00:03:05,280 --> 00:03:10,879
the diagram D, if D is the diagram shown in the prerequisite chart, direct prerequisite

42
00:03:10,879 --> 00:03:15,400
chart, then we're interested in D plus and U D plus V. It just means there's a positive

43
00:03:15,400 --> 00:03:21,039
length walk, that's what the plus is for, going from U to V.

44
00:03:21,039 --> 00:03:25,199
Now what happens if you have a closed walk?

45
00:03:25,199 --> 00:03:32,560
Well a closed walk is a walk that starts and ends at the same vertex.

46
00:03:32,560 --> 00:03:33,840
And we can ask this question.

47
00:03:33,840 --> 00:03:37,920
Suppose there was a closed walk that started at 6042 and ended at 6042.

48
00:03:37,920 --> 00:03:39,759
How long does it take to graduate then?

49
00:03:39,759 --> 00:03:42,080
Well it takes a long time.

50
00:03:42,080 --> 00:03:47,000
Because you can't take 6042 until you've taken 6042 and you're never going to be able

51
00:03:47,000 --> 00:03:48,560
to take it.

52
00:03:48,560 --> 00:03:49,560
That's a bad thing.

53
00:03:49,560 --> 00:03:55,920
We definitely don't want the prerequisite structure of courses in the department to have

54
00:03:55,920 --> 00:03:59,680
a closed walk of positive length.

55
00:03:59,680 --> 00:04:03,040
And in fact there's a faculty committee that checks for this kind of thing.

56
00:04:03,040 --> 00:04:07,560
It bugs like this occasionally creep in when some busy curricular office of a department

57
00:04:07,560 --> 00:04:12,480
is planning a complicated program with dozens if not a hundred courses.

58
00:04:12,480 --> 00:04:16,759
And the committee on curricula's job is to check for that kind of thing.

59
00:04:16,759 --> 00:04:17,759
There's a whole staff that does it.

60
00:04:17,759 --> 00:04:22,759
I used to be the chair of that committee and we did spend a lot of time with proposals

61
00:04:22,759 --> 00:04:29,560
from departments and making sure that those proposed course requirements satisfy faculty

62
00:04:29,560 --> 00:04:30,560
rules.

63
00:04:30,560 --> 00:04:31,560
Okay.

64
00:04:31,560 --> 00:04:35,680
So a special case of a closed walk is a cycle.

65
00:04:35,680 --> 00:04:43,639
A cycle is a walk whose only repeat vertex is its start and end.

66
00:04:43,639 --> 00:04:49,480
And let me remark because we keep talking about positive length cycles that a single vertex

67
00:04:49,480 --> 00:04:51,959
will by itself is a length zero cycle.

68
00:04:51,959 --> 00:04:55,340
So you're never going to be able to get rid of length zero cycles because they're the

69
00:04:55,340 --> 00:04:56,759
same as vertices.

70
00:04:56,759 --> 00:05:01,959
But positive length cycles you can hope to ensure are not there.

71
00:05:01,959 --> 00:05:07,439
So if you're going to represent a cycle as a path you'd show the sequence of vertices

72
00:05:07,439 --> 00:05:13,459
and edges v0, v1, v2 where the understanding is that all of the vertices from v0 up to

73
00:05:13,459 --> 00:05:14,920
vn minus 1 are different.

74
00:05:14,920 --> 00:05:19,539
That's what makes it a cycle except that the last vertex v0 is a repeat of the first

75
00:05:19,539 --> 00:05:20,539
one.

76
00:05:20,539 --> 00:05:22,079
That's the one repeat that's allowed in a cycle.

77
00:05:22,079 --> 00:05:27,039
So it's naturally draw it in a circle like this where you start at v0, you follow the

78
00:05:27,039 --> 00:05:31,959
edges around from v i to v i plus 1 all the way back around to v0.

79
00:05:31,959 --> 00:05:35,360
And that's kind of what a cycle is going to look like.

80
00:05:35,360 --> 00:05:41,439
So we have a very straightforward lemma about cycles and closed walks.

81
00:05:41,439 --> 00:05:47,639
Namely that the shortest positive length closed walk from a vertex to itself, it's closed

82
00:05:47,639 --> 00:05:53,519
means it starts at n's at v is a positive length cycle starting and ending at v.

83
00:05:53,519 --> 00:05:57,519
And the reasoning and proof is basically the same proof that said that the shortest walk

84
00:05:57,519 --> 00:06:02,279
between one place and another is a path from one place to the other.

85
00:06:02,279 --> 00:06:07,620
The logic is that if I have a closed walk from v to v and there was a repeat in it other

86
00:06:07,620 --> 00:06:13,120
than at v, I could clip out the piece of the walk between the repeat occurrences and I'd

87
00:06:13,120 --> 00:06:14,599
get a shorter walk.

88
00:06:14,600 --> 00:06:21,640
So the shortest closed walk can't have any repeats, it's got to be a positive length cycle.

89
00:06:21,640 --> 00:06:28,200
So I directed a cyclic graph now as defined simply as a di-graph that has no positive length

90
00:06:28,200 --> 00:06:29,200
cycles.

91
00:06:29,200 --> 00:06:31,560
It's a cyclic, no positive length cycles.

92
00:06:31,560 --> 00:06:37,439
And of course we can equally well define it since cycles are a special case of closed

93
00:06:37,439 --> 00:06:44,560
walks and closed walks of positive length and plysycles as a di-graph that has no positive

94
00:06:44,560 --> 00:06:48,959
length closed walk.

95
00:06:48,959 --> 00:06:55,240
Some examples of dags that come up, the prerequisite graph is going to be one and in general

96
00:06:55,240 --> 00:07:00,079
any kind of set of constraints on tasks that you have to, which ones you have to do before

97
00:07:00,079 --> 00:07:05,279
you do other ones is going to be defining a dag structure.

98
00:07:05,279 --> 00:07:11,199
One that you might not have thought of is the successor function defines a relation

99
00:07:11,199 --> 00:07:14,719
on the integers say going from n to n plus 1.

100
00:07:14,719 --> 00:07:18,919
So I'm going to have an arrow that goes directly from n to n plus 1.

101
00:07:18,919 --> 00:07:24,399
And what's the walk relation then, the positive length walk relation in this graph?

102
00:07:24,399 --> 00:07:31,199
Well there's a positive length walk from n to m precisely when n is less than m.

103
00:07:31,199 --> 00:07:36,959
So the successor dag, its paths represent the less than relation.

104
00:07:36,959 --> 00:07:41,560
And of course less than, it doesn't have any cycles because if a is less than b you're

105
00:07:41,560 --> 00:07:47,639
never going to get around from b back to something that's less than it like back to a.

106
00:07:47,639 --> 00:07:51,959
So there can't be any cycles in the successor dag.

107
00:07:51,959 --> 00:07:53,240
And that's why it is a dag.

108
00:07:53,240 --> 00:07:57,639
Another similar one is the proper subset relation between sets.

109
00:07:57,639 --> 00:08:01,680
So here I'm going to draw an arrow from this set to that set if this set is contained

110
00:08:01,680 --> 00:08:03,240
in that set and but they're not equal.

111
00:08:03,240 --> 00:08:08,439
So a b is a subset of a b d but but a b d has this extra element d.

112
00:08:08,439 --> 00:08:12,519
So the left hand set is a proper subset of the right hand set and I'm going to draw an

113
00:08:12,519 --> 00:08:13,599
arrow there.

114
00:08:13,599 --> 00:08:19,479
And by the same reasoning there can't be any cycles in this graph positive length cycle

115
00:08:19,479 --> 00:08:25,360
because if there was it would mean that the set had to be a proper subset of itself which

116
00:08:25,360 --> 00:08:26,360
doesn't happen.

117
00:08:26,360 --> 00:08:30,560
So this would be another basic example of a dag and I hope you begin to see from these

118
00:08:30,560 --> 00:08:39,680
examples why dags are really all pervasive and in mathematics and in other areas and

119
00:08:39,680 --> 00:08:42,680
why they merit attention.

120
00:08:42,680 --> 00:08:47,139
So when we're looking at a dag though we're basically usually interested in just the

121
00:08:47,139 --> 00:08:49,320
walk relation of the dag.

122
00:08:49,320 --> 00:08:55,520
So that if we're only interested in the walk relation of the dag then it would be typically

123
00:08:55,520 --> 00:08:59,400
the case that many different dags are going to have the same walk relation and it's natural

124
00:08:59,400 --> 00:09:04,920
to ask what's the most economical one is there a minimum say dag that defines a given

125
00:09:04,920 --> 00:09:05,920
walk relation.

126
00:09:05,920 --> 00:09:07,320
So let's look at this example.

127
00:09:07,320 --> 00:09:12,320
Here's a simple dag and you can check that there are no cycles in it.

128
00:09:12,320 --> 00:09:15,920
What's the smallest dag with the same relation is this one and the way I can get it is by

129
00:09:15,919 --> 00:09:19,519
going through the edges one at a time and asking whether I can get rid of the edge because

130
00:09:19,519 --> 00:09:21,240
it's not contributing anything.

131
00:09:21,240 --> 00:09:26,360
So look here there's a path from A to E that goes through B.

132
00:09:26,360 --> 00:09:31,479
Well that tells me that having this direct edge from A to E is not contributing anything

133
00:09:31,479 --> 00:09:36,079
in terms of connectedness and that means I could get rid of it and I'm still going to

134
00:09:36,079 --> 00:09:40,919
wind up with the same possibility of walking from one place to another because I can always

135
00:09:40,919 --> 00:09:45,039
walk from A to E going through B instead of going directly from A to E.

136
00:09:45,039 --> 00:09:47,079
I didn't need that edge.

137
00:09:47,079 --> 00:09:52,120
Another example is here's a walk from A to D that goes through C. There's no need for

138
00:09:52,120 --> 00:09:57,319
me to walk directly from A to D as long as I'm walking I can take the longer walk and get

139
00:09:57,319 --> 00:10:00,759
rid of the short circuit from A to D.

140
00:10:00,759 --> 00:10:07,719
Likewise if I look at this path from C to D to F I don't need that edge from C to F and

141
00:10:07,719 --> 00:10:12,919
as a matter of fact now if I look at this length three path from A to C to D to F there's

142
00:10:12,919 --> 00:10:17,399
no need for me in order to get from A to F there's no need for me to take the direct edge.

143
00:10:17,399 --> 00:10:18,599
I can get rid of that too.

144
00:10:18,599 --> 00:10:21,039
It's kind of a redundant extra edge.

145
00:10:21,039 --> 00:10:26,719
Finally if I look at the path from B to D to F I can get rid of the direct edge from

146
00:10:26,719 --> 00:10:31,199
B to F and at this point I'm done.

147
00:10:31,199 --> 00:10:40,079
I'm left with the a set of edges called covering edges which have the property that the only

148
00:10:40,080 --> 00:10:48,600
way to get from one vertex to another is going to have to be to use a covering edge to

149
00:10:48,600 --> 00:10:53,639
the target vertex or more precisely the only way to get from say from A to B is going

150
00:10:53,639 --> 00:10:56,000
to be to use that covering edge.

151
00:10:56,000 --> 00:11:00,480
If there was any other path that went from A elsewhere and got back to B without using

152
00:11:00,480 --> 00:11:03,560
this edge then it wouldn't be a covering edge anymore.

153
00:11:03,560 --> 00:11:07,480
The fact that it's a covering edge means that if you broke it there's no way any more

154
00:11:07,480 --> 00:11:11,800
to get from A to B so that's the definition of covering edges and you'll do a class problem

155
00:11:11,800 --> 00:11:17,399
about them more precisely in a minute so the other edges are unneeded to define the walk

156
00:11:17,399 --> 00:11:24,120
relation and what we need to keep other covering relations to get the minimum representation

157
00:11:24,120 --> 00:11:26,320
of the walk relation in terms of a deck.

