---
title: CMU15445 P15F202314 QueryPlanningOptimization
---

1
00:00:00,000 --> 00:00:29,500
Alright, so we are going to talk about

2
00:00:29,500 --> 00:00:49,480
a

3
00:00:49,500 --> 00:00:58,500
policing

4
00:00:58,500 --> 00:01:03,980
slide is on the website. Yes. And if it's not, let me know. I think it just went up this

5
00:01:03,980 --> 00:01:12,700
morning along with the notes and the video. So the lecture from Monday should be up over

6
00:01:12,700 --> 00:01:20,939
there. I mean, not seeing it. Sorry. I'll put this up right after the talk. Yep. It's a

7
00:01:20,939 --> 00:01:26,659
whole new set of slides from what was there last time. So just pay attention and then

8
00:01:26,659 --> 00:01:35,979
I'll get you through all of that. Other questions? Okay. All right. So let's get started.

9
00:01:35,979 --> 00:01:45,579
And we are going to go and take a look at query optimization. There we go. All right. So,

10
00:01:45,579 --> 00:01:55,659
okay. Move. All right. We're going to look at this query over here, which is a very simple

11
00:01:55,659 --> 00:02:02,619
select query. And we're going to go and walk through the motions for optimizing this

12
00:02:02,619 --> 00:02:08,419
query. Okay. So this looks pretty simple. To set up the machinery for query optimization,

13
00:02:08,419 --> 00:02:12,699
we're first going to need access to this thing called the catalog, which I know we've talked

14
00:02:12,699 --> 00:02:18,219
about briefly, but we'll understand it far more deeply today. And this is going to have,

15
00:02:18,219 --> 00:02:22,740
think of it as metadata for all the data that you have, right? It's a mini database, if

16
00:02:22,740 --> 00:02:27,580
you wish. And it has information. For example, I've got two tables in the system. One is

17
00:02:27,580 --> 00:02:32,620
the employee table and then there's the department table. And along with that information,

18
00:02:32,620 --> 00:02:39,780
such as there are 10,000 records in the amp table and 500 records on the department table

19
00:02:39,780 --> 00:02:44,140
and they spread across 50 pages. So basically 10 records per page in each of the tables.

20
00:02:44,140 --> 00:02:49,780
So those are stats that get stored in the catalog with everything else. I've also shown

21
00:02:49,780 --> 00:02:54,300
little triangles. The dark triangles means I've got a clustered index built on that attribute.

22
00:02:54,300 --> 00:03:00,420
So there's a clustered index on SSN in the amp table and unclustered indices on the amp name

23
00:03:00,420 --> 00:03:08,939
and the department ID fields. Okay. So that's a setup. Now we are going to go and start to optimize

24
00:03:08,939 --> 00:03:18,300
this query. And the first query plan that we start with is a literal implementation of the way

25
00:03:18,300 --> 00:03:23,460
in which you would go and evaluate this query following SQL semantics, which says, take everything

26
00:03:23,460 --> 00:03:30,939
from the from clause to a Cartesian product that gives you the ampent department and then go ahead

27
00:03:30,939 --> 00:03:38,780
and take a look at that information in and apply the selection, which is applying the joint

28
00:03:38,780 --> 00:03:43,980
condition followed by the selection on the department name and the projection on the employee.

29
00:03:44,379 --> 00:03:49,500
So an optimizer is going to consider a variety of different plans, including a plan like this.

30
00:03:49,500 --> 00:03:54,780
Now this is a Cartesian product. So most optimizers won't. So this is just for getting us going today.

31
00:03:54,780 --> 00:04:00,379
But what we have to do is to figure out what is the cost of this plan. And you're going to figure

32
00:04:00,379 --> 00:04:05,339
this out without actually running the plan because as we'll see very soon is a number of plans that

33
00:04:05,339 --> 00:04:10,699
you can produce for the query is a very large number. It is an NP hard problem. So we can't run the

34
00:04:10,699 --> 00:04:15,019
query to figure out whether we should run the query, right? That's oxymoronic. So we have to look

35
00:04:15,019 --> 00:04:20,539
at the query and then figure out how much does it cost. And then look at other ways of getting that

36
00:04:20,539 --> 00:04:25,659
same answer that SQL semantics and then figure out if there's a better way to do it than this.

37
00:04:26,539 --> 00:04:31,419
What's the cost of this plan? So you're going to start working like an optimizer. So we've enumerated

38
00:04:31,419 --> 00:04:35,819
our first plan. Heating an optimizer does is enumerate plans. We've done the first plan.

39
00:04:36,300 --> 00:04:42,939
It's a logical plan as we will see. This is just a view of what that query execution would look like.

40
00:04:42,939 --> 00:04:48,860
And then we start to say how much does it cost? We'll reach to our catalogs along with cost models

41
00:04:48,860 --> 00:04:55,579
that we have written in code and start making assumptions. So we'll say this operation of a

42
00:04:55,579 --> 00:04:59,740
Cartesian product I have to read the two inputs, which is 50 pages and

43
00:04:59,740 --> 00:05:07,660
50 pages. And I have to write a whole bunch of pages. And the number of writes in those pages,

44
00:05:08,220 --> 00:05:14,220
I think I have a typo here that should be 1,000 pages, which we are reading both of those in.

45
00:05:14,699 --> 00:05:19,740
And then, oh, actually, I know what's happening there. That's basically looking at each of the page,

46
00:05:19,740 --> 00:05:25,740
the 50 pages times 1,000. That's the cost of the Cartesian product. 50 times a thousand, right? It's

47
00:05:26,220 --> 00:05:31,900
imagine doing a nested loops to do this Cartesian product. So that's the second number is the cost

48
00:05:31,900 --> 00:05:37,660
to do the Cartesian product. But now I'm going to produce an output. So I have to figure out what that

49
00:05:37,660 --> 00:05:43,420
output size is. I'm going to assume my stats are correct that there are 10,000 records in one

50
00:05:43,420 --> 00:05:49,420
and 500 records in the other. And so what's going to be the size of that output in terms of number

51
00:05:49,420 --> 00:05:56,699
of records in a Cartesian product? It's a Cartesian product. So every record will pair with every

52
00:05:56,699 --> 00:06:03,500
other record, right? So it will be 10,000 times 500. That's how many record pairs I'll produce.

53
00:06:03,500 --> 00:06:10,620
It's a Cartesian product, right? What is the space for each of those records? In the original tables,

54
00:06:10,620 --> 00:06:16,620
we could fit 10 records per page. Now each record that we produce as output is twice as big,

55
00:06:16,620 --> 00:06:23,340
right? Twice as wide. So we'll fit five on a page, right? So we will have 10,000 records multiplied

56
00:06:23,340 --> 00:06:29,819
by 500 records, which is five million, divide by five. It tells me that this output is a million pages

57
00:06:29,819 --> 00:06:36,379
long. Does that make sense? It's just the pure product of the cardinalities that are input. That's

58
00:06:36,379 --> 00:06:41,500
how Cartesian's product for. As you can see, we are starting to cost these. And these are all guesses,

59
00:06:41,500 --> 00:06:46,139
but they are pretty good guesses based on the stats we have. The stats could be wrong, maybe a count

60
00:06:46,139 --> 00:06:50,139
for the number of pages or number of records is not perfect. And we'll get to that in a bit,

61
00:06:50,139 --> 00:06:54,620
but assuming what we know, we're going to take those costs that we know, plus some of these other

62
00:06:54,620 --> 00:07:01,819
things and try to guess what the cost of this model is of this operation is. Everyone with me so far?

63
00:07:05,500 --> 00:07:09,500
Five couples per page. How did I get five couples per page? Because the Cartesian product is going

64
00:07:09,500 --> 00:07:13,899
to have an M record and a department record side by side, right? So I'm just projecting all of those

65
00:07:14,459 --> 00:07:21,019
out. So the output record would be twice as wide, twice as many bytes per record as the input.

66
00:07:21,019 --> 00:07:23,819
Because I'm just combining all the attributes from both of those together.

67
00:07:26,620 --> 00:07:31,259
All of those, yeah, we're just taking all of those and passing it along, keeping all of those across.

68
00:07:33,739 --> 00:07:34,379
Okay, yep.

69
00:07:35,339 --> 00:07:39,100
Ask again, sorry.

70
00:07:42,459 --> 00:07:47,100
Why is the first entry 50 nested groups joined? So I will read 50 pages. That's my

71
00:07:47,980 --> 00:07:52,379
outer block in the nested loops and I'm going to screen over the other stuff. So it's just that cost.

72
00:07:52,379 --> 00:07:55,819
Now, of course, I could have implemented Cartesian product in a slightly different way. I could

73
00:07:55,819 --> 00:08:00,300
have get a different number for the first two, but that comes from the assumption of how that algorithm

74
00:08:00,300 --> 00:08:04,860
is implemented. Okay, and we'll get to details of that as we switch around algorithms, but that's a great

75
00:08:04,860 --> 00:08:09,180
question. How am I getting all these costs? I'm guessing based on algorithmic properties,

76
00:08:09,900 --> 00:08:14,139
input stats, and I'm trying to get to a rough number that is not too far out. That's all we care

77
00:08:14,139 --> 00:08:19,740
about. It doesn't need to be precise to the last bit over here. Okay, other questions?

78
00:08:22,060 --> 00:08:28,060
All right, now we say what is the next stuff which says a selection on MPID with department ID

79
00:08:28,060 --> 00:08:33,820
costs. Okay, now here we're going to assume that we know that there's a foreign key relationship

80
00:08:33,820 --> 00:08:40,059
between the two components and so I'm going to say it's this operation is going to read in the

81
00:08:40,059 --> 00:08:45,259
million pages that were written by the previous. So that's the first million and then it's going to

82
00:08:45,259 --> 00:08:55,340
write its output. How big is its output? Its output is estimated to be 2000 writes. Why? Because I've

83
00:08:55,340 --> 00:09:01,259
got the Cartesian product. If the primary key foreign key relationship holds, that means for every

84
00:09:01,259 --> 00:09:07,500
record in the MP table, there is one department ID because that's the key relationship. This means

85
00:09:07,500 --> 00:09:13,019
after I apply this selection, my output will be the same number of records as there are in the

86
00:09:13,019 --> 00:09:18,700
MP table, which is 10,000 records. Five of these now bigger records that we are working with fit on

87
00:09:18,700 --> 00:09:27,020
a page. So the output size that I will have is 2000 pages. That's how much I write. Okay,

88
00:09:27,020 --> 00:09:32,460
everyone let me so far. So again, I'm making, I'm looking at the schema, I'm guessing, but I'm

89
00:09:32,460 --> 00:09:37,580
making good educated guesses. That's what an optimizer has to do. And as you see, it's getting harder

90
00:09:37,580 --> 00:09:42,460
as we get up the tree. The first one was easy. There was no guesswork. Now the second one's building

91
00:09:42,460 --> 00:09:48,460
on stuff that the first operator outputted and if you make a mistake there in a estimation, the errors

92
00:09:48,460 --> 00:09:54,220
will carry through. Okay, but we have to find a way to cost it and that's what we are doing.

93
00:09:55,019 --> 00:10:01,740
Next stage, we are going to apply the selection on department name is equal to toy. Now again,

94
00:10:01,740 --> 00:10:08,620
we'll start guessing, educated guessing. We'll say department ID is a key in the department table.

95
00:10:09,580 --> 00:10:17,019
And there are 500 records. So on average, what is the probability that a department ID field has a

96
00:10:17,019 --> 00:10:22,299
name toy is going to be one over 500. You're just going to assume there's uniform distribution

97
00:10:22,299 --> 00:10:27,179
of employees across all the departments, which may not be true. Maybe every employee works in the

98
00:10:27,179 --> 00:10:32,139
toy department, for example, or no one works in the toy department, but we are just averaging

99
00:10:32,139 --> 00:10:37,980
things out. We just assume a uniform distribution of the data across these two tables with respect to

100
00:10:37,980 --> 00:10:45,259
that key relationship. Okay, so now we will end up with a table in which that operation we are going

101
00:10:45,259 --> 00:10:54,139
to have to read as you might guess, 2000 pages. Come on, there we go. And we're going to write

102
00:10:54,139 --> 00:11:00,299
four. That four is simply dividing by 500 the number of records we had, which was 10,000,

103
00:11:00,299 --> 00:11:05,419
dividing a game by five, because that's how many records fit on the page. And that's the

104
00:11:06,539 --> 00:11:12,220
size of that output page, four pages for that output for that operation.

105
00:11:12,540 --> 00:11:17,820
Last, we are going to project out the employee name, just that one column is all that the query

106
00:11:17,820 --> 00:11:25,259
wanted. And we'll read for that again, that one page, the four reads, and then go write that up.

107
00:11:25,980 --> 00:11:33,740
So we've got a correct plan. We've taken a logical view of that query, written that down here,

