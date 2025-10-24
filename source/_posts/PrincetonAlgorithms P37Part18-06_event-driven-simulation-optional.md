---
title: PrincetonAlgorithms P37Part18 06_event Driven Simulation Optional
---

1
00:00:00,000 --> 00:00:07,000
Now we'll look at an interesting application of priority cues that's actually representative

2
00:00:07,000 --> 00:00:14,240
of a whole family of critically important applications in applications of computing.

3
00:00:14,240 --> 00:00:18,199
It's called event driven simulation.

4
00:00:18,199 --> 00:00:25,800
And the idea is we want to study some property of the natural world by simulating it.

5
00:00:25,800 --> 00:00:32,359
And that's something that's very, very common in scientific inquiry nowadays.

6
00:00:32,359 --> 00:00:35,600
And this is a very natural idea.

7
00:00:35,600 --> 00:00:40,039
Actually, the idea goes back to Einstein.

8
00:00:40,039 --> 00:00:47,519
So we want to simulate the motion of in-moving particles that might collide with a priority

9
00:00:47,519 --> 00:00:53,079
– this kind of simulation is enabled by priority cues.

10
00:00:53,079 --> 00:00:58,759
Without something like priority cues, you couldn't do this for a large number of particles

11
00:00:58,759 --> 00:01:04,840
because it would require quadratic time and simply can't be afforded for a huge number

12
00:01:04,840 --> 00:01:06,640
of particles.

13
00:01:06,640 --> 00:01:12,319
So let's take a look at how we can possibly make this happen.

14
00:01:12,319 --> 00:01:17,840
So we use a simple scientific model called the hard disk model.

15
00:01:17,840 --> 00:01:22,799
And then this is just first simplicity to get this done and just part of a lecture.

16
00:01:22,799 --> 00:01:26,560
Clearly, these things can be extended in many ways.

17
00:01:26,560 --> 00:01:30,560
So we're going to have moving particles that either collide with each other and with the

18
00:01:30,560 --> 00:01:32,040
walls.

19
00:01:32,040 --> 00:01:37,800
And each particle is a disk that's got known position, velocity, mass, and radius.

20
00:01:37,800 --> 00:01:39,640
And there's no other forces involved.

21
00:01:39,640 --> 00:01:45,200
It gets more complicated if there's more forces, like gravity involved.

22
00:01:45,200 --> 00:01:48,799
And this one by itself is very significant.

23
00:01:48,799 --> 00:01:57,640
As I mentioned, goes back to a study of physics with trying to understand pressure and temperature

24
00:01:57,640 --> 00:02:04,719
in Einstein's famous experiment on pollen grains showing that their motion was browning

25
00:02:04,719 --> 00:02:06,520
in a random.

26
00:02:06,520 --> 00:02:13,159
So whether it's individual atoms and molecules or it's some bigger kinds of particles, it's

27
00:02:13,159 --> 00:02:20,240
a complex dynamic situation that is better understood through computer simulation.

28
00:02:20,240 --> 00:02:26,319
And nowadays, that means priority cues.

29
00:02:26,319 --> 00:02:34,719
So as a warm-up, here's the code to implement bouncing balls without the collisions.

30
00:02:34,719 --> 00:02:44,079
And this is an elementary programming exercise that is the code at the left has the effect

31
00:02:44,079 --> 00:02:46,319
shown at the right.

32
00:02:46,319 --> 00:02:56,240
So we have a data type called ball that represents just one of the particles and has instance

33
00:02:56,240 --> 00:03:00,360
variables that has the position in the velocity.

34
00:03:00,360 --> 00:03:02,400
So we make a bunch of them.

35
00:03:02,400 --> 00:03:10,720
And then we have a wild loop, which is just every 50 milliseconds.

36
00:03:10,720 --> 00:03:18,560
Clear the whole drawing and then move the balls a little bit and then draw them in their

