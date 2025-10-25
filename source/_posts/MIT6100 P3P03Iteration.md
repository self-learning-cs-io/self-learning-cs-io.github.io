---
title: MIT6100 P3P03Iteration
---

1
00:00:00,000 --> 00:00:20,519
So let's start today's lecture.

2
00:00:20,519 --> 00:00:24,839
Today we're going to be talking about the idea of iteration and iteration is another way

3
00:00:24,839 --> 00:00:31,719
we're going to add control flow to our programs. But before we do that, let's do a little bit

4
00:00:31,719 --> 00:00:38,560
of a recap on, sorry, let's do a little bit of a recap of what we've done so far last lecture

5
00:00:38,560 --> 00:00:44,719
because last lecture we actually introduced a different mechanism for control flow, branching.

6
00:00:44,719 --> 00:00:49,280
And the control flow was basically a way for us to tell Python not to go systematically

7
00:00:49,280 --> 00:00:54,519
through the code. Branching was a way for us to tell Python, hey, based on some condition

8
00:00:54,520 --> 00:01:00,040
being true or false, either evaluate some set of code or another set of code, right,

9
00:01:00,040 --> 00:01:05,079
which was not going linearly, we were actually kind of skipping around through the code.

10
00:01:05,079 --> 00:01:09,640
So that's what we learned at the end of the lecture, but we also learned about input and

11
00:01:09,640 --> 00:01:14,520
output, so a way for us to write interactive programs. And we learned about a new data

12
00:01:14,520 --> 00:01:19,280
type, the string. So the string was a sequence of characters. Hopefully you got a chance

13
00:01:19,280 --> 00:01:26,599
to do a little bit of exercises on MITX as practice for today's quiz with quizzes with strings

14
00:01:26,599 --> 00:01:33,599
and branching. Okay, so in branching, what did we learn? We talked about how to actually

15
00:01:33,599 --> 00:01:38,760
add a branching point in our program. So we did that using these particular keywords.

16
00:01:38,760 --> 00:01:42,200
So when you type them in your program in the file editor, you'll see that they kind of turn

17
00:01:42,200 --> 00:01:47,200
a different color that tells you it's a special word in Python. And these keywords are how

18
00:01:47,200 --> 00:01:56,520
we told Python to put a branching point. And the colon kind of ended the branching conditional.

19
00:01:56,520 --> 00:02:03,159
And then anything that was indented as part of that conditional was code that would be executed

20
00:02:03,159 --> 00:02:07,760
when that condition was true. So I'm just going to quickly go over these, each one of these boxes.

21
00:02:07,760 --> 00:02:12,960
So the first one up here was the simplest way that we could add a conditional to our program.

22
00:02:13,439 --> 00:02:18,480
It basically said, hey, go through the program. When you reach this if condition, Python would

23
00:02:18,480 --> 00:02:24,960
check the condition and say, if that condition is true, execute the code that's indented

24
00:02:24,960 --> 00:02:29,760
as part of that block. If the condition was not true, don't do anything, just carry on with

25
00:02:29,760 --> 00:02:35,560
a remaining program. If we wanted to do something else, so if the condition was not true, we

26
00:02:35,560 --> 00:02:41,680
wanted to do something else. We added this else clause here. And the else also has some sort

27
00:02:41,680 --> 00:02:48,400
of code indented as part of its code block. And that code would be executed when that condition was false.

28
00:02:50,800 --> 00:02:56,480
Okay, so that was a really simple if or if else code structure. But sometimes we want to have code

29
00:02:56,480 --> 00:03:02,240
that checks for many conditions, right? Not just one. That's where the L if structure came in. So we

30
00:03:02,240 --> 00:03:08,719
would have an if condition that starts our code block. If that condition was true, as usual,

31
00:03:08,719 --> 00:03:14,879
we execute the code that's part of that block. Else, if so L if, we could insert another condition.

32
00:03:15,439 --> 00:03:19,280
And Python would say, okay, well, if that one wasn't true, let me check if this next one is true.

33
00:03:19,280 --> 00:03:23,520
And then we would execute the code that's part of that code block. And we can add, we can chain

34
00:03:23,520 --> 00:03:30,479
as many of these ellips as we want together. And Python will evaluate the very first one that

35
00:03:30,479 --> 00:03:37,199
it finds true that's part of this chain. Okay, even if more than one is true. It is possible

36
00:03:37,199 --> 00:03:42,239
none of those conditions were true in which case Python would basically skip over all of them and

37
00:03:42,239 --> 00:03:47,759
do nothing and turn none of those code blocks. If you wanted to have a structure where if none of

38
00:03:47,759 --> 00:03:53,439
those conditions were true, you wanted to do something. You could put an else at the end of a whole

39
00:03:53,439 --> 00:03:59,599
chain of if L if ellips. And the else would be executed when none of those conditions are true.

40
00:04:00,159 --> 00:04:06,560
Okay, so hopefully this is just recap. One sort of tricky thing to remember is the ifs.

41
00:04:07,359 --> 00:04:13,679
Starts a code block. So the if can have an else associated with it or it can have an L if ellip and

42
00:04:13,679 --> 00:04:20,399
an else associated with it. But if you have if condition and then followed by another if condition,

43
00:04:20,399 --> 00:04:24,719
both of those code blocks could potentially be executed because the ifs are independent, right?

44
00:04:24,719 --> 00:04:30,719
It's not an else situation. They're just another if code block that that gets started.

45
00:04:32,079 --> 00:04:36,480
So the way we told Python, again, just to reiterate the way you told Python, which code to execute

46
00:04:36,480 --> 00:04:40,960
when the condition is true is by indentation. And indentation is something you have to do.

47
00:04:42,000 --> 00:04:48,319
It's not optional in Python. Okay, so let's take what we've learned so far and code up a really

48
00:04:48,319 --> 00:04:53,680
simple game. So this is sort of a very simple variation of the lost woods in Zelda, sort of my

49
00:04:53,680 --> 00:04:58,720
version of it. Let's say it's kind of a trick level where you have your character and they enter

50
00:04:58,720 --> 00:05:04,960
the lost woods. They're presented with this screen. And the trick here is you ask the user if they

51
00:05:04,959 --> 00:05:10,159
want to go left or right. If they say right, you're basically going to present them with the exact

52
00:05:10,159 --> 00:05:15,919
same screen all over again. So it's kind of representing their loss in the woods. And as long as they

53
00:05:15,919 --> 00:05:19,359
say I want to keep going right, I want to keep going right, I want to keep going right, they're

54
00:05:19,359 --> 00:05:23,839
basically going to see the same screen over and over again. And the trick to getting out of the

55
00:05:23,839 --> 00:05:31,599
woods is to say I want to go left. Okay, so no matter how far, how many times they said right in a

