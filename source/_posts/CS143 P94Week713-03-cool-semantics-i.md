---
title: CS143 P94Week713 03 Cool Semantics I
---

1
00:00:00,000 --> 00:00:08,099
In the next couple of videos, we're going to be looking at the details of the cool operational

2
00:00:08,099 --> 00:00:12,120
semantics going over the semantics of each individual kind of expression. We'll start

3
00:00:12,120 --> 00:00:20,199
with easy ones and work our way up to the more complicated ones.

4
00:00:20,199 --> 00:00:26,280
So the easiest rules are the rules for the constants in cool. So the value true, the expression

5
00:00:26,280 --> 00:00:31,080
true, I should say, evaluates to a Boolean with the value true. And it doesn't modify

6
00:00:31,080 --> 00:00:37,439
the store, so the store is unchanged because it doesn't do any updates, obviously. And

7
00:00:37,439 --> 00:00:46,040
there's a corresponding rule for false. And integers are very, very similar. So if an integer

8
00:00:46,040 --> 00:00:53,120
expression, integer literal i, will evaluate to an integer object with the value i. And

9
00:00:53,119 --> 00:01:02,079
again, the store is not modified by such evaluation. And finally, strings, if a, if s is a

10
00:01:02,079 --> 00:01:08,200
string literal of length n, then it will evaluate to a string object with the properties

11
00:01:08,200 --> 00:01:17,560
n and the string constant s. The evaluation of identifiers is very straightforward given

12
00:01:17,560 --> 00:01:22,200
that we have both an environment in a store. So to evaluate an identifier, and this would

13
00:01:22,200 --> 00:01:30,320
be a variable name like x or y or foo. What do we do? Well, first we look up in the environment

14
00:01:30,320 --> 00:01:37,680
where that identifier is stored. So now we'll give us back a memory location, l, sub

15
00:01:37,680 --> 00:01:42,879
ID in this case. And then we look up in the store, what the value is at that memory location.

16
00:01:42,879 --> 00:01:48,359
So we use the same memory location here as an argument to the store to get back the value

17
00:01:48,359 --> 00:01:54,280
that that that variable currently has. And notice that just a reference is a read of memory.

18
00:01:54,280 --> 00:01:58,680
So this is loading. You can think of it as loading the value of the variable. This does not

19
00:01:58,680 --> 00:02:02,560
affect the store. So the store is the same before and after. This is just looking up the

20
00:02:02,560 --> 00:02:09,960
value of variable, not updating the variable. The expression self just evaluates to the

21
00:02:09,960 --> 00:02:14,719
self object. So this is a place where we just make use of the fact that the self object

22
00:02:14,719 --> 00:02:19,520
is part of the environment. So that just gets copied over here as the result of the expression.

23
00:02:19,520 --> 00:02:28,159
And notice again that the store is unaffected by the evaluation of self. Now let's see how

24
00:02:28,159 --> 00:02:33,520
a slightly more complicated expression is evaluated in particular the assignment expression.

25
00:02:33,520 --> 00:02:39,680
So an assignment consists of two parts and identifier that is being updated and an expression

26
00:02:39,680 --> 00:02:45,280
that is going to give us the new value. So for example, just to remind you we might have

27
00:02:45,280 --> 00:02:51,760
something like x gets 1 plus 1. So 1 plus 1 here would be the expression e and x would be

28
00:02:51,760 --> 00:02:58,159
the identifier. And so in order to evaluate the assignment, the first thing we have to do is we

29
00:02:58,159 --> 00:03:03,920
have to know what value we're going to be writing into the identifier. So what is the update we're

30
00:03:03,919 --> 00:03:10,639
going to perform? So the first thing to do is to evaluate e. And notice here that e is evaluated

31
00:03:10,639 --> 00:03:17,119
in the same environment. So it has the same three components here as here. So it says the first

32
00:03:17,119 --> 00:03:24,079
thing we do is we run e. And that's going to give us back a new value v or this could back a value v,