37
00:03:18,560 --> 00:03:19,560
current position.

38
00:03:20,280 --> 00:03:32,280
The only thing that moves operation does is to update the position of the ball by the velocity,

39
00:03:32,280 --> 00:03:34,360
which is just another number.

40
00:03:34,360 --> 00:03:36,319
And then it does the bouncing off the walls.

41
00:03:36,319 --> 00:03:42,879
If it happens to hit the left wall, you reflect the x coordinate and the right wall.

42
00:03:42,879 --> 00:03:44,680
Reflect the x coordinate and bottom and top.

43
00:03:44,680 --> 00:03:47,159
You do the same for the y coordinates.

44
00:03:47,159 --> 00:03:53,680
So this is an easy programming exercise given the right display primitives.

45
00:03:53,680 --> 00:04:01,079
And it's a good exercise in object or error programming showing how just one implementation,

46
00:04:01,079 --> 00:04:06,240
then we can use that same implementation to simulate a number of instances.

47
00:04:06,240 --> 00:04:10,400
So that's our starting point in terms of the code.

48
00:04:10,400 --> 00:04:15,240
So this is the implementation of the ball class.

49
00:04:15,240 --> 00:04:22,079
So it's got position and velocity, as I mentioned, and every ball has a radius.

50
00:04:22,079 --> 00:04:25,800
And then there's a constructor and maybe we have a constructor that takes arguments that

51
00:04:25,800 --> 00:04:30,879
would initialize the position and the velocity, or maybe initialize them to random position

52
00:04:30,879 --> 00:04:32,840
if there's no arguments.

53
00:04:32,840 --> 00:04:35,360
And then here's the move method.

54
00:04:35,360 --> 00:04:41,759
And the move method, again, most of the times just takes the x and y coordinates and adds

55
00:04:41,759 --> 00:04:49,040
the current velocity times the speed constant, dt, or speed variable that's given as argument

56
00:04:49,040 --> 00:04:50,639
dt.

57
00:04:50,639 --> 00:04:54,639
And then these tests are for whether it hits the walls, in which case you have to flip

58
00:04:54,639 --> 00:04:58,160
the x or y velocity.

59
00:04:58,160 --> 00:05:02,280
And then draw is just using standard draw, just draw the ball.

60
00:05:02,279 --> 00:05:07,639
So that's all the code for doing the bouncing ball simulation.

61
00:05:07,639 --> 00:05:13,759
Now what's missing in this is what happens when the balls collide with each other.

62
00:05:13,759 --> 00:05:22,519
And to cope with that, we need to do both a little bit of high school physics and a little

63
00:05:22,519 --> 00:05:24,879
bit of basic computer science.

64
00:05:24,879 --> 00:05:29,079
So the physics problem is exactly what happens when two balls hit and they bounce off each

65
00:05:29,079 --> 00:05:33,719
other according to some well understood physical process.

66
00:05:33,719 --> 00:05:35,680
And that's the high school physics.

67
00:05:35,680 --> 00:05:42,639
And the CS problem is how and when do we exactly do these computations for each of the balls?

68
00:05:42,639 --> 00:05:45,560
And how can we do it efficiently?

69
00:05:45,560 --> 00:05:50,319
That is in log n time versus quadratic time.

70
00:05:50,319 --> 00:05:54,839
Because if we have a computational process that takes quadratic time, then it's not going

71
00:05:54,839 --> 00:05:55,839
to scale.

72
00:05:55,839 --> 00:05:58,759
We're not going to be able to do large numbers of particles.

73
00:05:58,759 --> 00:06:04,199
Simulations of the real world usually we wind up doing huge amounts of data and we cannot

74
00:06:04,199 --> 00:06:06,360
have a quadratic algorithm.

75
00:06:06,360 --> 00:06:10,439
This is just a first indication of that.

76
00:06:10,439 --> 00:06:15,039
Why if you want to do this simulation, you better know about some data structure like