56
00:05:31,600 --> 00:05:38,080
row, as long as they type in left, they're out of the woods. Okay, so let's try to code that up with

57
00:05:38,080 --> 00:05:47,200
what we know, just conditionals. We have an if else, right? The if says if the user exits right,

58
00:05:47,200 --> 00:05:53,040
we're going to do something. And otherwise, we're going to say that the user said left or something

59
00:05:53,040 --> 00:05:58,080
else or exit. And we're going to tell them that they've exited successfully. All right, now if they

60
00:05:58,079 --> 00:06:02,240
said exit right, what do we do? Well, we're going to show them the exact same thing again. So we're

61
00:06:02,240 --> 00:06:07,279
setting the background to the same woods background. And then to present it with a choice all over again,

62
00:06:07,279 --> 00:06:12,639
right? Do you want exit right or you want exit left? So if they say exit right, we would do something.

63
00:06:13,839 --> 00:06:19,439
And otherwise, we would tell them they were they successfully exited. Okay, well, what if they

64
00:06:19,439 --> 00:06:24,159
exited right? If they exited right, then we would do something again, basically present them with

65
00:06:24,160 --> 00:06:30,640
the same situation. So we would set the woods background again, and we would ask them if they

66
00:06:30,640 --> 00:06:37,040
want to go right or left again. And otherwise, if they said left, they exit. So we already see a problem,

67
00:06:37,040 --> 00:06:43,040
right? How deep do we make this nested loop situation, right? Here, we already have three. In case the

68
00:06:43,040 --> 00:06:48,480
user said I want to go right three times in a row. But we don't know how persistent the user will be.

69
00:06:48,480 --> 00:06:54,400
So how do we know when we're writing our code, how deep to make this nested loop? We don't.

70
00:06:55,120 --> 00:06:59,920
Right? We won't be able to really code this up very well with what we know so far. So that's kind

71
00:06:59,920 --> 00:07:05,680
of the motivation for introducing iteration. Because the situation on the previous slide fits really

72
00:07:05,680 --> 00:07:11,920
well with some task we want to repeat multiple times as long as some condition is true. In our case,

73
00:07:11,920 --> 00:07:17,680
the condition is the user says I want to exit right. So while the user keeps saying exit right,

74
00:07:18,640 --> 00:07:23,840
show them the woods background and ask them again which way do you want to go? And so while that's

75
00:07:23,840 --> 00:07:29,840
true, just repeat this set of things. Check that they said exit right, show them the woods background,

76
00:07:29,840 --> 00:07:34,800
ask them again. Check that they said exit right, show them the background, ask them again. And if at

77
00:07:34,800 --> 00:07:42,080
any point they'd say I don't want to exit right, we break out of this loop and we kind of rejoin the

78
00:07:42,080 --> 00:07:46,319
rest of the program. That's kind of the terminology we used with if statements, right? We set the background

79
00:07:46,319 --> 00:07:52,719
to the exit background and they're out of the woods. So this sets the scene for wild loops. Here's

80
00:07:52,719 --> 00:07:58,240
another example of wild loops sort of in the context of watching a show. So if we want to start a new

81
00:07:58,240 --> 00:08:04,000
show on Netflix and we want to watch all episodes of the show in one shot, we're going to tell Netflix

82
00:08:04,000 --> 00:08:10,079
we're starting a new show. And while there are more episodes to watch in this show, we're going to

83
00:08:10,079 --> 00:08:15,439
keep watching the next episode, right? So if there are no more episodes to watch, then we're done,

84
00:08:15,439 --> 00:08:21,199
not Python, Netflix will suggest three more shows like this one. And while there are more episodes

85
00:08:21,199 --> 00:08:27,279
to watch, so yes, there are more episodes to watch, we're going to play the next episode in sequence.

86
00:08:28,560 --> 00:08:33,120
So that's the idea that we're trying to get out with wild loops. In Python, this is how we code

87
00:08:33,120 --> 00:08:38,879
them. So we start a wild loop with the keyword while. So this again will turn blue in Python because

88
00:08:38,879 --> 00:08:45,840
it's a special word. Some condition is true. Okay, so this is against some expression or something

89
00:08:45,840 --> 00:08:53,919
that will evaluate to a Boolean, like we talked about in last lecture. Okay, colon. And colon tells

90
00:08:53,919 --> 00:09:00,480
Python we're starting a code block that's part of the wild loop being true. And as usual, the code

91
00:09:00,480 --> 00:09:06,639
block means we're going to indent these lines of code, right? So whatever we want to execute when

92
00:09:06,639 --> 00:09:14,399
the condition is true, we'll be indented. When the indented statements are finished executing,

93
00:09:14,399 --> 00:09:22,399
Python automatically goes back and recheck the condition. So it recheck whether the condition is true

94
00:09:22,399 --> 00:09:28,080
or not. And this is done behind the scenes, right? When you code up a wild loop, when you type in the

95
00:09:28,080 --> 00:09:34,000
keyword while, Python will automatically do this behavior. It'll check the condition, it'll execute the

96
00:09:34,000 --> 00:09:38,879
lines of code indented. And then it'll go back and check the condition again. If it's still true,

97
00:09:38,879 --> 00:09:43,039
it'll execute the lines of code indented again. And then it'll check the condition again. So it's

98
00:09:43,039 --> 00:09:47,519
not something you have to code up. You don't have to tell it to go back as long as you're writing

99
00:09:47,519 --> 00:09:55,039
this wild loop, Python will automatically do that sequence of steps for you. Okay. So when the

100
00:09:55,039 --> 00:10:00,320
condition becomes false, Python will no longer execute the stuff inside the stuff that's

101
00:10:00,320 --> 00:10:04,800
indented inside the wild loop. And it'll go rejoin the rest of the program at the same

102
00:10:04,800 --> 00:10:14,000
indentation level as the wild loop. Okay. So notice that the condition is kind of something that's

103
00:10:14,000 --> 00:10:21,440
dependent on, or sorry, the fact that we're doing this code over and over again depends on this

104
00:10:21,440 --> 00:10:30,000
condition being true. So if the code inside is not ever changing anything related to our condition,

105
00:10:30,640 --> 00:10:37,520
then it's very likely, it's actually for sure, that this loop will execute infinite number of

106
00:10:37,520 --> 00:10:42,960
times. So this is kind of the pitfall of wild loops. It's possible that if you're not careful,

107
00:10:42,960 --> 00:10:49,840
your code will execute infinite number of times and it'll just never, never terminate. And I'll

108
00:10:49,840 --> 00:10:56,240
show you how to deal with that in a couple slides. So let's try to code up this, this last woods