33
00:03:24,079 --> 00:03:29,599
excuse me. And possibly an updated store. So e can be an arbitrary piece of code. It could

34
00:03:29,599 --> 00:03:33,919
itself have assignment statements in it. And so the store that we get out might be different.

35
00:03:33,919 --> 00:03:41,439
All right. So e produces a value v and an updated store s1. And now to actually do the assignment,

36
00:03:41,439 --> 00:03:46,319
what do we do? Well, we have to know what memory location we're supposed to update. So we look up

37
00:03:46,319 --> 00:03:53,599
the memory location for id and I'll give us some location l sub id. And then we modify the store

38
00:03:54,159 --> 00:03:59,759
with the new value. We modify the store at that point with the new value. So we replace the

39
00:03:59,759 --> 00:04:06,240
location lid or we update the value at the location lid to be the value of e, the value v. And we do

40
00:04:06,240 --> 00:04:14,400
that in store s1, which gives us a new store s2. And now notice that s2 is the store that results

41
00:04:14,400 --> 00:04:19,839
from the evaluation of e. Okay. So after we view the assignment, the assignment returns the value v,

42
00:04:19,839 --> 00:04:25,679
which was of course the value of running e. And it returns the updated store s2.

43
00:04:27,759 --> 00:04:33,759
Next, let's talk about the operational rule for addition. So to evaluate e1 plus e2, what are we

44
00:04:33,759 --> 00:04:40,799
going to do? Well, first we're going to evaluate e1. And notice that that is done in the same context

45
00:04:40,799 --> 00:04:47,759
as the context of the entire expression. Okay. So the components of the context here for evaluating e1

46
00:04:47,759 --> 00:04:55,039
are exactly the same as the components for the overall expression e1 plus e2. So when we evaluate

47
00:04:55,039 --> 00:05:00,639
e1, it's going to give us a value v1 and it's also going to give us an updated store s1. And then

48
00:05:00,639 --> 00:05:07,519
we're going to evaluate e2. And notice here that the context is different. The self object and the

49
00:05:07,519 --> 00:05:15,599
environment are the same. But now we're running e2 in the new store s1. And what that's a saying is

50
00:05:15,600 --> 00:05:23,439
that if e2 has assignments or variable references in it, those assignments and variable references

51
00:05:23,439 --> 00:05:29,520
have to be done on the store that resulted from running e1. Okay. So it's very important that we get

52
00:05:30,080 --> 00:05:37,120
any side effects that happen in running e1 are visible or that are seen by the expression e2.

53
00:05:37,120 --> 00:05:42,640
So we run e2 in this environment. We're going to get out the value v2 and update store s2.

54
00:05:42,639 --> 00:05:48,479
And then the result of the entire expression is going to be v1 plus v2 and the resulting store will

55
00:05:48,479 --> 00:05:56,079
be the store s2. And notice here how the stores tell you the order in which you have to evaluate the

56
00:05:56,079 --> 00:06:03,519
expressions. So because e1 is evaluated in the same store as the overall expression, that tells you

57
00:06:03,519 --> 00:06:11,360
that e1 has to be evaluated first. And then because e2 is evaluated in the store that's produced by

58
00:06:11,360 --> 00:06:20,240
e1, that tells you that e1, e2, excuse me, has to be evaluated after, evaluated e1. And then the

59
00:06:20,240 --> 00:06:26,319
fact that s2 is the result of the whole thing tells you that e2 is also the last thing that you

60
00:06:26,319 --> 00:06:34,800
evaluate during the execution of this particular expression. Okay. Let's take a look at a statement

61
00:06:34,800 --> 00:06:42,480
block and just for variety here, let me change my colors. So how are we going to evaluate a statement

62
00:06:42,480 --> 00:06:48,000
block of statements e1 through EN? Okay. Well, so the semantics of this is that we should run them

63
00:06:48,000 --> 00:06:54,560
in order beginning with e1. And the result of the entire execution will be the, sorry, the value of