77
00:06:15,039 --> 00:06:16,439
prior to cues.

78
00:06:16,439 --> 00:06:20,240
If you try to do it without it, you're not going to be successful.

79
00:06:20,240 --> 00:06:23,680
All right, so let's take a look at what happens.

80
00:06:23,680 --> 00:06:28,480
So there's a number of things that you might consider trying.

81
00:06:28,480 --> 00:06:33,520
So one idea is a so-called time driven simulation.

82
00:06:33,520 --> 00:06:40,240
And we just say we're going to update everything every DT seconds.

83
00:06:40,240 --> 00:06:42,360
Then we go ahead and do that.

84
00:06:42,360 --> 00:06:46,040
And then we could check if there's a collision.

85
00:06:46,040 --> 00:06:50,840
If the two balls, some pieces of two balls are occupying the same space.

86
00:06:50,840 --> 00:06:56,080
And if there is, then we could roll back time just a little bit and try to figure out exactly

87
00:06:56,079 --> 00:07:00,879
the moment at which they collided and then figure out how their position of velocity should

88
00:07:00,879 --> 00:07:04,839
change accordingly and then continue the simulation.

89
00:07:04,839 --> 00:07:07,079
But this has a huge problem.

90
00:07:07,079 --> 00:07:11,759
The first one is that you have to check all pairs of balls for overlap.

91
00:07:11,759 --> 00:07:13,039
So that's quadratic.

92
00:07:13,039 --> 00:07:16,839
So it's going to be really a lot of overall.

93
00:07:16,839 --> 00:07:21,159
It actually not going to be able to do it for a huge value of n.

94
00:07:21,160 --> 00:07:29,960
But the other thing is even if n is small, if you do a very small DT, then you're just doing

95
00:07:29,960 --> 00:07:31,640
this calculation over and over again.

96
00:07:31,640 --> 00:07:37,240
And there's just too much computation moving the balls a little bit at a time.

97
00:07:37,240 --> 00:07:43,480
On the other hand, if you try and prove things by making DT too large, you might completely

98
00:07:43,480 --> 00:07:47,360
miss a collision as shown in the example at right.

99
00:07:47,360 --> 00:07:54,160
So figuring out the value of DT that would really work is a huge problem for the time driven

100
00:07:54,160 --> 00:07:55,879
simulation.

101
00:07:55,879 --> 00:08:01,080
Instead, what we want to do is a called an event driven simulation.

102
00:08:01,080 --> 00:08:05,800
And this is a very general concept that's useful in all kinds of contexts.

103
00:08:05,800 --> 00:08:09,000
And we're only going to change things when something happens.

104
00:08:09,000 --> 00:08:14,520
So since the only thing that matters is collisions, we're going to figure that particles move

105
00:08:14,519 --> 00:08:17,319
in a straight line between collisions.

106
00:08:17,319 --> 00:08:22,839
And what we're going to do is focus only on the times when the collisions are going to occur.

107
00:08:22,839 --> 00:08:27,159
And so the way we're going to do that is to maintain a priority queue.

108
00:08:27,159 --> 00:08:32,519
And that priority queue is going to have all the possible collisions that could happen in the future.

109
00:08:32,519 --> 00:08:35,079
And they're going to be prioritized by time.

110
00:08:35,079 --> 00:08:42,120
And when we remove the minimum element from the priority queue, that's the next collision that we have to deal with.

111
00:08:42,120 --> 00:08:44,519
And so we have two phases.

112
00:08:44,519 --> 00:08:46,799
We have prediction and resolution.

113
00:08:46,799 --> 00:08:51,759
So at some time, we can take two particles.

114
00:08:51,759 --> 00:08:55,240
We know their position and velocity is shown at the bottom here.

115
00:08:55,240 --> 00:09:06,399
And we can predict exactly the moment which they'll collide, assuming that something else doesn't happen to them in between.

