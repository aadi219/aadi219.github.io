---
title: "Lists and List Functions, from various Categorical perspectives"
date: "2026-07-09"
description: "A categorical survey of Cons-Lists and the list functions which emerge from various categorical constructions"
image: "/assets/img/thumbnails/lists-and-list-functions.png"
tags: ["category theory", "functional programming"]
---

## Motivation
I think this article can be interpreted in many different ways. It can be considered a crash course in category theory, and perhaps this encourages some readers to look deeper into the more abstract aspects of functional programming. It may be taken simply at a surface level as a survey of properties of lists and where they emerge from. Maybe a pragmatic eye can find something applicable or useful from all these different perspectives and generalizations, or perhaps it can just be considered ramblings of abstract nonsense. Personally, I think one of my main motivations behind writing this piece was the fact that I was able to find a new aspect of programming which piqued my interest in a way that is quite similar to the first time I encountered machine learning, which turned into my hyperfixation for quite a while. Exploring even just the surface of fields like category theory has shown me a side of programming that I had not once encountered in the years that I had been interfacing with the field. And with things such as HoTT, Topos Theory, Algebraic Topology and perhaps applications to Deep Learning on the horizon, I have a newfound optimism for what the future of programming may look like for me.

## Introduction
In all my years so far of interfacing with programming and programming languages, the concept of a `List` has always been one that's seemed quite trivial. A 'list' in the simplest terms I've encountered has been phrased as just "a collection of objects", typically of the same kind and ordered.

For the longest time, my perception of a list in all the languages I've encountered was just a collection enclosed in `[]` and the definition of a list seemed to be bounded by these brackets. I didn't really consider them to be anything more than a utility for storing multiple instances of something, and for most intents and purposes, having a basic structure like this is incredibly useful for creating just about any program you'd encounter in higher levels of abstraction. It's not unlikely that you've had a similar relationship to lists as I have, where one would look at `[1,2,3...n]` or perhaps even "multi-dimensional" lists of the kind `[[0,0,255], [255, 0, 0],  ...]` and consider the nature of these lists to be so intuitive and trivial that one doesn't look past their surface-level utility to understand the generality that lies beneath them.

But I've recently realized how shallow this perception of a list is; that its definition can be understood as something completely different from objects being enclosed in those square brackets, and what the implications of that may be. It also may be worth noting early on whether developing this separate notion of lists would be of any productive value. This is not something I can guarantee as I will be utilizing concepts from ==Category Theory==, which apparently has a reputation for being *"abstract nonsense"*. Even personally, I'm not sure whether thinking of lists in this different manner has fully replaced my prior, pragmatic understanding of lists. But I can say with some surety that it has made me develop an appreciation of a simple, trivial list, and has on some level deepened my relationship with programming as a whole.

I would also like to preface that I do not (yet) claim to be a Haskell programmer or a Category Theorist. However, I will be borrowing grammar and notation from both of these as I believe they are the best, most minimal means of communicating the ideas relevant to this article. The "Haskell" you find below may not be syntactically perfect, but its purpose is not meant to be compiled by the `GHC`, and I hope that it's sufficient enough to bring across the ideas being discussed. Both Haskell and Category Theory are beautiful languages capable of communicating incredibly interesting ideas, and I encourage the reader to explore them further. In the following sections, I'll be trying to describe lists and their behaviours in as many different ways as I'm aware of at the moment and by some mathematically-incomplete, ontological view of the Yoneda Lemma, I think doing this may bring me closer to what a `List` really is. 

## Defining a List

```
List a = Nil | Cons a (List a)
```

This recursive definition of a list is what I'll be referring to in the upcoming instances. It's sometimes called a ==Cons-List== and is typically the definition of a list encountered in functional programming languages. You can try convincing yourself that this actually forms a structure that's quite close to the imperative programmer's lists of `[a, b, c, ... ]`. My intuition, coming from most references you'll find online, is to think of it as follows:
We take `Nil` to be the same as the empty list `[]`. For any other list that is non-empty, say `[a, b]`, the list is defined by splitting that structure into the `head` and the `tail` by the `Cons` constructor and for multiple 'elements', we recursively split the tail until we reach the last element. For example:

```
[a, b] == Cons a [b]
# applying the same 'destructuring' to [b]
[a, b] == Cons a (Cons b [])
# and finally
[a, b] == Cons a (Cons b Nil)
```

Though it is incredibly tedious to define lists in this manner, I do find it incredibly fascinating that this definition, with no square bracket in sight, is for all intents and purposes, the same as our imperative, bracket-bound list. This is to say that any *finite* list of a given type `a` can be represented by our definition of `List a`, and this will mark the point of divergence from our intuitive non-functional understanding of a list.

