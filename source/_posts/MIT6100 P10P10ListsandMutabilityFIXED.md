---
title: MIT6100 P10P10ListsandMutabilityFIXED
---

1
00:00:00,000 --> 00:00:07,000
All right.

2
00:00:07,000 --> 00:00:14,000
So, hello, everyone.

3
00:00:14,000 --> 00:00:17,000
Let's get started.

4
00:00:17,000 --> 00:00:18,000
This is lecture 10.

5
00:00:18,000 --> 00:00:22,000
So, last lecture, we introduced two new data types.

6
00:00:22,000 --> 00:00:27,000
We talked about a data type called a tuple, and a data type called a list.

7
00:00:27,000 --> 00:00:32,000
So, today, we're not going to talk about tuples anymore, because they were pretty straightforward.

8
00:00:32,000 --> 00:00:35,000
A lot of operations you could do with strings, you could do with tuples.

9
00:00:35,000 --> 00:00:37,000
They were immutable objects.

10
00:00:37,000 --> 00:00:40,000
That means once you created them in memory, you couldn't do anything to change them.

11
00:00:40,000 --> 00:00:48,000
And so, they were, I guess, pretty boring except that you could populate tuples with objects that were of any type.

12
00:00:48,000 --> 00:00:55,000
So, you could populate a tuple with integers, and floats, and bullions, and other tuples all at the same time.

13
00:00:55,000 --> 00:01:04,000
We introduced lists last time as well, as something that was really similar to tuples and strings in terms of manipulations.

14
00:01:04,000 --> 00:01:11,000
List were also nice because you could populate them again with any kind of data objects, just like you could tuples.

15
00:01:11,000 --> 00:01:17,000
Today, what we're going to focus on, though, is the idea of mutability when talking about lists.

16
00:01:17,000 --> 00:01:21,000
Which is something new we have never talked about this idea before.

17
00:01:21,000 --> 00:01:27,000
And so, this lecture is going to be pretty heavy on that idea, and a little bit heavy on syntax, and things like that,

18
00:01:27,000 --> 00:01:33,000
to kind of remind you of how to manipulate these compound data types.

19
00:01:33,000 --> 00:01:40,000
So, please, if there's any questions, feel free to stop me, and then I can go over what I just talked about if there was anything confusing.

20
00:01:40,000 --> 00:01:46,000
So, this slide is basically a copy of the slide we had on lists last lecture.

21
00:01:46,000 --> 00:01:51,000
It shows a bunch of different operations that you can do with lists.

22
00:01:51,000 --> 00:01:55,000
They're very similar to operations that you can do with strings.

23
00:01:55,000 --> 00:01:57,000
So, here I'm just creating an empty list.

24
00:01:57,000 --> 00:02:06,000
I'm creating a list with a bunch of elements in it, so here we can see that this list contains four elements, and they are all of different types.

25
00:02:06,000 --> 00:02:10,000
This is an integer, this is a string, this is an integer, and this is another list.

26
00:02:10,000 --> 00:02:14,000
And that's totally okay to do with these data types.

27
00:02:15,000 --> 00:02:28,000
Doing all of these operations, getting the length, indexing, slicing, concatenation, getting the max, all that is, should be review, as well as iterating a for loop over the elements in a list directly.

28
00:02:28,000 --> 00:02:40,000
So, just like we iterated a for loop over characters in a string, this loop basically makes E, our loop variable, take on the value of every single element in our list.

29
00:02:41,000 --> 00:02:54,000
What's new, the bolded thing here is something we haven't been able to do before, and this basically goes into memory and changes the element at index three and L.

30
00:02:54,000 --> 00:03:01,000
So, that's kind of how we read that, and it changes that element to have the value on the right hand side.

31
00:03:02,000 --> 00:03:08,000
I mean, we read it in the same way as we do other assignment statements. We look at the right hand side, and we evaluate that.

32
00:03:08,000 --> 00:03:22,000
In this case, it's only a 10, but the left hand side looks different, right? It's not a variable name as we have seen before, but in fact, it's referencing the item in list named L at index three.

33
00:03:23,000 --> 00:03:36,000
So, that would be index zero, one, two, three. This line of code down there, L, square brackets, three equals ten, basically replaces this entire element here with the number ten.

34
00:03:36,000 --> 00:03:49,000
Okay? So, on the next few slides, we're going to talk about what exactly this means inside memory, because it's different than what we've been able to, what we've been doing before.

35
00:03:49,000 --> 00:04:00,000
So, what exactly happens when we go into a mutable object like a list, and we change an element using this exact syntax.

36
00:04:00,000 --> 00:04:16,000
All right? Well, let's draw our memory diagrams, the way we have been in the past. Here's a little cloud representing the memory, L equals two, four, three, creates this list for me in memory, this list object, and L is the name that I'm referencing to this list object.

37
00:04:17,000 --> 00:04:43,000
So, I'm basically binding the name L to that object in memory. L, square brackets, one equals five, tells Python to follow the name L to the object in memory, and then look up the index in the square brackets, in this case, index one, so that's zero, one, this four, and take the element at this location and override it to be whatever the right hand side says.

38
00:04:43,000 --> 00:04:57,000
So, the right hand side says five, so basically we're going into memory and changing that middle element. So, this is different than strings and tuples. We were not allowed to do anything like this with strings and tuples.

39
00:04:58,000 --> 00:05:15,000
So, let's look at an example on the next slide about what this means, but the idea here I'm trying to get at is this object that we have changed one of the elements for which we've changed one of the elements, we've changed the object itself.

40
00:05:15,000 --> 00:05:31,000
So, let's make a new copy, we didn't kind of make a version of that object, we have changed the object itself. So, let's see maybe similar code that might have kind of that you might think does the same thing except with tuples.

41
00:05:31,000 --> 00:05:49,000
So, the first two lines of code are going to be the same, we've got L in memory being the object 243, the name bound to the object 243, L square brackets one, so L at index one equals five changes that middle element to be a five.

42
00:05:50,000 --> 00:06:09,000
Same as the previous slide. Now, what if we had these two lines of code, T is going to be a variable name that's bound to the tuple 243. So, notice this is now the tuple denoted in parentheses. If I say T is equal to 253, what happens?

43
00:06:10,000 --> 00:06:21,000
Basically, with this line, I am creating a new object in memory. So, there's my new object and I'm taking the name T and I'm binding it to this new object.

44
00:06:22,000 --> 00:06:33,000
The old object 243 as a tuple still remains in memory. I have not modified that object at all, it's still there, I've just lost the binding to it.

45
00:06:33,000 --> 00:07:01,000
So, the name T is separate from the actual object in memory. In terms of tuples, what that means for us is we can never change the tuple object in memory once we've created it. But with lists using the specific operation, this one right here, L square brackets one equals five, this does allow us to go into memory and literally change that object. That is associated with the name L.

46
00:07:01,000 --> 00:07:10,000
Everyone is okay with this slide, does this make sense? This showcases the difference, right? So, we need to think about what is the name of the object versus the object itself in memory.

47
00:07:13,000 --> 00:07:21,000
Okay, so that shows you how to create a list and then go ahead and change elements to different values within that list.

48
00:07:22,000 --> 00:07:33,000
But now that we have a list object, that we can mutate, other operations we can do with it is to let's say add more items to the end of the list so we can make the list bigger.

49
00:07:34,000 --> 00:07:45,000
We can mutate the object by doing that using this append function. Now, I'm going to talk about the syntax of the append function in a little bit.

50
00:07:46,000 --> 00:07:56,000
But basically, if I want to mutate L to add an item to the end of it, I have to use the syntax. There isn't a different form, a different function to do this.

51
00:07:57,000 --> 00:08:02,000
So, this specific syntax has to be used. Append is basically the function name.

52
00:08:02,000 --> 00:08:10,000
Okay, element is going to be the parameter, the thing that I want to add on to the end of my list.

53
00:08:11,000 --> 00:08:19,000
And L, the thing before the dot, is going to be the object I want to add the element to the end of the list.

54
00:08:20,000 --> 00:08:28,000
So, L, in this case, I'm using it generically, but you can imagine creating a list of employees in your company.

55
00:08:28,000 --> 00:08:34,000
Right, then you might name that list employees. In that case, we would say employees dot append, you know, Anna or whatever.

56
00:08:35,000 --> 00:08:41,000
So, that L is just kind of generic for now, but it gets replaced with whatever variable name your list is.

57
00:08:42,000 --> 00:08:49,000
So, this operation basically mutates the list. Okay, so it mutates it to be one extra element longer.

58
00:08:50,000 --> 00:08:56,000
And the element you're adding to the end of the list to the right hand side of the list is going to be whatever is in the parentheses to append.