116
00:09:06,399 --> 00:09:12,080
And then so then we'll put that predicted collision time on the priority queue.

117
00:09:12,080 --> 00:09:21,080
And later on, when that time comes to pass, we'll be right at the moment when they collide and we can figure out what to do.

118
00:09:21,080 --> 00:09:26,879
Now there is a possibility that something else happened to them in between and we'll talk about that change too.

119
00:09:26,879 --> 00:09:31,800
So we have to do collision prediction, which is given position velocity and radius.

120
00:09:31,800 --> 00:09:36,040
When's it going to hit with another particle or the wall?

121
00:09:36,039 --> 00:09:47,039
And then there's resolution, which is to figure out how to change the velocities of the particles according to physical laws.

122
00:09:47,039 --> 00:09:56,919
Now, this part, I'm not going to talk about in that much detail right now because it's high school physics.

123
00:09:56,919 --> 00:10:10,079
So I think most students have had some high school physics and be able to do this math or at least be convinced that the code that does this math is correct.

124
00:10:10,079 --> 00:10:21,879
So if you know that you have a particle that's at a certain position or X, R, Y, and it's got a certain velocity, VX in the X direction, VY in the Y direction.

125
00:10:21,879 --> 00:10:32,039
Then from the distance to the vertical wall, you can figure out how many seconds it's going to take until it hits it.

126
00:10:32,039 --> 00:10:37,439
It's basically that distance divided by the velocity.

127
00:10:37,439 --> 00:10:39,879
And so that's the prediction.

128
00:10:39,879 --> 00:10:46,600
And then the resolution when it hits the wall is just going to change the velocity.

129
00:10:46,600 --> 00:10:50,879
So you know what the position is.

130
00:10:50,879 --> 00:10:55,240
So that's just an example of collision prediction.

131
00:10:55,240 --> 00:11:00,720
When's it going to hit the wall and resolution what do you do when it gets to the wall?

132
00:11:00,720 --> 00:11:05,000
When you have two particles, there's definitely more math.

133
00:11:05,000 --> 00:11:07,840
And again, this is high school physics.

134
00:11:07,840 --> 00:11:13,600
And we're not going to test on it or even go through the details.

135
00:11:13,600 --> 00:11:27,639
But it's just a little bit of arithmetic with the velocities and the positions to deal with what happens when how to predict when a given particle is going to collide with another given particle knowing their velocity and position.

136
00:11:27,639 --> 00:11:34,200
So you have to take both velocities and divide their distance by those and so forth.

137
00:11:34,200 --> 00:11:39,200
So there's simple formulas to tell us what to do.

138
00:11:39,200 --> 00:11:45,840
And we can also figure out the formulas for what we do once they do collide.

139
00:11:45,840 --> 00:11:52,360
And again, nobody's claiming that this is easy, but this is the physics part.

140
00:11:52,360 --> 00:11:56,800
And it's worked out and it comes from Newton's second law.

141
00:11:56,799 --> 00:12:03,439
And anybody taking high school physics will be able to deal with these formulas.

142
00:12:03,439 --> 00:12:10,319
The rest of us may have to go to our reference book to get up to speed on them.

143
00:12:10,319 --> 00:12:18,319
But once it's reduced to code, we can be, it might have some trouble debugging at first, but at least we can be convinced that it works.

144
00:12:18,319 --> 00:12:21,399
But now let's look at the computer science code.

145
00:12:21,399 --> 00:12:31,439
So this is just extending our ball data type that we use for the bouncing balls that didn't collide to taking into account these extra things.

146
00:12:31,439 --> 00:12:38,799
So ours will have mass so there'll be some big, heavy ones that make things more interesting.

147
00:12:38,799 --> 00:12:44,240
And there's also a variable called count, which is the number of collisions the particles have been involved in.

148
00:12:44,240 --> 00:12:48,159
And that's useful for a couple of purposes.