109
00:10:56,240 --> 00:11:06,240
program in our, just with a wild loop. So here we've got our question that we ask the user,

110
00:11:06,240 --> 00:11:12,000
do you want to go left or right? And we're going to grab the user input as a string and save it in

111
00:11:12,000 --> 00:11:17,840
a variable called where. So whatever the user types in, it'll be saved in a variable called where.

112
00:11:17,840 --> 00:11:23,680
So in my computer memory, the way this looks like, if the user types in right, that particular

113
00:11:23,679 --> 00:11:29,759
sequence of characters, that'll be saved as the variable where. So then we finish this first

114
00:11:29,759 --> 00:11:34,879
line of the code here and then we check why all the value of where is equivalent to right.

115
00:11:36,159 --> 00:11:40,239
What are we going to do? We're going to ask the user again, where do you want to go left or right?

116
00:11:41,359 --> 00:11:47,599
So I'm going to save right again and then this memory is going to look exactly the same. If the

117
00:11:47,600 --> 00:11:55,519
user keeps typing in right, I keep reassigning the variable where to have the value RIGHT.

118
00:11:56,960 --> 00:12:02,480
At some point, the user might type in left, in which case we're going to lose the binding from

119
00:12:03,600 --> 00:12:10,159
a variable where, from the specific sequence of characters RIGHT, we're going to bind it now to

120
00:12:10,159 --> 00:12:16,080
the characters LFT. So at some point, after repeating this many times, the user will type in left,

121
00:12:16,080 --> 00:12:21,600
and we're going to have where is equal to left. And at that point, when the condition is being

122
00:12:21,600 --> 00:12:27,440
checked again, Python will say, nope, this is not equivalent. So I'm not going to go inside this code

123
00:12:27,440 --> 00:12:34,320
block. I'm just going to go down here and print you got out of the loss forest. So in code, the way

124
00:12:34,400 --> 00:12:47,920
this looks is this first one here. So you're going to loss forest, go left or right. So if I type in

125
00:12:48,560 --> 00:12:54,960
right, it just keeps asking me which way to go. And at some point, I can type in left and I'm out.

126
00:12:54,960 --> 00:13:04,560
So it's pretty cool, right? We just made our own level in this text adventure. Let's have you

127
00:13:04,560 --> 00:13:12,320
think about this question. What if the user types in capital RIGHT? What do you think will happen?

128
00:13:12,320 --> 00:13:17,680
Are we going to ask the user to go left or right again? Or are we going to tell them that they

129
00:13:17,679 --> 00:13:26,239
got out of the forest? Yeah, they got out. Do you want to say why? Yeah, exactly, because it's not

130
00:13:26,239 --> 00:13:33,199
lower case. So remember when we're doing comparison so the equal equal on strings, it has to be the

131
00:13:33,199 --> 00:13:38,639
same case, right? It's case sensitive. And so capital RIGHT, or even some combination like just

132
00:13:38,639 --> 00:13:48,879
capital R, lower case RIGHT, is also going to give us that we got out. So this is counterintuitive,

133
00:13:48,879 --> 00:14:00,159
right? To what we see as humans, because we see RIGHT no matter what to be, to mean right. So work

134
00:14:00,159 --> 00:14:04,960
around for this would be to use sort of a command on the string to maybe convert everything to

135
00:14:04,960 --> 00:14:11,680
lower case, just so it sees more easily compared or something like that. Okay, so another use of

136
00:14:11,680 --> 00:14:18,560
while loops is with numbers. Okay, let's look at this example. I'm going to ask the user for an

137
00:14:18,560 --> 00:14:23,519
integer. And then I'm going to do something really simple. I'm going to print x to the screen,

138
00:14:23,519 --> 00:14:29,040
however many times the user told me. So if the user gives me four, I'm going to print x four times

139
00:14:29,039 --> 00:14:37,120
to the screen. So what is this code doing in memory? Well, the user gives me, let's say four,

140
00:14:37,120 --> 00:14:43,039
what happened step by step? First we see our while loop. So I'm going to check whether four,

141
00:14:43,039 --> 00:14:48,399
the current value of n is greater than zero. Yes, that's true. I'm going to print x to the screen.

142
00:14:49,120 --> 00:14:54,159
And then I'm going to do the next line of code that's part of this indented block, which is to take

143
00:14:54,159 --> 00:15:00,559
n and assign it to whatever n is minus one. So I'm going to lose the binding from the four and I'm

144
00:15:00,559 --> 00:15:06,639
going to take four minus one to be three, create a new object and bind n to the three. Okay,

145
00:15:07,519 --> 00:15:11,759
next Python again, it's part of a while loop. So automatically it looks at the condition again and

146
00:15:11,759 --> 00:15:17,039
says, well, now the value of n is still greater than zero. Yeah, three is still greater than zero. So

147
00:15:17,039 --> 00:15:21,600
again, we're going to lose the binding, sorry, we're printing x to the screen first. And then we lose

148
00:15:21,600 --> 00:15:29,519
the binding from the current value of n, three, two, two. Okay, so we're decrymenting n by one

149
00:15:29,519 --> 00:15:35,600
each time through this while loop. Okay, then again, Python checks the condition. It says two is

150
00:15:35,600 --> 00:15:40,800
still greater than zero. So again, we print another x to the screen and then we decrement n by one.

151
00:15:40,800 --> 00:15:46,560
So we're binding n to one. Again, Python checks the condition is one still greater than zero. Yes,

152
00:15:46,559 --> 00:15:51,919
so we print another x to the screen. So we've printed four x's now to the screen and then Python says

153
00:15:51,919 --> 00:15:57,199
now I'm going to make n to be zero. And then at this point, Python will do another check. Is it

154
00:15:57,199 --> 00:16:04,719
say it's going to say is zero greater than zero? And that's going to be false. So it's not going to

155
00:16:04,719 --> 00:16:09,519
execute the code lock anymore and the program will be done, right? There's no sort of code to

156
00:16:09,519 --> 00:16:15,439
rejoin anymore. There's just the end of the program. So we would have printed four x's to the screen.

157
00:16:15,440 --> 00:16:19,920
And this is in the Python file I gave you, you can feel free to run it to double check.

158
00:16:21,920 --> 00:16:27,680
My question is what happens, and this is a really common mistake, what happens if we forget this

159
00:16:27,680 --> 00:16:40,080
last line? We can try it. I can try it in here. Yeah, exactly. It's going to go on forever. I'll

160
00:16:40,080 --> 00:16:47,520
show you what that looks like. So this is the code when we just have it working as usual. So if I

161
00:16:47,520 --> 00:16:53,280
type in three, it prints three of those x's. But if I happen to forget to write this last line,

162
00:16:53,280 --> 00:16:59,360
I'm just going to comment it out. And if I run the program, I can enter any number. And it'll just