108
00:11:33,740 --> 00:11:38,540
come up with a cost for it in the first thing that we said is a way in which we could go run

109
00:11:38,620 --> 00:11:44,539
this query. And that's two million IOs. You add all of those numbers up, trust me, it comes out to

110
00:11:44,539 --> 00:11:50,779
about two million IOs. Okay, can we do better? That's the job of the optimizer. Can I do better?

111
00:11:50,779 --> 00:11:56,219
And now we start enumerating, right? We start saying, what are other ways I can run this query?

112
00:11:56,699 --> 00:12:02,699
And here's another way that you could run this query. So again, this is a logical query plan

113
00:12:02,700 --> 00:12:09,259
that says, do a join first, don't do a Cartesian product, that's dumb. Do a join between these two

114
00:12:09,259 --> 00:12:15,980
tables, then do the rest of it as we did before. Okay, now the question is, what join do we use?

115
00:12:16,620 --> 00:12:22,060
So we're now getting a little bit more detailed into this plan space. And we'll say, let's do a page

116
00:12:22,060 --> 00:12:28,379
nested loops. If we do a page nested loops, plug in the formulas you had from the last few lectures,

117
00:12:28,379 --> 00:12:33,100
some that you looked at when we looked at query operations. And that's going to be that 50 plus

118
00:12:33,100 --> 00:12:37,580
5,000. And now we are going to do 2,000 as the right. The first two terms come from simply

119
00:12:37,580 --> 00:12:42,779
plugging in the cost of doing block nested loops into the formulas we have from before. And that's

120
00:12:42,779 --> 00:12:47,340
why those formulas are important. The 2000 is exactly the same as what we had before, right? And

121
00:12:47,340 --> 00:12:53,179
that upper part of the tree. So all we did is took this portion here, these two bottom operators

122
00:12:53,179 --> 00:12:57,899
and combined them to do a join because that's what you would do, right? That's much more efficient.

123
00:12:57,899 --> 00:13:03,740
And we add the rest of it up, nothing changes there. And you end up with 54,000 IOs.

124
00:13:04,379 --> 00:13:09,980
Very different from 2 million IOs that we had before. Can we do better? And that's good you

125
00:13:09,980 --> 00:13:13,419
don't have the slides. So I want you to think right now. I'll put the slides up immediately after that.

126
00:13:14,620 --> 00:13:18,379
Okay, as I said, I read it the whole talk. So let's see, can we do better?

127
00:13:18,779 --> 00:13:20,779
Yep.

128
00:13:26,779 --> 00:13:31,340
Yeah, so it's basically can we, why are we carrying all these department columns all across,

129
00:13:31,340 --> 00:13:35,980
just look at the department name and department ID and bring that along? Definitely. We will

130
00:13:35,980 --> 00:13:40,220
definitely do that. It's basically doing projection push down as we've seen a little bit.

131
00:13:40,220 --> 00:13:43,500
Another idea? Did you have another idea? Okay.

132
00:13:43,899 --> 00:13:51,179
Those are indices on the tables. So I already mentioned that. Dark ones are the clustered indices.

133
00:13:51,820 --> 00:13:57,980
Yep. Exactly. We could change the algorithm. Why do you do you look at all these join algorithms?

134
00:13:57,980 --> 00:14:01,419
Because we know some are better block-dested loops is probably not as good.

135
00:14:02,059 --> 00:14:07,500
Right? So let's do that. We'll switch the join algorithm to a sort merge. Let's just say I picked

136
00:14:07,500 --> 00:14:12,620
that and then we'll say how much would it cost? But with sort merge, I'll also need to know how much

137
00:14:12,620 --> 00:14:18,060
of a buffer pool space am I going to get? Right? Because my cost is going to depend. Do I do a two-pass

138
00:14:18,060 --> 00:14:22,299
algorithm? Do I do a four-pass algorithm? That's going to depend upon how much space do I have.

139
00:14:22,299 --> 00:14:26,700
That's why we needed all these numbers. So now we're adding a little bit more detail. I'm creating a

140
00:14:26,700 --> 00:14:32,139
plan. But for this plan to work, if I'm doing a sort merge, I'm saying I need 50 pages of buffer

141
00:14:32,139 --> 00:14:39,419
pool to do my sort merge. Plug the formulas in as before from the class. That comes to 3,150 and then

142
00:14:39,419 --> 00:14:47,659
2000 writes same thing carries over. Yep. Oh, very good. I didn't put the slash. That's great.

143
00:14:47,659 --> 00:14:51,500
That's exactly what we are going to do next. And you're thinking now. You're thinking I can optimize

144
00:14:51,500 --> 00:14:55,819
her. How can I do this well? We spent all this time with query execution saying all of these

145
00:14:55,819 --> 00:15:00,139
things matter. But now we are saying how do we make the plan to make all of that stuff work?

146
00:15:00,139 --> 00:15:06,139
And that's exactly right. So if we just chase this down by simply switching the algorithm to

147
00:15:06,139 --> 00:15:11,899
sort merge join, we come down to a dramatically smaller number about 7,000 IOs. And exactly as

148
00:15:11,899 --> 00:15:16,460
was suggested, this is with materialization. Why we reading and writing at every point? Could we

149
00:15:16,460 --> 00:15:21,100
just pipeline as we talked about? Right? Pipeline says just produce the output and send it across.

150
00:15:21,100 --> 00:15:24,699
When you talked about the vectorization model, we'll say that vectorization might be doing a

151
00:15:24,699 --> 00:15:29,659
vector at a time. But regardless, we are not landing all the data, storing it to a temp file at the

152
00:15:29,659 --> 00:15:34,700
end of each operator and reading it back in the next one. So we are doing something far simpler.

153
00:15:34,700 --> 00:15:40,940
So that's exactly what we'll do. And if you do that with pipelining, you cross out all the back

154
00:15:40,940 --> 00:15:45,660
and forth read writes that are happening. Assume you can fit everything in memory, which means in this

155
00:15:45,660 --> 00:15:49,820
case, the plan is simple. You just need a 50 buffers for the sort merge. But imagine you had one

156
00:15:49,820 --> 00:15:53,740
join feeding into another join and stuff like that. You need to count all the memory spaces that you

157
00:15:53,740 --> 00:15:58,860
need to make that work. If you have that, you can pipeline that through. And now we have 3000 IOs.

158
00:15:58,860 --> 00:16:04,060
So we came down from 2 million to 3000. So you see why optimizer guys, people who know how to

159
00:16:04,700 --> 00:16:08,700
optimize the folks who know how to write good optimizers, they're often the highest paid people in

160
00:16:08,700 --> 00:16:12,460
the database companies. And it's not just this. Obviously, we'll do a lot more. You'll see it'll get

161
00:16:12,460 --> 00:16:18,140
a lot more complex. But the big difference that it makes, hopefully, that's coming through.

162
00:16:18,140 --> 00:16:19,660
Can we do better? Yep.

163
00:16:19,660 --> 00:16:22,860
I was trying to think about the work space course.

164
00:16:22,860 --> 00:16:24,300
Yeah.

165
00:16:24,300 --> 00:16:25,340
Yeah.

166
00:16:25,340 --> 00:16:26,300
Yeah.

167
00:16:26,300 --> 00:16:33,660
That's great. So the question is, should we be thinking about the worst case course as opposed to

168
00:16:33,659 --> 00:16:39,259
the best case courses you make in memory? That's exact. That's true. Here, for example, I'm saying at

169
00:16:39,259 --> 00:16:45,179
the query optimization time, planning time, I'm hoping to get 50 buffer pages. But what if I start to

170
00:16:45,179 --> 00:16:49,179
run the query and I don't have that, and I only get five? So the question is, what do I do? Should I

171
00:16:49,179 --> 00:16:54,379
plan for that? Absolutely. And the most standard way to do that is to make a plan, start running. And

172
00:16:54,379 --> 00:16:58,620
then say, whoops, at runtime, what I thought was going to happen is not there. Can I adapt the

173
00:16:58,620 --> 00:17:03,580
plan on the fly? So you can do adaptive query processing, adaptive query optimization,

174
00:17:03,580 --> 00:17:08,059
wilding query processing, and interleave both of those. Take the advanced graduate database class

175
00:17:08,059 --> 00:17:12,859
and we talk about stuff like that. So right now, we are assuming optimization happens, then processing,

176
00:17:12,859 --> 00:17:16,940
but you can interleave those, especially as you start to realize whoops, something that happened.

177
00:17:16,940 --> 00:17:21,819
You can do other kinds of things too. So for example, you can say, hey, when I do that, I'm expecting

178
00:17:21,819 --> 00:17:27,740
that input to be 2000 pages in that second operator. At runtime, you can say, oh my gosh, instead of

179
00:17:27,740 --> 00:17:33,259
2000, it seems like I've already seen 20,000 pages and it's still going. I'm way off. You can say,

180
00:17:33,259 --> 00:17:38,140
I'm sure the rest of the plan is also bad. I need to go re-optimize that or do something different.

181
00:17:38,140 --> 00:17:42,700
So you can keep track of all these calculations we are doing as stats. When we create the plan to say,

182
00:17:42,700 --> 00:17:47,180
this is what I expected to be. And if it's not, then maybe I should do something about it.

183
00:17:47,180 --> 00:17:50,380
There are other ways in which you could do something about it, including saying, I'll kill the query,

184
00:17:50,380 --> 00:17:54,940
I've just started. I'm way off. Go back to the optimize and ask it to dig a little bit deeper.

185
00:17:54,940 --> 00:18:00,059
It's not as commonly done. More common method is to go and start to adapt what you've already

186
00:18:00,059 --> 00:18:05,580
done and then start to change the rest of what you haven't executed yet. Again, those advanced topics,

187
00:18:05,580 --> 00:18:10,620
but I like how you guys are thinking. So we can do a little bit along the lines of what was suggested,

188
00:18:10,620 --> 00:18:15,820
which is we can look at the plan that we have at hand, which costed about 3000 IOs and say,

189
00:18:15,820 --> 00:18:22,940
let's go a little bit deeper into this and let's go flip around the join and the selection. So this

190
00:18:22,940 --> 00:18:29,740
is called a selection push down. And so I'm, all I need is the records that are in the toy

191
00:18:29,740 --> 00:18:35,259
department. I didn't need to build a do the sort more joint with all the records from the department,

192
00:18:35,259 --> 00:18:41,019
from all the departments. And now if I have an index, as was just mentioned, maybe I can use that.

193
00:18:41,019 --> 00:18:46,140
So I'm counting it as three reads. Maybe it's a two level index, one read to actually get the record.

194
00:18:46,140 --> 00:18:50,380
There's only one, right? Because the department IDs are unique. I'm going to make that assumption

195
00:18:50,380 --> 00:18:55,340
here that there are no two departments called toy, right? So I'm making that assumption. And then I'll

196
00:18:55,340 --> 00:19:00,380
do a nested index loop join because I've got an index on the other columns. And now I have a much

197
00:19:00,380 --> 00:19:04,780
simple plan. I plug in straightforward formulas. I can do this with 37 IOs.

198
00:19:07,020 --> 00:19:12,140
So we flip things around. We change the shape of the tree as we saw in the last one. We push that

199
00:19:12,140 --> 00:19:19,100
selection down. Now in the grand scheme of life, as do you have questions? Yep.

200
00:19:23,580 --> 00:19:28,220
Yeah, I'll come to that. We have a ton of material to come. I'm going to try to get query

201
00:19:28,220 --> 00:19:33,580
optimization in our 10 minutes. So wait for it. If I don't, I'm definitely answering that question.

202
00:19:33,580 --> 00:19:39,259
It's coming. Okay. So other questions about what we just covered is that foundation clear because

203
00:19:39,259 --> 00:19:46,859
otherwise you'll be lost for the rest of the lecture. Okay. All right. So let's keep going.

204
00:19:47,579 --> 00:19:52,619
Let's say we decide this is the plan we want to execute. We've enumerated these plans. We enumerated

205
00:19:52,619 --> 00:19:58,059
a bunch of plans, costed them and said this the best we can do. There are many more plans by the way

206
00:19:58,059 --> 00:20:03,740
that we could enumerate, but we've just done this. And now we are ready to send it to the scheduler.

207
00:20:03,740 --> 00:20:09,180
Like the question that was asked, I can't send this. This is a logical view of what the query should

208
00:20:09,180 --> 00:20:14,700
query should look like. I have to do other things with it. All this red stuff are annotations I add,

209
00:20:14,700 --> 00:20:22,299
which will say things like, oh, the first selection, I'm looking at the department table and the

210
00:20:22,299 --> 00:20:27,099
access path. Remember, that's the technical term is to use that unclustered or the nonclustered

211
00:20:27,099 --> 00:20:32,779
B tree and access path for the M phase of file scan. I'm going to pipeline stuff. I'm going to use