64
00:06:54,560 --> 00:07:01,040
the entire block, be the value of the last expression. And this rule just says that. So first we

65
00:07:01,040 --> 00:07:05,760
evaluate e1 and notice that it's done in the same store as the overall expression. So that's what

66
00:07:05,760 --> 00:07:12,960
tells you it has to come first. And that produces a new store s1 and a value v1. Okay. And then e2 is

67
00:07:12,960 --> 00:07:19,920
evaluated in the store s1 and it produces a store s2 and so on. And then expression EN is evaluated

68
00:07:19,920 --> 00:07:28,400
in the store sn minus 1 and it produces a value vn and a updated store s subn. Okay. And then the

69
00:07:28,399 --> 00:07:37,039
result of the whole thing is the value of vn and also the updated store s subn. And this tells you,

70
00:07:37,039 --> 00:07:42,319
this rule tells you the order in which you have to evaluate the sub expressions. The dependencies

71
00:07:42,319 --> 00:07:47,439
here on the store force you to evaluate e1 and then e2 and then e3 and so on. So I have to do them in

72
00:07:47,439 --> 00:07:52,560
that order to get the side effects, to get the side effects in the correct order for all of these

73
00:07:52,560 --> 00:07:57,199
expressions. And furthermore, it also tells you the only value that you're going to keep is the value

74
00:07:57,360 --> 00:08:02,719
vn. Notice that none of the other values that are produced here are used for anything. They don't appear

75
00:08:02,719 --> 00:08:10,159
anywhere else in the rules. Let's take what we've learned so far and do a small example.

76
00:08:11,039 --> 00:08:15,039
So we want to know what happens when we evaluate the block.

77
00:08:16,240 --> 00:08:22,000
X gets assigned 7 plus 5. That's the first statement and the second and last statement in the

78
00:08:22,000 --> 00:08:27,839
block is just the expression 4. And the first thing we have to do is to say what the context is

79
00:08:27,839 --> 00:08:32,240
in which we're going to evaluate this. And the context consists of three parts. There'll be a

80
00:08:32,240 --> 00:08:37,679
self object. And in this case, it doesn't really matter what's in the self object because self is

81
00:08:37,679 --> 00:08:43,120
not referred to in the program. And so it won't plan your role in the evaluation. But we still need

82
00:08:43,120 --> 00:08:49,840
it. There'll be some self object out there. It just won't get used. And now we need an environment

83
00:08:49,840 --> 00:08:55,440
which tells us the locations for all the free variables in the program. So we just need a place

84
00:08:55,440 --> 00:09:01,759
where X is going to be stored. And so X will be stored at some location L. And then we need to know

85
00:09:01,759 --> 00:09:08,320
what our memory contents is, what our store is. And let's just say that at L, we have initially the

86
00:09:08,320 --> 00:09:15,680
value zero. Okay. So now we can use our rules to run this program or to evaluate this program. I'm

87
00:09:15,679 --> 00:09:23,759
going to make this line here much longer. And recall that the evaluation of a block consists of

88
00:09:23,759 --> 00:09:30,319
the evaluation of all the statements within the block. Okay. So the first one is going to be

89
00:09:31,359 --> 00:09:37,679
X gets 7 plus 5. And that will be evaluated in the same environment as the overall expression.

90
00:09:37,679 --> 00:09:45,599
So I will have up here are sorry the same context. Excuse me. And I should say I often slip. I

91
00:09:45,599 --> 00:09:50,879
know I realize and say environment for the entire left hand side of one of these judgments.

92
00:09:51,839 --> 00:10:00,239
I've tried to be consistent and just use environment for the for the second component of the

93
00:10:00,239 --> 00:10:04,879
context. Often in the literature people call the entire thing on the left hand side the environment.

94
00:10:04,879 --> 00:10:10,080
And that's why I make this mistake. But you know for this side of notes I'm trying to be consistent.

95
00:10:10,080 --> 00:10:14,480
The entire all the components on the left hand side together are called the context. And the

