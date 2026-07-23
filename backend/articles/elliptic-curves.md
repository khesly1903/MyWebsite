
# Mathematical Introduction to Elliptic Curves

Elliptic curves are mathematical structure that widely used in cryptography, that is called Elliptic Curve Cryptography (ECC). But this paper mostly focused on mathematical structure of elliptic curves.

We can say that Fermat was the first to work with elliptic curves. While working on Diophantine equations, Fermat laid the groundwork for elliptic curves. Euler, on the other hand, focused on elliptic integrals. Jacobi discovered elliptic functions and contributed to Euler's work on elliptic integrals. Lagrange and Legendre studied the basic arithmetic properties of elliptic curves. Later, it was suggested by Victor Miller and Neal Koblitz that elliptic curves could be used in cryptography. Another significant development was Wiles's proof of Fermat's Last Theorem in 1994, where elliptic curves played an important role. In short, although elliptic curves were initially "widely used in cryptography," they have a rich mathematical history and a wide range of applications. Their current use in cryptography and blockchain structures has made them highly popular.

---

## Groups

A best way to start understand elliptic curves is start with some abstarct algebra. So lets start with **groups**.

A group G is a set together with **binary operation ∗** , denoted as (G,∗) that satisfies the fallowing conditions,

Closure: For all a,b ∈ G, b ∈ G, b∈G, the result of the operation a∗b is also in G.

∀ a, b ∈ G ⇒ a ∗ b ∈ G

**Associativity**: The binary operation ∗ is associative, meaning that

∀ a, b, c ∈ G ⇒ (a ∗ b) ∗ c = a ∗ (b ∗ c)

**Identity element**: There exists an element e in G such that for every element in G, the binary operation with e gives the same element.

∀ a ∈ G , ∃ e ∈ G ⇒ a ∗ e = a

The element e is called the **identity element**.

**Inverse element**: For every element excluding identity element in G, there exists an element in G such that binary operation with these elements gives the identity element.

∀a ∈ G , ∃ b ∈ G ⇒ a ∗ b = e

The element b is called the **inverse** of a, and is denoted as a⁻¹.

---

When groups have more properties, they become rarer, but the elements in them have more "freedom". For example, in a **commutative (abelian)** group, the elements on the left and right of the binary operation can switch places. This means a ∗ b = b ∗ a. If we add another binary operation and a few more properties to groups, we get a structure called a ring. If every element in the ring has an inverse for the second binary operation, it is called a field. If the field has a limited number of elements, it is called a finite field.

## Fields

**Fields** and **finite fields** are important, so we can explain them a bit more. A field has many properties and includes two operations, which makes the elements more flexible. These two operations are usually addition and multiplication. We can define fields formally like this:

A field F is a set with two binary operations + (addition) and ⋅ (multiplication) denoted as (F,+,⋅), satisfying the fallowing conditions,

**Closure**: For all pairs in F, result of binary operations with these two elements, is again in F.

∀ a, b ∈ F ⇒ a + b ∈ F 

∀ a, b ∈ F ⇒ a ⋅ b ∈ F

**Associativity**: The operations + and ⋅ are associative, meaning that:

∀ a, b, c ∈ F ⇒ (a + b) + c = a + (b + c)

∀ a, b, c ∈ F ⇒ (a ⋅ b) ⋅ c = a ⋅ (b ⋅ c)

**Identity elements**: There exist two elements in F: 0 (additive identity) and 1 (multiplicative identity), binary operation with spesific identity element gives the elements itself.

∀ a ∈ F, ∃ e ∈ F ⇒ a + 0 = a

∀ a ∈ F, ∃ e ∈ F ⇒ a ⋅ 1 = a


**Inverse elements**: There exits an element in F such that for any element excluding identity element in F, spesific binary operation with these elements gives the identity element of binary operation.

∀ a ∈ F, ∃ b ∈ F ⇒ a + b = 0 (b is denoted by -a)

∀ a ∈ F, ∃ b ∈ F ⇒ a ⋅ b = 0 (b is denoted by a⁻¹)