212
00:20:32,779 --> 00:20:39,259
the nested index loop and all that stuff. So the details about what we want that runtime system to do

213
00:20:39,259 --> 00:20:45,259
is all going to have to be put into a data structure that captures the tree along with all the red

214
00:20:45,259 --> 00:20:50,619
stuff. And then that gets sent to the query scheduler, which we talked about two lectures ago.

215
00:20:50,619 --> 00:20:56,139
When now it goes and starts to run the tree bottom up and or top down depending on whichever way

216
00:20:56,140 --> 00:21:01,180
we've set up the rest of the query execution machinery and start to do that. And now the most

217
00:21:01,180 --> 00:21:07,340
stats that get added including, I expect this to be 2000 pages as an input and stuff like that.

218
00:21:07,340 --> 00:21:12,220
I'm not shown that here, but typically these annotated trees, they're called physical plans

219
00:21:13,259 --> 00:21:16,700
as compared to the logical plan which we saw before, which didn't have these details.

220
00:21:16,700 --> 00:21:21,100
The physical plan is something you can run. It tells you which algorithm to use precisely.

221
00:21:21,099 --> 00:21:25,899
And if you have stats and notations and you have choices to go and do dynamic re optimization,

222
00:21:25,899 --> 00:21:30,459
but we won't talk about dynamic re optimization today. Let's just get you to see how regular

223
00:21:30,459 --> 00:21:34,539
optimization happens. And as I said, take the advanced database class if you're interested in that talk.

224
00:21:36,539 --> 00:21:42,059
All right, so logical plan, we enumerated, costed that. Once we found something, we'll convert that

225
00:21:42,059 --> 00:21:48,779
to a physical plan. That's what you send to the scheduler. Okay. All right.

226
00:21:49,019 --> 00:21:59,420
So the NP hard question that was asked, the space of plans you have to search that you can search

227
00:21:59,420 --> 00:22:04,619
is exponential in the number of joins and it's been shown to be an NP hard problem. If I've got

228
00:22:04,619 --> 00:22:09,899
10 joins, I'm going to be looking at 10 factorial, some large number like that. And practically,

229
00:22:09,899 --> 00:22:15,339
if I give you a 10 join query or an invite, you might sometimes see 100 join queries. This is not

230
00:22:15,339 --> 00:22:20,220
unheard of. You will never be able to run the optimization, right? You may take years to just find

231
00:22:20,220 --> 00:22:25,339
the optimal plan. And so the question is, what do you do? So you're not going to look at the entire

232
00:22:25,339 --> 00:22:31,259
space of all the plans. You're going to, if the entire space is this yellow cloud, you're going to

233
00:22:31,259 --> 00:22:38,220
design your optimizer to only look at a small portion of it. So it's practical. And then the whole

234
00:22:38,220 --> 00:22:43,899
art is about how do you define that space to be the space in which you will find the good stuff.

235
00:22:44,700 --> 00:22:49,980
So the goal of an optimizer is not to find the optimal plan over all possible plans because that's

236
00:22:49,980 --> 00:22:54,380
too much. It'll take longer to optimize by many orders of magnitude than running something,

237
00:22:54,380 --> 00:22:59,580
but it is to not make very bad decisions. Don't run the condition product. Don't run really bad stuff.

238
00:22:59,580 --> 00:23:04,860
So it's to find in whatever time budget you have, often you have a limited time budget to do the

239
00:23:04,860 --> 00:23:10,220
optimization. Because you can say, I have a query, I'm going to take an hour to optimize it. Oh,

240
00:23:10,220 --> 00:23:14,299
and it actually just takes a minute to run. You can't also say, I'm just going to take a minute to

241
00:23:14,299 --> 00:23:18,460
optimize. Oh, and the best plan I came up with takes a day to run. So you're going to have to find

242
00:23:18,460 --> 00:23:23,500
that balance. You're going to have to find that balance. And there's a lot of art that goes into that.

243
00:23:23,500 --> 00:23:28,700
But regardless, you're going to need smart ways to say which space to I hunt in. When I'm hunting on

244
00:23:28,700 --> 00:23:33,259
enumerating all these plans, how do I, how can I do this in a smart way? So that's what we'll talk

245
00:23:33,259 --> 00:23:37,180
about. And there's just not one way. We'll talk about one way today. And that's why optimization is

246
00:23:37,180 --> 00:23:42,700
an evergreen field as workloads change and things get more and more complex in data platforms. How to

247
00:23:42,700 --> 00:23:47,820
do this stuff keeps changing all the time. So if you are an optimizer person, you have a job for life.

248
00:23:47,820 --> 00:23:52,700
And probably the highest paid database employee in the company is likely to be optimizer person.

249
00:23:54,779 --> 00:23:58,620
But you've got to know the math and you've got to get comfortable with algebra and stuff like that,

250
00:23:58,620 --> 00:24:03,500
which we'll start enumerating these plans as because that's what all the papers are. And they

251
00:24:03,500 --> 00:24:09,500
write those in terms of those transformation. So this is just reiterating that we have a logical

252
00:24:09,500 --> 00:24:13,980
way of representing the query, which is to say, here's how I'm going to run that. And then you can

253
00:24:13,980 --> 00:24:18,539
manipulate that, like push the selection down stuff like that. And then there's a physical space in

254
00:24:18,539 --> 00:24:23,259
which you're going to define very specific things. What joint do I run? What selection do I run? Do I use

255
00:24:23,259 --> 00:24:28,299
an index? And so that's a physical stuff. Okay. So as you'll see, there are different styles of

256
00:24:28,299 --> 00:24:34,139
optimization and one style will start doing both together. But the main style which we'll start with

257
00:24:34,139 --> 00:24:38,539
is going to just work in logical space, find the best logical way to do it and then convert that into

258
00:24:38,539 --> 00:24:43,899
the physical plan. Okay. It's kind of simpler and it's how the whole optimization game started in the

259
00:24:43,899 --> 00:24:53,659
fear. So let's just dig into it. So we are in that optimization module, we have to enumerate as we

260
00:24:53,660 --> 00:25:00,060
enumerated a few plans for that very simple query. But what we also have to do is to do this

261
00:25:00,060 --> 00:25:05,740
search and apply some cost to it. Now this enumeration can be done by applying rules and I'll show you

262
00:25:05,740 --> 00:25:10,860
some rules soon. And just like saying, just apply the rules. If I've got a joint with B, I know

263
00:25:10,860 --> 00:25:15,500
that's the same as B joint with A. Joint's can compute that way. Just keep applying the rules because

264
00:25:15,500 --> 00:25:21,980
every time you apply a rule that is safe, you get a new plan. See if that is cheaper. Right? And

265
00:25:21,980 --> 00:25:27,420
the other one is I'm going to do something more intelligent and search for that type of combination

266
00:25:27,420 --> 00:25:32,860
but in a cost driven way. So in practical optimizers, they use a little bit of both. They're not

267
00:25:34,299 --> 00:25:39,740
orthogonal to each other. They can actually be combined with each other. Okay. So let's start to make

268
00:25:39,740 --> 00:25:44,700
it a little bit more practical as to what are rules based way of enumeration and cost-based ways.

269
00:25:44,700 --> 00:25:49,019
So we'll start with the rules based stuff. And you already saw three of those, the three most

270
00:25:49,019 --> 00:25:54,700
popular one in the example that you just saw. The first one is a predicate pushdown. And in this

271
00:25:54,700 --> 00:25:59,339
rule based method, you are simply going to apply the rule. You don't need to know anything about

272
00:25:59,339 --> 00:26:03,099
the data. You're just going to apply the rule. For the cost-based stuff, you're going to have to

273
00:26:03,099 --> 00:26:06,940
know about the data. You have to say, what does it cost and should I cost one way or the other?

274
00:26:06,940 --> 00:26:11,819
So rule based are just blind. Just by the structure of the tree, don't have to know how many records are

275
00:26:11,819 --> 00:26:17,579
where you could just apply that. Okay. The application may result in a worst plan or a better plan.

276
00:26:17,579 --> 00:26:21,899
That's not the consideration. It's just like how can I enumerate? Right. And then eventually,

277
00:26:21,899 --> 00:26:26,139
you may end up costing something. But just applying the rule based way to enumerate doesn't require you

278
00:26:26,139 --> 00:26:30,299
to know anything about the data. Here's a simple one. If I didn't tell you anything about how many

279
00:26:30,299 --> 00:26:36,619
records are in the two tables, M, and Department, and you see a selection, you can say, you know what?

280
00:26:36,619 --> 00:26:41,179
Regardless, I think selections are usually more selective than joints. It's probably a good idea,

281
00:26:41,179 --> 00:26:46,699
more often than not to push the selection down. And just a rule of thumb, I don't care about how many

282
00:26:46,700 --> 00:26:50,539
records there are. In general, this is going to be good. You can say, I could build an optimizer

283
00:26:50,539 --> 00:26:54,940
that does just apply some of these rules. And from what I understand, the bus stop optimizes

284
00:26:54,940 --> 00:26:58,779
basically rules based. And it's going to do simple rules like that. And it's simple to build.

285
00:26:58,779 --> 00:27:03,740
We'll get you a whole bunch of benefit form optimization, but doesn't require you to build a far

286
00:27:03,740 --> 00:27:10,220
more complex optimizer. It's often where you would stop. Okay. So really simple. Hopefully,

287
00:27:10,220 --> 00:27:14,860
you can see why in general, this is a good idea. Okay. So now, if you want to be the highest

288
00:27:14,859 --> 00:27:19,339
database employee, you have to start getting familiar with terms like this. See what I put

289
00:27:19,339 --> 00:27:25,259
down over there? That is a relational algebraic expression, which I know we've covered before,

290
00:27:25,899 --> 00:27:29,740
but that's the free representation of the algebraic representation. Right? So let's just walk

291
00:27:29,740 --> 00:27:37,579
through that and see what that looks like. Whoops. Come back, please. Okay. And so as you can see,

292
00:27:39,099 --> 00:27:44,379
I'll write both of them down. The first one over here is basically saying, look at the

293
00:27:45,740 --> 00:27:51,019
the first part over here, which is that join is essentially that department join with the employee

294
00:27:51,019 --> 00:27:56,939
in that inner bracket. Then that flows into the selection, which is up over there, and then flows

295
00:27:56,939 --> 00:28:02,299
into the projection. So the bracketing stuff basically gives you that representation in this

296
00:28:02,299 --> 00:28:07,019
mathematical form for what that tree looks like. And the papers when they talk about transformation,

297
00:28:07,019 --> 00:28:11,419
are just going to say this transforms into that. That's a predicate push down. As you can see,

298
00:28:11,420 --> 00:28:17,180
this is the rewrite of the predicate push down, where this selection moved inner before that joint

299
00:28:17,180 --> 00:28:22,220
happened. So just regular math expressions, same thing, but you've got to get that in your head

300
00:28:22,220 --> 00:28:27,019
if you want to play around with optimizers. Okay. And understand what they do. Not rocket science,

301
00:28:27,019 --> 00:28:31,500
but you just have to get comfortable with relational algebra. Okay. Questions?

302
00:28:33,980 --> 00:28:40,220
Okay. So the other simple one also we saw, Cartesian products are nearly always going to be a bad idea.

303
00:28:40,940 --> 00:28:45,180
They're often the one case where it's not a bad idea is if M and department would have one record,

304
00:28:45,740 --> 00:28:49,660
you're not going to do much better, might as well do a Cartesian product, right? And the case is

305
00:28:49,660 --> 00:28:54,299
like that, very rare, but nearly always it's going to be a bad idea. So this is just saying,

306
00:28:54,299 --> 00:28:59,500
hey, replace that with a join. And again, you can write that in relational algebra where you were

307
00:28:59,500 --> 00:29:04,940
doing in that inner bracketed term, the Cartesian product, and then you were applying the selection.

308
00:29:04,940 --> 00:29:08,940
You're saying, oh, I can just replace it with a natural join, which here is represented by the

309
00:29:08,940 --> 00:29:14,539
dumbbell operation saying it's on the DID. And the DID column is common in both. You could even omit that,

310
00:29:14,539 --> 00:29:19,420
and that just becomes the same syntax as we've seen in SQL as a natural join syntax. But now just

311
00:29:19,420 --> 00:29:25,500
written algebraically. Okay. Everyone getting comfortable with algebraic manipulation of

312
00:29:25,500 --> 00:29:37,340
freeze and logical plans? Questions? Yep. Yeah, great question. So again, these things are

313
00:29:37,339 --> 00:29:42,059
may not work. A predicate push down may not work, for example, if every department was a toy. So

314
00:29:42,059 --> 00:29:49,339
it's the same cost. Or if it turns out that the join was most selective, that the join between

315
00:29:49,339 --> 00:29:55,019
department and employee ended up having zero records because all the employees had nulls,

316
00:29:55,019 --> 00:29:59,419
or there no one was assigned to any department, then this selection would have been more