96
00:10:14,480 --> 00:10:19,200
environment is just the second component, the mapping from variables to their locations.

97
00:10:19,200 --> 00:10:28,799
Anyway, coming back to the example. The first statement in the block is X gets 7 plus 5.

98
00:10:29,039 --> 00:10:34,639
All right. And then we're going to have the second statement as well. And we know that the

99
00:10:35,599 --> 00:10:41,120
self object and the environment won't change. But we don't know what the store will be. Okay.

100
00:10:41,120 --> 00:10:47,199
The store might be different. So we'll leave the store empty for now. We'll figure that out later.

101
00:10:47,199 --> 00:10:54,479
And we're going to be evaluating the expression for. Okay. So this is the structure of the evaluation.

102
00:10:55,279 --> 00:11:00,080
Now to make progress we should look at at this first statement. Try to make some

103
00:11:01,360 --> 00:11:05,440
forward progress on that one. So I evaluate the assignment. What do we have to do?

104
00:11:06,639 --> 00:11:12,080
Well, the very first thing we have to do is we have to evaluate the right hand side. So we're going to have

105
00:11:14,320 --> 00:11:18,879
the context for that is going to be the same as the context we've been looking at

106
00:11:19,679 --> 00:11:24,240
all along. Because it's the first thing that's actually going to happen is to evaluate

107
00:11:26,559 --> 00:11:32,879
7 plus 5. Okay. And now I'll leave me a little space down here for the rest of the assignment

108
00:11:32,879 --> 00:11:37,279
rule which we're not going to fill in just yet. Now to evaluate the plus expression,

109
00:11:37,279 --> 00:11:44,240
we have to evaluate the first expression and the second expression. Okay. And so how do we do that?

110
00:11:44,240 --> 00:11:49,600
Well, we know finally, I think how to do that because we're finally down. We're going to have a single

111
00:11:49,600 --> 00:12:02,159
integer there and that we already have a rule for. Okay. So an integer literal evaluates to an integer

112
00:12:02,159 --> 00:12:12,719
object. Okay. And inside that object is just the value. Okay. And the store is unmodified.

113
00:12:14,879 --> 00:12:24,319
All right. And then similarly for the other argument here. Okay.

114
00:12:24,320 --> 00:12:36,480
So the 5 will also evaluate to an integer object with a value 5 and the store will be unmodified.

115
00:12:36,480 --> 00:12:45,440
Okay. So that's the two sub expressions of this addition. And so now we can fill in the results

116
00:12:45,440 --> 00:12:50,000
here. So we'll take the contents of the two integers, we'll add them. That will also be an integer

117
00:12:50,000 --> 00:12:59,279
object. So we'll get out the integer object 12 and the store has not been changed. Okay. So the

118
00:12:59,279 --> 00:13:04,320
store that we get out here happens to be the same as a store that went in just because this expression

119
00:13:04,320 --> 00:13:11,120
had no assignments at it. All right. And now we're ready to do the assignment. Okay. So how do we do

120
00:13:11,120 --> 00:13:16,720
that? Well, we have to form a new store. All right. So we're going to have a new store which will

121
00:13:16,720 --> 00:13:28,960
be L gets zero with the value at L. I don't remember which way my notation went here. I think

122
00:13:28,960 --> 00:13:35,920
if the thing the number comes first, we're going to put 12 in the location L. And of course that store

123
00:13:35,920 --> 00:13:44,800
is just equal to the store where L has the value 12. Okay. And so now what happens down here as we

124
00:13:44,799 --> 00:13:52,719
do the assignment and we get out the new value. Okay. So the value of the right hand side is 12

125
00:13:53,519 --> 00:13:59,839
and we have the new store where the location L has 12. All right. So now we're ready to evaluate the

126
00:13:59,839 --> 00:14:06,799
second statement in the block and that will be done in the store where L has the location 12.

127
00:14:07,359 --> 00:14:13,599
And of course this is just a integer. And so that will evaluate to the integer constant

