equal(X,Y):- X = Y.
compare([], []):-!.
compare([F|R], [F2|R2]):- equal(F, F2), compare(R,R2).