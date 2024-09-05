% David Amaya Hernandez
:- dynamic p/2.
:- dynamic p/3.

parent(hp, a).
parent(sm, ca).
parent(a, co).
parent(ca, co).
parent(ca, x).

p(hp, 0.3).
p(sm, 0.2).

p(a, [hp], 0.7).
p(a, [not(hp)], 0.2).

p(ca,[sm], 0.4).
p(ca, [not(sm)], 0.1).

p(co, [a, ca], 0.9).
p(co, [not(a), ca], 0.4).
p(co, [a, not(ca)], 0.7).
p(co, [not(a), not(ca)], 0.2).

p(x, [ca], 0.9).
p(x, [not(ca)], 0.03).

hpCond('y', hp).
hpCond('n', not(hp)).

smCond('y', sm).
smCond('n', not(sm)).

coCond('y', co).
coCond('n', not(co)).

xCond('y', x).
xCond('n', not(x)).

cond1([First | Rest], [Cond | RestCond]):-
    hpCond(First, Cond),
    cond2(Rest, RestCond).

cond2([First | Rest], [Cond | RestCond]):-
    smCond(First, Cond),
    cond3(Rest, RestCond).

cond3([First | Rest], [Cond | RestCond]):-
    coCond(First, Cond),
    cond4(Rest, RestCond).

cond4([First | _], [Cond]):-
    xCond(First, Cond).

asthma(Cond, P):-
    prob(a, Cond, P).
cancer(Cond, P):-
    prob(ca, Cond, P).

higherProb(P1, P2, Cause):-
    P1 > P2, !, Cause = "asthma".
higherProb(_, _, Cause):-
    Cause = "cancer".

go:- 
    write("Does the patient live in high pollution area?(y/n): "), read(X), nl,
    write("Does the patient smoke?(y/n): "), read(X1), nl,
    write("Does the patient cough?(y/n): "), read(X2), nl,
    write("Is the chest x-ray positive?(y/n): "), read(X3), nl,
    cond1([X, X1, X2, X3], Cond),
    asthma(Cond, P1), 
    cancer(Cond, P2),
    write("Probabitlity of asthma: "), write(P1), nl,
    write("Probability of cancer: "), write(P2), nl,
	higherProb(P1, P2, Cause),
    write("Therefore, "), write(Cause),
    write(" is more likely the cause.").