163
00:16:59,360 --> 00:17:05,279
keep printing stuff to the console. Right, so this is what it's just printing a whole bunch of stuff.

164
00:17:06,240 --> 00:17:09,599
So you can see this is all this stuff it printed.

165
00:17:11,920 --> 00:17:19,680
So yeah, we don't have a program that terminates because the condition here is never actually being

166
00:17:20,639 --> 00:17:26,240
the variable that's part of this condition is never actually being changed inside my loop, right?

167
00:17:26,240 --> 00:17:32,160
And so that's a big problem. When that happens, what we can do and what I just did here is I'm going

168
00:17:32,480 --> 00:17:38,560
to click the shell and hit Ctrl C or Command C on a Mac. And that will just end the program manually.

169
00:17:39,440 --> 00:17:45,680
Or you can just click the red x in the corner. So here's another example of it going infinite. And

170
00:17:45,680 --> 00:17:50,560
there's this little red, sorry red box in the corner. You can click that or you can click the three

171
00:17:50,560 --> 00:17:56,720
lines, say interrupt kernel. All that will stop the program. So in this class, we're not actually

172
00:17:56,720 --> 00:18:01,759
going to write programs that take seconds to run. So if you find yourself waiting for your program

173
00:18:01,759 --> 00:18:06,160
for more than one or two seconds, then likely you've entered an infinite loop. So you'll want to

174
00:18:06,160 --> 00:18:17,839
stop it and try to see where your program went wrong. Okay, so give this a try if you want.

175
00:18:18,799 --> 00:18:24,000
Just so you get the hang up stopping an infinite program because you'll very likely run

176
00:18:24,000 --> 00:18:31,039
write a program that that doesn't terminate. So while true, what's the condition here?

177
00:18:33,680 --> 00:18:39,599
It's just true, right? So there's no condition that's being checked. This program will run always

178
00:18:39,599 --> 00:18:47,920
an infinite times no matter what. Okay, so that's just this little you try it down here on line 44.

179
00:18:47,920 --> 00:18:53,359
Just run it. As soon as you run it, it's just going to print that to the screen over and over again.

180
00:18:53,359 --> 00:18:58,000
Be sure to click the shell to put the focus on there and hit control C or hit the red X.

181
00:19:02,319 --> 00:19:10,479
All right. So the big idea with while loops is that they can repeat the code inside them indefinitely.

182
00:19:10,479 --> 00:19:17,279
So we have to be a little bit careful with what our conditions are and whether we're actually

183
00:19:17,279 --> 00:19:23,359
making progress towards having that condition become false at some point. And when that happens,

184
00:19:23,359 --> 00:19:28,319
when they run indefinitely, you'll have to manually intervene to close the program.

185
00:19:30,720 --> 00:19:40,000
Okay, so now that we've seen a loop with a little bit of numerical computation inside it,

186
00:19:40,000 --> 00:19:44,799
so we were changing the value of an inside our loop, let's have you work on this little program.

187
00:19:44,799 --> 00:19:52,319
It's an extension of the lost woods. This is exactly the same program that I just ran a few slides ago,

188
00:19:52,319 --> 00:20:02,960
but what I want you to add is an extra printout. So when the user says write more than two times,

189
00:20:03,919 --> 00:20:09,200
the next time you ask them whether they go left or right, I'd like you to print a sad face right

190
00:20:09,200 --> 00:20:13,359
before you ask them that question. It can be on a different line. It doesn't have to be on the same line.

191
00:20:15,200 --> 00:20:21,519
And the way to do that is to try to create a new variable that's going to be like your counter.

192
00:20:21,519 --> 00:20:30,079
That keeps track of how many times the user has, how many times this while loop has repeated.

193
00:20:30,079 --> 00:20:33,200
I'll give you a couple moments to do that and then we'll write it together.

194
00:20:35,680 --> 00:20:40,480
As usual, the UTRIID is in here, so you can just uncomment the code

195
00:20:41,440 --> 00:20:51,440
with in Inspiter, it's Control-1 or Command-1 to batch uncomment, and then you can work off of this code to try to improve it.

196
00:20:54,480 --> 00:20:59,519
Okay, so does anyone have a start for me? How can we do this? You don't have to give it to me.

197
00:21:00,319 --> 00:21:06,000
In full, we can work our way up to the final program, but what's kind of the first your first thought here?

198
00:21:10,480 --> 00:21:19,440
Yes, all right.

199
00:21:19,440 --> 00:21:30,079
We can create a variable N at the beginning of our program. What do you want to make it?

200
00:21:30,079 --> 00:21:37,920
Zero. Okay, good. Zero will keep track, or N will keep track of how many times we've gone through the loop.

201
00:21:38,640 --> 00:21:45,680
So inside our program, when do we want to change N?

202
00:21:45,680 --> 00:21:48,160
Sorry, every time we go through the loop, right?

203
00:21:49,120 --> 00:21:53,680
So every time we want to go through the loop, we want to change N to be a new value,

204
00:21:54,320 --> 00:21:58,960
so maybe we want to increase it by one, so N is equal to N plus one.

205
00:22:01,279 --> 00:22:06,080
So now this will keep track of how many times we've gone through the loop, and we can actually

206
00:22:06,079 --> 00:22:16,960
double check this by printing N, right? So if we run it, and we say, right, we've gone once, right?

207
00:22:16,960 --> 00:22:24,000
We've got twice, right? We've got three times, right? So this means we're incrementing it correctly.

208
00:22:24,720 --> 00:22:29,519
Now, what can I do with this variable N? Now that I have it, and I know it's incrementing correctly.

209
00:22:31,359 --> 00:22:31,839
Yeah.

210
00:22:31,839 --> 00:22:32,959
Set up an if statement.

211
00:22:34,159 --> 00:22:41,279
Yep, we can set up an if statement, so we can check if that value of N is greater than two,

212
00:22:41,279 --> 00:22:46,240
right? According to this specification here, what do you want to do when if is greater than two?

213
00:22:48,079 --> 00:22:50,559
Print something, right? So we can print the sad face.

214
00:22:54,399 --> 00:23:00,240
And let's try to run it now. So if we immediately hit left, right? It still works.

215
00:23:00,319 --> 00:23:06,799
If we go right one time, nothing, right? Another time, nothing, right? A last time sad.

216
00:23:06,799 --> 00:23:10,480
And from now on, it's going to keep showing me the sad face.

217
00:23:16,640 --> 00:23:20,160
Questions about this code? Yeah.

218
00:23:20,240 --> 00:23:26,640
Is it possible to test for something that's non equivalent? Like, is there a sign that's different than the code?

219
00:23:28,240 --> 00:23:31,759
Can we check for not equivalency here? Yeah.