59
00:08:56,000 --> 00:09:01,000
So, let's look at an example. So, we're going to create L is equal to 213 in memory.

60
00:09:02,000 --> 00:09:06,000
And then, let's say we do L dot append 5.

61
00:09:07,000 --> 00:09:14,000
All right, well, this line of code says look up L. It's this object in memory here, 213.

62
00:09:15,000 --> 00:09:23,000
And add the object 5 to the end of it. So, I'm going to add the 5 to the end of the list. Now, it's no longer 3 elements long. It's 4 elements long.

63
00:09:23,000 --> 00:09:28,000
And again, I didn't make a copy. I didn't preserve the original list with just 213 in it.

64
00:09:29,000 --> 00:09:32,000
I have literally changed this list in memory. That's referenced by L.

65
00:09:34,000 --> 00:09:44,000
Now, this function append is being used basically for its side effect. And the side effect here is mutating the list.

66
00:09:45,000 --> 00:09:56,000
After the function adds the 5 in this particular case to the end of the list, the function doesn't need to return anything back.

67
00:09:57,000 --> 00:10:07,000
It's basically done its job to do the mutation. And so, functions like append and we're going to see other functions later, don't have any return value.

68
00:10:08,000 --> 00:10:25,000
So, one really common mistake as we're kind of learning about mutable objects and using these functions that mutate is to say, well, I'm going to do L. append 5 and save this, the result of this function, back into the variable named L.

69
00:10:26,000 --> 00:10:30,000
And this would be incorrect. So, let's see if we do this line of code, what exactly will happen?

70
00:10:31,000 --> 00:10:37,000
So, it's an assignment. So, the first thing we do is we look at the right hand side and we evaluate that.

71
00:10:38,000 --> 00:10:43,000
Well, the right hand side basically says L. append 5, which is exactly the same as the previous line.

72
00:10:44,000 --> 00:10:47,000
So, we're going to put another 5 to the end of our currently mutated list.

73
00:10:48,000 --> 00:10:51,000
Just kind of going with these operations in order.

74
00:10:52,000 --> 00:11:00,000
And then I said this function, this append function has done its job to mutate the list by adding a 5 to the end of it.

75
00:11:01,000 --> 00:11:06,000
So, it returns nothing. There's nothing of value that it could return because it already did its job of mutation.

76
00:11:07,000 --> 00:11:08,000
So, it actually returns none.

77
00:11:10,000 --> 00:11:19,000
So, the assignment, the equal sign, then basically says, take the name L and bind it to the return of this function, L. append 5.

78
00:11:20,000 --> 00:11:30,000
Well, the return of the function is none. So, basically now we're losing the binding from 2, 1, 3, 5, 5, which was our mutated list and rebinding it to the return.

79
00:11:31,000 --> 00:11:38,000
Not. So, that is an incorrect way to do the mutation of adding an item to the end of the list.

80
00:11:40,000 --> 00:11:45,000
Everyone okay with that so far? Yes. Okay, excellent. So, what should we have done instead?

81
00:11:46,000 --> 00:11:54,000
Sorry, yes, be careful about the append operation, right? You're doing a mutation and you return none as a result.

82
00:11:54,000 --> 00:11:58,000
So, you do not want to re-save this to any variable.

83
00:11:59,000 --> 00:12:08,000
So, instead what we would do is we would just do the operation, right? There's nothing to save. Nothing to save in any return variable.

84
00:12:09,000 --> 00:12:18,000
So, if you wanted to add 2, 5 to the end of that list, you would just say L. append 5 again and L would then have been mutated to be 2, 1, 3, 5.

85
00:12:19,000 --> 00:12:29,000
And so, in your code, if you just print L in between these append, if you printed L in between, after the first append 5, it would print this 2, 1, 3, 5.

86
00:12:29,000 --> 00:12:36,000
And then if we print L after the second append 5, it would print 2, 1, 3, 5, 5, right? Because it's kind of an ongoing operation.

87
00:12:36,000 --> 00:12:43,000
It's mutating this list and now you're doing operations on the newly mutated list. Everyone okay?

88
00:12:43,000 --> 00:12:44,000
Yeah.

89
00:12:45,000 --> 00:12:49,000
But the element can be believed one integer is going to be 5, 1.

90
00:12:50,000 --> 00:12:54,000
For the element, do you have to do one integer or can use 5, 5?

91
00:12:54,000 --> 00:13:07,000
So, you can, the append only works with one thing. So, if you wanted to append a tuple, you could append one tuple object that has many things in it, but it would just append that one tuple.

92
00:13:08,000 --> 00:13:14,000
We're going to see at towards the end of this lecture an operation that allows us to extend the list by a bunch of items.

93
00:13:14,000 --> 00:13:17,000
Yeah, but there is a way just not with append.

94
00:13:21,000 --> 00:13:29,000
So, the other thing, so this operation always returns none, right? L. append 5 or whatever, the append always returns none.

95
00:13:29,000 --> 00:13:34,000
But here, it's just sitting on a line by itself. We're not saving it back to anything, right?

96
00:13:35,000 --> 00:13:43,000
In the previous one, we took the return and saved it back into L. And that's why we lost the binding to the actual list.

97
00:13:46,000 --> 00:13:52,000
So, what we usually say is that we use append and a bunch of these other mutable functions for their side effects.

98
00:13:52,000 --> 00:14:02,000
And the side effect in this case is to mutate the object that I'm calling the append on, right? In this case, the list named L.

99
00:14:05,000 --> 00:14:11,000
So, let's have you think about this problem and while you do it, and then we can write it on the board together.

100
00:14:11,000 --> 00:14:21,000
So, as we go through these lines of code, one at a time, what will the values of the lists be become?

101
00:14:21,000 --> 00:14:28,000
Okay, so L1 is the string ray, L2 is me, L3 is dou. What is L4 going to be, right?

102
00:14:28,000 --> 00:14:42,000
With that line, L4 equals L1 plus L2. Anyone know? What's the type? It's concatenation, right?

103
00:14:42,000 --> 00:14:46,000
So, concatenation with lists is like concatenation with strings. Yes?

104
00:14:46,000 --> 00:14:50,000
What are the elements in it?

105
00:14:51,000 --> 00:14:53,000
Yep.

106
00:14:55,000 --> 00:15:01,000
Yep, exactly. I'm not going to do the strings, but you know what I mean.

107
00:15:01,000 --> 00:15:07,000
So, L4 with that line is just these two elements in a new list.

108
00:15:07,000 --> 00:15:16,000
Now, what happens with the next line? L3 dot append L4. Which one gets mutated? L3 or L4?

109
00:15:17,000 --> 00:15:23,000
L3 gets mutated, exactly. And what does it get mutated, too?

110
00:15:23,000 --> 00:15:32,000
So, L3 originally has dou in it. What am I adding to the end of L3?

111
00:15:32,000 --> 00:15:38,000
It's just, um, very mutated that there are little ways to do this.

112
00:15:38,000 --> 00:15:44,000
Exactly. Yes. I'm adding one item, right? And that, it's linked to the question that was here. What am I appending?

113
00:15:44,000 --> 00:15:49,000
I'm appending one item. It's whatever L4 is. And L4 is this list.

114
00:15:49,000 --> 00:15:57,000
So, I'm going to be adding, right, and me within my list here. Right? And I've got to close this list here.

115
00:15:57,000 --> 00:16:04,000
Right? So, this is one item, one object, one element, and this is another element right here.

116
00:16:04,000 --> 00:16:08,000
It just happens to be a list. Okay?

117
00:16:08,000 --> 00:16:12,000
Um, what about the next line? L equals L1 dot append 3.

118
00:16:12,000 --> 00:16:20,000
What is the right-hand side going to give me? Am I mutating L1 or L3?

119
00:16:20,000 --> 00:16:31,000
Yes. And what am I mutating L1 to be? L1 is originally ray, and what am I adding to the end of it?

120
00:16:31,000 --> 00:16:35,000
Yeah, exactly. This L3, which is this big thing here, right?

121
00:16:35,000 --> 00:16:46,000
So, it's a list with two elements, the first one being a string, and the second one being another list like that.

122
00:16:46,000 --> 00:16:51,000
So, that's the right-hand side, and then what is the left-hand side going to be? What is L going to be?

123
00:16:51,000 --> 00:16:59,000
Yeah, exactly. Yeah.

124
00:16:59,000 --> 00:17:08,000
Okay, so now that we've introduced mutable objects, we have to be careful about what functions we're using, some of them mutate the list, right, and don't return anything.

125
00:17:08,000 --> 00:17:12,000
Append is one of them, and we're going to see a few more in today's lecture.

126
00:17:12,000 --> 00:17:17,000
So, these, um, these functions are just being used for their side effect, right?