149
00:12:48,159 --> 00:12:58,799
So we're going to need a bunch of procedures which do the prediction and the collision resolution.

150
00:12:58,799 --> 00:13:00,799
What's given a particle?

151
00:13:00,799 --> 00:13:03,919
What's the time until we hit that particle?

152
00:13:03,919 --> 00:13:06,799
What's the time until we hit a vertical horizontal wall?

153
00:13:06,799 --> 00:13:13,120
And the same thing is if we're at the point where we're hitting a particle, what do we do?

154
00:13:13,120 --> 00:13:15,799
Same with vertical and horizontal wall.

155
00:13:15,799 --> 00:13:17,319
So that's the skeleton.

156
00:13:17,319 --> 00:13:23,039
We need those procedures that implement those physics rules for every particle.

157
00:13:23,039 --> 00:13:25,439
And this is what they look like.

158
00:13:25,439 --> 00:13:28,079
And again, this is high school physics.

159
00:13:28,079 --> 00:13:34,919
So we're not going to do it in detail other than to point out it's really not a huge amount of code.

160
00:13:34,919 --> 00:13:41,399
Lots of dexes and dewise and dvs, but really not huge amount of code.

161
00:13:41,399 --> 00:13:45,759
And the other point is we're going to return infinity if there's no collision at all.

162
00:13:45,759 --> 00:13:49,240
So that is going to keep that on the particle.

163
00:13:49,240 --> 00:13:52,120
That's the end on the particle forever.

164
00:13:52,120 --> 00:13:56,679
OK, so that's the procedures that we need.

165
00:13:56,679 --> 00:14:00,879
And then there's similar ones for the horizontal and vertical walls.

166
00:14:00,879 --> 00:14:10,759
OK, so now let's look at the main loop for the invent-driven simulation.

167
00:14:10,759 --> 00:14:15,399
So the first thing is we're going to, for every particle,

168
00:14:15,399 --> 00:14:21,120
we're going to compute the next time that it might hit every horizontal and vertical wall.

169
00:14:21,120 --> 00:14:24,360
Well, actually, if it's going away from a wall, it's not going to hit it.

170
00:14:24,360 --> 00:14:26,279
So that would be infinity.

171
00:14:26,279 --> 00:14:30,799
But if it's going towards a wall, then we'll compute the time.

172
00:14:30,799 --> 00:14:33,840
And then that's a time in the future.

173
00:14:33,840 --> 00:14:38,240
And we'll put that event on the priority queue with that time as the key.

174
00:14:38,240 --> 00:14:41,120
And then we'll do the same thing for all pairs of particles.

175
00:14:41,120 --> 00:14:50,440
So we do have a quadratic initialization phase that we perform just wants to get the priority queue filled up.

176
00:14:50,440 --> 00:14:53,720
Now, all collisions might not happen.

177
00:14:53,720 --> 00:14:58,200
So we might have two particles that are on a collision course.

178
00:14:58,200 --> 00:15:03,720
And we're going to predict that point for both of those particles, even right at the beginning.

179
00:15:03,720 --> 00:15:08,639
But it might be the case that there's a third particle that knocks one of those out before that thing happens.

180
00:15:08,639 --> 00:15:11,399
And that event would be invalidated.

181
00:15:11,399 --> 00:15:17,399
So the simulation has to be careful to take that into account.

182
00:15:17,399 --> 00:15:20,639
But that's not difficult to do.

183
00:15:20,639 --> 00:15:23,159
So here's what the main loop is.

184
00:15:23,159 --> 00:15:26,120
So we're going to take the next event from the priority queue.

185
00:15:26,120 --> 00:15:28,319
That's the next collision that's going to happen.

186
00:15:28,319 --> 00:15:33,600
From all our calculations, there's one collision that's going to happen next.

187
00:15:33,600 --> 00:15:36,960
Then we test whether that event has been invalidated.

188
00:15:36,960 --> 00:15:42,000
And we do that by using that count field in the particle.