220
00:23:33,600 --> 00:23:37,600
So this particular check checks for what the user typed in.

221
00:23:41,200 --> 00:23:48,560
It's possible we can add this if statement that checks for the N in here and something else.

222
00:23:48,559 --> 00:23:55,200
But then we would have to have maybe another, I'd have to think about it.

223
00:23:55,200 --> 00:23:58,799
But it is, it might be possible to try to combine them inside the while loop.

224
00:23:58,799 --> 00:24:01,839
But they're easy to simplify a lot of things.

225
00:24:01,839 --> 00:24:05,200
Oh, to do not equals. That would be the not equal sign. Yeah.

226
00:24:07,119 --> 00:24:12,159
So another thing we can do with while loops is to iterate through numbers in a sequence.

227
00:24:13,120 --> 00:24:19,600
If we do this, there's a really common pattern, which actually leads us to the next kind of loop we're

228
00:24:19,600 --> 00:24:25,200
going to see on the next slide. But the pattern, when you want to iterate through numbers in a sequence,

229
00:24:25,200 --> 00:24:29,360
is you first set a loop variable before the while loop.

230
00:24:30,240 --> 00:24:34,880
Inside the condition for the loop, you do some sort of check without variable.

231
00:24:35,920 --> 00:24:38,320
So N was my loop variable outside the loop.

232
00:24:38,319 --> 00:24:40,720
And then I test it inside the while loop.

233
00:24:40,720 --> 00:24:42,559
So N is less than, less than 5.

234
00:24:43,279 --> 00:24:47,839
And then within the while loop, you can do whatever commands you want to do with that N.

235
00:24:48,399 --> 00:24:51,919
But then you have to remember to change it in some way.

236
00:24:51,919 --> 00:24:57,679
Because if you don't change it in some way, this while loop condition will always be true.

237
00:24:58,319 --> 00:25:02,240
So here I'm incrementing N by 1 because it starts from 0.

238
00:25:02,879 --> 00:25:06,000
I want N to get to something, right?

239
00:25:06,000 --> 00:25:09,039
Something above 5, which will lead to my condition becoming false.

240
00:25:11,920 --> 00:25:16,640
So this pattern is actually exists in a bunch of different programs.

241
00:25:16,640 --> 00:25:19,599
So here's a program that calculates factorial for me.

242
00:25:21,839 --> 00:25:24,000
And here I'm calculating four factorial.

243
00:25:24,000 --> 00:25:25,759
I'm not excited about the number four.

244
00:25:25,759 --> 00:25:27,200
That's four factorial.

245
00:25:27,839 --> 00:25:28,640
How do we do this?

246
00:25:29,599 --> 00:25:32,079
Well, there's a lot of things I'm initializing here.

247
00:25:32,879 --> 00:25:40,399
But the more you work with loops, you'll get used to seeing what is the loop variable.

248
00:25:41,119 --> 00:25:43,839
So I is actually going to be my loop variable.

249
00:25:45,359 --> 00:25:49,199
Here it's being set to some value, initially, outside the loop.

250
00:25:50,319 --> 00:25:54,000
Inside the conditional, I'm doing some condition check with it.

251
00:25:56,879 --> 00:26:01,759
Inside the body of that conditional, I'm changing it in some way.

252
00:26:01,759 --> 00:26:08,079
That gives me some sort of, that takes me to the end of my conditional here.

253
00:26:09,119 --> 00:26:10,319
So I'm setting i to 0.

254
00:26:10,319 --> 00:26:12,799
I'm incrementing i by 1 each time through the loop.

255
00:26:13,359 --> 00:26:17,279
And I'm making forward progress towards making i greater than x.

256
00:26:18,799 --> 00:26:21,039
At which point my conditional will become false.

257
00:26:23,440 --> 00:26:28,799
The rest of the code, x is equal to four, just sets the thing I want to get the factorial of.

258
00:26:29,759 --> 00:26:33,839
And this factorial variable is kind of my running product.

259
00:26:33,839 --> 00:26:37,440
So it's the thing that I'm going to keep multiplying to figure out what the factorial is.

260
00:26:38,159 --> 00:26:40,240
So here I'm initializing it to one.

261
00:26:40,240 --> 00:26:44,000
And inside the loop, I'm multiplying it by my loop variable every time.

262
00:26:45,039 --> 00:26:49,519
So I'm not going to do a memory diagram for this example.

263
00:26:49,519 --> 00:26:51,039
But I will do the Python tutor.

264
00:26:53,119 --> 00:26:55,680
And I'm going to step through to show you exactly what this is doing.

265
00:26:55,680 --> 00:26:59,600
So x is four, i is one originally, and factorial is one.

266
00:26:59,600 --> 00:27:01,759
So x is the thing I want to get the factorial of.

267
00:27:02,400 --> 00:27:08,000
i is going to be my loop variable, and factorial is my running product.

268
00:27:09,039 --> 00:27:13,120
So next step, i1 is less than or equal to four.

269
00:27:13,120 --> 00:27:14,320
So I'm going to enter the loop.

270
00:27:15,360 --> 00:27:20,640
Python will calculate the factorial as whatever it is right now multiplied by 1i.

271
00:27:21,039 --> 00:27:21,920
So it's still one.

272
00:27:22,720 --> 00:27:27,360
And then I'm going to increment i from whatever it is now to one.

273
00:27:27,360 --> 00:27:36,000
So I just want to mention this i plus equals one is equivalent to saying i equals i plus one.

274
00:27:37,039 --> 00:27:40,320
And this is true no matter what variable you have here.

275
00:27:40,320 --> 00:27:48,000
Basically, if you have fact times equals two or something like that,

276
00:27:48,000 --> 00:27:53,359
that basically means factorial equals fact times two.

277
00:27:54,559 --> 00:27:56,400
So that's kind of the pattern here.

278
00:27:56,400 --> 00:27:58,559
These are equivalent and these are equivalent.

279
00:27:58,559 --> 00:28:00,640
This is just a shorthand notation and programming.

280
00:28:01,839 --> 00:28:03,200
So that's what this line here means.

281
00:28:03,200 --> 00:28:06,640
i plus equals one means i equals i plus one.

282
00:28:08,160 --> 00:28:12,000
So at this line here, I'm taking whatever i is and adding one to it, too.

283
00:28:13,119 --> 00:28:14,640
And then I do the check again.

284
00:28:14,640 --> 00:28:16,800
And remember, Python does this automatically, right?

285
00:28:16,800 --> 00:28:18,800
Because we're using a y-loop.

286
00:28:18,800 --> 00:28:23,600
It goes back to the condition and checks it again using these new values for the variables.

287
00:28:24,160 --> 00:28:26,160
Two is still less than or equal to four.