127
00:17:17,000 --> 00:17:21,000
They mutate the thing you're, you're calling the function on, and that's it.

128
00:17:21,000 --> 00:17:28,000
They don't need to return, they don't return anything, they don't need to return anything, they have done their job purely by the mutation aspect of it.

129
00:17:28,000 --> 00:17:40,000
So, I want to just quickly make an aside on this dot notation that we've been, that we've introduced with this append function.

130
00:17:40,000 --> 00:17:50,000
Okay, this is something we haven't actually seen before, but it's something that we will learn about in the future when we create our own object types.

131
00:17:50,000 --> 00:18:00,000
Right, so right now we're using object types as somebody else wrote, like a list or a two-bowl or something like that, but in a future class we're going to learn how to create our own object types.

132
00:18:00,000 --> 00:18:11,000
And when we do, we're going to use this dot notation a lot, but for now you basically just kind of have to remember which functions use dot notation and which don't.

133
00:18:11,000 --> 00:18:15,000
But I'll give you a little bit of intuition for what this dot notation actually means.

134
00:18:15,000 --> 00:18:31,000
So, when we have, so everything in Python is an object, and then we have objects in Python, the idea here is that the objects that you have have data associated with them, so what kind of what makes up the object.

135
00:18:31,000 --> 00:18:42,000
And they have certain behaviors, right, so we touched upon this on maybe the first lecture where we said things you can do with integers are different than the things you can do with strings.

136
00:18:42,000 --> 00:18:55,000
Right, that's pretty clear. And that's different than the things you can do with lists. Right, and so the kinds of things that you could do with each one of these object types differs depending on the type.

137
00:18:55,000 --> 00:19:10,000
And at its core, really everything can be written in terms of this dot notation, but some of the more common operations like getting the length of something or adding two numbers together are actually, we do them in this shorthand notation.

138
00:19:10,000 --> 00:19:19,000
Like using the plus operator or using the length, right, but at their core, really we can take all of those operations and convert them to a dot notation.

139
00:19:19,000 --> 00:19:28,000
We're not doing this today, but that's that's what we can do. And so when we see this dot notation, the way we usually read it is we say, well, what's to the left of the dot?

140
00:19:28,000 --> 00:19:39,000
It's going to be our object, the thing that we want to do an operation on. Right, in this particular case, it's a list named L, right, but it could be a list name employees or words or whatever you want to do.

141
00:19:39,000 --> 00:19:46,000
Or words or whatever, you know, book or whatever the list contain, whatever the list name is.

142
00:19:46,000 --> 00:19:56,000
The dot then comes for the dot notation and then the thing on the right hand side is going to be the operation that you want to perform on the object to the left of the dot.

143
00:19:56,000 --> 00:20:06,000
Right, so the operation if you basically cover up L dot, the operation looks just like a function, right, it's append parentheses, some parameters.

144
00:20:06,000 --> 00:20:15,000
So the operation is basically just a function that you want to run on an object of type list, this specific object named L.

145
00:20:15,000 --> 00:20:24,000
And you can see it has a name append and it has parameters or arguments in this case, it's the thing you want to add to the end of the list.

146
00:20:24,000 --> 00:20:37,000
So again, unfortunately, at this point in the class, you just have to kind of remember which functions are dot notation and which ones are not, but it will become clear what this dot notation actually means towards the end of the class.

147
00:20:37,000 --> 00:20:42,000
Okay, so let's have you work on this on this little code here.

148
00:20:42,000 --> 00:20:46,000
It's going to use a pen, obviously, and it's going to have you create a list.

149
00:20:46,000 --> 00:20:54,000
So the name of the function you should make here is called make ordered list and it takes in one parameter, an integer n, it's positive.

150
00:20:54,000 --> 00:21:06,000
And I want you to create for me a list that has all of the integers from zero all the way up to an including n inside that list in order.

151
00:21:06,000 --> 00:21:24,000
So as an example down in here around 34, right, if we call make ordered list with six, it's going to create for us this list inside the function and return this list.

152
00:21:24,000 --> 00:21:31,000
Right, so a couple minutes to work on that and then we can write it together.

153
00:21:32,000 --> 00:21:40,000
All right, what's the first thing we should do here or how would you approach this problem?

154
00:21:40,000 --> 00:21:47,000
Yes. You want to create an empty list? What do you want to name it?

155
00:21:47,000 --> 00:21:50,000
You named it list.

156
00:21:50,000 --> 00:21:55,000
List is an okay name, but notice list is also the name of the type of the object.

157
00:21:55,000 --> 00:22:00,000
So I would refrain from naming anything, things that change color.

158
00:22:00,000 --> 00:22:05,000
So we can use L or my list or whatever, something else.

159
00:22:05,000 --> 00:22:14,000
My list is an empty list, all right, so it's originally empty and now we need to populate it with some stuff.

160
00:22:15,000 --> 00:22:23,000
Make a for loop that goes over what?

161
00:22:23,000 --> 00:22:31,000
Yep, zero to n plus one, exactly, because we need our boundary to go up to an including n, perfect.

162
00:22:31,000 --> 00:22:41,000
So now that I've got i changing to be zero than one, then two, then three, what do I need to do to my list?

163
00:22:41,000 --> 00:22:51,000
Yeah, exactly, append i. So my list, right, is the name of the list I've created, dot append i.

164
00:22:51,000 --> 00:22:57,000
Okay, the last thing, return the list, right, so return my list.

165
00:22:57,000 --> 00:23:01,000
So run it, perfect.

166
00:23:01,000 --> 00:23:06,000
If we change this to two, still works.

167
00:23:06,000 --> 00:23:11,000
So just testing it out with a couple different inputs, just to make sure it works.

168
00:23:11,000 --> 00:23:15,000
Questions about this code?

169
00:23:15,000 --> 00:23:18,000
Yeah.

170
00:23:18,000 --> 00:23:29,000
The zero is not necessary in the range, yeah, it defaults to zero, exactly.

171
00:23:30,000 --> 00:23:39,000
We're not done yet, you have more writing to do, so let's write a slightly different function now called removeLm.

172
00:23:39,000 --> 00:23:49,000
It takes in two parameters, the first one is a list, right, and the second one is going to be just some variable.

173
00:23:49,000 --> 00:23:53,000
It could be an integer, it could be a string, it could be whatever.

174
00:23:53,000 --> 00:24:06,000
And what the function should do is create a new list, populate it with the same elements of L in the same order, but exclude the ones that are equal to E.

175
00:24:06,000 --> 00:24:14,000
Okay, so you don't want to include the ones that are equal to E, otherwise keep everything in the original list L in the same order.

176
00:24:14,000 --> 00:24:34,000
So as an example here, we've got, if our input list is 1, 2, 2, 2, 2, and I call the function with L and 2, the list that this function returns to just contain one element in it, just the one, right.

177
00:24:34,000 --> 00:24:43,000
So that, try your code for the next couple minutes around line 50, and then we can write it together.

178
00:24:43,000 --> 00:24:57,000
All right, how can we start?

179
00:24:57,000 --> 00:24:58,000
Yes.

180
00:24:59,000 --> 00:25:02,000
Yep, what did you name it?

181
00:25:02,000 --> 00:25:05,000
Cool.

182
00:25:05,000 --> 00:25:09,000
What did you make it, empty list, okay?

183
00:25:15,000 --> 00:25:27,000
Yep, so for I in L, okay, and at this point I would make a note for myself, because you used I, which in my brain means index, but I would make a note for myself that I am using.

184
00:25:27,000 --> 00:25:35,000
So I would make a note for myself that I is maybe 1, then 2, then 2, then 2, just according to this first example.

185
00:25:35,000 --> 00:25:50,000
So if I'm reading the code, I would just, I will remember that it's not the index, but go on, so for I in L directly.

186
00:25:50,000 --> 00:25:53,000
Like this?

187
00:25:53,000 --> 00:26:00,000
Okay.

188
00:26:00,000 --> 00:26:02,000
Yeah.

189
00:26:02,000 --> 00:26:08,000
Okay, and then let's return your list.

190
00:26:08,000 --> 00:26:17,000
Okay, let's try it.

191
00:26:17,000 --> 00:26:24,000
Yeah, so E is not a list. E is going to be an element, right.

192
00:26:24,000 --> 00:26:40,000
So that's my bad. I should have put this in here. E is, you know, like, you know, an object or something. It's, it's, you know, it could be a list, but then I would be looking for that exact sub-list, that exact list as a sub-element.

193
00:26:40,000 --> 00:26:47,000
So maybe we think of E as an object like 5 or something like that.

194
00:26:47,000 --> 00:26:52,000
Yeah, not equal to E.

195
00:26:52,000 --> 00:27:01,000
Right, so if I'm just looking for that element directly, I want I to be not equal to E, in which case I keep the element in my new list.