189
00:15:42,000 --> 00:15:45,639
So then that tells us what time it's going to be next.

190
00:15:45,639 --> 00:15:50,759
So then we have to go through all the particles and change their positions on a straight line trajectory.

191
00:15:50,759 --> 00:15:54,320
Where would there be after that much time?

192
00:15:54,320 --> 00:15:58,440
Then we have to take the two particles that collide and change their velocities.

193
00:15:58,440 --> 00:16:00,680
They bounce off one another.

194
00:16:00,680 --> 00:16:04,000
Now those two particles velocities have changed.

195
00:16:04,000 --> 00:16:08,240
Essentially, that invalidates the future collisions involving those.

196
00:16:08,240 --> 00:16:12,440
And then what we have to do is for those two particles is go through and

197
00:16:12,440 --> 00:16:17,519
predict the future collisions with any walls and collisions with any other particles.

198
00:16:17,519 --> 00:16:21,120
And put all those new events onto the priority queue.

199
00:16:21,120 --> 00:16:22,000
But that's it.

200
00:16:22,000 --> 00:16:31,120
You got two particles, change their velocities, figure out the future collisions of those particles with the wall and update the priority queue.

201
00:16:31,120 --> 00:16:35,279
And then the main loop is take the next thing off the priority queue and keep going.

202
00:16:35,279 --> 00:16:39,240
That's the code that we'll look at next.

203
00:16:39,240 --> 00:16:48,519
So we have a bunch of convictions just to reduce the code.

204
00:16:48,519 --> 00:16:56,680
And if we have this thing called event, which involves, it says between two particles,

205
00:16:56,680 --> 00:16:59,120
something is going to happen at a certain time.

206
00:16:59,120 --> 00:17:04,880
And we're going to adopt the conventions that if neither particle is null,

207
00:17:04,880 --> 00:17:07,160
then we're talking about two particles.

208
00:17:07,160 --> 00:17:13,400
If one of the particles is null, then we're talking about a wall, a vertical or horizontal wall.

209
00:17:13,400 --> 00:17:17,960
And if both particles are null, we're saying we just want to redraw things.

210
00:17:17,960 --> 00:17:21,680
That's a bit of a hack, but it cuts down a lot of code.

211
00:17:21,680 --> 00:17:24,720
Our compare to is by time.

212
00:17:24,720 --> 00:17:30,759
And then again, we need an is valid to check about intervening collision.

213
00:17:30,759 --> 00:17:37,960
And then here's the skeleton of what's going to happen with the collision system,

214
00:17:37,960 --> 00:17:49,920
which is the key thing is this prediction method that takes a particle as argument

215
00:17:49,920 --> 00:17:56,800
and adds to the priority queue all the possible collisions involving this particle.

216
00:17:56,800 --> 00:18:02,400
So it's going to go through every particle and call the time to hit method for that particle.

217
00:18:02,400 --> 00:18:10,400
And then it'll put an event on the priority queue for that time, this particle with that particle.

218
00:18:10,400 --> 00:18:15,800
And then it'll also put an event for the vertical wall in the horizontal wall,

219
00:18:15,799 --> 00:18:21,720
again using this null convention to say that the second argument null is vertical,

220
00:18:21,720 --> 00:18:24,919
first argument null is horizontal.

221
00:18:24,919 --> 00:18:33,960
So that's a key method that gets used in the simulation for each of the two particles that are going to collide.

222
00:18:33,960 --> 00:18:40,319
So now we can look finally at the main event driven simulation loop.

223
00:18:40,319 --> 00:18:45,839
So there's build the priority queue.

224
00:18:45,839 --> 00:18:50,480
There's do this prediction for every one of the particles.

225
00:18:50,480 --> 00:18:54,839
And then also we're going to put, as the first thing that happened,

226
00:18:54,839 --> 00:18:59,240
always an event that says redraw everything.