317
00:29:59,419 --> 00:30:04,619
more effective as throwing records away. And there's nothing else to do. So sometimes a join can be,

318
00:30:05,419 --> 00:30:09,979
can reduce data from flowing up more than a selection. So again, these are rules of thumbs,

319
00:30:09,979 --> 00:30:16,059
but based on what actual data sits in the tables, you might actually get one versus. So it's not guaranteed

320
00:30:16,059 --> 00:30:20,539
that this is always better. Both of these that you've looked at are nearly always going to be the

321
00:30:20,539 --> 00:30:28,299
better way to do it. Okay, but not always, not always. Here's a third one that also we have seen,

322
00:30:28,299 --> 00:30:33,339
which is a projection push down. I guess we didn't see this one. And I don't know why this is

323
00:30:33,419 --> 00:30:39,579
blanking out on me. All right, there we go. And this projection push down is effectively saying,

324
00:30:39,899 --> 00:30:45,259
I am carrying all the employee information all the way through this pipeline, all I needed from

325
00:30:45,259 --> 00:30:49,899
the employee table was the name and the department ID, right? I need the department ID for the join.

326
00:30:51,179 --> 00:30:57,019
Right, because that's the join key. Why do I carry the rest of the columns of this employee table,

327
00:30:57,019 --> 00:31:01,179
push that projection down. And as you can see, you're going to have less data flow across,

328
00:31:01,180 --> 00:31:08,620
all the costs will go down. Okay. And so a lot of these rule based stuff will be things like this.

329
00:31:08,620 --> 00:31:13,500
And I'm not going to read through all of this. I will assume now you can take a look at this. And

330
00:31:13,500 --> 00:31:18,460
this is not even all the rules. They're going to be like hundreds of rules like that. But let's take a

331
00:31:18,460 --> 00:31:23,980
look at one or two, which are going to be super important. So let's take a look at this one over here

332
00:31:23,980 --> 00:31:31,100
that basically is the joint commutativity. If I have our natural joint with S, I can flip those

333
00:31:31,099 --> 00:31:36,859
around. I get the same result, right? Logically, I get the same result. It's the same set of records

334
00:31:36,859 --> 00:31:40,699
that I get. So I can flip that around. Where would I flip that around? Because maybe that's better.

335
00:31:40,699 --> 00:31:48,779
As you remember in nested loops and sort merge and other algorithms, there's asymmetry in what is

336
00:31:48,779 --> 00:31:53,980
the inner versus outer and you can get that. Or it may be that I have an index and I can leverage the

337
00:31:53,980 --> 00:31:59,579
index on the on the one that is the inner relation and I want to flip that around. Okay, but it's a rule.

338
00:31:59,579 --> 00:32:04,619
I can flip it. These rules are apply this transformation. The query semantics remains the same. It is

339
00:32:04,619 --> 00:32:09,980
safe. Then figure out whether it's a good idea or not. Okay, in a pure rule based up, you'll apply it

340
00:32:09,980 --> 00:32:14,539
and assume it's a good idea. You'll have something saying, if I see I will always do selection push

341
00:32:14,539 --> 00:32:20,059
down and projection push down and remove Cartesian products. And that's my optimizer. And that's fine.

342
00:32:20,059 --> 00:32:25,980
You'll get a pretty decent optimizer with very little effort. Okay, let's look at the second one,

343
00:32:25,980 --> 00:32:31,259
which is the next one over here, which is called joint commutativity, which is saying our joint

344
00:32:31,259 --> 00:32:38,460
with s, joint with t. If I join s and t first, that's the bracket on the left side. I've got one plan,

345
00:32:38,460 --> 00:32:43,259
but I could also switch that around and join r and s first and then join with t. Why would I do

346
00:32:43,259 --> 00:32:48,620
that? Second one? Because maybe our joint with s produces very small records, maybe zero, maybe just

347
00:32:48,620 --> 00:32:54,299
one. And maybe s joint with t might produce a billion records. I would rather do the smaller stuff first

348
00:32:54,299 --> 00:32:58,379
because then I have less work to do. I'm not carrying all of this stuff across. Right?

349
00:32:59,980 --> 00:33:05,500
Okay, and this by the way, there are very nice symmetries for the joint properties with matrix

350
00:33:05,500 --> 00:33:11,579
multiplication because optimization, if you're a numeric optimization person, you see they also do

351
00:33:11,579 --> 00:33:15,419
similar types of things, but joints have, but we have a richer set of algebra and richer set of

352
00:33:15,419 --> 00:33:22,059
manipulation with relational algebra. Okay, so it's a more, it's a both fun, my biased view of an

353
00:33:22,059 --> 00:33:27,419
optimization problem. Okay, now let you look at this stuff. I don't want to memorize all of this

354
00:33:27,419 --> 00:33:30,940
stuff, but I do need you to know the three things that we talked about and the two things that are

355
00:33:30,940 --> 00:33:35,899
joints, their fair game, for example, if you're trying to worry about it from that perspective. Okay?

356
00:33:36,779 --> 00:33:41,259
I do need you to know what a rule based method does. Doesn't have to look at the data. I can just

357
00:33:41,259 --> 00:33:48,539
apply. It's a good way to build quick things in an optimizer. Okay? Now, as we've talked about,

358
00:33:48,539 --> 00:33:52,220
that's not going to be enough, but before I go into the cost-based optimization,

359
00:33:52,220 --> 00:33:55,980
let's just tie everything together that we've discussed so far, give you a minute to breathe

360
00:33:55,980 --> 00:34:01,339
before we go jump into even more hairy optimization techniques. What's the grand scheme?

361
00:34:02,139 --> 00:34:07,659
Application sends a query. That comes to a parser. That parser checks, you have a table in the

362
00:34:07,659 --> 00:34:12,779
from clause. Is that table actually exist in the catalogs or did you miss type it? Stuff like that.

363
00:34:13,740 --> 00:34:18,860
It's going to basically do all of that. Take that abstract syntax tree of the parser. The binder will

364
00:34:18,860 --> 00:34:24,460
go and check the catalogs to figure out. Is it meaningful? You are referring to column A in table R,

365
00:34:24,940 --> 00:34:28,700
but that doesn't exist. So all of that type of checking happens over there for it to say,

366
00:34:28,700 --> 00:34:34,380
okay, this query looks legitimate. I'm ready to let it go. And then it goes to the optimizer, where

367
00:34:35,260 --> 00:34:40,780
it's going to send across a logical plan. And that logical plan, the optimizer is going to go over

368
00:34:40,780 --> 00:34:46,620
the logical plan, enumerate different ways of rewriting that logical plan and figure out which is

369
00:34:46,620 --> 00:34:52,540
the best one. So the optimizer internally can use a heuristic based, rules-based method as you

370
00:34:52,540 --> 00:34:56,780
just talked about or cost-based stuff, which we're going to talk about next or a combination of both of

371
00:34:56,780 --> 00:35:03,019
those. Okay, so its job is to do that enumeration that search space that I mentioned and find the best

372
00:35:03,019 --> 00:35:09,260
way to do it with whatever time budget it has. And whatever stats it has at its disposal, at its

373
00:35:09,260 --> 00:35:16,700
disposal from the catalog. Okay, and then it will go and pull up more information about what algorithm,

374
00:35:16,700 --> 00:35:21,900
however implemented this algorithm, you know, what's my hash-joints implementation's cost, right? Those

375
00:35:21,900 --> 00:35:27,420
are equations that will depend on the implementation. Plug all of that in to get the costs that we have.

376
00:35:27,420 --> 00:35:31,420
And then eventually get a physical plan like the one that I showed you, the annotated

377
00:35:31,420 --> 00:35:36,940
relational algebraic rate, aka the physical plan. Now that can be sent to the scheduler where it can

378
00:35:36,940 --> 00:35:43,900
run stuff. Okay, so that's the scheme. We're going to go deeper into the optimizer. As we said,

379
00:35:43,900 --> 00:35:49,420
it can use a combination of these two methods. We just covered what the rule-based stuff looks like,

380
00:35:49,420 --> 00:35:54,460
right? Just enumerate rules and apply things based on best judgment perhaps. And now we are going

381
00:35:54,460 --> 00:35:59,179
to go into a cost-based search. Okay, this is the fun stuff. Yep.

382
00:36:05,740 --> 00:36:11,980
And that's a good point. Commitativity as a rule-based stuff, you would generally not apply,

383
00:36:11,980 --> 00:36:15,579
you would apply it in the cost-based scenario, right? So again, the rules might be there,

384
00:36:15,579 --> 00:36:18,940
how you use it, when you use it will depend on that. So that's a great point. The

385
00:36:18,940 --> 00:36:23,019
commitative associativity is at the heart of this cost-based search I'm going to talk about.

386
00:36:23,019 --> 00:36:26,780
So one reasonable way might be if I'm trying to build an optimizer in a hurry,

387
00:36:26,780 --> 00:36:31,019
I might say do selection push down, remove Cartesian products, projection push downs. I think

388
00:36:31,019 --> 00:36:34,780
everyone needs it. And now for the joint stuff, do what we are going to talk about in the cost-based

389
00:36:34,780 --> 00:36:39,340
stuff. So you saw how over there, for some part of it, it is rules-based, the other part is cost-based,

390
00:36:39,340 --> 00:36:45,500
and I can get a decent optimizer working. Okay? Good question. Other questions?

391
00:36:45,500 --> 00:36:50,460
Good question. Good question. Good question. Good question. Good question. Good question. Good question.

392
00:36:50,460 --> 00:36:57,420
Ask again. How do you use Cartesian products? Will the Cartesian, we just talked about that.

393
00:36:57,420 --> 00:37:00,300
There might be, so the question is, will the Cartesian product be better in some cases?

394
00:37:00,860 --> 00:37:06,460
Yeah, and we just talked about that, right? If both sides had one record and it's just going to

395
00:37:06,460 --> 00:37:09,980
join with each other, you know, that's the same as doing a nested loops, you don't have to set up all

396
00:37:09,980 --> 00:37:14,539
the machinery, might just do a Cartesian product. So there are some cases where Cartesian product is

397
00:37:14,539 --> 00:37:19,019
better, usually not, but there are definitely rare corner cases where Cartesian product is better.

398
00:37:20,219 --> 00:37:28,860
Yep. Okay. Great. Other questions? I think I should just not touch this. Something's very

399
00:37:28,860 --> 00:37:33,820
flaky today. Okay. Great. Just give me one second. Does this mean the recordings not done? I

400
00:37:33,820 --> 00:37:37,340
hate if I have to go record this measure all over again.

401
00:37:45,019 --> 00:37:53,739
Okay. Great. Everything looks to be in order. All right. So now we are going to go into the

402
00:37:53,739 --> 00:38:02,139
cost-based optimizer and then start digging deeper into time. All right. So we'll start with a very

403
00:38:02,139 --> 00:38:09,179
specific style of query optimization, which is based on something called the system R optimizer.

404
00:38:09,179 --> 00:38:16,219
It was one of the first database systems that was built in the whole field. And back in the day

405
00:38:16,219 --> 00:38:20,379
when God had come up with a relational model IBM first rejected it, but then they started to

406
00:38:20,379 --> 00:38:24,779
really dig into it. System R is the system that they built. I know we talked about that in the first

407
00:38:24,779 --> 00:38:32,219
class. And its optimization stuff is the bedrock for what most systems do even to this day.

408
00:38:32,779 --> 00:38:37,899
And as we'll see, it's got a very specific point of view. It is cost-based, right? So it'll do all

409
00:38:37,900 --> 00:38:45,019
of this join a sociativity and commutativity enumeration, but will cost it. And then as we will also see,

410
00:38:45,019 --> 00:38:49,260
it's a style called bottom up. And I'll contrast that with another style I'll introduce later,

411
00:38:49,260 --> 00:38:54,139
which is called top down. Okay. So technically it's a cost-based bottom up optimizer. If you want to

412
00:38:54,139 --> 00:38:59,980
sound smart, when you talk to optimizer people. Okay. And now it's going to do the following. It's

413
00:38:59,980 --> 00:39:04,460
going to start by saying, what are all the tables I have? For each table I'm going to find out,

414
00:39:04,460 --> 00:39:08,940
how do I access it to access through a file scan through an index scan? What is the cost? So figure

415
00:39:08,940 --> 00:39:14,139
out what is called the single relational access path first. And then keep combining them while the

416
00:39:14,139 --> 00:39:18,699
joins and using the associativity and commutativity properties. Okay. And then there are nested

417
00:39:18,699 --> 00:39:23,900
sub queries, which I'll talk about in a little bit. So ignore all of that for now. So and it'll try to

418
00:39:23,900 --> 00:39:28,059
choose the best plan. It's a cost-based stuff based on everything it has seen so far. So it'll try to