**Commutativity**: The operations + and ⋅ are commutative, meaning that the elements to the right and left of the binary operation are interchangeable.

∀ a, b ∈ F ⇒ a + b = b + a

∀ a, b ∈ F ⇒ a ⋅ b = b ⋅ a

**Distributivity**: The operations + and ⋅ are related by the distributive property: 

∀ a, b, c ∈ F ⇒ a ⋅ (b + c) = (a ⋅ b) + (a ⋅ c)

We can represent the nested structures of these concepts as follows.

> **Groups ⊃ Abelian Groups ⊃ Rings ⊃ Fields ⊃ Finite Fields**

It would be helpful to reinforce these concepts with a few examples. Rational numbers, Reel numbers and Complex numbers with binary operations ( + ) and ( ⋅ ) are fields. So they are also rings and (ableian) groups. ℤ₂ = {0, 1} (which we will represent as 𝔽₂) with ( + ) and ( ⋅ ) is finite field. ℤ₃ = {0, 1, 2} with ( + ) is a group.

## Elliptic Curves

Now, we can introduce elliptic curves. Elliptic curves are curves defined over a field using a specific type of cubic equation. The chosen field helps us select the parameters of the elliptic curve. Let's take a look at some popular elliptic curves.

### (Short) Weierstrass Form

It is the most commonly used formula. Normally, the Weierstrass form is expressed with the following equation:

 E: y² + a₁xy + a₃y = x³ + a₂x² + a₄x + a₆

 Here, a₁, a₂, a₃, a₄ and a₆ represent parameters taken from the finite field, and x and y represent the coordinates. However, this form can be transformed into a simpler version, called the short Weierstrass form with some manipulations on the equation. This form is:

> y² = x³ + ax + b

 Here, a and b are elements of the field. Since this form is simpler and more practical, it is generally preferred. So, when we mention the Weierstrass form, it is fine to think of the short form.

### Edwards Curves and Twisted Edwards Curves

The general form of Edwards curves is as follows:

> x² + y² = 1 + dx²y²

Here, d is an element of the field. These curves are usually preferred in simpler mathematical structures, while Twisted Edwards curves are more commonly used in cryptography. The form of Twisted Edwards curves is:

> ax² + y² = 1 + dx²y²

Here, a and d are elements of the field. As can be noticed, Edwards curves are a special case of Twisted Edwards curves with a = 1.

### Montogomery Curves

The general form of Montgomery curves is as follows:

> By² = x³ + Ax² + x

Here, A and B are elements of the field. These curves are frequently used in cryptography due to their efficient properties for elliptic curve cryptographic operations.

---

There are many other curves such as Jacobi quartic curves, Hessian curves, and others. However, it's important to understand that each curve has its own unique rules and applications. Not every curve works with every parameter; if the necessary field rules are not followed, their structures can be compromised. For instance, in Montgomery curves, the parameter B cannot be zero, though the parameter A can be zero. Additionally, the field characteristic, which we'll discuss shortly, must be adhered to; otherwise, they may not work well.

We now understand that elliptic curves are defined over a field. To create an elliptic curve, a specific type of cubic equation and a field are needed. Although finite fields are commonly used in cryptography, explaining elliptic curves through fields provides a clearer and more fundamental starting point for understanding them.

### Singularity

The Weierstrass form, along with the other two forms mentioned earlier, is commonly used in cryptography. In this article, we will focus on the Weierstrass form. As mentioned earlier, the (short) Weierstrass form is given by y² = x³ + ax + b. Here, a and b are field elements, while x and y are the coordinates. Additionally, for this elliptic curve to be in a form suitable for capturing its group properties and the defined addition operation, it must be in its non-singular form, which means:

> ∆ = -4a³ + 27b² ≠ 0

 We need distinguish between singular and non-singular Weierstrass forms as follows:

Singular Weierstrass Form: When ∆ = 0, the curve is singular, meaning it has a point where it makes the curve not a smooth curve.