196
00:27:01,000 --> 00:27:11,000
If we run that, that gives me 1, according to this, looks like it's correct, and then we can run it with these other two cases.

197
00:27:11,000 --> 00:27:18,000
So here I'm removing the element 1, right. So I'm going to keep 222 as a, as my returned list.

198
00:27:18,000 --> 00:27:29,000
And here I'm removing 0, which doesn't exist in my list at all, so I should just keep and it does my original list unchanged.

199
00:27:29,000 --> 00:27:38,000
Any questions about this example? Anyone try it a different way?

200
00:27:38,000 --> 00:27:45,000
Okay.

201
00:27:45,000 --> 00:27:53,000
All right, so other useful list operations, we can convert strings to lists and then lists back to strings.

202
00:27:53,000 --> 00:28:00,000
Okay, and this is very useful when, you know, you're reading in text or something like that to a function.

203
00:28:00,000 --> 00:28:03,000
It's going to be useful for problem set 3, so on and so on.

204
00:28:03,000 --> 00:28:08,000
So let's first see how we can take a string of S and convert it to a list.

205
00:28:08,000 --> 00:28:18,000
So if we just cast S to a list, right, the way we used to cast, you know, the number 5 to a float, we would just say float parentheses 5.

206
00:28:18,000 --> 00:28:24,000
Well, we can take a list and cast it to a list by saying list parentheses S.

207
00:28:24,000 --> 00:28:32,000
And if we cast it like this, Python takes every single character in S and makes it be a separate element in a list.

208
00:28:32,000 --> 00:28:45,000
So you can see here I've got this string I heart CS and you, it makes for me a list where every single character including the space, right, and all the special characters becomes a separate entry in my list.

209
00:28:45,000 --> 00:28:50,000
That's not that useful. I mean, it can be, but it's not that useful.

210
00:28:50,000 --> 00:28:56,000
What is more useful is to take an input string and split it on a particular character.

211
00:28:56,000 --> 00:29:09,000
So one very common character that we would split on is the space. And if we do something like that, it basically extracts from us from our string all of the individual words, right, which is pretty useful.

212
00:29:09,000 --> 00:29:18,000
So here I've got S dot split and in parentheses, I've got the character I want to split on this particular case of space.

213
00:29:18,000 --> 00:29:27,000
So if I take S and I split on the space, Python will go from the beginning of the list to the first space, make that be one element in a list.

214
00:29:27,000 --> 00:29:32,000
It'll go from the first paste in the next space in my string and make that be the next element in the list.

215
00:29:32,000 --> 00:29:38,000
And so on and so on until it gets to the end of the list and makes that last bit the last element in my list.

216
00:29:38,000 --> 00:29:46,000
So here when I've split on the space, I've got three three three base words, quote, unquote words.

217
00:29:46,000 --> 00:29:51,000
I heart is going to be one and there it is as my first entry.

218
00:29:51,000 --> 00:29:58,000
CS is in between these two spaces and that's my next entry and and you question mark is my last entry here.

219
00:29:58,000 --> 00:30:01,000
So this is a very useful function.

220
00:30:01,000 --> 00:30:07,000
We can of course split on any character we'd like. So here I am splitting on the less than character.

221
00:30:07,000 --> 00:30:14,000
So if I there's only one so if I split on the less than character, one element in my resulting list is just the capital I.

222
00:30:14,000 --> 00:30:24,000
And the remaining element in my resulting list is the three space CS and you and there it is right there.

223
00:30:25,000 --> 00:30:33,000
Alright, so once we have a list, we can also go backward. We can take this list and convert it back to strings.

224
00:30:33,000 --> 00:30:44,000
So we use this, this join function here and the thing before the dot is going to be what character you want to join the list elements with.

225
00:30:44,000 --> 00:30:48,000
And this is the list you want to join back into a string.

226
00:30:48,000 --> 00:30:57,000
So let's look at an example. So let's say I have list L that has three entries in it, A, B, and C.

227
00:30:57,000 --> 00:31:03,000
If I join on the empty string, so here this is just quote, quote, right beside each other.

228
00:31:03,000 --> 00:31:10,000
There's no space or anything in there. That's going to take from me all the elements in the list L and join them together as one.

229
00:31:10,000 --> 00:31:13,000
Nothing in between the A or B, A, B and C. Right.

230
00:31:13,000 --> 00:31:20,000
And that brings this operation here will basically make for me A, B, the string ABC.

231
00:31:20,000 --> 00:31:27,000
If I join on an underscore, right, you might have guessed it'll join A, B, and C with an underscore in between each character.

232
00:31:27,000 --> 00:31:33,000
So there it is, A underscore B underscore C. Right. You can join on any character you'd like.

233
00:31:33,000 --> 00:31:39,000
I don't know if you can join on multiple characters, but I don't see why not. You could try this out on your own.

234
00:31:39,000 --> 00:31:45,000
Join only works with lists that contain only string elements.

235
00:31:45,000 --> 00:31:56,000
So if we try to join a list that has just integers or floats or Booleans, anything that doesn't contain a string in it, then you'll get an error.

236
00:31:56,000 --> 00:32:00,000
Right. Because it's basically trying to put all these back into a big string.

237
00:32:00,000 --> 00:32:10,000
If you wanted to join non-string elements, you would have to basically loop through and cast every one of these to a string first and then join them together.

238
00:32:10,000 --> 00:32:19,000
So if you want to join one, two, three, you would have cast them to strings and then you could join them to make the string one, two, three.

239
00:32:19,000 --> 00:32:28,000
Okay. So let's have you work on this example. So here we're going to try to split the input.

240
00:32:28,000 --> 00:32:33,000
So here is a function called count words. It takes in one input send for sentence.

241
00:32:33,000 --> 00:32:40,000
And I wanted to use something that's not s just to make it clear that the thing before the dot doesn't isn't always s.

242
00:32:40,000 --> 00:32:44,000
It's whatever object you want to split or join or whatever.

243
00:32:44,000 --> 00:32:49,000
So this function is going to return how many words are in s?

244
00:32:49,000 --> 00:32:59,000
Quotan Quot words in this case because it's just, I'm just interested in the elements or the characters between spaces and between the start and the end of a word.

245
00:32:59,000 --> 00:33:08,000
So if it's a number, I still count that as a word. If it's a special character dot exclamation point, I would still count that as a word as well.

246
00:33:08,000 --> 00:33:15,000
So this should be just a couple lines of code down around 99.

247
00:33:15,000 --> 00:33:20,000
Okay, so I'll give you about a minute to work on it and then we can write it together. Okay.

248
00:33:20,000 --> 00:33:28,000
So thoughts on how we can do this?

249
00:33:28,000 --> 00:33:33,000
L1 equals send dot split. Yep.

250
00:33:33,000 --> 00:33:40,000
Yeah, sorry parentheses space. Yep.

251
00:33:40,000 --> 00:33:44,000
Yep. And then we can return the length of L1. Perfect.

252
00:33:44,000 --> 00:33:50,000
Let's run it on these two examples and should print three and 12 and it does.

253
00:33:50,000 --> 00:33:57,000
So notice how easy this was with lists, right? Because lists are data structure that's just kind of naturally iterative.

254
00:33:57,000 --> 00:34:04,000
And so running L1 on this split list or split string, which gave us a list, is really easy, right?

255
00:34:04,000 --> 00:34:12,000
It's a two line piece of code. Without lists, you could imagine creating variables that keep track of where you see the first space, right?

256
00:34:12,000 --> 00:34:20,000
And then iterating through one character at a time and if it's a space, keep track of the fact that you saw space and then look for the next space, right?

257
00:34:20,000 --> 00:34:26,000
And then resetting things every time you see a space. And that would be really, really tedious.

258
00:34:26,000 --> 00:34:35,000
It would be a really good quiz one question, but not once we've introduced lists because it becomes really, really easy to do it with lists.

259
00:34:35,000 --> 00:34:41,000
Okay. All right.

260
00:34:42,000 --> 00:34:50,000
So now that we have lists, we can do other really interesting and useful operations to mutate the list.

261
00:34:50,000 --> 00:35:00,000
So we saw the dot notation on a list to do a pen. So basically to add an item to the end of our list, that was useful.

262
00:35:00,000 --> 00:35:06,000
So other things we can do in terms of mutating the list is to sort a list and reverse a list.

263
00:35:06,000 --> 00:35:11,000
And these are also very useful operations on lists.

264
00:35:11,000 --> 00:35:20,000
So the first two here, sort and reverse, is a notation for how we sort a list and how we reverse a list.

265
00:35:20,000 --> 00:35:25,000
And these will mutate the list that you call the functions on.