227
00:18:59,240 --> 00:19:05,679
So that's just a way of ensuring that the simulation keeps proceeding.

228
00:19:05,679 --> 00:19:09,119
It's an easy way to get things drawn.

229
00:19:10,960 --> 00:19:19,599
OK, so now the main loop is while the priority queue is not empty, we're going to pull off an event.

230
00:19:19,599 --> 00:19:22,799
We're going to test whether it's valid.

231
00:19:22,799 --> 00:19:27,439
And that's just check if anything happened with those two particles.

232
00:19:27,439 --> 00:19:30,279
We're going to pull off the two particles.

233
00:19:30,279 --> 00:19:38,639
And then we're going to all part, we're going to move all particles by the amount of time that has elapsed

234
00:19:38,640 --> 00:19:40,759
since the last event.

235
00:19:40,759 --> 00:19:44,400
And then we're going to test which of the four types of events that it is.

236
00:19:44,400 --> 00:19:51,680
It's either redraw, bounce B of A, or bounce off a vertical or horizontal wall.

237
00:19:51,680 --> 00:19:56,200
And then we'll go ahead and do the predictions of each of those particles, A and B,

238
00:19:56,200 --> 00:19:58,640
against all other particles.

239
00:19:58,640 --> 00:20:03,440
That's pretty much all the code for the simulation.

240
00:20:03,440 --> 00:20:06,400
So this is data-driven code.

241
00:20:06,400 --> 00:20:16,080
So one thing we can do is just run it for 100 balls in random position at random velocity.

242
00:20:16,080 --> 00:20:20,640
But what's nice about data-driven code is now that the code's working.

243
00:20:20,640 --> 00:20:25,560
And again, we're not saying this is a trivial code to write.

244
00:20:25,560 --> 00:20:33,519
But it's definitely manageable and it's enabled by priority queues.

245
00:20:33,519 --> 00:20:39,519
Without priority queues, we quite a bit more complicated to figure out how to do this.

246
00:20:39,519 --> 00:20:46,200
And also, it wouldn't be reasonably efficient at all for large data sets.

247
00:20:46,200 --> 00:20:52,119
So that's a simple simulation, just generate random positions.

248
00:20:52,119 --> 00:20:57,359
People might be interested in this one.

249
00:20:57,359 --> 00:21:02,559
Now, this isn't exactly precisely what would happen in the real world,

250
00:21:02,559 --> 00:21:11,119
mainly because we didn't put in the simulation what happens when three particles are touching,

251
00:21:11,119 --> 00:21:14,159
or there's two touching in another one hits them.

252
00:21:14,159 --> 00:21:22,159
And also, nobody racks up a set of billiard balls such that all 15 are touching in all places.

253
00:21:22,159 --> 00:21:28,079
So life can be complicated when you're trying to simulate the natural world.

254
00:21:28,079 --> 00:21:33,759
This is a little bit about Einstein's experiment.

255
00:21:33,759 --> 00:21:40,079
If you got one big particle like a pollen grain and lots of little particles,

256
00:21:40,079 --> 00:21:50,960
like atoms molecules, bouncing against it, the big one is going to move about randomly.

257
00:21:50,960 --> 00:21:58,559
And then this is another famous physics experiment showing diffusion.

258
00:21:58,559 --> 00:22:03,920
And there's many other things that you can do with this basic collision system.

259
00:22:03,920 --> 00:22:08,559
If you have huge numbers of particles and you measure the number that hit the size and the frequency

260
00:22:08,559 --> 00:22:15,920
with which they hit the sides, you can do experiments relating temperature and pressure

261
00:22:15,920 --> 00:22:19,519
in many other things or do three-dimensional versions.

262
00:22:19,519 --> 00:22:27,359
Again, simulation of the natural world is an increasingly important application of computing

263
00:22:28,400 --> 00:22:34,960
and need efficient data structures like priority cues to get it done.