288
00:28:26,160 --> 00:28:28,080
So again, we go inside the loop body.

289
00:28:28,560 --> 00:28:32,400
Factorial is whatever it is right now, one, multiplied by i2.

290
00:28:34,800 --> 00:28:37,200
i is going to be two plus one, three.

291
00:28:38,400 --> 00:28:41,120
And then again, I'm checking that three is less than or equal to four.

292
00:28:41,120 --> 00:28:42,000
It still is.

293
00:28:42,000 --> 00:28:45,440
So then we're going to do factorial is whatever it is now, two.

294
00:28:45,440 --> 00:28:47,839
Multiply by whatever i is, three.

295
00:28:47,839 --> 00:28:48,799
So now it's six.

296
00:28:49,680 --> 00:28:52,799
i is going to be one more than what it is right now, four.

297
00:28:52,799 --> 00:28:55,200
Four is still less than or equal to four.

298
00:28:55,200 --> 00:28:57,359
We're going to go inside the body.

299
00:28:58,000 --> 00:29:01,839
Factorial is whatever it is right now, six, multiplied by four.

300
00:29:03,119 --> 00:29:04,400
And then 24.

301
00:29:04,400 --> 00:29:08,160
And then i is going to be whatever it is right now, plus one, five.

302
00:29:08,800 --> 00:29:11,360
At this point, Python says is five less than or equal to four.

303
00:29:12,160 --> 00:29:12,480
No.

304
00:29:13,519 --> 00:29:15,040
And then it breaks the loop.

305
00:29:15,040 --> 00:29:18,720
And it goes to print this statement for factorial is.

306
00:29:19,519 --> 00:29:22,320
And then it grabs whatever the value of the factorial is.

307
00:29:22,320 --> 00:29:28,000
So here, I'm using this f string print that notation that we learned about last lecture.

308
00:29:29,040 --> 00:29:31,440
So I encourage you to go through it yourself.

309
00:29:32,480 --> 00:29:33,519
Just step by step.

310
00:29:33,519 --> 00:29:36,080
That's what Python tutors really, really useful for.

311
00:29:36,639 --> 00:29:40,960
Okay, so let's look at a different kind of loop called a for loop.

312
00:29:40,960 --> 00:29:42,000
Okay.

313
00:29:42,000 --> 00:29:49,679
And the for loop is going to allow us to rewrite that special kind of wild loop that we saw,

314
00:29:49,679 --> 00:29:54,480
where we initialize a variable, we test the variable, we do something to the variable within the code,

315
00:29:54,480 --> 00:29:56,480
in a more efficient, more readable way.

316
00:29:57,279 --> 00:29:59,519
So in terms of our Netflix example,

317
00:30:01,039 --> 00:30:04,559
a for loop would be equivalent to something like Netflix, right,

318
00:30:04,559 --> 00:30:06,000
if you're not interacting with it,

319
00:30:06,000 --> 00:30:08,720
cuts you off after four episodes, right, to save bandwidth.

320
00:30:09,440 --> 00:30:14,799
And so there's a sequence of four episodes it knows it's going to go through if there's nothing,

321
00:30:14,799 --> 00:30:16,159
if you're not interacting with it.

322
00:30:16,960 --> 00:30:20,960
So if you've already gone through your sequence of four episodes,

323
00:30:20,960 --> 00:30:23,039
you're allowed to watch without any interaction,

324
00:30:23,759 --> 00:30:24,639
it's done, right?

325
00:30:24,639 --> 00:30:25,440
It cuts you off.

326
00:30:25,440 --> 00:30:26,720
It says, are you still watching?

327
00:30:27,599 --> 00:30:32,399
But if there are still more episodes, if it only showed you two out of the four,

328
00:30:32,400 --> 00:30:37,200
then it's going to keep showing you more episodes until it's shown you the four.

329
00:30:39,840 --> 00:30:45,360
So this is the program we had with wild loops a couple slides ago.

330
00:30:47,280 --> 00:30:49,360
And remember, we were initializing a variable,

331
00:30:49,360 --> 00:30:51,759
we were testing the variable, some condition here,

332
00:30:51,759 --> 00:30:56,240
and then we were incrementing the variable or doing something that gives us nice forward

333
00:30:56,240 --> 00:30:59,200
progress towards making this condition false.

334
00:31:00,080 --> 00:31:01,280
But it's really verbose.

335
00:31:02,400 --> 00:31:06,480
Certainly it works, you can do it, but it's very easy to forget to do this,

336
00:31:06,480 --> 00:31:10,000
something like this, in which case you'll get an infinite loop.

337
00:31:10,720 --> 00:31:16,640
With a four loop, those four lines of code just look like these two lines of code.

338
00:31:18,240 --> 00:31:21,600
So if there's a sequence of values you ever want to iterate over,

339
00:31:21,600 --> 00:31:24,000
that's what four loops are useful for.

340
00:31:25,680 --> 00:31:30,160
So the syntax for a four loop looks a little bit different than a wild loop.

341
00:31:30,160 --> 00:31:32,480
It starts with a four keyword.

342
00:31:33,360 --> 00:31:36,640
This is a variable that you get to name, whatever name you'd like.

343
00:31:37,200 --> 00:31:44,640
The keyword in tells Python, I'm going to make this variable take on values in this sequence.

344
00:31:47,279 --> 00:31:54,640
And again, we have a colon that tells Python, we're going to start a code in indentation here.

345
00:31:54,640 --> 00:31:58,720
And whatever lines of code you have that are indented are going to be executed.

346
00:32:00,240 --> 00:32:02,480
However many sequence of values you have.

347
00:32:03,759 --> 00:32:09,120
So the first time through the loop, Python will make this variable name take on the first

348
00:32:09,120 --> 00:32:12,400
value in the sequence. And then it's going to execute this code.

349
00:32:14,320 --> 00:32:20,160
Automatically, Python will, after it finishes executing these codes, it will go back

350
00:32:20,720 --> 00:32:24,080
and set this variable have the next value in the sequence

351
00:32:24,800 --> 00:32:27,040
and execute the same lines of code.

352
00:32:27,119 --> 00:32:31,599
When it's done, it's going to make the variable here take on the next values in the sequence

353
00:32:31,599 --> 00:32:33,200
and execute those lines of code.

354
00:32:33,200 --> 00:32:39,440
And so these lines of code will effectively be executed, however many values you have in your sequence.

355
00:32:42,000 --> 00:32:47,359
So more practically speaking, here we have a variable, so n in this case,

356
00:32:47,920 --> 00:32:52,960
in some some sequence of values, in this case I'm saying range five,

357
00:32:53,680 --> 00:32:55,279
we're going to print the value of n.

358
00:32:55,599 --> 00:32:58,639
So I'm going to introduce range now.