266
00:35:25,000 --> 00:35:39,000
So if I have list 427 here and I call L dot sort and I print L as the next line after this, L will have changed in memory to be 24 and 7, right, in that order.

267
00:35:39,000 --> 00:35:48,000
It didn't make a copy for me. It didn't preserve the original order. It changed that list to be now in sorted order.

268
00:35:48,000 --> 00:35:56,000
Reverse similarly. So if we do L dot reverse on 427, it will reverse all the elements. So the one at the end becomes at the beginning.

269
00:35:56,000 --> 00:36:01,000
The one second last is the second one, third last is the third element in the list and so on.

270
00:36:01,000 --> 00:36:11,000
Okay. And again, this mutates my list. So I would have lost my original order with this command, L dot reverse and with L dot sort, of course.

271
00:36:11,000 --> 00:36:22,000
Now, there are many situations where you want to preserve the original order. Like, I don't know, maybe like the order that people join a company or the order that people joined a grocery queue.

272
00:36:22,000 --> 00:36:34,000
I don't know, things like that, right? You might want to preserve that original order, but you might also get maybe the sorted names of people for a function that does something with those sorted names.

273
00:36:34,000 --> 00:36:48,000
In that case, you don't want to call sort on your original list because you would lose the original order. You could of course make a copy or you could call this sorted function.

274
00:36:48,000 --> 00:37:05,000
And the sorted function is going to keep my original list L intact in the same order that I had created it in, but it would return for me. So this function will actually make a copy and return for me the sorted version of L.

275
00:37:05,000 --> 00:37:16,000
Okay. And L remains unchanged. So this function does not do any mutation. We have to take the return and save it into a new variable. This case, I called it L new.

276
00:37:16,000 --> 00:37:28,000
So it might be a little bit sort of hard to keep straight in your mind, sort of whether to use sort or sorted. You could of course always try it in the console, right, to see which one does what.

277
00:37:28,000 --> 00:37:38,000
The way I sort of remember and think about it is the sort to me feels like a command. It's like sort this list, right. Mute this list and sort it.

278
00:37:38,000 --> 00:37:56,000
Whereas sorted is more of a request like, can you please get me the sorted version of L, right. And so that's kind of how I keep things in my mind as to whether I'm calling sort to do the mutation or asking to get the sorted version of the list.

279
00:37:56,000 --> 00:37:57,000
Yes.

280
00:37:57,000 --> 00:38:10,000
It is sorting it by whatever the built in sort is for those particular object types. So in, in the case of integers, it's just increasing order.

281
00:38:10,000 --> 00:38:15,000
In the case of strings, it'll be alphabetical.

282
00:38:15,000 --> 00:38:23,000
You can choose different sorting functions, but we don't get into that. Yeah.

283
00:38:23,000 --> 00:38:39,000
That's a good question. I think they do in order for it to work. So we can try like L equals one. And then we can give it a tuple or something. And then we can ask sort L.

284
00:38:39,000 --> 00:38:50,000
Yeah. So in this case, it doesn't know how to resolve, right. It's trying to do behind the scenes less than to figure out which one's bigger than which. And in this case, it doesn't know how to resolve.

285
00:38:50,000 --> 00:39:06,000
How do you choose whether the tuples bigger than an integer. Yeah. But you can imagine again, as I mentioned, this is not something we do, but you could write your own sorting function where depending on the type, you would, you know, decide which one is bigger.

286
00:39:06,000 --> 00:39:24,000
So yes, question. So you would just do L dot sort without parentheses, but L has to be a list that contains things that can be sorted, right. So all integers, all strings or something like that.

287
00:39:24,000 --> 00:39:40,000
So let's look at the memory diagram for how this would look just to kind of bring the point home about objects that are being mutated. So original L is 9603. So in memory, I've got the name L bound to 9603.

288
00:39:40,000 --> 00:39:57,000
Again, let's do an append just for fun. L dot append 5 is going to add a 5 to the end of that list and append sort and reverse will all be used for a side effect. Right. That means they're going to be mutating the object, whereas sorted will not do a mutation.

289
00:39:57,000 --> 00:40:18,000
So let's do an append to the end that's going to put a 5 at the end of the list, something we already know how it works. Now let's do a equals sorted L. So again, it's an equality, right. So the thing on the right hand side is going to be the function that returns for me the sorted version of L.

290
00:40:18,000 --> 00:40:37,000
So it's going to create a new object. However, it does the sort. It's going to create for me a new list that contains that sorted order. The original L notice in memory remains unchanged. So if I want to reference L in my program from here on out, I will use this unchanged L.

291
00:40:37,000 --> 00:40:47,000
So now the return of sorted is this list and I bind it to a. So name a now points to the sorted list version.

292
00:40:47,000 --> 00:41:11,000
All right. Now what if I do this line here be equals L dot sort. Again, let's look at the right hand side L dot sort is going to mutate L. So this function itself will go and change L to be to the L's object, the object that L points to to be the sorted list.

293
00:41:11,000 --> 00:41:28,000
But it's not done. This function is being used for a side effect. So what is the return from it? None, right. It's like the append. So this example here will make B point to the return of that function, which is just none.

294
00:41:28,000 --> 00:41:55,000
Now please don't ever do this. All you would have to do to sort L is to just on a on a line by itself say L dot sort. I just did this to kind of show you again that if you do L equals L dot sort bad things will happen. You're going to read a sign L to be none. In this case, I saved under a different variable, but it's an easy mistake to make.

295
00:41:55,000 --> 00:42:22,000
Okay, and then what about the last one here L dot reverse again, I'm going to go and grab the object pointed to by L and I'm going to reverse all the elements. So here doing L dot sort and then L dot reverse right afterward makes my function makes my list be in reverse sorted order. So biggest number to smallest number. So with that command there, I've got 96530 instead of 03569.

296
00:42:22,000 --> 00:42:34,000
And again, sort and reverse changed my list L directly. So I've lost that initial order of 9603 that I had up here.

297
00:42:34,000 --> 00:42:49,000
Okay. One last point I want to make, I know we've usually seen functions that taken parameters, right, sort and reverse are still functions. And they just happen to not need any parameters, right.

298
00:42:49,000 --> 00:43:11,000
So we call them on the object L using this dot notation. So in effect, it does have sort of a quote unquote parameter, the thing before the dot, but it doesn't take anything else in in their own respective parentheses, right. But they do still need the parentheses there because they are functions, right. They are operations that will do something for us.

299
00:43:11,000 --> 00:43:26,000
Questions about this. Is it okay? Okay, very good because now you get a chance to try it out. So let's have you do something similar to what we did last time. Take in a parameter, send, which is a string representing a sentence.

300
00:43:26,000 --> 00:43:39,000
I want you to figure out all the words quote unquote the same in the same manner that we did before in the previous example, but now return from your list with these words in sorted order.

301
00:43:39,000 --> 00:43:55,000
So if the input was look at this photograph as my sentence, then I would return a list, which has at look photograph and this as my three elements, or as my four elements in that order.

302
00:43:55,000 --> 00:44:03,000
So here, start writing it down on line 134.

303
00:44:03,000 --> 00:44:18,000
Okay, what is the solution? What do you have so far? Yes.

304
00:44:18,000 --> 00:44:39,000
L equals n dot split and we split on a space. Got it. Okay. Got it. Return L. Perfect. Okay. Let's see if that worked with our two examples.

305
00:44:39,000 --> 00:45:01,000
Yep. There's my first one. There's my second one. Anybody do it a different way? Did anyone use sorted? Yeah. Return sorted parentheses L. Yeah. Is that how you.

306
00:45:01,000 --> 00:45:17,000
Yeah, we could do it all in one perfect. Yeah, this could be a one line of for sure. Yeah, so this works because this thing here creates for me a new object.

307
00:45:17,000 --> 00:45:24,000
I could have saved it in a different variable and then return that variable, but this does it all in one.

308
00:45:24,000 --> 00:45:35,000
So just for completion sake, if we comment out the other solution, this way still works.

309
00:45:35,000 --> 00:45:50,000
Question so far. Okay. All right. So what we've seen so far is a bunch of these functions built in functions, right?

310
00:45:50,000 --> 00:46:00,000
That have these side effects. They mutate the input the input list. So we can actually write our own functions that have a side effect.

311
00:46:00,000 --> 00:46:09,000
Where if we pass in a parameter that's a list, we can have our functions mutate that list. However, we'd like.

312
00:46:09,000 --> 00:46:25,000
So let's go through this example. Let's say we were given the task of writing a function that takes an input list L and mutates the list L such that each element in L is changed to be the element square.

313
00:46:25,000 --> 00:46:32,000
Right. So two, four, two, three, and four as an input list becomes four nine sixteen.

314
00:46:32,000 --> 00:46:42,000
Right. And I'm mutating that list. I'm not creating a new list and returning the new list. I want to actually mutate the input list L.