## List as a Functor

From this point onwards, I'll be trying to analyze lists from a functional and more category-theoretic perspective, and I'll provide brief explanations about these concepts with varying degrees of formality and some links for support. It's important to note that the intuition behind these concepts or their applicability in any scenario to a useful degree may not be inherently apparent and may require looking over them and over other instances of them to try and gain a better understanding. I say this mainly speaking from personal experience as I've been grappling with these concepts for months now and have only barely gotten the courage to put my thoughts down in words.

### Categories

In its simplest, abstract and formal sense, a category $C$ is simply a collection of objects and relationships between these objects called morphisms. Often, you'll see a category depicted as a diagram where objects are either dots or letters and morphisms are arrows going from one dot (the domain) to another (the codomain). It might be important to state that in the categories that we'll be talking about, the collection of all arrows from $a$ to $b$ forms a *set* represented as $C(a,b)$  called the hom-set. For a collection of dots and arrows to actually form a category, it must satisfy some conditions: 
1. **Composition**: This condition says that in any valid category, if there exist  morphisms $f: a \to b$ and $g: b \to c$ , where $a,b,c$ are objects in $C$ then we always have a morphism from $a$ to $c$ which is a composition of the two morphisms. This composition is typically written $g \circ f:a \to c$ or `g . f :: a -> c` and I read it as $g$ *after* $f$ 
2. **Identity**: This condition states that for each object in $C$ we have a unique morphism from that object to itself, which returns itself and is equivalent to essentially doing nothing to the object. In diagrams, these morphisms are often omitted but are always implicitly present in any valid category.

	This identity morphism must satisfy the condition below for any $f \in C(a,b)$:
$$
f \circ id_{a} = id_{b} \circ f = f
$$

3. **Associativity**: This states that composition must be associative for any relevant triple of morphisms $f$, $g$, $h$ with relevant domains and codomains. That is
$$
f \circ (g \circ h) = (f \circ g) \circ h
$$

![arbitrary category](/blog-assets/lists-and-list-functions/category.png "An arbitrary category with three objects and 3 morphisms and identity morphisms")

I want to emphasize that we haven't really put any restrictions on what objects are or even what morphisms are. I quite appreciate this about category theory because as long as I can define a structure that satisfies these constraints (though that's not always very easy to do), I can call that structure a category.

