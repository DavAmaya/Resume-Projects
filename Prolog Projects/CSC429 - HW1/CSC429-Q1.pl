in(toy, greenbox).
in(greenbox, redbox).
in(redbox, bluebox).
find_in(X, Y):- 
    in(X,Y), !.
find_in(X,Y):- 
    in(Y, X1),
    in(X, _),
    find_in(Y, X1), !.
find_in(X,Y):- 
    in(X, Y1), 
    in(Y1, _),
    find_in(Y1,Y).