315
00:46:42,000 --> 00:46:53,000
So if we were faced with this task, the way that we would kind of go about it, maybe based on what we've learned so far is to say, well, I'm going to iterate through each element in L because that's the very

316
00:46:53,000 --> 00:47:06,000
Python way to do this. Right. So I'm grabbing the element in the list L. But then I would be stuck because the syntax for changing an element at a particular location. Right.

317
00:47:06,000 --> 00:47:18,000
Is L at I equals, you know, whatever the change thing is. But my loop variable is iterating through the element directly.

318
00:47:18,000 --> 00:47:25,000
So what's my index in this particular case? I don't have it in hand, right. I have the element, but I don't have the index.

319
00:47:25,000 --> 00:47:36,000
So what are some solutions? Well, a first solution could be right before the loop to create a new variable that keeps track of the index.

320
00:47:36,000 --> 00:47:45,000
Right. So you make I equals zero right before the for loop. And inside the for loop, you increment I each time. Now you're keeping track of the index yourself.

321
00:47:45,000 --> 00:47:52,000
Option two is to change what we iterate over. So instead of iterating through each element in L directly, let's iterate over the index.

322
00:47:52,000 --> 00:48:05,000
So iterate over range length L. In that case, the range length L basically becomes range, you know, five or 20 or whatever the length of my list is.

323
00:48:05,000 --> 00:48:17,000
And the last option is to try to use this thing called enumerate, which is a Python keyword, I guess function Python function.

324
00:48:17,000 --> 00:48:27,000
And the syntax for that would be for tuple i comma e in enumerate L. So basically wrapping enumerate wrapping L inside this enumerate function.

325
00:48:27,000 --> 00:48:39,000
And Python, each time through the loop makes this little tuple i comma e be the index and the element at each location for each time through the loop.

326
00:48:39,000 --> 00:48:54,000
And so it gives you a two for one kind of deal here using this enumerate function. I'm not going to go over option one or option three. I do encourage you to try to look these up or try to implement them yourself, but I will go over option two in these slides.

327
00:48:54,000 --> 00:49:11,000
So if I were to iterate over the index directly, the way I do it is I have to change the loop variable, right, for i in, and then the thing I want to loop over is all of the indexes indices, right.

328
00:49:11,000 --> 00:49:20,000
So I want to get the numbers 0, 1, 2, 3, 4 all the way up to the, but not including the length of L.

329
00:49:20,000 --> 00:49:29,000
So once I have this index in hand, I can do something like this very easily, right, because this i here is going to be my index.

330
00:49:29,000 --> 00:49:37,000
And the thing on the right hand side is just going to be a matter of grabbing the element at that index and squaring it.

331
00:49:37,000 --> 00:49:51,000
So here, L square brackets i on the right hand side grabs for me the element at index i. So what's the value of that element at that particular location, 23, whatever, square it.

332
00:49:51,000 --> 00:50:04,000
So star star two squares it. And then the thing on the left hand side is the syntax for changing the element at a particular location, right. We saw this way back on slide two.

333
00:50:04,000 --> 00:50:11,000
So with this line of code, Python goes through each element in the list and squares it and saves it back into that same list.

334
00:50:11,000 --> 00:50:24,000
No new list is created. It's mutating the original list. Right, no return. Nothing to return. This functional return none because it does its job of doing the mutation.

335
00:50:24,000 --> 00:50:35,000
So if we go through an example, suppose that L is 234, what is this loop going to do? So i, the first time through the loop will be zero.

336
00:50:35,000 --> 00:50:47,000
And then that first time through the loop, it will mutate i. So it says L square bracket zero equals whatever the element at zero is the two squared.

337
00:50:47,000 --> 00:50:57,000
So L square bracket zero will be changed to four. Right, so we've mutated the first element at index zero to be a four and everything else is the same.

338
00:50:57,000 --> 00:51:06,000
Next time through the loop, I'm mutating the list that I had just mutated, right. So the first element is still the mutated value for.

339
00:51:06,000 --> 00:51:18,000
But now I'm going to change my element index one to be three squared nine. Last time through the loop, every, all the elements up to index two are going to be the mutated elements.

340
00:51:18,000 --> 00:51:28,000
So four and nine. And then the last time through the loop, I'm mutating the six, the four to be 16, right, the square version of that.

341
00:51:28,000 --> 00:51:37,000
So to check that we did the mutation correctly, what we would do is we would create an input list, I called it L in.

342
00:51:37,000 --> 00:51:49,000
And, you know, I've said it to 234 my example. If I print before the function call, the value of L in, it's 2,3,4 as expected. It shouldn't be anything different than that.

343
00:51:49,000 --> 00:52:01,000
Then I make a function call to the function that we just wrote. Note I'm not returning anything here, so I'm not saving the function call to any, any variable.

344
00:52:01,000 --> 00:52:13,000
Right, if I print L in after the function call, it will print the mutated list. So this L in here and here, and here is the same object.

345
00:52:13,000 --> 00:52:22,000
Nothing was returned. This function here has nothing to assign its return to. If we assigned it to something, that variable would be none.

346
00:52:22,000 --> 00:52:28,000
Just like the append, just like the sort, just like the reverse.

347
00:52:28,000 --> 00:52:39,000
All right, so when you're writing, oh, yeah, question.

348
00:52:39,000 --> 00:52:46,000
We created a function, it doesn't have a return. It doesn't say none because we didn't save the function call to any variable.

349
00:52:46,000 --> 00:52:54,000
Right, if we said like a equals this function call, if we print a, it would show none.

350
00:52:54,000 --> 00:52:57,000
Yeah.

351
00:52:57,000 --> 00:53:06,000
Okay, so when we're writing functions that mutate input lists, the two likely things you're going to have to do, and it depends on what your function's actually doing.

352
00:53:06,000 --> 00:53:17,000
But most likely, you're going to have to iterate over the length of the list, so for I in range length L, to grab the index as well as the element, to be able to grab the index as well as the element.

353
00:53:17,000 --> 00:53:25,000
And these functions, I mean, they could do other stuff, but if you're using them for mutation and things like that, they're going to return none.

354
00:53:25,000 --> 00:53:35,000
So when you make function calls to them, those function calls will likely just be on a line without saving the return to any variable.

355
00:53:35,000 --> 00:53:57,000
Okay, so we've talked about mutable objects. They're very, very useful places where they're useful, or the reason that they're useful is because they allow you to have basically large databases of objects like employees in a company list of all the students at MIT, things like that.

356
00:53:57,000 --> 00:54:10,000
And if you want to make a change to something about that list, like a student changes their name or their address or something like that, with tuples, you'd have to make a new copy of that entire list.

357
00:54:10,000 --> 00:54:25,000
So it could be very space inefficient because every time a student changes their address or their name or something about themselves or their grades or something like that, you're making a new copy of this potentially thousands long data structure.

358
00:54:25,000 --> 00:54:34,000
Lists don't have that issue with lists. You're just mutating the object in place and you're done. No extra copies are being made, so it's a very efficient data structure.

359
00:54:34,000 --> 00:54:42,000
But with lists, come some unexpected challenges. And we're going to go through three tricky examples today. And next lecture, we're going to see tricky example number four.

360
00:54:42,000 --> 00:54:51,000
And these three tricky examples involve looping over the list in one way or another over the range of the length of the list or through the list directly.

361
00:54:52,000 --> 00:54:56,000
So let's look at the first example.

362
00:54:56,000 --> 00:55:03,000
In this code down here, we're going to loop over the range of the length of the L.

363
00:55:03,000 --> 00:55:12,000
And then what we're going to do is append the loop variable, i, to the end of my list.

364
00:55:12,000 --> 00:55:23,000
Now, what does range length L do? So remember the thing that our for loop iterates over is a sequence of values.

365
00:55:23,000 --> 00:55:32,000
Now, range some number creates for us a tuple-like object, not a tuple specifically, but you can think of it like a tuple.

366
00:55:32,000 --> 00:55:41,000
So range four, the length of this particular list, would create for us in memory something like a tuple, the sequence 0, 1, 2, 3.

367
00:55:41,000 --> 00:55:49,000
And this is the sequence that the loop variable i will go over. First it'll be 0, then it'll be 1, then it'll be 2, then it'll be 3.

368
00:55:49,000 --> 00:56:01,000
So when we iterate through this sequence, Python says, okay, the first time I see this, I encountered this for loop, I'm going to save this sequence I need to iterate over as an object in memory.

369
00:56:01,000 --> 00:56:05,000
And then I'm going to have my loop variable iterate over each one of these elements.

370
00:56:05,000 --> 00:56:16,000
The thing I'm doing is appending i to the end of a list. So the first time through the list, I'm going to append a 0 to the end, so the 0 being this loop variable here.

