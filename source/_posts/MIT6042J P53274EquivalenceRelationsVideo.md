---
title: MIT6042J P53274EquivalenceRelationsVideo
---

1
00:00:00,000 --> 00:00:11,000
Equivalence relations are another kind of binary relation on a set which play a crucial role in mathematics and in computer science in particular.

2
00:00:11,000 --> 00:00:20,000
And they can also be explained both in terms of digraphs and in terms of axioms. So let's begin with a digraph explanation of an equivalence relation.

3
00:00:20,000 --> 00:00:29,000
And the kind of relation that's an equivalence relation is the relation of there being a walk in both directions between two vertices.

4
00:00:29,000 --> 00:00:41,000
So if there's a walk between vertex U and vertex V and conversely there's a walk from vertex V back to vertex U, then U and V are said to be strongly connected.

5
00:00:41,000 --> 00:00:55,000
And strongly connected is going to be an example of an equivalence relation. So in terms of the walk relation, including zero length walks, the relation that we're talking about is U, G star V and V, G star U.

6
00:00:55,000 --> 00:01:10,000
Now as a property of relations, this has a name, it's called symmetry. So a relation R on a set A is symmetric if and only if ARB implies BRA and the first remark is that the strongly connected relation.

7
00:01:10,000 --> 00:01:39,000
And equivalence relation is a symmetric relation that is transitive and reflexive. And again we have immediately that the walk relation, the mutual walk relation, the two way walk relation or strongly connected relation in a digraph is an equivalence relation because clearly if there's two way paths between U and V and between V and V and W, then there's one between U and W.

8
00:01:39,000 --> 00:01:52,000
By going from U to V to W and back, likewise there is a length zero walk from any element to itself and by definition, strong connectedness is symmetric.

9
00:01:52,000 --> 00:02:13,000
So the strong connectedness relation in any digraph is an equivalence relation and the theorem is conversely that any equivalence relation, anything that's an equivalence relation, is the strongly connected relation of some digraph that proves trivial, it's the strongly connected relation of itself.

10
00:02:14,000 --> 00:02:27,000
Okay, some examples of equivalence relations to see why they're so basic is that the most fundamental one is equality. Obviously equality is symmetric and reflexive and transitive and so it's an equivalence relation.

11
00:02:27,000 --> 00:02:38,000
Another one that we've seen is congrats mod N which you can also check is symmetric and transitive and reflexive.

12
00:02:38,000 --> 00:02:48,000
And finally, another relation would be that two sets are the same size, providing their finite sets and another example would be a bunch of objects having the same color.

13
00:02:48,000 --> 00:02:59,000
Two objects have the same color is a relation among objects that have color that is symmetric and transitive and reflexive so it's an equivalence relation.

14
00:03:00,000 --> 00:03:13,000
Let's illustrate some of these axioms that we have in terms of graphs that can be helpful to remember them. So reflexive means that when you look at a digraph, it's reflexive when there's a little self loop from every vertex to itself.

15
00:03:13,000 --> 00:03:21,000
So there's a length one path or an edge from vertex to itself in reflexive graphs.

16
00:03:21,000 --> 00:03:32,000
Transitive means that whenever you have two edges connecting one vertex to another, there's a path of length two from one place to another, then in fact there's an edge from that place to its target.

17
00:03:32,000 --> 00:03:42,000
And of course, as we said, once that there's an edge wherever there's a path of length two, it follows by induction that there's an edge wherever there's a path of any length and that's what transitive means.

18
00:03:42,000 --> 00:04:02,000
Asymmetric means that whenever you have an edge from one vertex to another, there is no edge back. So in particular, if I have an edge from this vertex to that vertex in blue, there is no edge that goes back in the other direction, nor is there ever a self loop in an asymmetric graph.

19
00:04:02,000 --> 00:04:14,000
And finally, in the symmetric graph, wherever there's an edge, there's an edge that goes back the other way. So that can help you maybe remember what these properties mean.

20
00:04:14,000 --> 00:04:28,000
Now, again, equivalence relations besides being represented in terms of the strongly connected relation of a digraph can be represented in two other very natural ways that really explains where they come from and what their properties are.

21
00:04:28,000 --> 00:04:57,000
So whenever you have a total function f on a set a, it defines an equivalence relation on the set a, namely if f is a total function from domain a to co domain b, then we can define an relation we can call equivalence sub f on the set a by the rule that two elements are equivalence sub f if and only if they have the same image under f, they hit the same thing that is a is equivalent sub f to a prime if and only if f of a is equal to f of a prime.

22
00:04:57,000 --> 00:05:17,000
And again, equivalence sub f immediately inherits the properties of equality, which makes it an equivalence relation in the theorem that we have is that every relation are on a set a is an equivalence relation if and only if it in fact is equal to equivalence sub f for some function f.

23
00:05:17,000 --> 00:05:34,000
Let's illustrate that we already remembered that congruence mod n can be understood as equivalence sub f where the mapping is just map things to remainders two numbers are congruent mod n if and only if they have the same remainder on division by m by n.

24
00:05:34,000 --> 00:05:48,000
So map a number a to f of k equal its its remainder and we have found the equivalence sub f representation of congruence, which is another way to verify that congruence is an equivalence relation.

25
00:05:48,000 --> 00:05:54,000
Finally, whenever you have a partition of a set, you can define an equivalence relation.

26
00:05:54,000 --> 00:06:09,000
So a partition of a set cuts up the set a into a bunch of blocks, which are non-empty and every element is is is a member of some block and the blocks don't overlap. So in fact, every element is a member of a unique block.

27
00:06:09,000 --> 00:06:36,000
And that enables me to define an equivalence relation on a by the property that two elements are in the same block. In fact, that's the proof of the previous representation theorem in terms of a function that you can map an element to the block that it's in in order to see that the block representation and the equivalence sub f representation are the same.

28
00:06:36,000 --> 00:06:53,000
The proof in the other direction that every equivalence relation can be represented in this way is an exercise in in axiomatic reasoning and elementary one that we're going to leave to a problem and not do in this presentation.

29
00:06:53,000 --> 00:07:04,000
So the theorem finally is that again, that a relation are in a set is an equivalence relation, if and only if it is in fact the being in the same block relation for some partition.

30
00:07:04,000 --> 00:07:11,000
And that is the story and multiple ways of understanding what equivalence relations are.