359
00:32:58,639 --> 00:33:06,559
Range is a way for us to grab numerical sequence of values that have some sort of pattern.

360
00:33:07,599 --> 00:33:13,200
So if we just say range some number, the pattern is we started zero and we go up to but not

361
00:33:13,200 --> 00:33:19,039
including that number. So range five means the sequence of values Python will iterate over

362
00:33:19,039 --> 00:33:24,480
our zero one two three and four. Range ten means zero one two three four five six seven eight nine.

363
00:33:24,480 --> 00:33:28,720
Right, so we go up to but not including the value in the range starting from zero.

364
00:33:30,079 --> 00:33:36,079
So each time through the loop, Python will change the value of n to be every one of those values

365
00:33:36,079 --> 00:33:43,039
automatically. So these two lines here for n and range five print n, the way they look like

366
00:33:43,039 --> 00:33:48,799
behind the scenes and Python does this for you is first it the first time it encounters the

367
00:33:48,799 --> 00:33:56,639
for loop it sets n to be zero. That's the first value in my sequence and then it prints the value of n

368
00:33:56,639 --> 00:34:02,399
zero. Next time through the loop, Python will say okay I've done what you asked me to do inside the

369
00:34:02,399 --> 00:34:09,440
colu print n. I'm going to make n have the next value in my sequence. So it loses the binding from

370
00:34:09,440 --> 00:34:15,200
the zero and makes it be one. Okay, I've made n one now what do you want me to do? Well, I'm going

371
00:34:15,200 --> 00:34:20,240
to execute whatever's in the in the in the in the printed print n. So I'm going to print one.

372
00:34:21,039 --> 00:34:26,400
So I've already printed zero then I've printed one. I'm finished executing the code inside the loop.

373
00:34:26,400 --> 00:34:31,679
So now n is going to get the next value in the sequence lose the binding from one and you get two

374
00:34:32,559 --> 00:34:39,280
and so on and so on and by the end this program will have printed zero one two three and four.

375
00:34:40,159 --> 00:34:49,360
Every single value in my range. So it turns out that we can actually make range have three

376
00:34:49,360 --> 00:34:54,320
values inside the parentheses not just one. One is sort of shorthand notation if you ever want to

377
00:34:54,320 --> 00:35:00,480
start from zero and want to go and go up to in including sorry up to but not including the value

378
00:35:00,480 --> 00:35:07,119
in the parentheses. But you can actually give it three values a start a stop and a step and Python

379
00:35:07,119 --> 00:35:13,839
will automatically generate a sequence of values that matches this pattern. So this should seem

380
00:35:13,839 --> 00:35:20,480
familiar to you right because we've seen something like this when we were doing strings right except

381
00:35:20,480 --> 00:35:25,359
that we weren't doing parentheses we were doing square brackets and we weren't doing commas we

382
00:35:25,359 --> 00:35:32,319
were doing colonists. But it's the exact same idea. Here we're generating numbers actual integers

383
00:35:32,320 --> 00:35:39,680
that we want a loop variable to take on. So if we will start in step start by default is zero

384
00:35:39,680 --> 00:35:47,039
and step by default is one. If we will meet step by default it will be one. So here i and range

385
00:35:47,039 --> 00:35:55,039
four the variable i will take on the values zero one two and three. i and range three comma five i

386
00:35:55,039 --> 00:35:59,360
will take on the values three and four. So we go up to but not including the five.

387
00:35:59,519 --> 00:36:08,480
Think about these three questions. So what are the range of values in the first one and what are we

388
00:36:08,480 --> 00:36:15,519
going to print? So in one four one what range of values are we going to have i b? So i is going to be one.

389
00:36:19,920 --> 00:36:28,960
One two three yes and we stop. We go up to but not including the stop which is a four.

390
00:36:29,680 --> 00:36:38,800
And what are we printing? Yeah one two three just all. How about the next one? J. What will the values of

391
00:36:38,800 --> 00:36:48,960
j be? One three and that's it. Yep because we're going every other every other value. And what are we

392
00:36:48,960 --> 00:36:55,440
printing here? Yeah exactly. So we're doing an operation with each one of these j's. So we're

393
00:36:55,440 --> 00:37:05,440
going to print two and then six and how about the last one? We're stepping backward right the

394
00:37:05,440 --> 00:37:16,320
negative one. So what's our start? Four and then three two one and that's it. We're going to

395
00:37:16,320 --> 00:37:20,880
down two but not including the end right so we're not going to include the zero. And what are we

396
00:37:20,880 --> 00:37:32,000
printing here? Four dollar signs for the first time and then three dollar signs and then two dollar

397
00:37:32,000 --> 00:37:42,079
signs and then one dollar. Exactly. So the body obviously can do operations and can manipulate that

398
00:37:42,079 --> 00:37:48,960
loop variable. So each time that variable goes through it changes right it changes and then you

399
00:37:48,960 --> 00:38:00,079
can use that to your advantage. So here's another example of something useful. We can use four loops

400
00:38:00,079 --> 00:38:05,199
to keep track of how many times we're going through a loop. And in this particular case we're writing

401
00:38:05,199 --> 00:38:11,679
a program that sums all the values from zero all the way up to but not including whatever is in here.

402
00:38:12,639 --> 00:38:20,719
Right so how are we doing this? Let's do the memory diagram. We've got my sum is equal to zero as the

403
00:38:20,719 --> 00:38:29,440
first line. So this will be zero in memory right bound to the name my sum. And then the four

404
00:38:29,440 --> 00:38:38,159
loops will generate for me the values zero through nine right including. So I the first time through

405
00:38:38,159 --> 00:38:44,639
the loop will have a value of zero. So we're going to do the operations or the code we're asked to do

406
00:38:44,639 --> 00:38:50,799
when i is zero. So my sum will be whatever it is right now plus whatever i is zero so it stays zero.

407
00:38:52,399 --> 00:38:58,719
Python is done with the code inside so now it's going to take i and change it to the next value in

408
00:38:58,719 --> 00:39:06,079
the sequence one. Okay now we're going to do again the stuff inside the loop with i being one so we're

409
00:39:06,079 --> 00:39:11,599
going to take my sum whatever it is right now and add one to it. So it's one. And then we're done

410
00:39:11,599 --> 00:39:16,719
there so Python will take i to be the next value in the sequence two. And then we're going to do

411
00:39:16,719 --> 00:39:24,079
again my sum is whatever it is now one plus whatever i is now two so it's three. Again i will increment

412
00:39:24,079 --> 00:39:28,719
to three automatically right that's next value in the sequence so my sum will get a value of six

413
00:39:29,679 --> 00:39:36,399
and then i will change to four so on and so on and so on until i becomes eight right that's sort