371
00:56:16,000 --> 00:56:22,000
Next time through the list, I'm appending the 1 to the list I just mutated.

372
00:56:22,000 --> 00:56:31,000
Next time I'm appending the 2 to the list I just mutated. And last time through the list, I'm appending the 3 to the list I just mutated.

373
00:56:31,000 --> 00:56:40,000
And we finish. We've gone through four times. We've appended four items to the end of the list. 0, 1, 2, and 3.

374
00:56:40,000 --> 00:56:47,000
The elements of my sequence that I'm iterating over.

375
00:56:47,000 --> 00:56:51,000
Let's look at the memory diagram.

376
00:56:51,000 --> 00:57:02,000
So originally, l is 1, 2, 3, 4. What exactly happens when we first encounter range length l? That gets put as a variable, this tuple-like thing.

377
00:57:02,000 --> 00:57:10,000
I made it be a tuple, but it's not exactly a tuple in memory. And this i will iterate through each one of these values in my sequence.

378
00:57:10,000 --> 00:57:17,000
This is the sequence of values that I'm going to iterate over.

379
00:57:17,000 --> 00:57:29,000
So the first time through the loop, Python has i pointing to 0 here. And so what's it doing inside the loop? It's going to append the 0 to the end of l.

380
00:57:29,000 --> 00:57:37,000
Next time through the, then it's going to print l, sorry. And then next time through the loop, the loop variable increments by 1.

381
00:57:37,000 --> 00:57:48,000
So we've already looked at the 0. Now we're going to do the 1. So the loop variable i is now 1. So we're going to append the loop variable 1 to the end of l, print l.

382
00:57:48,000 --> 00:58:02,000
Loop variable becomes 2, append the loop variable to the end of l. So now it has a 2, print l. And then the last time we append the loop variable 3 to the end of the list l, and print l.

383
00:58:02,000 --> 00:58:18,000
Pretty straightforward, the code terminates because we've created this original tuple-like object here, which tells Python what values you need to iterate over. This is your sequence of values to go through.

384
00:58:18,000 --> 00:58:21,000
So that's basically what I said.

385
00:58:21,000 --> 00:58:33,000
So let's look at a slightly different example. So in this case, instead of iterating over the range length l, let's iterate over the elements in l directly. So for e in l.

386
00:58:33,000 --> 00:58:43,000
Now to keep things sort of in parallel to what we had done before, let's create a loop variable i equals 0 before the for loop, and let's increment it by 1 each time through the loop.

387
00:58:43,000 --> 00:58:57,000
So we're going to still append 0 than 1, then 2, then 3 to the end of our list. So in this particular case, we start out with the memory diagram like this. So we have l pointing to 1, 2, 3, 4.

388
00:58:57,000 --> 00:59:09,000
Loop variable i is going to be 0 originally, and e will first point to the first element in the list. That's what the for loop over the elements in the list does.

389
00:59:09,000 --> 00:59:19,000
So going into the list, we say l got append i, so at the end of l, I'm going to mutate it to contain a 0.

390
00:59:19,000 --> 00:59:31,000
Good. I increment i by 1. Good. I print l. Okay, good. And then the next time through the loop Python says, all right, what's the next element in my sequence?

391
00:59:31,000 --> 00:59:42,000
Well, I looked at the one first. Now let me look at the two. All right. Now I'm looking at the two as my next element sequence. I'm going to append i to the end of the list.

392
00:59:42,000 --> 00:59:57,000
Right. So I'm going to append 1 to the end of l. Increment i by 1 to be 2. Print l. Okay. Next value in my sequence. E increments to the next element in the sequence.

393
00:59:57,000 --> 01:00:09,000
The three. We append i to the end of the list. We append 2 to the end of l. Increment i by 1. Print l. What do you notice?

394
01:00:09,000 --> 01:00:20,000
Is this code going to terminate? No. Because our loop variable will always be four elements away from the list. The end of the list.

395
01:00:20,000 --> 01:00:29,000
Right. As I'm adding an item to the end of my list, loop variable iterates to the next item. But then I'm adding another item to the end of my list and my loop variable iterates.

396
01:00:29,000 --> 01:00:38,000
And so we're always going to be four behind the end of the list. So this code will actually never stop.

397
01:00:38,000 --> 01:00:52,000
All right. So the difference here is what I'm iterating over. In the previous example, as soon as Python saw range, length, whatever, it made this predefined sequence of values it needed to iterate over.

398
01:00:52,000 --> 01:01:04,000
But here it doesn't do that because it's iterating over my object l. There's no predefined sequence to create. It's supposed to iterate over l directly. Okay. So that's the difference between these two.

399
01:01:04,000 --> 01:01:20,000
All right. So now I'm going to show you before I do the last trick example involving catnation, I wanted to mention one thing, which is there was a question earlier. How do we actually add more than one item to the end of our list? And we do that using this extend operation.

400
01:01:20,000 --> 01:01:32,000
And this extend operation will it is kind of like a pen, but we are going to add all of the elements of some list as the parameter to the end of our list L.

401
01:01:32,000 --> 01:01:45,000
So in effect, we're mutating L to be extended by all the elements in some underscore list. So here's an example. First, let's do concatenation just to remind ourselves what it does.

402
01:01:45,000 --> 01:02:05,000
So L1 is 213 in memory. L2 is 456 in memory. L3 is going to be a one concatenated with L2. Pretty straightforward. It's concatenation. So Python creates for me a new object, which is all the objects in L1 and L2 put together as this completely new object bound to the name L3.

403
01:02:05,000 --> 01:02:17,000
So L1 and L2 remain unchanged. No problems there. But the extend is going to mutate, notice the dot notation format of extend.

404
01:02:17,000 --> 01:02:27,000
It's going to mutate L1 to be extended by all the elements in this list. So it's going to add 0 and a 6 to the end of L1.

405
01:02:27,000 --> 01:02:34,000
So here it is. I've got L1 mutated to be 213 and then 0 and then 6.

406
01:02:34,000 --> 01:02:43,000
So just to bring the point home, the thing we're extending by is all of the elements of this list in the parameter.

407
01:02:43,000 --> 01:03:01,000
So in this particular case, L2.extend will be extended by how many elements? 2 or 4? Yeah, I see 2. Exactly. It'll be extended by two elements at the top level.

408
01:03:01,000 --> 01:03:11,000
So this list has two elements in it, a list and then another list. So this command here will extend L2 by these two elements specifically.

409
01:03:11,000 --> 01:03:24,000
1, 2 as a list and 3, 4 as a list. But these are individual objects. They're single objects that are lists. They happen to have a bunch of elements as part of the list, but they are two objects.

410
01:03:24,000 --> 01:03:44,000
Yeah. When we extended by 0 comma 6, there's no brackets because we're extending it by the elements of this top level list. So it's two integers.

411
01:03:44,000 --> 01:03:54,000
And here we're extending it by the elements of this top level list, in the sense that the outermost parentheses, which are actually, they are lists.

412
01:03:54,000 --> 01:04:01,000
So this, yeah.

413
01:04:02,000 --> 01:04:08,000
So that introduces extend. We're not actually going to use extend for this particular example, but I did want to mention it.

414
01:04:08,000 --> 01:04:19,000
In this example, we're going to use the plus the concatenation operator to create for us this new object and bind it to L again.

415
01:04:19,000 --> 01:04:29,000
So let's see what this is going to do. First, I'm going to actually tell you the answer and then we'll do the memory diagram again to bring the point home.

416
01:04:29,000 --> 01:04:39,000
So this loop will again loop through all the elements in L. Originally, it's 1, 2, 3, 4 in a list.

417
01:04:39,000 --> 01:04:48,000
So what is the actual loop going to do? It's going to take whatever is in L, double it.

418
01:04:48,000 --> 01:04:57,000
So originally, L is 1, 2, 3, 4. The first time through the loop is going to create a new object, which is just L, 1, 2, 3, 4, doubled.

419
01:04:57,000 --> 01:05:08,000
I've concatenated L with itself. And then I'm going to save it in my new, as this new object with the name L again.

420
01:05:08,000 --> 01:05:22,000
That's the first time through the loop. Second time through the loop, I'm going to take whatever L was mutated, or whatever L was before, sorry, not mutated, but whatever L was before. So it's 1, 2, 3, 4, 1, 2, 3, 4.

421
01:05:22,000 --> 01:05:29,000
Double that and save it under the name L. Second time through the loop.

422
01:05:29,000 --> 01:05:44,000
Now, third time through the loop, I'm going to take whatever L is right now. So these two rows of 1, 2, 3, 4, 1, 2, 3, 4. Double that and save it under the name L.