128
00:14:14,560 --> 00:14:20,560
for the integer value excuse me for or integer object containing the integer object with the value for

129
00:14:21,200 --> 00:14:30,480
and our store is just going to fit not quite. All right. And that's then the result of the entire

130
00:14:30,480 --> 00:14:36,879
evaluation. So this block will produce the value for an integer object with the value for an

131
00:14:36,879 --> 00:14:45,679
updated store where location L has the value 12. So the next expression I would like to take a look

132
00:14:45,679 --> 00:14:53,200
at is the if then else expression and to evaluate and if then else what do we do. Actually this should

133
00:14:53,200 --> 00:15:01,120
be an if then else C of course. So to evaluate and if then else well we first we have to evaluate the

134
00:15:01,120 --> 00:15:06,000
the predicate and that's done in the same store the same context as the overall expression.

135
00:15:06,000 --> 00:15:12,639
And if the result is true if the if the Boolean predicate returns a value true then we want to

136
00:15:12,639 --> 00:15:17,279
evaluate just the true branch and not the false branch. So that's why you only see here

137
00:15:18,159 --> 00:15:22,799
evaluation of E2 and E3 isn't mentioned anywhere. And just know here that the predicate may have

138
00:15:22,799 --> 00:15:30,000
side effects and so E2 is evaluated in whatever store E1 produces. And then the result of the entire

139
00:15:30,000 --> 00:15:36,000
expression is the value of E2. Okay. And that's V and also the final store that's produced by running

140
00:15:36,559 --> 00:15:44,240
the then branch. And there's a symmetric rule for what happens if the predicate evaluates to false

141
00:15:44,240 --> 00:15:52,080
in that case you would evaluate E3 and not E2. Next we'll take a look at what happens with while loops

142
00:15:52,080 --> 00:15:58,559
in cool. So there are two cases. First if the predicate of the while loop evaluates to false

143
00:15:59,519 --> 00:16:04,319
okay well in this case the loop body is not going to execute. All right so the first thing we do is

144
00:16:04,319 --> 00:16:10,799
we evaluate the predicate and that's done in the same context as the evaluation of the overall

145
00:16:10,799 --> 00:16:14,959
expression. And if the predicate is false then we exit the loop and so the result of the loop

146
00:16:14,959 --> 00:16:20,559
is void the value void and just whatever store results it from evaluating the predicate.

147
00:16:23,199 --> 00:16:28,079
The other possibility is that the predicate evaluates to true. So here we evaluate the predicate

148
00:16:28,080 --> 00:16:34,720
again in the same context as the overall loop. And if the predicate evaluates to true then we're

149
00:16:34,720 --> 00:16:39,920
going to run the loop body once. Okay. And so evaluate the loop body and notice that that's done

150
00:16:40,720 --> 00:16:43,600
in this in whatever store results from evaluating the predicate.

151
00:16:44,480 --> 00:16:49,840
Evaluating the loop body is going to give us a value V and a new store S2 and then what we need

152
00:16:49,840 --> 00:16:55,360
to do is we need to go back around and execute the loop again. And how can we do that? Well we're

153
00:16:55,360 --> 00:17:02,879
really just running the whole loop in the new context. So the next thing we do is we evaluate the

154
00:17:02,879 --> 00:17:11,200
entire loop right in the new store. So after we execute the loop body one time then we go around

155
00:17:11,200 --> 00:17:17,599
and just evaluate the loop again. And now this may run for zero or more iterations. All right and

156
00:17:17,599 --> 00:17:24,240
when it finally terminates if it terminates it will produce a new store S3

157
00:17:24,880 --> 00:17:29,120
evaluate a while loop of course always produces the value void and then what will produce

158
00:17:29,759 --> 00:17:34,720
for the entire loop for the entire expression is the value void and the updated store S3.

159
00:17:37,680 --> 00:17:43,359
The next interesting expression to take a look at is the let expression. So recall what this

160
00:17:43,359 --> 00:17:50,400
looks like. So let in cool has a variable that's being declared and it's type an initializer which

