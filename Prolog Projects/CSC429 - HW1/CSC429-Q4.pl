tria(_,_,_):-!.
tria(X,Y,Z):- 
    X = point(_,_), Y = point(_,_), Z = point(_,_).
calc_side(X,Y,A):- 
    X = point(X1,Y1), Y = point(X2,Y2), 
    integer(X1), integer(Y1),
    integer(X2), integer(Y2),
    A1 is (X1-X2)**2 + (Y1-Y2)**2,
    A is sqrt(A1). 
perimeter(tria(X,Y,Z), A):-
    calc_side(X,Y,A1), calc_side(Y,Z,B), calc_side(Z,X,C),
    A2 is A1 + B, A is A2 + C.