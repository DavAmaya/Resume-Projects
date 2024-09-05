min(0,0, M):- M is 0.
min(X,Y,M):- X < Y, M is X, !.
min(_, Y, M):- M is Y.
minlist([],M):- M is 0.
minlist([M], M).
minlist([F|R], M):- minlist(R, M1), min(F, M1, M), !.