161
00:17:50,400 --> 00:17:56,080
is optional. So this is the value that the identifier will be initialized to and then the expression

162
00:17:56,080 --> 00:18:00,880
in which that new variable is available. So how do we evaluate this? Well first we're going to

163
00:18:00,880 --> 00:18:07,200
evaluate the initial value of the of the of the new variable. So we evaluate E1 and as usual that's

164
00:18:07,200 --> 00:18:14,400
done in the initial store and it produces a possibly modified store. And now the question is what

165
00:18:14,400 --> 00:18:20,240
are we going to what's going to be the context here for the evaluation of E2 for the body of the

166
00:18:20,240 --> 00:18:25,920
let. And so it seems clear that it's going to involve S1 because it has all the updates for E1

167
00:18:25,920 --> 00:18:30,240
but it also has to have this new identifier in it. And so how are we going to do that?

168
00:18:32,960 --> 00:18:39,920
So what we want is to have a new environment E but with a new binding of ID to a fresh location.

169
00:18:39,920 --> 00:18:44,720
So we're introducing a new variable. Remember that the environment has a track all the free

170
00:18:44,720 --> 00:18:49,920
variables. So this is one situation in which you're going to extend the environment E with a new

171
00:18:49,920 --> 00:18:54,880
binding. And that location, the location for new variable has to be a fresh location. We don't want

172
00:18:54,880 --> 00:19:00,880
to conflict with any other memory location we're already using. And so we're going to allocate a new

173
00:19:00,880 --> 00:19:08,720
memory location for the variable. And then the store, the new store, will also will be like S1 as we

174
00:19:08,720 --> 00:19:12,960
said it has to include all the values for S1 but it's also going to have this new location

175
00:19:13,759 --> 00:19:17,600
for the variable and that's going to have the initial value of the variable V1.

176
00:19:20,400 --> 00:19:25,279
To express that we need a new location, we're going to introduce a new operation on a store which

177
00:19:25,279 --> 00:19:32,240
gives us a new fresh location. So new look applied to a store is just going to give us some location

178
00:19:32,240 --> 00:19:38,560
that isn't being used by the store. So the store has a domain where it's a mapping from

179
00:19:38,560 --> 00:19:45,360
locations to values and we'll just pick some new location that isn't in the current list of

180
00:19:45,359 --> 00:19:50,559
locations within the store and that will be the one returned or that will be one that will be

181
00:19:50,559 --> 00:19:55,679
the one returned by new look. Okay, so new look you can think of as modeling the memory allocation

182
00:19:55,679 --> 00:20:03,279
function in the runtime system. So then here we can write out the rule. So this is the most

183
00:20:03,279 --> 00:20:09,199
complicated rule we've seen so far. So I'll just take a moment to walk through it. All right, so

184
00:20:09,200 --> 00:20:15,920
the first thing we do is we evaluate E1, the initializer for the new variable. Okay, so just like

185
00:20:15,920 --> 00:20:20,480
before this is done in the same context as the overall expression and this is going to give us a

186
00:20:20,480 --> 00:20:25,759
value of V1 and an updated store. All right, then in the updated store, using the update store here,

187
00:20:25,759 --> 00:20:35,039
we find an unused location, L new. Okay, and then we're going to create a store where that new location

188
00:20:36,000 --> 00:20:41,599
has where it has the value of E1. So we're going to store the value of E1 at that new location.

189
00:20:41,599 --> 00:20:47,119
We're going to update the store S1 to reflect that and furthermore, we're going to extend our

190
00:20:47,119 --> 00:20:53,359
environment with the new identifier which will be stored at this new location and this is the

191
00:20:53,359 --> 00:20:59,119
context then. Okay, with this updated environment and store in which we evaluate the body of the

192
00:20:59,599 --> 00:21:06,319
which will produce a value V2 and a possibly updated store S2 and those are the results of the

193
00:21:06,319 --> 00:21:13,519
overall expression.