![singular Weierstrass curves](https://r2.kayaberkay.org/cryptography/elliptic-curves/elliptic-curves1.webp)

Non-Singular Weierstrass Form: When ∆ ≠ 0, the curve is non-singular, indicating it has a smooth, well-defined shape, which is necessary for the elliptic curve group operations to be well-defined and secure in cryptographic applications.


![non-singular Weierstrass curves](https://r2.kayaberkay.org/cryptography/elliptic-curves/elliptic-curves2.webp)


## Point at infinity

If the curve is non-singular, whenever we take two points and connect them with a line, the line will always (!) intersect the elliptic curve at a third point. However, you may have noticed that when a vertical line is drawn, it does not intersect the curve at a third point. To preserve the group structure of the elliptic curve, an imaginary point called the point at infinity is defined. This point is denoted with a special symbol such as O or ∞. In this article, it will be denoted as Ȯ.

By introducing this point, we can say that any line on the elliptic curve will intersect the curve at exactly three points, maintaining the mathematical consistency of the group structure.

## Characteristic of field

Another common rule you will often see with curves is that the characteristic of the field must be different from 2 or 3. The characteristic is represented by n and is defined as the smallest positive integer such that n ⋅ 1=0. However, fields can have a characteristic of either 0, p (a prime), or pⁿ (a power of a prime). When the characteristic is p or pⁿ, it results in a finite field. Let's explain this concept further with a few examples.

For example, the Real Numbers (ℝ) and Complex Numbers (ℂ) are characteristic 0 fields. In other words, there is no n such that n ⋅ 1= 0. On the other hand, ℤ₃ = {0, 1, 2} is a finite field, meaning its characteristic is a prime number. In this case, 3 ⋅ 1=0, or equivalently, 1+1+1=0. Therefore, the characteristic of this field is 3. Additionally, since it is a finite field, it can also denoted as 𝔽₃​.

Now, let's take a look at a formal definition of the (short) Weierstrass form.

A Weierstrass curve over a field F of characteristic not equal 2 or 3 is defined as a non-singular curve E given by the equation:

> y² = x³ + ax + b

where a,b ∈ F and ∆ = -4a³ + 27b² ≠ 0. Additionally, the point at infinity, denoted as Ȯ is included as part of curve.

## Group structure of elliptic curves

Now we have enough background to look at group structure of elliptic curves.

A non-singular elliptic curve E over a field F with point addition ⊕ forms a abelian group with additional point Ȯ, denoted as (E,⊕) that satisfies the fallowing conditions:

For all points P, Q, R ∈ (E,⊕), 

**Closure**: P ⊕ Q ∈ E

**Commutativity**: P ⊕ Q = Q ⊕ P

**Associativity**: P ⊕ (Q ⊕ R) = (P ⊕ Q) ⊕ R

**Identity Element**: P ⊕ Ȯ = P

**Inverse Element**: P ⊕ (-P) = Ȯ


What is this Point Addition ⊕? Before diving into formulas, it's important to know that there are 3 different types of addition: **Point Addition, Point Doubling, and Point Negation**. In Point Addition, a line passing through two different points intersects the curve at a third different point. In Point Doubling, the same point is added to itself, and the line intersects the curve at a different point. In both these types, addition and doubling, the reflection of the intersection points with respect to the x-axis gives us the result of the addition. In Point Negation, a point is added to its reflection with respect to the x-axis, and this point sum equals Ȯ.

## EC point addition types

![Point addition, doubling and negation](https://r2.kayaberkay.org/cryptography/elliptic-curves/elliptic-curves3.webp)


Let's look at the formulas for addition and doubling before learning why we take the reflection.

Let P = (x₁, y₁) and Q = (x₂, y₂) are the points over the Weierstrass elliptic curve, and the line passes through points P and Q intersects with third points R = (x₃, -y₃) (for simplicity we denote the y coordinate of R with minus, so that R′ can be y₃). So that P ⊕ Q = R′ where R′ = -R = (x₃, y₃) is the reflection of R with respect to x-axis. 

To obtain the coordinates of R′ we can use the slope equation
y₃ - y₁ = λ (x₃ - x₁)

where λ is the slope, obtained by the choices:

1. If Q ≠ P namely **point addition**, then λ = (y₂ − y₁) / (x₂ − x₁)

2. If Q = P namely **point doubling**, then λ = (3x₁² + a) / (2y₁)

These gives us 

> x₃ = λ² − x₁ − x₂ 

> y₃ = λ (x₁ − x₃) − y₁ 

respect to λ choice.

3. If Q = -P namely **point negation**, then λ = 0, this gives us 
> P ⊕ Q = P + (-P) = Ȯ

What if we don't take the reflection of R? Let's say P + Q = R, then P + R = Q because we still have the same slope (tangent line). Combining these two equations gives us P = Ȯ or P = -P or Q = R, depending on the substitution, which contradicts with our assumption.

Note that, these formulas are for fields, not for finite fields, we will cover for finite fields soon.

Let's look at some examples. Suppose we have Weierstrass Curve E: y² = 7x + 10 over ℝ, and points P = (1, 2), and Q = (3, 4). We can add this point with point addition. Since two points are different, we can use the first formula:

λ = (4 − 2) / (3 − 1) = 1 and then we can obtain coordinates of R′:


x₃ = λ² − x₁ − x₂ = 1² − 1 − 3 = −3

y₃ = λ (x₁ − x₃) − y₁ = 1(1 − (−3)) − 2 = 1(4) − 2 = 2

So, P ⊕ Q = R′ = (−3, 2).

Now let's look at point doubling. Suppose we have P = (1,2) and we need to add it with itself. So we use the second addition formula:

λ = (3(1)² + (−7)) / (2 · 2) = −1 and then we can obtain coordinates of R′:

x₃ = (−1)² − 1 − 1 = −1

y₃ = (−1)(1 − (−1)) − 2 = −4

So, P ⊕ P = 2P = R′ = (1, −4).

Lastly let's look at point negation. Suppose we have P = (1, 2) and Q = -P = (1, -2). We use the third rule, so we get P ⊕ Q = P ⊕ (-P) = Ȯ.

![Point addition, doubling and negation respectively](https://r2.kayaberkay.org/cryptography/elliptic-curves/elliptic-curves4.webp)

## Scalar multiplication - double and add algorithm

We can denote doubling like P ⊕ P = 2P. Now if we add one more P, we use point addition first rule and we get 2P ⊕ P = 3P. Then we can get 4P, 5P etc. But it is painful to calculate large nP's. So, it's time to introduce **scalar multiplication**. Since we can express multiplication as repeated addition, for example, n⋅P=P+P+P+⋯+P (n times), we will extend the same logic to scalar multiplication and point addition.

Note that, elliptic curves form a group structure where the binary operation is point addition, denoted by ⊕. There is no multiplication operation, meaning it is nonsensical to multiply two points. Therefore, scalar multiplication and regular multiplication should not be confused, as they are entirely different concepts.

* In the first bit, we do nothing. After then,

* If the digit is 1, we double and add the point, 

* If the digit is 0, then we just double.

Note that, every positive integer can represent as binary, i.e. base 2.

Let's understand the concept on example.

Suppose we have same elliptic curve and point: E: y² = 7x + 10 over ℝ, and P = (1, 2) and we need to calculate 45P. Of course we can do this with addition formulas, but it takes time. But in reality we calculate very large n's like more than 10 digits integer. So let's apply the **double and add algorithm**.

We can write 45 in base-2, and it is 101101 (1⋅2⁵ + 0⋅2⁴ + 1⋅2³ + 1⋅2² + 0⋅2¹ + 1⋅2⁰).

![](https://r2.kayaberkay.org/cryptography/elliptic-curves/elliptic-curves5.webp)

First bit is 1 (it wouldn't matter if it was 0): We don't do any opeartion and leave it as it is, i.e. P.

Second bit is 0: We just double, i.e. P ⊕ P = 2P.

Third bir is 1: We do double and add, i.e. double 2P ⊕ 2P = 4P and add 4P ⊕ P = 5P. We continue like this and finish the bits, and finally we get 45P.

If we calculate 45P with addition formulas, we need to operate addion 44 times to get 45P. But with double and add algorithm, we find the solution in 5 steps with 8 operations. If we calculate the first method, we must face with O(n) time complexity. But with double and add algorithm we have O(log n) which is incredibly good.

But why we need to calculate such large nP's. Well, we now how to easily calculate nP, and let's say Q = nP. If we know Q and P, and we don't know n, if it is easy we can calculate with bare hands. But if we don't know n and it is very huge number, even with different algorithms and techniques, we can hardly calculate. This is called Discrete Logarithm Problem (DLP), and it is the mainstone of Elliptic Curve Cryptography. But since our current knowledge is not enough to do ECC, let's learn a little more about elliptic curves.

## Elliptic curves over finite fields

So far we have dealt with elliptic curves over fields, specifically ℝ, but an important part of the general theory and cryptography with elliptic curves requires the study of **elliptic curves over finite fields**. We know finite fields are just fields with finite set of element. Finite number can be either prime or some power of prime, there is no other choice. We mainly focus on prime number elements, because finite fields with some power of prime number elements requires more deep abstract algebra, and it is (little bit) hard to implement. But in real life, we generally use number of prime elements.

Specifically, the properties of point addition and scalar multiplication formulas remain the same, just we do these things with modulo. But now we use algebra instead of geometry to understand them. So, as we did before, it no longer makes sense to connect with a third point on the curve and take its inverse.

![E: y² = x³ - 7x + 10 over 𝔽₁₃ and ℝ](https://r2.kayaberkay.org/cryptography/elliptic-curves/elliptic-curves6.webp)

Fields have characteristic 0. So we have infinite possible points which is not very useful for cryptography or other applications. But finite fields have characteristic p, so we have finite number of elements, and we can do cryptography! But first, let's look at point addition formulas:

Let E be an elliptic curve over 𝔽ₚ with characteristic not equal to 2 or 3. We apply the same logic with modulo, 

To obtain the coordinates of R′ we can use the slope equation

> y₃ - y₁ = λ (x₃ - x₁) (mod p) 

> ⇒ λ ≡ (y₃ - y₁) / (x₃ - x₁) (mod p) 

> ⇒ λ ≡ (y₃ - y₁)(x₃ - x₁)⁻¹(mod p)

where λ is the slope, obtained by the choices:

1. If Q ≠ P namely point addition, then 

> λ ≡ (y₂ − y₁) / (x₂ − x₁) (mod p) 

> ⇒ λ ≡ (y₂ − y₁)(x₂ − x₁)⁻¹ (mod p)

2. If Q = P namely point doubling, then 

> λ ≡ (3x₁² + a) / (2y₁) (mod p)

> ⇒ λ ≡ (3x₁² + a)(2y₁)⁻¹ (mod p)

These gives us 

> x₃ ≡ λ² − x₁ − x₂ (mod p)

> y₃ ≡ λ (x₁ − x₃) − y₁ (mod p)

respect to λ choice.


3. If Q = -P namely point negation, then λ = 0, this gives us 

> P ⊕ Q = P + (-P) = Ȯ

Let's talk about the negative (reflection) of a point. For example, in the case over ℝ, when P = (-2, 4), then -P = (-2, -4), which means it takes the reflection with respect to the x-axis. Actually, when we're over a finite field, we capture almost the same image thanks to modulo. If you look at the picture above, it's almost symmetric with respect to y = p/2, that is y = 13/2 axis. If we think of this as a new x-axis, almost every point has a reflection. Let's consider the elliptic curve in the image. For example, the reflection of point (3, 4) is point (3, 10). We can simply relate this to the sum of y coordinates being equal to 13, which will be equal to 0 in modulo 13. In fields, the reflection of point (3, 4) is point (3, -4), and the sum of y coordinates equals 0. So which points don't have reflections? Points where x coordinate is 0. This is because within the curve, there is no number that can give us the current p number (13 in our example) when added to 0, since our maximum number is already p-1.

---

Since we started working with finite fields, you may notice that we'll be using **modulo operations**. Especially, finding the **inverse** in modulo plays a critical role. A modulo operation is simply the remainder when one number is divided by another. For example, 2 ≡ 5 (mod 3) indicates that when 5 is divided by 3, the remainder is 2. So (mod 3) will return any number as 0, 1, or 2, because these are the only possible remainders when a number dividing by 3. We can take some similarities between this modulo operation and finite fields. Recall that 𝔽ₚ = {0, 1, 2, 3, … , p-1}, meaning numbers from 0 to p-1. So when we perform the above operations, let's say we're working on 𝔽₁₃, if the result is 25, it's not an element of 𝔽₁₃, therefore we use (mod 13) and 12 ≡ 25 (mod 13) becomes an element of our set. Coming to inverse point, when working over ℝ, the inverse of number a is 1/a, so we can think of this as a · (1/a) = 1, meaning the product of a number and its inverse equals the identity element of the group. When working over 𝔽ₚ, the inverse of number a should equal 1 with the same logic, meaning a · (1/a) ≡ 1 (mod p) ⇒ a · a⁻¹ ≡ 1 (mod p). However, calculating this isn't as easy as it is in fields. Methods like the Euclidean algorithm should be used for this. But let's observe this through trial and error in an example.

For example, let's try to find the inverse of the number 4 (mod 13). Let's call this number x. What we're looking for is 4 · x ≡ 1 (mod p). 

* If we say x = 5, then 20 ≡ 7 (mod p). 

* If we say x = 7, then 28 ≡ 2 (mod 13).

If we say x = 10, then 40 ≡ 1 (mod p), which is the answer we are looking for. So, the inverse of 4 (mod 13) is 10. As can be understood, it is quite natural for 0 to have no inverse. When we multiply any element by 0, we get 0, and thus we can never obtain 1.

Since we are dealing with prime numbers, every element has an inverse, except for 0. One of the proofs for this is Fermat's Little Theorem, which those interested can look into. It is important not to confuse this with non-prime modulo. As it is beyond the scope of our topic, there is no need to explain it 
further.

Let's solidify this with an example. Consider the familiar curve E: y² = x³ - 7x + 10 and take it over 𝔽₁₃. Let P=(3,4) and Q=(11,9).

To find (3,4) ⊕ (11,9) = (0,6), we will proceed as follows:

λ ≡ (9 – 4)/(11 – 3) (mod 13) ≡ 5/8 (mod 13) ≡ 5 · 8⁻¹ (mod 13) ≡ 5 · 5 (mod 13)

⇒ λ ≡ 12 (mod 13)
Now, by substituting λ with 12, we can obtain the result as follows:

x₃ ≡ 12² − 3 − 11 (mod 13) ≡ 0 (mod 13)

y₃ ≡ 12 (3 − x₃) − 4 (mod 13) ≡ 6 (mod 13)

Now, let's perform point doubling with P=(3,4) and reach the result (3,4) ⊕ (3,4) = (10,11):

λ ≡ (3 · 3 + (-7)) / (2 · 4) (mod 13) ≡ 20 · 8⁻¹ (mod 13) ≡ 9 (mod 13)

Now, by substituting λ with 9, we can obtain the result as follows:

x₃ ≡ 9² − 3 − 3 (mod 13) ≡ 10 (mod 13)

y₃ ≡ λ (3 − 10 ) − 4(mod 13) ≡ 11(mod 13)

Lastly, let's perform point negation. The inverse of P=(3,4) is (3,10). We know that (3,4)⊕(3,10)=Ȯ.

---

## Cyclic groups and double and add algorithm

We have seen the **double-and-add algorithm**. We will continue using the same logic here. However, while doing this, we might suddenly see the operation result in Ȯ. We can also see this in elliptic curves over fields. When we add some elements, the result is Ȯ. This is because, in a group with an infinite number of elements, a cyclic subgroup structure may emerge. However, in elliptic curves over finite fields, this is orderly, and the group itself is **cyclic**. So, what is a cyclic group?

![cyclic group with 6 elements](https://r2.kayaberkay.org/cryptography/elliptic-curves/elliptic-curves7.webp)

Cyclic group with 6 elementsA cyclic group is a group G that can be generated by a single element g called the generator (or primitive element), and it is represented as <g> = G = {gⁿ | n ∈ ℤ} = {g¹, g², g³, g⁴, …, gⁿ}. Here, n represents the group order, that is, the number of elements in the group, represented as ∣G∣=n. The notation gⁿ can be thought of in additive groups as the sum of the element with itself n times. Cyclic groups can be discussed in depth, but to avoid deviating from the topic, let's look at some important properties of cyclic groups:

* Subgroups of cyclic groups are also cyclic.

* The group order always yields the identity, but the identity can also be obtained at lower orders (subgroups).

* The order of subgroups divides the group order.

Without getting bogged down in abstract algebra examples, let's move on directly to examples of elliptic curves.

Let's continue with the previously mentioned example E: y² = x³ - 7x + 10 over 𝔽₁₃. The group formed by this curve has a total of 18 elements: Ȯ, (0,6), (0,7), (1,2), (1,11), (2,2), (2,11), (3,4), (3,9), (5,3), (5,10), (9,0), (10,2), (10,11), (11,4), (11,9), (12,4), (12,9). Let's take the point (3,9).

1 · (3,9) = (3,9)

2 · (3,9) = (10,2)

3 · (3,9) = (1,2)

4 · (3,9) = (5,10)

⋮

16 · (3,9) = (10,11)

17 · (3,9) = (3,4)

18 · (3,9) = Ȯ

 - - - 

19 · (3,9) = (3,9)

⋮

Thus, with the point (3,9), we generated the entire group. As can be seen, 19 · (3,9) gives us 1 · (3,9) = (3,9). This is why we call it a cyclic group; it returns to the same point. Because the number of elements in the group (i.e., the order) is 18, multiplying any point by 18 gives Ȯ, i.e., 18 · P = Ȯ, for all P in this curve. Let's consider another point, say (1,11).

1 · (1,11) = (1,11)

2 · (1,11 ) = (12,4)

3 · (1,11 ) = (9,0)

4 · (1,11 ) = (12,9)

5 · (1,11 ) = (1,2)

6 · (1,11 ) = Ȯ

 - - - 

7 · (1,11) = (1,11)

⋮

We reached the point Ȯ before the group **order**. This is because we found a **subgroup**. Thus, the point (1,11) does not generate the entire group; it only generates this subgroup, and its elements are (1,11), (12,4), (9,0), (12,9), (1,2), and Ȯ. We are in a new cycle, and we cannot generate anything outside of these group elements.

Knowing the number of elements in the group plays an important role here. Although the curve in the example is small, as the finite field grows, the number of elements also increases, and finding the exact number of elements may become more difficult. Well, there is no exact way to determine the order of a group, but we have a theorem good enough to do it, called Hasse's bound. The theorem says that if E is an elliptic curve over the finite field 𝔽ₚ, then |#E - (p + 1)| ≤ √p. Here, #E denotes the number of elements in the group. Let's consider the curve we used in the examples, but over different finite fields.

For 𝔽₁₃, this gives the result 4.789 ≤ #E ≤ 19.211, with the number of elements being #E = 18.

For 𝔽₆₇, this gives the result 49.629 ≤ #E ≤ 82.371, with the number of elements being #E = 74. 

For 𝔽₂₂₆₉, this gives the result 2172 ≤ #E ≤ 2263.268, with the number of elements being #E = 2335.

We have now enough background to understanding elliptic curves and their properties. This mathematical background is important for understanding elliptic curve cryptography. By knowing how these curves work and how group operations are done, we can more easily figure out how this type of cryptography secures our data. 