419
00:39:28,059 --> 00:39:32,539
prune things away so it can keep what it needs as it keeps building up. So it's a dynamic programming

420
00:39:32,539 --> 00:39:40,699
style method. And those of you who are into dynamic program will recognize that a choice of algorithmic

421
00:39:40,699 --> 00:39:47,259
style. So the first is we'll pick the best single relational access path. So if I've got a table

422
00:39:47,259 --> 00:39:53,099
like we had the department table and it had one way I can scan it as a file scan. It had a bunch

423
00:39:53,099 --> 00:39:56,619
of indices. I could scan it through each of the indices. I'll just say what does it cost doing each

424
00:39:56,619 --> 00:40:01,820
of those? And then I'll keep around the cheapest and system R will keep around not just the cheapest,

425
00:40:01,820 --> 00:40:07,019
but also something in which I get things in sorted order. But ignore that for now. So I'll basically try

426
00:40:07,019 --> 00:40:13,100
to find the best way to access each table or maybe a couple best ways. And then I'll say now if I

427
00:40:13,100 --> 00:40:17,900
access this through a file scan and this through an index and next stage I want to do a joint,

428
00:40:17,900 --> 00:40:22,220
what would that look like? So it's going to start building up in that way. And it'll use simple

429
00:40:22,220 --> 00:40:27,019
heuristics as we talked about for the cost model and we can see that in a little bit more detail.

430
00:40:27,980 --> 00:40:33,019
A little bit more setup and then we'll start looking at some animations is we'll take the query block

431
00:40:33,019 --> 00:40:38,300
and break it up into these logical operators. So all of that is saying we're going to manipulate

432
00:40:38,300 --> 00:40:45,259
in the logical space. And for once we get down to a logical operator like a join, then we will say,

433
00:40:45,259 --> 00:40:50,300
oh, I've got five implementations of join algorithms. Now I'm starting to make a physical decision

434
00:40:50,300 --> 00:40:54,780
for that operator saying what would nested loops cost me here? What would block nested loops cost

435
00:40:54,780 --> 00:40:59,180
me here? What would hash join, sort merge and so on would cost me there? Different flavors of

436
00:40:59,180 --> 00:41:05,100
hash join, for example. And so we will start making those physical decisions too as we intertwine

437
00:41:05,100 --> 00:41:12,940
between between these costs. System R, did you have a question? Okay. Just trying to stop the people

438
00:41:12,940 --> 00:41:18,540
from the back to look at this getting you, like you were raising your hand. All right, just stretching.

439
00:41:19,340 --> 00:41:26,539
It looks only at these plans called left deep trees. These left deep trees will have a shape that

440
00:41:26,539 --> 00:41:34,779
looks like this where all the joins sit along like a long line. And you can think of all of these as

441
00:41:34,779 --> 00:41:39,259
the inner relations. And so for example, you can imagine if you had built hash tables on all of that,

442
00:41:39,259 --> 00:41:44,619
you just take this record probe, probe, probe, and you're done. So if you have enough memory to build

443
00:41:44,619 --> 00:41:51,420
all the hash tables, this goes blazingly fast. And so it concentrates on that class of plans.

444
00:41:51,420 --> 00:41:56,699
It will not do what is called a bushy plan. A bushy plan is characterized by having a node

445
00:41:57,579 --> 00:42:03,019
in the logical plan like that in which both the inputs are also joints. So at some point it branches

446
00:42:03,019 --> 00:42:06,859
off and the branches, both branches are a joint. That's the definition of a bushy plan.

447
00:42:07,900 --> 00:42:13,179
Okay. So even if one of the nodes in your plan has that, then it's a bushy plan. So it doesn't look

448
00:42:13,179 --> 00:42:20,139
at that. But that is that later on turned out like there are many times where bushy plan is the

449
00:42:20,139 --> 00:42:24,940
better way to optimize. So it's going to miss out on that. Where if you go back to that diagram I

450
00:42:24,940 --> 00:42:28,940
had with the cloud, it's going to miss out on a whole bunch of plans that are outside that space. So

451
00:42:28,940 --> 00:42:35,099
it's chosen to say I'm going to look, it's taken a specific point of view and said I'm going to look

452
00:42:35,099 --> 00:42:41,019
at the face of these lefty plans. It actually looks at something a little bit general called linear

453
00:42:41,019 --> 00:42:46,219
plans, but ignore that. I'm not going to look at stuff here which is bushy plans and also doesn't

454
00:42:46,219 --> 00:42:50,699
look at Cartesian plans which are in this space. It deliberately says I will not spend time looking

455
00:42:50,699 --> 00:42:58,219
there. Okay. It's a very specific example of how it makes its perspective. How it chooses where it's

456
00:42:58,219 --> 00:43:05,579
going to look for a plans. All right. So and this was done by Pat Sylencher, really famous,

457
00:43:06,219 --> 00:43:11,659
any member and was quite the breakthrough in query optimization when this paper came out in 79.

458
00:43:13,340 --> 00:43:19,259
So how does it work? We'll take a slightly more complex query. I stole that from Andy's slide

459
00:43:19,259 --> 00:43:26,059
last year. He had some amazing animations which was awesome. And we are going to choose as we said

460
00:43:26,059 --> 00:43:31,579
first step the best single relational access plan. So we'll say here are three relations. In this case

461
00:43:31,579 --> 00:43:38,219
it's doing a join between artists where they appear the album and then only selecting album names

462
00:43:38,219 --> 00:43:43,420
which are which is like Andy's OG remix. And so I'm going to enumerate different ways of accessing

463
00:43:43,420 --> 00:43:49,659
each of those sequential scans index lookups stuff like that based on what the schema tells me

464
00:43:49,659 --> 00:43:58,460
choose the best plan and then start to dig into the join order stuff. Okay. So I've now finished

465
00:43:59,420 --> 00:44:04,059
I know how to access each table by itself. I'm going to now say what are different ways to join

466
00:44:04,059 --> 00:44:10,059
and I'll start enumerating that. I could do artists, peers and albums or I could do appears albums.

467
00:44:10,059 --> 00:44:13,340
I can enumerate all of that and as you can see this is going to be exponential in the number of

468
00:44:13,340 --> 00:44:18,460
joins right. That's where the complexity comes from. I'm going to choose to do some things. I made

469
00:44:18,460 --> 00:44:23,340
a site. I don't want to look at condition products. So those are choices that I will make as I go about

470
00:44:24,300 --> 00:44:31,420
writing this optimizer. So in this as we then start to say I'm going to look at these specific

471
00:44:31,420 --> 00:44:35,740
types of join ordering and now start doing the costing. So let's go and dig into that. So here's

472
00:44:35,740 --> 00:44:39,500
what's going to happen. Yep question. Question about the creation. Yes. Yes.

473
00:44:39,500 --> 00:44:45,660
After doing one relationship to a relationship. Yes. And the slide will basically do that. Yep.

474
00:44:45,660 --> 00:44:50,059
They're just saying these are the possible. This is the universe of stuff that I have to look at.

475
00:44:50,059 --> 00:44:55,659
But I look at even that in a very systematic way. So here's how we will look at. So I will say I

476
00:44:55,659 --> 00:44:59,659
eventually need to end up with a logical plan that is equivalent to what is shown on the top.

477
00:45:00,299 --> 00:45:03,739
Right. That's not a physical plan on the top. I need to join all these three tables with each

478
00:45:03,739 --> 00:45:09,420
other. Right. That's basically what this tells us. To start with I've got tables. Artist albums and

479
00:45:11,019 --> 00:45:16,539
appears I have to start assembling this thing together. Okay. So now pay attention. So now here the real

480
00:45:16,539 --> 00:45:22,940
dynamic programming magic comes in. First, I will start my enumeration. By the way, before this,

481
00:45:22,940 --> 00:45:27,179
I've already decided, appears should be done with a file scan. Maybe this with an index stuff

482
00:45:27,179 --> 00:45:32,219
like that. Like that decision I made in the first step. Single relational access path optimization.

483
00:45:32,779 --> 00:45:38,699
Okay. Then I'm going to say, oh, what are the different ways I could do that? And not everything is

484
00:45:38,699 --> 00:45:44,059
listed here, right, to keep this like compact. I can choose what it wants to do. But it's going to do

485
00:45:44,059 --> 00:45:49,420
things like, oh, I'm going to join a one and a three first and third. And I could use a hash

486
00:45:49,420 --> 00:45:55,019
join or a sort more join and can just start enumerating all of these different combinations.

487
00:45:55,019 --> 00:45:59,019
As you can see what's at play over here is I'm playing around with the associativity and

488
00:45:59,019 --> 00:46:03,579
commutativity. If you think of the top line as being the relational algebra, I'm saying which one

489
00:46:03,579 --> 00:46:11,659
do I put brackets around first? Okay. And then I'm going to say, all right, if I do that, the first two

490
00:46:11,659 --> 00:46:16,379
are basically doing a join between artists and appears first. The second two are basically doing

491
00:46:16,379 --> 00:46:19,819
album and appears first and so on. And a lot more combinations I haven't shown here.

492
00:46:21,259 --> 00:46:27,420
Okay. But for each one of that like this year, this was, both of these will give me that part

493
00:46:27,420 --> 00:46:32,299
of the join is done, right? And here if I'd more than two join algorithms, that list would grow.

494
00:46:32,299 --> 00:46:39,420
So you can see there's a lot of space to explore here, right? And now I will start to do putting

495
00:46:39,420 --> 00:46:44,940
all of that together and say, I can look at this from a cost-based perspective. And just for

496
00:46:44,940 --> 00:46:49,820
each of these individual ones, I'll just look at this part. If I want to get to here, I've got these

497
00:46:49,820 --> 00:46:55,420
two choices. Which one is cheaper? There's no reason to carry the more expensive one forward because

498
00:46:55,420 --> 00:46:59,659
dynamic programming, it's going to build on itself. There's no point in carrying the more expensive

499
00:46:59,659 --> 00:47:04,780
part forward. So start pruning now, right? So you can see how it is starting to prune. So if you just

500
00:47:04,780 --> 00:47:10,060
keep that around, isn't that beautiful? Right? So now it's got this little compact dynamic programming

501
00:47:10,060 --> 00:47:14,700
table. It says, those two are better done with hash join. This one better with a sort more join.

502
00:47:14,700 --> 00:47:20,300
And now as you can see, I'll just recourse through it and get the rest of it done. Okay? So just to

503
00:47:20,300 --> 00:47:27,420
complete the picture, I will then say, let's chase, chase this back down. This says, I do a 3, a 2,

504
00:47:27,420 --> 00:47:33,100
which I did before. Now I'll add in a 1. That's the permutation that I picked there. Again, I could

505
00:47:33,099 --> 00:47:38,059
do through two algorithms. If those are the only two I have, I can find the cost. At this point,

506
00:47:38,059 --> 00:47:43,579
I've reached the equivalent logical space I needed to be at the top. That logical stuff is just a

507
00:47:43,579 --> 00:47:50,219
logical stuff. And I will go and start pruning. Look at everything that makes sense at that second

508
00:47:50,219 --> 00:47:56,139
step. And now I've got full plans. I've got three full plans that I've survived. Then I just go find

509
00:47:56,139 --> 00:48:04,139
the best one. And I'm done. Okay? Did that make sense? And this is a straight up dynamic programming

510
00:48:04,139 --> 00:48:09,339
technique cast in this way. And that's where this paper was so beautiful. Before that, it was like,

511
00:48:09,339 --> 00:48:15,179
how are you going to optimize these queries? But it was a really beautiful algorithm. Okay? If you

512
00:48:15,179 --> 00:48:22,460
love algorithms, this probably like gets you excited. All right. So now we've got that. And the one

513
00:48:22,460 --> 00:48:28,539
part we didn't do as you might have noticed is that there's an order by clause in that query.

514
00:48:29,500 --> 00:48:36,460
Okay? What we did here was to just get the logical way. We said that's the logical target.

515
00:48:36,460 --> 00:48:42,460
That's the goal. We start from just atomic parts. We reach there. But we didn't do the order by.

516
00:48:42,460 --> 00:48:47,179
And so what system are we do? It didn't have a systematic way of dealing with the physical property

517
00:48:47,179 --> 00:48:51,820
of ordering as it was building stuff. As you'll see, the top down thing that came later,

518
00:48:51,820 --> 00:48:57,980
inbuilt that into the optimization process. And so it would then go through that and then go and

519
00:48:57,980 --> 00:49:02,780
decide, I have to do an order by which it would defer to the very end. And so he's the best plan.

520
00:49:02,780 --> 00:49:07,340
How do I put the order by and try to adjust it, but not really look for an optimal plan with the

521
00:49:07,340 --> 00:49:12,220
order by in the first place or, you know, in the worst case, it would put a start at the end of it.

522
00:49:12,220 --> 00:49:17,900
So it was not that property of ordering was left out. And that was improved by good scruffy as

