chat:- write('Hello, I am chatbox'), nl,
    write('When you see "user:" type a word followed by "."'), nl,
    write('or type "stop." if you want to stop this nonsense!'), nl,
    write('user: '), read(X1), chatbox(X1,1).
chatbox(stop, Y):- Y > 0, !.
chatbox(X,Y):- 
    Y = 1, write('Who likes '), write(X), write('?'), 
    nl, write('user:'), read(X2), Y1 is Y + 1, chatbox(X2, Y1), !.
chatbox(X,Y):-
    Y = 2, write('What is '), write(X), write('?'),
    nl, write('user:'), read(X3), Y1 is Y + 1, chatbox(X3, Y1), !.
chatbox(X,Y):-
    Y = 3, write('do you like '), write(X), write('?'),
    nl, write('user:'), read(X4), Y1 is Y + 1, chatbox(X4,Y1), !.
chatbox(X,Y):- Y >= 4,
    write('Could you please stop talking about '),
    write(X), write('?'), nl, write('user:'),
    read(X1), Y1 is Y + 1, chatbox(X1,Y1), !.