Some basic examples of categories that are mentioned in every intro to category theory article/video are $Set$ where objects are sets and morphisms are functions between sets. Haskell programmers primarily deal with the category [`Hask`](https://wiki.haskell.org/Hask)  where objects are *Types* and morphisms are functions from one type to another. We also have the category $Cat$ of ([*small*](https://ncatlab.org/nlab/show/small+category)) categories where each object is a category and a morphism between categories is a **functor**.

### Functors
I'll try to keep this brief while maintaining some sort of balance between beginner intuition for category theory and the primary focus which is meant to be on lists. As mentioned before, a ==functor== is a morphism between two categories, and it is special in the way that it maps or embeds the contents of one category in another. I've found it to be a useful beginner intuition that morphisms in a category are what provide it its structure. And so when mapping from one category to another, we have *functors* which preserve this structure between objects. Formally,

A functor $F: C \to D$ is a mapping that maps every object $a$ in $C$ to its image $Fa$ in $D$ . In order for this mapping to be 'structure preserving', for any morphism $f: a \to b$ in $C$, we must have $Ff: Fa \to Fb$ in $D$. Some common language that I've come across to help build intuition behind functors is that the application of a functor on an object (`a`) is like putting that object in a container (`F a`). `F f` is a way of going under or inside that container to manipulate the contents in a way that we would have done in $C$. You may also find terminology such as "*A functor **lifts** morphisms in $C$ to morphisms in $D$*. For something to be a functor, it must also satisfy some fairly reasonable constraints:
1. The identity morphism on any object must be mapped to the identity morphism of the corresponding mapping in the codomain category
$$
F (id_{a}) = id_{Fa}
$$
2. The 'lifting' of a composition of morphisms must be the same as the composition of the lifting of the individual morphisms
$$
F(g \circ f) = Fg \circ Ff
$$


![functor example](/blog-assets/lists-and-list-functions/functor.png "Commutative diagram of a functor from a category C to D ")


In a language like Haskell, in order to declare a type to be a functor, we must define this lifting of functions 
```
class Functor f where
	fmap :: (a -> b) -> (Fa -> Fb)
```
which essentially defines a functor like a protocol or interface with this `fmap` method to be implemented according to the specifics of each particular functor. `fmap` itself is a function which, given a function `f :: a -> b` will return the lifted function `fmap f :: (Fa -> Fb)` (same as $Ff$). This signature can also be interpreted as taking two inputs: a function `a -> b` and a value `Fa`, which returns an instance of `Fb`. Logically, these signatures are identical and the latter would be used in instances below to make the code a little simpler. Another important point to mention that when we're talking about the category `Hask` of types and functions, all functors being mentioned are actually *endo*functors. An ==endofunctor== maps from a category to itself: $F: C \to C$ obeying all the same rules for a regular functor.


### The List Functor

Finally, to put this all into context, we can think of `List` as an endofunctor on types. So every type `a` under the action of this functor gets mapped to the type `List a`. It's quite simple to think of object mappings in this manner; some examples include:

```
Int |-> List Int # [1,2,3...]
String |-> List String # [""...]
Bool |-> List Bool # [0, 1, 1, 0, 0 ...]
```

But a more interesting aspect of List being a functor is trying to identify its `fmap`. For the specific instance of the List functor, our `fmap` signature becomes:
```
fmap :: a -> b -> List a -> List b
```
So, given a function `a -> b` and a list of `a`, we want a function that will produce a list of `b`. It's an interesting exercise when beginning in category theory to try and figure this out. It turns out, `fmap` for the list functor is simply the `map` method that exists in most programming languages. We can start by sending an empty list of `a` to an empty list of `b`, which is a reasonable decision for most cases. After that, we're really not given a lot to work with. The only thing we can apply the function `f` to is the head of our list and since the tail has a type `List a`, we can `fmap f` to it again to recursively break it down. We define our `fmap` for the list functor as follows:
```
fmap f Nil = Nil
fmap f (Cons a as) = Cons (f a) (fmap f as)
```
This function can also be defined in terms of a lambda expression, but this definition still matches the signature and is a little bit neater.
If you want to be a bit more rigorous, you can try verifying the identity and distributivity rules for functors.

Thinking of lists as functors may seem quite trivial, at least it did to me when I first learned about it. But the `map` function on lists is extremely useful, and it just seems to fall out in front of you when thinking of lists in this manner. Not only that, this knowledge of functors and lifting of morphisms is incredibly general to all functors and that really does help expand one's intuition about these structures.

## List as a Monad

### Monads
Monads seem to be quite infamous outside the world of functional programming and I think they've garnered a (mostly) unfair reputation of being hard to understand. There are countless articles and videos on the internet which may be able to explain what a monad is way better than I can but one of the things I frequently encountered when learning about monads is that people always explained them in highly pragmatic or applied terms. This may be incredibly useful to some people but I wasn't really sure what I wanted to do with monads when I encountered those definitions, so they never really stuck with me. Instead, my favourite definitions were some which described what they were, rather than what they were used for. I would highly recommend Bartosz's [lecture](https://www.youtube.com/watch?v=gHiyzctYqZ0) on monads, where he provides a nice balance between utility, derivation, and general theoretical knowledge. It's worth noting that you can definitely go too far in the other direction and to describe them using the most esoteric and abstract language possible. The quote "*monads are simply monoids in the category of endofunctors*" does somewhat describe the properties of a monad, but this doesn't really help anyone who doesn't already know what all those words mean.

Here is my best attempt at defining a monad. A monad $T: C \to C$, is an *endofunctor* (as encountered above), equipped with the following ==natural transformations==:
$$
\eta : Id \to T
$$
$$
\mu : T \circ T \to T
$$
Though I do encourage you to look into natural transformations outside of this article, for our intents and purposes when dealing with `Hask`, we may just consider them to be ==polymorphic functions== which are valid for all types `a`
```
eta :: a -> T a         # also called the 'unit' 
mu :: T(T a) -> T a     # also called the 'multiplication' or 'join'
```

These natural transformations are also subject to the monad laws, which are some commutative diagrams which must be satisfied for something to be a valid monad. It is conventional that the ==identity natural transformation==, which effectively does nothing to the functor, is represented by the symbol of the functor itself.

![monad laws](/blog-assets/lists-and-list-functions/monad_laws.png "Monad laws depicted by commutative diagrams for an arbitrary monad T")

### The List Monad
We earlier established that `List` is an endofunctor in `Hask`. We can try to satisfy the additional constraints that monads require with our simple cons-list definition, starting with the `unit`.
This is quite trivial; the `unit` function, given any instance of any type, would simply return a singleton list with that instance as its only element.
```
unit :: a -> List a
unit a = Cons a Nil
```
The `join` operation is a little more interesting. In its abstract definition, it contains a mapping from a double functor application to a single functor application.
```
# ++ is the concatenation operator
join :: List (List a) -> List a
join Nil = Nil
join (Cons xs xss) -> xs ++ (join xss) 
```
So the `join` operation takes a 'list of lists of `a`' and gives back a list of `a`. But earlier we mentioned that categorically, this morphism is meant to be a *natural transformation*, i.e. a *polymorphic* function defined on all types. That just means we pose no restrictions on what type `a` might be. It may even be, say, `List a`. In that case, we would go from `List (List (List a))` to `List (List a)` via `join`. And we could stop there, but we could also apply join to this result and get `List a` back in the end. And we can do this for any arbitrarily nested list. Not only does this satisfy one of the unmentioned monad laws, but this time, the incredibly useful list method that falls out of thinking of lists as a monad is the `flatten` function. This also proves that lists by nature have this property that allows them to be flattened into a single 'dimension' regardless of how many dimensions the list you start with has.

## List as a Free Monoid

### Monoids
Monoids are still a little tricky for me. At the surface level, they seem quite simple, and for the purposes of this article, I won't be diving too far beneath the surface. However, monoids and *monoidal categories* seem to be ubiquitous and quite useful in both math and programming. Simply put, a monoid $M$ is a set equipped with a binary operation and a unit element. 
A valid monoid must also satisfy some standard associativity laws
$$
(x\ . \ y)\ .\  z = x \ . \ (y \ . \ z)
$$
(here $a\ .\ b$ is the multiplication operation) and a unital law
$$
e \ . \ x = x \ . \ e = x
$$
where $e$ is the unit element of the monoid.

I find it more interesting for it to be phrased as a set with two morphisms as defined in Haskell:
```
mappend :: (M, M) -> M     # the 'multiplication' or 'join'
mempty :: () -> M         # the 'unit' element as a morphism
```

Here `()` represents the singleton set which has only one element, and `(M,M)` represents the cartesian product of the set `M` with itself. We can consider the unit element of `M`'s underlying set to be *picked out* by a morphism which maps the only element in the singleton to the unit in `M`. This notion of set elements being uniquely identifiable by functions from the singleton set is interesting in its own right. But if we kinda squint our eyes, we can see a similarity in our definition of the morphisms of a monoid to the natural transformations we defined for our Monads. A key difference really is that monoids are quite general whereas monads are just *monoids in the category of endofunctors*.

Some basic examples of monoids include natural numbers under multiplication. Here, the underlying set is $\mathbb{N}$, the set of natural numbers, the multiplication operation is just multiplication of numbers and the unit element is 1. So the monoid in this case is the triple $(\mathbb{N}, \times, 1)$. For the same set, we may also define $(\mathbb{N}, +, 0)$ as a distinct, valid monoid.

### Lists as Free Monoids
The natural numbers under multiplication do indeed form a monoid, but they exhibit some behaviour which is unaccounted for. There are a lot of equalities which exist within this monoid which we really didn't ask for when we defined our simple monoids. For instance:
$$
1 \times 6 = 2 \times 3 = 3 \times 2 = 6 \times 1 = 6
$$
In this entire string of equalities, the only one which is expected from the monoid laws is the unitality. But we get all this additional 'structure' by virtue of our definition of $\mathbb{N}$ and the multiplication operation on the natural numbers.

By my understanding, a ==**free**== monoid on a set is one that is completely free of any additional structure and only respects the monoid laws that are defined. We can define various monoids for a given set of generators (as noticed for $\mathbb{N}$), so how may we identify the *free* monoid from all of these? We could iteratively extend and deduplicate our set by defining new elements to be the result of the multiplication of two existing elements, and with these, we are left with a set containing only those elements which are produced by the monoid laws.

More explicitly, we start with a finite set of some elements called *generators*, say $A = \{ a, b \}$ adding $e$ to be our identity element and defining the multiplication operation as $x \times y = xy$ where both $x$ and $y$ are generators. We'll keep extending our set by creating new items which are the result of the multiplication of generators $\{ a, b, ab, ba, a^2, b^2, e \}$ and then $\{ a, b, ab, ba, a^2, b^2, aba, ab^2, bab, ba^2, a^2b, b^2a, a^3, b^3, e \}$ and so on. The resulting set at each step $n$ contains all possible $n$-length sequences created by the initial set of generators. That is, this construction ends up leading us exactly to the lists on our set of generators (i.e. `List A`), with `concatenate` being the corresponding multiplication operation. These sequences satisfy the basic requirements of monoids and nothing more, and thus we may conclude that the `List` functor is not only a monoid, but a *free* monoid.

### A little more on Free Monoids
There are more interesting ways to approach describing `List` as a free monoid. For those who are interested, one can also say that lists are the *left adjoint of the forgetful functor $U : Mon \to Set$* which takes a monoid into its underlying set, effectively "forgetting" the monoid structure that comes with the multiplication operation. The free monoid construction also comes with a ==*universal property*==, a popular concept in category theory, which contrasts the free monoid with any other monoid. The universal property of the free monoid $m$ on an arbitrary set of generators $x$ states that given the canonical injection $p: x \to Um$ that takes the set of generators in $x$ to themselves in $Um$, for *any other monoid $n$ with a function $q : x \to Un$*, there is always a unique morphism $h : m \to n$ which factors $q$ via $q = Uh \circ p$.

![free monoid construction](/blog-assets/lists-and-list-functions/free_monoid.png "Commutative diagram showing the univseral property of the free monoid")
 
 The formality in the description of the universal construction somewhat hides its more interesting implications. The function $q : x \to Un$, determines the mapping for the generators of the free monoid, and the universal construction guarantees that this would automatically and uniquely extend to a [homomorphism](https://en.wikipedia.org/wiki/Monoid#Monoid_homomorphisms) from the entire free monoid to the target monoid $n$.

Adjunctions and Universal Constructions are fascinating concepts within category theory, which I highly encourage the reader to explore. Bartosz's article on [free monoids and universal constructions](https://bartoszmilewski.com/2013/12/21/understanding-free-monoids-and-universal-constructions/) is a great resource to start with.

## Algebraic Data Types & List-algebras

### F-Algebras
The generalization of *algebras* was quite a fascinating thing which was introduced to me via category theory. Although perhaps it should not have been too surprising as I had previously encountered many different 'Algebras' like 'Linear' algebra and 'Boolean' algebra previously during my software development experience. Regardless, I'm not sure why I never inquired further into why all of these things were called "algebras" or even what the word *algebra* meant in itself (if anything). Perhaps it may be because the initial notion of algebra taught in middle school became so second nature to my intuition and that all these other algebras were taught from the perspective of utility, that I never really questioned it.

Going back to our definition of a Monoid, we said that a monoid on a set $M$ is an endofunctor equipped with two morphisms:
$$
\mu :: M \times M \to M
$$
$$
\eta :: 1 \to M
$$

where $1$ is the singleton set or the terminal object. Thinking of the Hom-Sets of this monoid, that is, the set of all morphisms which are of the kinds specified above we get the sets:
$M^{M\times M}$ representing the set of all morphisms $M \times M \to M$, and
$M^1$ representing the set of all morphisms $1 \to M$

I believe this notation comes from the category $Set$ where the number of viable functions from $A \to B$ is $|B|^{|A|}$. As with all other notions which are skimmed over, I do encourage further investigation into Hom-Sets as they lead to various interesting discoveries. For now, I will permit myself the liberty of waving my hands and believing this to be a valid representation. We may go a little further with this hand-waving and truly abuse notation to obtain the following. The monoid morphisms involve a *pair* of Hom-Sets which may be represented as just that, a cartesian product of hom-sets - $M^{M \times M} \times M^1$ , from which we get $M^{M\times M + 1}$ using our standard elementary algebra laws. Though we are abusing algebraic notation, we are still dealing with sets here. The transformation we have created represents a set of morphisms from one set to another.

A morphism picked from the set $M^{M \times M + 1}$ of the form $M \times M + 1 \to M$ will result in a potential monoid on $M$. The crazy generalization comes from the fact that $M \times M + 1$ here is a *functor*. It's comprised of (here cartesian) products and co-products (the sum). It's a simple exercise to determine whether products and co-products are in themselves functorial and you can try coming up with `fmap` definitions for them. We obtain these ==*algebraic data-types*== when we use these products and co-products together and the results are themselves functors. Particularly, in a category which contains notions of finite products, exponentiation (hom-sets) and finite products and co-products (known as a [*bicartesian closed category*](https://ncatlab.org/nlab/show/bicartesian+closed+category)), these ADTs are endofunctors.

To bring this back to some intuitive notion of algebra, consider the [ring](https://ncatlab.org/nlab/show/ring) of Integers defined as the set of integers $\mathbb{Z}$ along with addition and multiplication operations, a uniquely identified additive identity, multiplicative identity, and additive inverse operation. Here we consider *Ring* to be an endofunctor acting on the set of integers $\mathbb{Z}$ defined as follows
```
RingF Int = ZeroF | OneF | AddF Int Int | MultF Int Int | InvF Int
```
We can see that this is a valid ADT comprised of co-products, products and the terminal object
The "algebra" for this endofunctor would be defined as a morphism of the following kind
$$
alg :: Ring_{\mathbb{Z}}  \to \mathbb{Z}
$$

Generalizing this notion, for a given endofunctor $F$ we may define the $F$-algebra defined as a morphism from $Fa \to a$ where $a$ is an object. Furthermore, we may have an entire category of algebras for a given endofunctor $F$ where objects are pairs of $(a, f)$ where $a$ is the ==carrier== type on which $F$ acts on and $f$ is the ==evaluator== or the ==structure map== of type $Fa \to a$. Morphisms in this category are actually just morphisms between carriers $f :: a \to b$ making the following commuting square due to the functoriality of $F$ meaning that $alg_{b} \circ Ff = f \circ alg_{a}$

![F-algebra](/blog-assets/lists-and-list-functions/f_algebra.png "Commutative diagram for a morphism between two F-algebras")

Since an instance of a ring may come in various forms due to the co-products in our definition, we define the function for each kind of instance we may encounter
```
alg :: RingF Int -> Int
alg ZeroF = 0
alg OneF = 1
alg (AddF a b) = a + b
alg (MultF a b) = a * b
alg (InvF a) = -1 * a
```

In a sense, this lets us define our "algebra" as a set of rules for evaluating each kind of structure we may encounter due to our endofunctor of choice. This is not very useful yet as this only lets us evaluate a single expression which is quite rudimentary compared to middle school algebra. We could naively expand upon this by making this structure somewhat recursively. In our previous definition `RingF` was our endofunctor acting on our carrier which was `Int`. Since `RingF` is an endofunctor, we should be able to conceive of its action on an arbitrary type in our category of types. That is, the general definition of `RingF` should be
```
RingF a = ZeroF | OneF | AddF a a | MultF a a | InvF a
```
where `a` is any arbitrary type. It's worth noting that though we can conceive of the endofunctor acting on any arbitrary type, we may not always have an *algebra* on an arbitrary carrier since for that we need to define the structure map going from the endofunctor type to `a`.

With this generalization, we can think of expression trees of slightly greater depths. For example, we may have
```
RingF1 = RingF (RingF Int)
RingF2 = RingF (RingF1)
...
RingFn+1 = RingF (RingFn)
```
And through this, we could define and evaluate an expression like `-(2 + 3) * (5 * 4)` as:
```
MultF((InvF (AddF 2 3)) (MultF 5 4)) :: RingF (RingF1 (RingF Int)) 
```
which is quite convoluted, but it does let us describe more complex expression trees. A crazy idea through which we could define arbitrarily deep trees is to define a recursive type for our ring
```
Ring = Zero | One | Add Ring Ring | Mult Ring Ring | Inv Ring
```

We can find that applying our `RingF` functor on this new recursive data-type really has no effect and yields the `Ring` type back. That is,
```
RingF (Ring) == Ring
```
We say that `Ring` is a ==*fixed-point*== of the endofunctor `RingF`, meaning that it is invariant under the application of that functor.

### Initial Algebras
An object $i$ in a category $C$ is called the ==initial== object if for *any* other object $x$ in $C$, there is a *unique* morphism $f :: i \to x$. Initial objects can also be defined from universal constructions, and they may not always exist in an arbitrary category.

We can try considering whether the category of an $F$-algebra has an initial object and what its properties may be. [*Lambek's Theorem*](https://ncatlab.org/nlab/show/initial+algebra+of+an+endofunctor) states that if there exists an initial algebra $FX \to X$ for an endofunctor, then $FX \cong X$. This means that there is an ==isomorphism== `In :: FX -> X` and `Out :: X -> FX` which leads us to the fact that the *inital algebra for an endofunctor is a fixed-point*.
In Haskell, the fixed point type is defined to be
```
Fix f = In (f (Fix f))
```
To be more verbose, here we define a type `Fix f` where `f` is an endofunctor to be constructed by applying `f` to an instance of itself via the `In` constructor
### List as an Initial Algebra

Coming back to the original topic of lists and the definition of a `Cons-List` we established where the list type is defined recursively as
```
List a = Nil | Cons a (List a)
```

To think of algebras over lists, we can try to "decouple" the evaluation of the algebra from the recursive aspect of our list. To do this, I'll try and work backwards and create a type definition that was similar to the shallow `RingF` type we defined earlier. We define a simpler functor `ListF a` with no recursion as
```
ListF a b = NilF | ConsF a b
```

It is important to note that `a` here is considered a partial application of the functor and part of the type itself, so for our purposes, this type is functorial in and parameterized only by `b`. This type is also identified as an ADT since it's a simple co-product of a terminal object and a product of `a` and `b`. Using our `Fix f` type definition, we can try finding the fixed point of this functor called `List' a` 
```
List' a = Fix (ListF a)
# which expands to
List' a = In NilF 
		| In (ConsF a (List' a))
# which is exactly the same as
List a = Nil | Cons a (List a)
```

And, according to Lambek, this would also come with the isomorphism
```
In :: ListF a (List a) -> List a
In NilF = Nil
In (ConsF a as) = Cons a as

Out :: List a -> ListF a (List a)
Out Nil = NilF
Out (Cons a as) -> ConsF a as
```

Thus, we conclude that `List` is the initial algebra of the `ListF` endofunctor and now we can focus on the evaluation of our algebra by defining the structure maps `ListF a b -> b`

### Catamorphisms

![catamorphism](/blog-assets/lists-and-list-functions/catamorphism.png "Commutative diagram showing a catamorphism for the ListF algebra")

As mentioned before, an initial object in any category has the property that there exists a unique morphism $h: i \to x$ for any object $x$ in that category. The initial algebra for an endofunctor exhibits this same property. In our context, this initial object is `List A`, and for any other algebra for the `ListF A` functor say `(B, ListF A B -> B)`, we will have this unique morphism `h: List A -> B`. Due to the functoriality of the endofunctor, we can also go under the functor via `fmap` and apply `h` to the underlying types. Furthermore, due to the initial algebra's structure map being an isomorphism, we can actually define this function recursively due to the fact that the diagram above commutes.

```
h :: List A -> B
h = alg . (fmap h) . out
```

This morphism `h` from the initial algebra to any other algebra is known as a ==*catamorphism*==, and it can be written as parameterized by the codomain algebra `alg`
```
cata alg = alg . fmap (cata alg) . out
```

Catamorphisms utilize the `out` isomorphism to "peel off" a layer of the recursively defined initial algebra and it does this over and over again via the `fmap` until it arrives at a base case on which it applies the `alg` algebra. In this manner, catamorphisms can be thought of as recursively breaking down algebraic structures, which is where they get their name from (Greek κατά, meaning "downwards")

To understand an application of catamorphisms, consider the following example. Let's define an algebra on the `ListF A` functor with the `Int` carrier.
```
alg :: ListF A Int -> Int
alg Nil = 0
alg a n = n + 1
```

A catamorphism on this algebra would be of the form `List A -> Int` and would return the length of the list. More generally, this gives you the `fold` operation on lists allowing you to recursively collapse a list into a given target datatype. Even more generally, catamorphisms allow you to collapse any recursively defined algebraic data structure.

### Anamorphisms
The construction [dual](https://en.wikipedia.org/wiki/Dual_(category_theory)) to the concepts we've covered so far give us a variety of different concepts. Dual to algebras, we have [co-algebras](https://en.wikipedia.org/wiki/F-coalgebra) defined by a carrier type and a co-evaluator `(A, coalg :: A -> FA)` and through Lambek's lemma we can declare that the *terminal coalgebra for an endofunctor is an isomorphism*. The universal property of a terminal object $a$ is that for any other object $x$, there exists a unique morphism $m : x \to a$. By the same logic as before, we can construct a dual to a catamorphism known as an ==*anamorphism*== which, instead of 'destructing' an algebraic data type, will recursively 'construct' it from a given seed (from Greek ἀνά, meaning "upwards").

![anamorphism](/blog-assets/lists-and-list-functions/anamorphism.png "Commutative diagram showing an anamorphism for the ListF algebra")

An anamorphism, parameterized by a coalgebra, would have the following signature and definition
```
ana coalg :: B -> List A
ana coalg = in . fmap (ana coalg) . coalg
```

We can create a simple anamorphism by defining a coalgebra for the `Int` carrier for the functor `ListF Int`. We'll define
```
coalg :: Int -> ListF Int Int
coalg n = if n > 5 then Nil else Cons n (n+1)

# with corresponding anamorphism
ana coalg :: Int -> List Int

# with fmap f
fmap :: (a -> b) -> ListF Int a -> ListF Int b
fmap f NilF = NilF
fmap f (Cons n a) = ConsF n (fmap f a)
```

Given a starting seed, say `0`, this algebra will evaluate as
```
0
-> ConsF(0, 1) 
-> ConsF(0, ConsF (1 2)) 
-> ConsF (0 ConsF (1 ConsF 2 3))
...
-> ConsF(0 ConsF(1 ConsF (2 ConsF (3 ConsF (4 ConsF (5 NilF))))))
-> Cons(0 Cons(1 Cons(2 Cons (3 Cons (4 Cons (5 Nil))))))
=== [0, 1, 2, 3, 4, 5]
```

A slightly more interesting List coalgebra can be defined for the functor `ListF (A, B)` from the carrier `(List A, List B)`. Here, the carrier is the cartesian product of `List A` and `List B`, and the functor is the partial application on the cartesian product of the underlying types `A` and `B`.
```
coalg :: (ListA, ListB) -> ListF (A, B) (ListA, List B)
coalg (Nil, _) = NilF
coalg (_, Nil) = NilF
coalg (Cons (a as), Cons (b bs)) = ConsF (a, b) (as, bs)
```

An anamorphism for this coalgebra will take two lists and return a single list of products, and it will do so by creating a tuple of each item found at corresponding positions, recursively applying itself to the tail of the list until one of the lists is empty. Thus, we are able to define the `zip` method in terms of endofunctor coalgebras.

Distinct from previous constructions, I think the beauty of F-algebras, catamorphisms and anamorphisms isn't that they provide a utility function by virtue of their definitions. It is instead in the fact that these constructions provide us with [recursion schemes](https://ncatlab.org/nlab/show/recursion+scheme), structures which abstract away the evaluation or definition of recursive functions on algebraic data types and from these, one needs only to find the right algebra or coalgebra to apply them to.

## So, what are Lists?
After all these sections, I now pose the question again: What is a List? The intuitive answer may still be that it is a useful data structure used to store collections of elements, typically of the same type and in an ordered manner. Defining lists as a functor, monad, free monoid, or as the fixed point of the $1 + A \times X$ endofunctor algebra is definitely not intuitive and takes a long time to wrap your head around. Even pragmatically, using somewhat esoteric language such as this may not have much utility when trying to communicate with people who aren't already familiar with such terminology. However, I hope that this writing has demonstrated that there are multiple ways to perceive lists, and being a collection of objects is merely a portion of their utility. Furthermore, I hope that I was able to convey that lists themselves are incredibly similar to many other structures and that many of the functions which were explored in previous sections are not exclusive to lists. If you're able to recognize a type as a ==functor==, then you can expect to have a `map` function for that type, similar to lists. If you recognize a type as a ==monad==, you will be able to `flatten` it, similar to lists. And, if you're working with ==algebraic data types== or ==F-algebras== and you're able to recognize their fixed points, then you will be able to `fold` or `unfold` over them, similar to lists. 

## References and Resources
Each concept mentioned in this little article can be explored, written about, and discussed for hours, if not days. Approaching these concepts may seem intimidating or perhaps not very fruitful. Regardless, I encourage any interested readers to look further into them. There is an incredible community and a plethora of resources available, providing insight into category theory at all levels. Personally, I have gathered much of my intuitive understanding from Bartosz Milewski and his [lectures](https://www.youtube.com/playlist?list=PLbgaMIhjbmEnaH_LTkxLI7FMa2HsnawM_), his [book](https://ai.dmi.unibas.ch/research/reading_group/milewski-2023-01-30.pdf) "Category Theory for Programmers", along with his [blogs](https://bartoszmilewski.com/). The math entertainment content of [Sheafification of G](https://www.youtube.com/@SheafificationOfG) is also incredibly interesting when trying to become more curious about category theory and programming. Lectures and seminars organized by the [Topos Institute](https://www.youtube.com/@ToposInstitute) are incredibly informative about more advanced category theory and its more mathematical applications. [NLab](https://ncatlab.org/nlab/show/HomePage) is a more formal wiki where one can find descriptions of all the mentioned constructions and many more, described in a much more technical and mathematically complete manner. And there are many other mathematicians such as David Spivak, Brendan Fong, Emily Riehl, and F. William Lawvere whose works I soon hope to understand. 

Some interesting reads which I found when researching concepts in this article:
- [Comprehending Monads](https://ncatlab.org/nlab/files/WadlerMonads.pdf)
- [*Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire*](https://maartenfokkinga.github.io/utwente/mmf91m.pdf)
- [*An Introduction to Recursion Schemes*](https://blog.sumtypeofway.com/posts/introduction-to-recursion-schemes.html)
- [*Recursion Schemes for Mathematicians*](https://iagoleal.com/posts/recursion-schemes/)