523
00:49:17,900 --> 00:49:23,660
you look at the top down stuff in a second. Okay. And I seem to have misplaced my phone. Okay, good.

524
00:49:23,660 --> 00:49:30,940
We have a bit of time. All right. So that is the bottom up approach. As you can see, the name is

525
00:49:30,940 --> 00:49:36,940
because I'm building the tree pieces at a time going bottom up till I produce the final back. Right?

526
00:49:38,300 --> 00:49:45,019
In contrast to that is the top down approach. And the top the bottom up approach by the way is what

527
00:49:45,019 --> 00:49:49,659
all the old systems use that was a breakthrough and query optimization. So all the database systems

528
00:49:49,659 --> 00:49:55,659
listed here use that it's also relatively simple to implement. Not simple as a rule-based stuff.

529
00:49:55,659 --> 00:50:00,699
Definitely be more complicated. But it takes a little bit lot more machinery to do the top down stuff.

530
00:50:01,420 --> 00:50:02,619
What's the top down stuff? Yep.

531
00:50:02,619 --> 00:50:10,219
What's the bottom? It's the bottom. It's the bottom.

532
00:50:10,219 --> 00:50:19,179
Yeah. I would not say that is intrinsically a property of that. It's you could engineer a bottom

533
00:50:19,179 --> 00:50:23,339
up stuff in which you try to consider that upfront and they change the enumeration stuff. But that's

534
00:50:23,339 --> 00:50:28,380
kind of what was done there. So but I don't know if anyone really does that that very systematically.

535
00:50:28,380 --> 00:50:33,260
There is I'm digressing but in the system are paper there was this notion of interesting orders

536
00:50:33,260 --> 00:50:39,260
and they would keep track of sorting till for some of these things like if I get plan A versus plan B

537
00:50:39,260 --> 00:50:44,780
at a medium at the second level. If this one is sorted by something that needs to be joined later,

538
00:50:44,780 --> 00:50:49,099
I could benefit from that. So did it keep some sorting information but only for the purpose of

539
00:50:49,099 --> 00:50:54,539
join but not for explicit property that gets used for other stuff? I know it's a technical detail but

540
00:50:54,619 --> 00:50:59,579
can you change that? It doesn't seem like it would it would be impossible to do that. It's

541
00:50:59,579 --> 00:51:03,900
but not easy either. You'd have to make some some changes. It's not incompatible.

542
00:51:05,739 --> 00:51:13,019
So top down was invented by Gutskrafe when he was an assistant professor with this

543
00:51:13,019 --> 00:51:17,340
student build mechanic as part of the volcano project which we've seen the iterator model came

544
00:51:17,340 --> 00:51:22,539
from their exchange stuff came from there. So obviously huge work huge contribution that he's

545
00:51:22,539 --> 00:51:30,139
made to the field. The realization was that really there are two types of rules you apply.

546
00:51:30,139 --> 00:51:35,340
The logical rules like saying selection push down then there are physical rules that are related

547
00:51:35,340 --> 00:51:40,460
to applying the algorithms or thinking about sought properties and you could write all of those

548
00:51:40,460 --> 00:51:44,300
as transformation rules some are the logical space manipulation some in the physical space

549
00:51:44,300 --> 00:51:49,900
manipulation and then what you do in the top down approach is you start with a plan some plan

550
00:51:49,900 --> 00:51:54,300
that is correct and then start to say what adjustments can I make where applying the rules and they

551
00:51:54,300 --> 00:51:58,780
could be a mix off I could apply at one point a logical rule and change a join order or I could

552
00:51:58,780 --> 00:52:03,180
apply a physical rule and change the algorithm and I can play around with all of that stuff. So it's

553
00:52:03,180 --> 00:52:07,260
like don't need to do logical planning first then physical in the bottom of fashion start with

554
00:52:07,260 --> 00:52:11,660
something that makes sense and you can control things a lot better. So you know there's still a

555
00:52:11,660 --> 00:52:16,619
debate in the community but top down is probably a better way to do because you get a lot more control

556
00:52:16,619 --> 00:52:21,019
over that so it's space and you can be more specific because you can interlead physical and logical

557
00:52:21,019 --> 00:52:27,819
plan manipulation. So how does that work? In the top down optimization you're going to do as I

558
00:52:27,819 --> 00:52:33,339
said you'll apply two different types of rules logical to logical or logical to physical that

559
00:52:33,980 --> 00:52:39,019
join AB versus join B is just basically I'm commuting the join logical to physical is saying if

560
00:52:39,019 --> 00:52:44,699
I've got a join oh I could try a hash join and see if it is cheaper right so it can do those and

561
00:52:44,699 --> 00:52:50,859
so it's basically in some sense now it's rules based but it's going to cost each of those but the

562
00:52:50,859 --> 00:52:56,139
rules are of two types logical logical to logical transformation or logical to physical transformation.

563
00:52:58,139 --> 00:53:02,779
Does that make sense? Let me show you an example and maybe it'll make more sense. So we'll start with

564
00:53:02,779 --> 00:53:07,579
the same query we had before and at this time we'll say we have topped out right so we're going to

565
00:53:07,579 --> 00:53:12,939
start and say I have this plan I'm going to do an equi join between all those and an order by

566
00:53:13,500 --> 00:53:18,380
that's what I have and let's start by seeing what else we can do with it. So it's going to start by

567
00:53:18,380 --> 00:53:24,700
exploring from there and apply a logical to physical plan rule and say hey you know what first two

568
00:53:24,700 --> 00:53:30,940
let's go join that using a sort mode join okay I'm because that plan above is still logical I don't

569
00:53:30,940 --> 00:53:35,820
have the physical plan but has all the properties I need with it saying three relations need to be

570
00:53:35,820 --> 00:53:42,220
joined that's what the top thing says and output needs to come ordered by artist ID. So the three

571
00:53:42,219 --> 00:53:47,739
relations needs to join as a logical property it needs to be sorted by artist ID is a physical property

572
00:53:47,739 --> 00:53:53,500
of the output right so these nodes these there's now this notion of logical properties and physical

573
00:53:53,500 --> 00:53:59,179
properties okay now I say I'm going to change the physical property by applying a sort mode join

574
00:53:59,179 --> 00:54:04,859
to the tree at hand okay and that's what it is so now it's starting with something and then making

575
00:54:04,859 --> 00:54:10,219
it more real and exploring in the opposite direction does that make sense like we didn't start with

576
00:54:10,219 --> 00:54:13,980
single relation access plan and build this dynamic program you say we'll start with something

577
00:54:13,980 --> 00:54:19,579
that makes sense and let's let refine it right so you can uh and that refining will be like how much

578
00:54:19,579 --> 00:54:23,899
portion of the search space I want to search so here it will do that sort mode join and say okay

579
00:54:23,899 --> 00:54:28,059
now how do I do the sort mode join because I have these three stuff look at every point in time

580
00:54:28,059 --> 00:54:32,379
is keeping a complete plan at hand right so let's say to do the sort mode join I can take that and

581
00:54:32,379 --> 00:54:38,619
I can take that that's a correct plan right so it has a correct plan right now for what how it

582
00:54:38,619 --> 00:54:43,980
could go produce that okay and then you'll say okay what else can I do can I make this node better

583
00:54:45,179 --> 00:54:50,779
right can I make it can I give more detailed story it's logical can I make it more physical yep

584
00:54:50,779 --> 00:54:55,900
I can put a hash join I can look at other stuff I needed to I could prune stuff out if I didn't need to

585
00:54:55,900 --> 00:54:59,900
I'll complete that hash join and say oh yeah yeah I need to go take these two because this one's

586
00:54:59,900 --> 00:55:04,859
taken right that's my tree I'm just refining it I'm making it real now I've got a real plan

587
00:55:04,860 --> 00:55:11,019
for this tree for this one that I can apply other transformations to this and say okay at this

588
00:55:11,019 --> 00:55:15,099
point I could have done something else I could have done a sort mode join and that would have

589
00:55:15,099 --> 00:55:21,420
looked like that okay and now have two different things that are complete I could go and say

590
00:55:22,780 --> 00:55:27,820
let's go and keep doing this stuff keep exploring at some point you might say you know this

591
00:55:27,820 --> 00:55:32,220
thing is more expensive and I can go prune that out so it's just a totally different style you're

592
00:55:32,219 --> 00:55:37,099
going to start from the top and you can do other things but you can start to play around with all

593
00:55:37,099 --> 00:55:41,899
kinds of interesting things that might say you know if I expect this to be small then don't apply

594
00:55:41,899 --> 00:55:47,259
don't only look for hash joins don't look for salt merge you can be more local in terms of making

595
00:55:47,259 --> 00:55:52,859
the choices about how you apply these plans furthermore it's a very elegant system that everything

596
00:55:52,859 --> 00:55:57,019
is a rule that you're applying as a transformation but your physical and logical stuff it kind of

597
00:55:57,019 --> 00:56:03,659
works in the same framework okay it's not like I do the logical optimization first and the physical

598
00:56:03,659 --> 00:56:08,780
it's like not a two-step you can interview and blend all of that stuff and start to make other

599
00:56:08,780 --> 00:56:14,059
decisions with it and it just continues I could have gone and said oh I need to stick a quick

600
00:56:14,059 --> 00:56:19,340
sort because I need an order buy over there but because the other in this case maybe the plan

601
00:56:19,340 --> 00:56:23,579
was coming out salt merge by joins so it was naturally getting ordered by artist ID but if it

602
00:56:23,579 --> 00:56:27,819
doesn't then I could put an explicit sort method and then oh that is too expensive and I

603
00:56:27,819 --> 00:56:32,380
so on I can prove stuff same thing you're gonna cost up when things get physical and proven stuff out

604
00:56:32,380 --> 00:56:38,219
but you're just starting with a with something that works and then refining it okay and the nice part

605
00:56:38,219 --> 00:56:42,860
about the top down is you can also very easily at you know you'll very quickly have a correct plan

606
00:56:42,860 --> 00:56:47,900
and you can say oh this used to cost three million very quickly I went to two million very quickly

607
00:56:47,900 --> 00:56:54,700
I went to a thousand and now and that took me like 10 milliseconds to do now the last 100 milliseconds

608
00:56:54,700 --> 00:56:59,579
I've only improved the plan by 10% stop I can go with what I want you get choices like that a far

609
00:56:59,579 --> 00:57:06,619
more easily in the top down approach okay because you kind of see everything in front of you you start

610
00:57:06,619 --> 00:57:11,740
with something complete and keep making it more complete right so that helps you do have to do

611
00:57:12,860 --> 00:57:17,019
exponential 10-way dynamic programming type of a style it'll take you a long time to get to something

612
00:57:17,019 --> 00:57:22,860
complete right so you can start to get something out there really quick all right you have a bunch of

613
00:57:22,860 --> 00:57:30,219
stuff to cover on the other details that matter so hopefully that was the core of the optimization

614
00:57:31,099 --> 00:57:36,780
and that code works if I told you the query is a single block query a select project select from

615
00:57:36,780 --> 00:57:41,820
where and that's it but as you already know you have CTEs and you have nested sub queries that you

616
00:57:41,820 --> 00:57:48,860
can write in life is a lot more complicated it is very common for a database system to be

617
00:57:48,860 --> 00:57:53,260
presented with queries that might be deeply nested might at 10 20 levels of nesting as sub blocks

618
00:57:53,900 --> 00:57:59,340
okay and you can nest in all kinds of places in SQL so what do you do with these nested queries

619
00:57:59,980 --> 00:58:06,539
so the goal is we know how to do single block optimization right if I can take that query and I can

620
00:58:06,539 --> 00:58:10,620
read write a nested query into a single block everything you told you before you can apply to it and

621
00:58:10,619 --> 00:58:17,579
that works beautifully okay if you can't do that then what you could do is to run each block at a

622
00:58:17,579 --> 00:58:23,019
time and then build up run the innermost block then the next one and so on so you have a way to do

623
00:58:23,019 --> 00:58:29,500
it but can we do better and the the way we can do better is by basically rewriting the queries

624
00:58:29,500 --> 00:58:34,380
whenever possible to make it a single block query because now you'll be able to optimize it globally

625
00:58:35,019 --> 00:58:39,579
okay so it's so optimizing each block which doesn't have any information and running it

626
00:58:39,579 --> 00:58:44,139
try to flatten it out and get a bigger block because now you give the optimizer a global view

627
00:58:44,139 --> 00:58:51,019
of what to optimize does that make sense so here for example is a query in which we are looking at

628
00:58:51,019 --> 00:58:55,579
sailors there's a nested block here that's looking at the reservation sailors have made you can see

629
00:58:55,579 --> 00:59:00,699
the web cross there's a join and it's looking for all reservations made by sailors on a certain day

630
00:59:01,259 --> 00:59:08,940
now that is the same as rewriting that query into a single block as that now the SQL programmer could