423
01:05:44,000 --> 01:05:57,000
And then the last time through the loop, I'm going to take whatever L was before. So these four rows of 1, 2, 3, 4, 1, 2, 3, 4. Double those and save that as the new L.

424
01:05:57,000 --> 01:06:05,000
And that's it. This code does not go to infinity.

425
01:06:06,000 --> 01:06:26,000
Now, let's see why exactly that is. So this will help. Originally, I've got L is 1, 2, 3, 4. So that's straightforward. My loop variable E goes through each element in this object. So first, it's going to point to the 1. So far, the same.

426
01:06:26,000 --> 01:06:39,000
L equals L plus L. Let's look at the right-hand side first. This creates for me a new object. Remember, concatenation creates for me a new object. It doesn't mutate anything.

427
01:06:39,000 --> 01:06:52,000
So in memory, I'm going to get 1, 2, 3, 4, 1, 2, 3, 4. I've doubled L. L with itself. What is L equals going to do?

428
01:06:52,000 --> 01:07:08,000
Remember, we did a slide like this, very similar to this. It's like when we reassigned the tuple. The L equals will actually take the binding from my original object and put it on the new object that I had just created.

429
01:07:08,000 --> 01:07:21,000
I had the same name, but it's pointing to a new object. Same here. I have the same name, L, but it's now pointing this new object.

430
01:07:21,000 --> 01:07:38,000
The old object, this thing that I'm iterating over, I've lost the binding to it. And really, the only way I can even reference that old object is through this E. Because that E is still going to go through this old object elements.

431
01:07:38,000 --> 01:07:41,000
So that's the first time, yes, question.

432
01:07:41,000 --> 01:07:47,000
Yes, why is E not getting about if you define it before you change it?

433
01:07:47,000 --> 01:08:02,000
Yes, you define E to be the object in memory, not the name L. So E is bound to the object in memory that's this thing here. That's why it was so important to kind of separate ourselves from the object in memory versus the name we give an object.

434
01:08:02,000 --> 01:08:09,000
Because that name can change to anything, just a bunch of other stuff. But the object itself remains in memory.

435
01:08:09,000 --> 01:08:18,000
So then this becomes pretty straightforward. If you understand that piece, the first time through the loop, I've got L assigned to this new object here.

436
01:08:18,000 --> 01:08:25,000
I've lost the binding to my original list that I'm iterating over. So when I print L, I print this.

437
01:08:25,000 --> 01:08:32,000
Next time, E increases to the next element in my sequence.

438
01:08:32,000 --> 01:08:39,000
L will double what it currently is. So it's currently this thing here. It's going to double to that.

439
01:08:39,000 --> 01:08:49,000
And I'm going to lose the binding from the original, or not the original, but this thing that I had just bounded to, to bind it to the next object that I had just created.

440
01:08:49,000 --> 01:08:54,000
And then that's the second time through the loop. It looks like this. Third time through the loop.

441
01:08:54,000 --> 01:09:02,000
E increments by one, right, to the next value in my sequence. I'm going to take L plus L, so double that.

442
01:09:02,000 --> 01:09:09,000
Previous data object. Take the binding from that previous object to the new one.

443
01:09:09,000 --> 01:09:22,000
Increment. E by one more, right? And this will be the last time E is going to change because after this E will have gone through all the elements in its sequence.

444
01:09:22,000 --> 01:09:30,000
It's gone through the end of the list. So the last time through the loop, I've doubled that L. And I've lost the binding from the previous one, made it to the new one.

445
01:09:30,000 --> 01:09:36,000
And then that's it. It's done.

446
01:09:36,000 --> 01:09:43,000
Questions. Is it straightforward? Does the picture help? All that.

447
01:09:43,000 --> 01:09:51,000
Okay. One more thing I want to mention. And this is kind of a preview of what we're going to do next time.

448
01:09:51,000 --> 01:10:00,000
One very useful operation that you might want to do is to take a list and remove all of its elements.

449
01:10:00,000 --> 01:10:06,000
Sorry. Why is it getting like, did you do the, like, stops before the last one?

450
01:10:06,000 --> 01:10:15,000
Oh, here it's, that's in range. So here it's just iterating through all the elements in the sequence. Right. Going to everyone.

451
01:10:15,000 --> 01:10:24,000
So one useful operation we might want to do is to remove all the elements in the list, but not, sorry, but by mutating the list.

452
01:10:24,000 --> 01:10:31,000
So we want to keep our original list object. We just want to basically clear it out of all of its elements.

453
01:10:31,000 --> 01:10:39,000
And so the command for that has a pretty nice name. It's called clear. So if you want to take a list L and clear it.

454
01:10:39,000 --> 01:10:44,000
So to remove all the elements inside it, you say L dot clear.

455
01:10:44,000 --> 01:10:51,000
Okay. And that mutates my original list L to be empty.

456
01:10:51,000 --> 01:11:00,000
So one thing that might help sort of with this mutation lecture and figuring out which object is which and whether you've created a new object or not is to figure out.

457
01:11:00,000 --> 01:11:06,000
So what I'm going to do is to ask, how do I know that this object is the object that I'm mutating?

458
01:11:06,000 --> 01:11:10,000
And to do that, we're actually going to use this function called ID.

459
01:11:10,000 --> 01:11:20,000
And ID lets us kind of get the memory location or memory object or the ID of the object itself in memory.

460
01:11:20,000 --> 01:11:31,000
So the code on the left is code that takes in a list L. We get its ID to see what is this object in memory, what's its number.

461
01:11:31,000 --> 01:11:39,000
Appendant eight to it. We're going to see that the ID of this is going to be the same as the ID of this because we're mutating L.

462
01:11:39,000 --> 01:11:43,000
We're not changing it. We're not creating a new object.

463
01:11:43,000 --> 01:11:51,000
And then lastly, we're going to clear it and check the ID again and you're going to see that the ID is exactly the same in all of these different cases.

464
01:11:51,000 --> 01:12:04,000
So I'm doing this in the, just in the console, just to show you real quick. So here I have 456 as my L. Right. Here's L 456. The idea of it is this number here.

465
01:12:04,000 --> 01:12:09,000
We could just look at the last three digits or whatever, 808.

466
01:12:09,000 --> 01:12:17,000
Let's append an item to the end of our list. Right. L mutated to contain that item.

467
01:12:17,000 --> 01:12:25,000
The ID of L remains the same. Right. And it's an 808. It's the exact same object in memory. We've mutated it.

468
01:12:25,000 --> 01:12:37,000
L dot clear. L empty list. Right. I've removed all the elements of L. And the ID of L will show me that it's is exact same object. Right.

469
01:12:37,000 --> 01:12:42,000
I'm just mutating this same object in memory.

470
01:12:42,000 --> 01:12:51,000
Let's do that again. Except in the new aversion instead of using L dot clear, I will say L is equal to the empty list.

471
01:12:51,000 --> 01:13:08,000
And this is also a really common common mistake to me. So here I have L is 456. Again, this is my L. Let's get the idea of L. It's going to be a new one because I've reassigned L to this new list. Right. So this one ends in 312.

472
01:13:08,000 --> 01:13:26,000
Again, let's do an append just for fun. Right. The ID of L is going to be again 312. But now if I say L is equal to the empty list, this is exactly same as the situations we've seen before with the 2-po and with that trick example number 3.

473
01:13:26,000 --> 01:13:43,000
When I say L is equal to the empty list, Python takes my name L and assigns it to this object that is the empty list. My original object 456.8 is still in memory. I've just lost the binding to it. Right. So here's L.

474
01:13:43,000 --> 01:14:09,000
It's an empty list. But the idea of L is now going to be different. Right. Originally, I was working with this list at ID 312. But after I said L is equal to the empty list, I've lost the binding from that old list and rebound my list. My name L to this new empty list. Right. And you can see this using the this ID. Just pretty cool.

475
01:14:09,000 --> 01:14:19,000
Okay. Quick summary. So we saw lists and tuples as a way for us to create these compound data structures that can contain any kind of object as their elements.

476
01:14:19,000 --> 01:14:34,000
Tuples are immutable. So for things like things that don't change, they're very useful like country latitude, longitude, those things won't change or you know the word that appears on a page number, a line number or something like that.

477
01:14:34,000 --> 01:14:52,000
So lists are mutable objects. So you use them in situations where you need that dynamic aspect. Right. So if you want to maintain a list of employees, you want to maintain a list of students, a list of grocery items or things in your fridge. Right. Those are really good situations where you'd want to list because things are constantly changing.

478
01:14:52,000 --> 01:15:06,000
You don't want to make copies of everything all the time because it becomes very inefficient to do so. Okay. So next lecture, we will continue with tricky examples and we'll also have a quiz. Right. Remember quizzes are now on Monday.