414
00:39:36,399 --> 00:39:44,719
of towards the end when i is eight the value of my sum is 36 right zero plus zero plus one plus two

415
00:39:44,719 --> 00:39:51,119
all the way up to eight is 36 and then when i becomes nine Python will take my sum whatever it is

416
00:39:51,119 --> 00:40:00,000
right now 36 add nine to it to give us 45. Okay and then that's the end of the program right there's

417
00:40:00,000 --> 00:40:07,599
nothing else to do except to print my sum so at the end of this loop it's gone through 10 times

418
00:40:07,599 --> 00:40:15,359
adding zero all the way up to nine we're going to print 45. Yeah. So I'm trying running it

419
00:40:15,360 --> 00:40:24,400
in 45 and then just like zero one two three four three four three four. Oh maybe you have another

420
00:40:24,400 --> 00:40:28,640
print statement or it might be part of another program that's being run beforehand that you didn't

421
00:40:28,640 --> 00:40:40,640
comment out. Okay. Yeah that's question. The plus equals what it means oh it just means it would

422
00:40:40,639 --> 00:40:55,599
be like my sum equals my sum plus i it's just shorthand notation because most of your variable

423
00:40:55,599 --> 00:41:01,039
things might be really long and it's really annoying to retie them and so that's generally why that

424
00:41:01,039 --> 00:41:07,359
shorthand notation exists. Yeah but it basically means take whatever my sum is and add i to it

425
00:41:07,360 --> 00:41:17,920
and save it back into the variable my sum. Okay let's have you try this code real quick so here is

426
00:41:17,920 --> 00:41:26,480
code it's already on the Python file to start out with I want you to have this code it's pretty

427
00:41:26,480 --> 00:41:32,880
close to working but there's one issue so we have this for loop that starts at start at ends at end

428
00:41:33,440 --> 00:41:38,000
and we're keeping a running sum and then we're printing the sum at the end so very similar what we

429
00:41:38,000 --> 00:41:45,599
just saw but what I want this code to do is I want it to go and sum up the start and the end so I

430
00:41:45,599 --> 00:41:53,760
I want if I have start is 3 and end is 5 I want it to add 3 plus 4 plus 5 right and so this code is

431
00:41:53,760 --> 00:42:02,800
not doing quite that and I would like you to fix it or to tell me how to fix it so it's down here

432
00:42:03,039 --> 00:42:14,400
online 140-ish. First thing you should do is run it and maybe see what answer it actually gives you

433
00:42:15,119 --> 00:42:24,559
so I just ran it it gave me a 7. When you're encountering an output that's not quite what you expect

434
00:42:24,559 --> 00:42:28,480
one of the first things to do you can obviously use the Python tutor but another thing you can do

435
00:42:28,480 --> 00:42:37,760
is put print statements at various places useful places would be inside the for loop so here we

436
00:42:37,760 --> 00:42:44,800
can print I right that's a reasonable thing to print out and maybe we'll see exactly what values

437
00:42:44,800 --> 00:42:50,559
of I we are adding because we know the summing works right we just wrote the program on the previous

438
00:42:50,559 --> 00:42:58,159
line or previous slide so we got 347 which is a little confusing let's make our print statement be

439
00:42:58,159 --> 00:43:06,879
a little bit better i equals comma and then print the actual value of i so what do you guys notice

440
00:43:06,879 --> 00:43:14,559
i is 3 i is 4 and then it prints the sum 7 what's the problem with this code yeah

441
00:43:17,839 --> 00:43:25,119
yeah we're not adding 5 right we're we're just adding 3 0 originally plus 3 plus 4 and we've

442
00:43:25,119 --> 00:43:36,559
never added 5 so how can we fix that yeah we can do n plus 1 exactly so the range remember grabs the

443
00:43:36,559 --> 00:43:44,639
oh plus one the range grabs these values you know as as numbers that it's working with so start is

444
00:43:44,639 --> 00:43:51,679
okay end is okay but we go up to but not including end right so if we go to n plus 1 we're going to go

445
00:43:51,679 --> 00:44:01,039
up to but not including n plus 1 so if we run it now it looks much better so we've got i is 3 i's

446
00:44:01,039 --> 00:44:13,039
4 i's 5 and the sum is 12 per so print statements very useful when debugging code questions about

447
00:44:13,039 --> 00:44:22,880
this one or was this is this makes sense okay um the last slide i want to do before we do a summary

448
00:44:22,880 --> 00:44:29,679
is just to show you that factorial code we saw using a while loop a few slides back so it looks

449
00:44:29,679 --> 00:44:34,559
really verbose right we kind of to think about it for a while before we realize what it's actually

450
00:44:34,559 --> 00:44:39,920
doing um but it was you know calculating the factorial obviously good variable names helped us

451
00:44:39,920 --> 00:44:47,599
figure that out that same code in a for loop looks like this where the for loop looks like this so

452
00:44:47,599 --> 00:44:53,599
we still have the initialization of x to 4 we still initialize our factorial right our running

453
00:44:53,599 --> 00:45:01,760
product uh to a 1 but we're losing that those the four lines of code that kind of make up that

454
00:45:01,760 --> 00:45:09,360
pattern of uh changing numbers with while loops into two so this line i equals 1 this while loop

455
00:45:09,360 --> 00:45:16,720
with the conditional and this incrementing of i become the for loop and that's it the for loop

456
00:45:16,720 --> 00:45:22,800
takes care of all of that the initialization the increment and going up to but not including

457
00:45:23,840 --> 00:45:29,760
the the last value right x plus 1 so we're going to take multiply the factorial with one then two

458
00:45:29,760 --> 00:45:39,280
then three then four all the way up to and including x okay so the big idea about for loops

459
00:45:39,280 --> 00:45:44,720
is they're going to repeat however long the sequences right so you're able to repeat certain code

460
00:45:44,720 --> 00:45:49,040
a set number of times which is really useful in some situations while loops were useful in

461
00:45:49,040 --> 00:45:54,560
situations where you didn't know how many times you might want to repeat um the code so quick summary

462
00:45:54,560 --> 00:46:00,800
we saw some looping mechanisms today it was a lot of syntax i know but the finger exercises for

463
00:46:00,800 --> 00:46:07,920
today will certainly help m it x um also has extra help um extra exercises it's really important to

464
00:46:08,480 --> 00:46:13,840
to do them just to get the mental model for how exactly these loops work right and how they how they

465
00:46:14,480 --> 00:46:19,360
how they assign variables and how they do the checks behind the scenes right and it'll help you get

466
00:46:19,360 --> 00:46:26,079
faster at at writing code and at doing quizzes as well okay so that's it for today

467
00:46:37,920 --> 00:46:40,900
you