631
00:59:08,940 --> 00:59:13,340
have written this one which you might argue but often queries are generated queries are ready

632
00:59:13,340 --> 00:59:17,900
written by humans they're generated by tools and tools love to generate nested queries because that's

633
00:59:17,900 --> 00:59:23,019
the abstraction on which they are built okay regardless for us as a database engine we have to be ready

634
00:59:23,019 --> 00:59:28,220
with deeply nested queries and there'll be techniques like this to go flatten stuff out often they

635
00:59:28,220 --> 00:59:31,820
are done through a rules based components you can see there's a little bit of that this rules are

636
00:59:31,820 --> 00:59:37,740
everywhere you can often this rewriting and flattening is done through a rules infrastructure okay find

637
00:59:37,739 --> 00:59:43,899
this pattern this pattern is safe if you rewrite it in this way okay and it's not always possible

638
00:59:43,899 --> 00:59:49,579
to flatten and we won't go into the details here but take the advanced graduate class and we'll do

639
00:59:49,579 --> 00:59:55,739
that if it's you if for queries that are harder there's always a way out and that always a way out

640
00:59:55,739 --> 01:00:00,539
is to just run each block at a time and get your answer but sometimes you can also do these things

641
01:00:00,539 --> 01:00:05,819
called decomposing queries so I'll give you an example here which is again a bunch of some

642
01:00:05,820 --> 01:00:11,019
happening with sailors and their reservations and boats but in over here is a predicate that says

643
01:00:11,019 --> 01:00:15,260
select only those sailors whether rating is equal to the maximum rating of all sailors so it's

644
01:00:15,260 --> 01:00:22,140
trying to find the highest rated sailors okay but that inner query that select max s2 rating

645
01:00:22,140 --> 01:00:28,620
that's effectively a constant for the rest of the block for the outer block so you could decompose

646
01:00:28,620 --> 01:00:34,780
this query and say hey this nested block I could run that once and whatever value I get just plug

647
01:00:34,780 --> 01:00:41,500
that value in here right and you can flatten it you can decompose it in that way and some systems

648
01:00:41,500 --> 01:00:48,220
will actually run that get the answer stick it into this then run that so it'll optimize that

649
01:00:48,940 --> 01:00:53,260
first query the max rating it's simple here but you can imagine sometimes it's a more complex query

650
01:00:54,060 --> 01:00:58,860
and then go flatten out the difference between this query and the other one was in this query it is

651
01:00:58,860 --> 01:01:08,220
a co related query where this inner query that you have has it refers to if you look at this table

652
01:01:08,220 --> 01:01:14,700
over here sailors the sailors ID field is showing up in that inner query block these are called co related

653
01:01:14,700 --> 01:01:22,940
queries okay so co related queries tend to be flattenable a fair amount and this was not a

654
01:01:22,940 --> 01:01:27,099
correlated query that inner block has nothing to do with no join key or any such thing with the

655
01:01:27,099 --> 01:01:31,819
outer stuff they are very amenable to doing this decomposition you can just pull it out it feels

656
01:01:31,819 --> 01:01:37,099
like a constant and it is a constant for the rest of the query right so you'll do techniques like this

657
01:01:37,099 --> 01:01:43,659
before you go and start throwing things to the query optimizer other things that you will do before

658
01:01:43,659 --> 01:01:48,380
you present stuff to the query optimizer and sometimes this expression reading is also what the

659
01:01:48,380 --> 01:01:53,739
query optimizer does so it gets confusing as to where the boundary between the parser is and the

660
01:01:53,739 --> 01:01:58,619
optimizer is and the execution engineers right those boundaries are artificial and in fact there's

661
01:01:58,619 --> 01:02:03,019
a nice paper that talks about this artificial boundary causes a lot of trouble and again particularly

662
01:02:03,019 --> 01:02:09,099
advanced database class we'll cover that type of material expressions are everywhere and sometimes

663
01:02:09,099 --> 01:02:13,659
you will get queries that look like this so before you even go and optimize the query and stuff

664
01:02:13,659 --> 01:02:18,219
like that and this may be piece of a query right maybe in a block of a query somewhere where someone

665
01:02:18,219 --> 01:02:22,219
writes where one is equal to zero and you might say why would a user write that they probably wouldn't

666
01:02:22,219 --> 01:02:26,619
write that but the tool would definitely generate stuff like this all the time right and sometimes

667
01:02:26,619 --> 01:02:30,219
users do make mistakes and they'll write stuff like that so you might you might see all kinds of

668
01:02:30,219 --> 01:02:34,619
crazy stuff if you've been long around and well with the database that's been around for a while

669
01:02:34,619 --> 01:02:38,779
and you could rewrite this stuff to say you know this is really the same as where is equal to false I can

670
01:02:39,579 --> 01:02:45,179
take that expression and just convert it into a simpler truth function because that makes everything

671
01:02:45,179 --> 01:02:50,939
easier okay in this case it's going to return nothing right and same thing you'll see functions like

672
01:02:50,940 --> 01:02:55,900
now is equal to now is null that can also be made into that and some systems when you have

673
01:02:55,900 --> 01:03:00,460
functions like now and random won't do that false and actually go evaluate the query and come up with

674
01:03:00,460 --> 01:03:05,500
the answer because these sometimes don't know what's the property of random or null you know and

675
01:03:05,500 --> 01:03:10,220
many database systems also allow users to register external functions so you can't make assumptions

676
01:03:10,220 --> 01:03:14,860
so databases will take different approaches to doing that the main point is if you have expressions

677
01:03:14,860 --> 01:03:19,420
you can go and rewrite that before you send everything to the optimizer because you can just

678
01:03:19,420 --> 01:03:23,900
simplify that these are just in the math stuff you can do systematic stuff you can do that are safe

679
01:03:23,900 --> 01:03:31,740
to do that here's a between a predicate where it's a or so between one and 100 or between 50 and 100

680
01:03:31,740 --> 01:03:37,260
it's the same as rewriting that to do that so simplify the query using safe methods to these

681
01:03:37,260 --> 01:03:42,940
different rewrites flattening out the methods before you get stuff to the optimizer okay that's

682
01:03:42,940 --> 01:03:46,700
usually a good way to do it questions

683
01:03:49,420 --> 01:03:55,980
okay all right now there's a question of how do we calculate the cost of these plans right we

684
01:03:55,980 --> 01:03:59,420
talked about oh we'll produce these plans whether it's bottom up or top down at some point you have

685
01:03:59,420 --> 01:04:04,619
to say what does this cost do a prune prune this plan or do I keep keep it around and so that's where

686
01:04:04,619 --> 01:04:09,900
the assumptions of these cost models come in and essentially it's like hey what's the size of the

687
01:04:09,900 --> 01:04:14,220
output of the joint I need to know that to figure out what of output of that selection because I

688
01:04:14,220 --> 01:04:18,059
need to know that to figure out what's that joint going to cost should I be using a sort merge versus

689
01:04:18,539 --> 01:04:22,940
nested loop should I be commuting that joint I need to know these numbers before I can make any of

690
01:04:22,940 --> 01:04:30,299
those choices so need a cost model and the cost estimations done in a variety of different ways and

691
01:04:30,299 --> 01:04:36,460
it will be a combination of using some internal cost model that allows us to compare one plan versus

692
01:04:36,460 --> 01:04:40,779
the other right you already saw this in action with the example that we started in the class so

693
01:04:40,779 --> 01:04:45,420
let's just dig into that they're usually going to be two components to the cost model what is going to

694
01:04:45,420 --> 01:04:50,860
be say I mean what are my units that I'm pricing out so the units might be how many CPU cycles and

695
01:04:50,860 --> 01:04:55,420
I'm going to consume how many IOs we are going to consume in the example we talked about that I

696
01:04:55,420 --> 01:05:00,300
showed earlier it was just IO cost but sometimes the CPU cost can be significant and that might change

697
01:05:00,300 --> 01:05:05,500
so you really want to have a proper cost models and when you have CPU and IO cost you might also

698
01:05:05,500 --> 01:05:10,539
need to basically then say you know how many cycles of CPU can I trade off for an IO cost so you

699
01:05:10,539 --> 01:05:15,340
going to need some constants and often those are guesses that are input into the optimizer these

700
01:05:15,340 --> 01:05:21,259
cost models are really hard to get right but we need something that is reasonable okay then there

701
01:05:21,259 --> 01:05:26,219
are these logical costs that will depend upon the size of the output size of the operators and the

702
01:05:26,219 --> 01:05:30,940
algorithms that we have chosen so ultimately we have to combine all of that stuff to come up with

703
01:05:30,940 --> 01:05:36,940
something that looks real with all the complexity that happens in database system into CPUs IO

704
01:05:36,940 --> 01:05:41,579
activity network activity and stuff like that but you still need to say which one is better because

705
01:05:41,579 --> 01:05:46,780
you have all kinds of trade-offs that are getting made so most systems will use a combination of

706
01:05:47,340 --> 01:05:53,019
CPU and IO cost they will at least do those two and then they will have to pick some default

707
01:05:53,019 --> 01:05:57,659
stuff like saying in post-test it will be processing the tuple in memory is 400 times faster than

708
01:05:57,659 --> 01:06:01,980
reading a tuple from disk because you have to come up with a common unit across all of these

709
01:06:01,980 --> 01:06:07,260
different factors so these are going to be additional assumptions that we make to get something real

710
01:06:07,260 --> 01:06:14,699
so we can compare two plans and say which one is cheaper okay and so you'll see if you look at the

711
01:06:14,699 --> 01:06:19,500
manual of Postgres which is very nice because it's open they'll have stuff like this look we don't

712
01:06:19,500 --> 01:06:23,179
know what we are doing but this is the best we can do and pretty much every database system is going

713
01:06:23,179 --> 01:06:29,019
to have that is a famous thing at SQL server where the cost model for those constants like 400

714
01:06:29,019 --> 01:06:35,340
was based upon a desktop on which some benchmarks were run that are sitting below one of the original

715
01:06:35,340 --> 01:06:41,340
creators of SQL server for the longest time the constants were chosen based on on this machine

716
01:06:41,340 --> 01:06:47,579
how many IO how many cycles can I run how many CPU operations can I do in one IO but crazy things

717
01:06:47,579 --> 01:06:52,460
like that happen okay and of course they fixed it systems like DB2 and other advanced systems when

718
01:06:52,460 --> 01:06:56,619
you install the system they will run a few micro benchmarks to come up with those constants and

719
01:06:56,619 --> 01:07:01,179
use that because that changes from machine to machine but those things are important to get things

720
01:07:01,179 --> 01:07:06,859
right we also had statistics such as number of records and stuff like that in the tables that we looked

721
01:07:06,859 --> 01:07:12,699
at who creates that database systems have special commands like analyze and they will go and scan

722
01:07:12,699 --> 01:07:18,059
the entire table to go produce that stats which goes into the catalog okay and you can run that

723
01:07:18,059 --> 01:07:23,500
periodically you can run it as a cron job so it's not uncommon to say I'm going to run it every week

724
01:07:23,500 --> 01:07:27,739
and as we start about transactions these things that scan all of that for doing things like analyze

725
01:07:27,739 --> 01:07:33,420
will be run at the lowest isolation level right so it's okay if they see slightly in the corrupt data

726
01:07:33,420 --> 01:07:37,500
we just want to get decent guesses for how many records are there we do or to be offered orders of

727
01:07:37,500 --> 01:07:46,460
magnitude okay then we also have to do interesting things like saying okay I see a predicate this is

728
01:07:46,460 --> 01:07:51,900
called the selection cardinality I have to estimate the cardinality of a select operator so I've got

729
01:07:51,900 --> 01:07:57,579
a predicate here that says age is equal to nine how do I know how many records will pass that

730
01:07:57,579 --> 01:08:03,420
predicate because I need that for the rest of the planning right and so you start making assumptions so

731
01:08:04,780 --> 01:08:10,780
this is not real but imagine you were able to store there are 16 different 15 different values

732
01:08:10,780 --> 01:08:16,060
age values in this database and you store exact counts for each of those now you can say age is

733
01:08:16,060 --> 01:08:23,980
equal to nine I can look at the value the number of occurrences that I have for nine which is there

734
01:08:23,980 --> 01:08:29,820
so four they're total of 45 different values so I can see the selectivity of this operation

735
01:08:29,820 --> 01:08:39,100
is four by 45 now I can use that to guess what the output sizes yep you would do this for anything

736
01:08:39,100 --> 01:08:44,460
on which you can have a predicate which could be non index attribute too and as you'll see very

737
01:08:44,460 --> 01:08:50,460
next slide that was obviously too expensive because you know the space to store that detailed value

738
01:08:50,460 --> 01:08:54,619
could be the same space as you need to store the original column so you might be doubling the size

739
01:08:54,619 --> 01:08:59,659
of your database which is a bad idea you want these statistics to be compact and as accurate as

740
01:08:59,659 --> 01:09:04,779
possible and cheap to compute it's like three things touching against each other and you won't get

741
01:09:04,779 --> 01:09:09,100
all of that but that's the whole design space we're also going to make assumptions that the data is

742
01:09:09,100 --> 01:09:14,300
uniformly distributed right like we did when we said toys across employees is uniformly distributed

743
01:09:14,380 --> 01:09:18,860
will assume independence and we'll talk about that next that two predicates are independent we can

744
01:09:18,860 --> 01:09:23,100
just combine them that may not hold true in practice but they advance methods to work with that

745
01:09:23,739 --> 01:09:27,980
then we'll do inclusion principle like we did we said oh every department employee will have a

746
01:09:29,020 --> 01:09:33,900
every employee has a department I did they're not all nuts so a foreign key is point to something

747
01:09:33,900 --> 01:09:39,260
real so these are all assumptions that we make as we start to make estimates about these cardinality

748
01:09:39,260 --> 01:09:44,380
so the question that was asked related to that is sometimes these can be way off so for example if I've

749
01:09:44,380 --> 01:09:51,500
got two predicates where it says make is Honda and model is a card and I say by these statistics by

750
01:09:51,500 --> 01:09:58,699
individual stats on the make column I estimate that one in 10 cards is a Honda and one in 100 cards

751
01:09:59,340 --> 01:10:05,420
100 models is an accord a semi estimation says that the joint cardinality for both of these columns

752
01:10:05,420 --> 01:10:11,020
is the product of those two but I would be way off why because only Honda makes a card so I assume

753
01:10:11,020 --> 01:10:16,619
uniform distribution and that is way off so these can be wrong and that touches on this point of how

754
01:10:16,619 --> 01:10:21,340
you sometimes have to go and dynamically re-optimize these queries and that's a hot topic of research

755
01:10:21,340 --> 01:10:30,460
even to this day okay there are the things you can do uh histograms are going to represent this

756
01:10:30,460 --> 01:10:36,619
details information that we had but with a lot less space so two classes of histograms the first

757
01:10:36,619 --> 01:10:43,260
one will say I will go and take uh this information and break it up into buckets so I divided into five

758
01:10:43,260 --> 01:10:49,020
buckets three values in each bucket now for each bucket I will store the total count so now I

759
01:10:49,020 --> 01:10:54,220
one third the number of values that I'm storing right I can make it one tenth one hundred one million

760
01:10:54,220 --> 01:10:58,939
whatever I want to and these are called equi with histogram because I picked a width and kept that

761
01:10:58,939 --> 01:11:05,099
uniform and I just did across that space and counted in that there's a flip side of it called equi

762
01:11:05,099 --> 01:11:09,819
depth histogram that's going to allow the bucket size to be different but it's going to say I'm

763
01:11:09,819 --> 01:11:14,859
trying to get roughly equal values in each of these buckets and uh they're different properties

764
01:11:14,859 --> 01:11:19,500
between the equi width and equi depth the all kinds of other names you hear if you get into this

765
01:11:19,500 --> 01:11:24,939
space like re-optimal histograms and stuff pros and cons for each one of those both topics we cover in

766
01:11:24,939 --> 01:11:29,979
the advanced database class here you need to know that we do histograms because you want a more compact

767
01:11:29,979 --> 01:11:36,379
representation they're more accurate than just guessing uniform distribution okay so they're very

768
01:11:36,379 --> 01:11:42,379
important and you want to have these histograms the more advanced versions of histograms based on

769
01:11:42,379 --> 01:11:46,299
these things called sketches you're not going to go into the details of it again that gets covered in

770
01:11:46,299 --> 01:11:52,859
the advanced database class they are more sophisticated of building things uh of building these types of

771
01:11:52,859 --> 01:11:58,539
approximate stats the key one over here is hyper log log which is used all over it's a very fast

772
01:11:58,539 --> 01:12:05,500
way to get uh uh to get an estimate for the number of distinct values in a set in a single pass

773
01:12:05,500 --> 01:12:11,500
and that gets used for all over the place including in data platform outside database systems uh so

774
01:12:11,500 --> 01:12:16,219
if you're interviewing for a database job do look up hyper log log because you should you should be

775
01:12:16,219 --> 01:12:20,859
aware of that method it's a fast way to do approximate counting obviously has importance for the

776
01:12:20,859 --> 01:12:25,739
types of stuff we do in optimization but in all of the places still the other thing you could do a

777
01:12:25,739 --> 01:12:33,019
sample so I can uh take randomly sample one hundredth of the records in the table and then say take

778
01:12:33,019 --> 01:12:38,299
the predicate I have which is ages greater than 50 here what does it look like on my sample I've just

779
01:12:38,299 --> 01:12:43,259
brought a small amount of data from this not the entire table and whatever I get I'll say okay

780
01:12:43,259 --> 01:12:47,579
that's going to apply to the rest of it so it's of completely guessing uniform distribution this

781
01:12:47,579 --> 01:12:53,019
is a more educated guess with a little extra cost right so uh that's the trade off you're making a

782
01:12:53,019 --> 01:13:00,300
little extra cost for uh more accurate information so I know I'm running out of time I've got three

783
01:13:00,300 --> 01:13:06,300
slides so this is the conclusion slide let's tie everything together and hopefully you've appreciated

784
01:13:06,300 --> 01:13:13,340
what query optimization does and it's going to look at the SQL query convert that into a logical plan

785
01:13:13,340 --> 01:13:17,579
eventually end up with the physical plan and as you saw sometimes that logical to physical is not

786
01:13:17,579 --> 01:13:22,699
like a one step linear process but you could be intertwining those till you end up with a physical plan

787
01:13:22,699 --> 01:13:27,180
that you can give to a schedule of which is all the details that you need before you do all of that

788
01:13:27,180 --> 01:13:31,980
stuff using the top down or bottom up approach for query optimization you'll flatten the query out

789
01:13:31,980 --> 01:13:36,140
do all the expressions rewrites all that other stuff to make the query correct and has compact as

790
01:13:36,140 --> 01:13:41,500
possible for sending it to the optimizer was a very hard work to do the enumeration as we said it can

791
01:13:41,500 --> 01:13:46,699
be talked on a bottom up and for all of this to work you may have the best enumeration algorithm

792
01:13:46,699 --> 01:13:52,300
but if your cost function is off you'll get bad plans so you need the cost uh functions to also work

793
01:13:53,020 --> 01:13:58,300
so that's all the stuff I need you to know for the exams just give me two minutes for those of you

794
01:13:58,300 --> 01:14:02,619
who are really curious about query optimization I just want to tell you you want to dig deeper into

795
01:14:02,619 --> 01:14:08,460
this space so not gonna grill you for the exams on this but many of you are probably curious

796
01:14:09,260 --> 01:14:13,180
there are four essential there you probably need to read like 5200 papers if you're going to build a

797
01:14:13,180 --> 01:14:18,140
query optimizer it is less rocket sciencey than it seems and I'll talk about that in the next

798
01:14:18,140 --> 01:14:24,619
slide but it's very very hard on as I said optimizers are often the highest paid engineers in any data

799
01:14:24,619 --> 01:14:30,539
company the first one is the way where you would start it's written by Suridhich Chaudhary a giant

800
01:14:30,539 --> 01:14:36,220
in the field of optimization at Microsoft it just gives you very it in like a small number of pages

801
01:14:36,220 --> 01:14:42,380
like 8 or 10 pages he synthesized that whole field as it stood back in 98 and said here's that

802
01:14:42,380 --> 01:14:46,380
whole mess and here's how you should think about enumeration costing and stuff like that beautiful

803
01:14:46,380 --> 01:14:50,860
paper very easy to read if you understood everything today I strongly recommend you to go and read

804
01:14:50,860 --> 01:14:54,780
that paper it'll take you to that next level again we won't grill you in the exam but it's great

805
01:14:55,659 --> 01:14:59,659
then there's the paper by Gertz Krafay which is that top-down stuff very technical detail takes a

806
01:14:59,659 --> 01:15:04,619
little bit of getting used to then the next paper is a system art that started this whole field of

807
01:15:04,619 --> 01:15:10,140
optimization the last one is this which is a beautiful paper it's a beautiful title two of

808
01:15:10,140 --> 01:15:15,180
nests and trees which basically says sometimes we have these outer joints right you've seen that

809
01:15:15,180 --> 01:15:19,420
everything we've talked about today was about inner joints but these outer joints cause a massive

810
01:15:19,420 --> 01:15:24,859
nightmare for query optimization this paper showed that if you've got a bunch of outer joints and

811
01:15:24,859 --> 01:15:30,939
inner joints mixed up in your query there are in many cases clean ways to get a block of outer

812
01:15:30,939 --> 01:15:35,099
joint read written and a block of inner joints read so you can optimize just the inner joints through

813
01:15:35,099 --> 01:15:39,739
all the techniques we've talked about beautiful beautiful paper it just seemed impossible that you

814
01:15:39,739 --> 01:15:43,899
could make this algebra that clean but if you're into that type of match stuff in algorithms

815
01:15:43,899 --> 01:15:49,099
I strongly recommend that and then the last slide is uh next time we'll talk about transactions

816
01:15:49,099 --> 01:15:55,099
which is the next hardest part and let's see if I flip one of the slides that I needed to just give

817
01:15:55,100 --> 01:16:05,900
me a minute as I try to pull that up there we go and this is the very last slide which is if you are

818
01:16:05,900 --> 01:16:13,660
going to go and do try to build an optimizer three rules these are my rules you'll have to read a

819
01:16:13,660 --> 01:16:20,300
lot of papers with lots of algebra get used to that it'll be a lot of fun early on you're going to

820
01:16:20,300 --> 01:16:24,860
have to throw a lot more work roads at it because optimizers get better over time by hardening

821
01:16:25,260 --> 01:16:30,460
and that's how db2 oracle SQL servers optimizers are amongst the best because they've seen so much

822
01:16:30,460 --> 01:16:36,060
workload over the last 30 40 years the last one is you will not no matter how smart you are you will not

823
01:16:36,060 --> 01:16:40,380
get it right in the first place it's not that oh I picked the right enumeration strategy and stuff

824
01:16:40,380 --> 01:16:46,140
like that it's nitty-gritty details like hey what was the data structure that I used to keep track of

825
01:16:46,140 --> 01:16:51,820
all the tables and all the predicates and keep track of which one gets evaluated where and you'll

826
01:16:52,219 --> 01:16:57,340
soon have a spaghetti of objects in your c++ code that are all over the place you'll try to do a

827
01:16:57,340 --> 01:17:01,579
logical to physical transformation and find the data structures are all wrong you'll probably patch it

828
01:17:01,579 --> 01:17:06,460
and very soon you'll have code that is unmentainable not because the optimizer stuff is that hard it

829
01:17:06,460 --> 01:17:11,420
is hard which because you made it even harder because the data structures are all spaghetti I've seen

830
01:17:11,420 --> 01:17:16,059
three optimizers one that was written by someone else doing my thesis work who are sitting right next

831
01:17:16,059 --> 01:17:20,859
to me and he had a really interesting thing that is I told him why is your code so hard to read and he

832
01:17:20,859 --> 01:17:25,500
said it was hard to write so it may be hard to read right it is hard to write and if you don't go

833
01:17:25,500 --> 01:17:29,179
back and throw it away it'll be hard to read and when you're writing it you're just building on it

834
01:17:30,619 --> 01:17:36,460
and I have looked at the DB2 optimizer I worked on that in an intern it was very very difficult to read

835
01:17:36,460 --> 01:17:40,779
and then in the quick step system we tried to build ask me and optimize as it could build but in the

836
01:17:40,779 --> 01:17:46,219
end we still ended up with the data mess it's because we did not do rule number three which is

837
01:17:46,220 --> 01:17:50,300
planned to throw it away and read right from scratch and don't try to patch it so with that

838
01:17:50,300 --> 01:17:53,659
I'll stop and then we'll pick up on transactions in the next class thank you

839
01:18:16,780 --> 01:18:20,699
you ain't hit them all yeah still got your shirt up I smack you with the bottom of the

840
01:18:20,699 --> 01:18:25,579
clip to tell you look up show me what it's safe set for I blow your face back I got a block on

841
01:18:25,579 --> 01:18:30,860
taps the fence can't trace that style is like Tampa proof you can't lace that at the Dominican

842
01:18:30,860 --> 01:18:36,060
oh you could call me Dominican black Skelly black leather black sweat dimmelins my old black

843
01:18:36,060 --> 01:18:40,380
dirty eight send you to the perigates you get a zombie trying to skate and that's your first

844
01:18:41,020 --> 01:18:45,420
I ain't lying for that take your family see you wait my grand's is happy wait the ran through every

845
01:18:45,420 --> 01:18:48,380
state when they acting how I'm living tell them I'm living great

