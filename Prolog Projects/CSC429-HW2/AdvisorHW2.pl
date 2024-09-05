:- dynamic fact/1.

:- op(800,fx,if).
:- op(700,xfx,then).
:- op(300,xfy,or).
:- op(200,xfy,and).
assertion(X, Y):- X = n, !, string_concat("notTaken_CSC", Y, Y1),assert(fact(Y1)).
assertion(X, Y):- X = y, string_concat("passed_CSC", Y, Y1), assert(fact(Y1)).
ask_question:- write("What required courses have you passed?"), nl,
    write("CSC 130?"), read(X1), assertion(X1, 130), nl,
    write("CSC 230?"), read(X2), assertion(X2, 230), nl,
    write("CSC 261?"), read(X3), assertion(X3, 261), nl,
    write("CSC 250?"), read(X4), assertion(X4, 250), nl,
    write("CSC 330?"), read(X5), assertion(X5, 330), nl,
    write("CSC 362?"), read(X6), assertion(X6, 362), nl,
    write("CSC 350?"), read(X7), assertion(X7, 350), nl,
    write("CSC 339?"), read(X8), assertion(X8, 339), nl,
    write("CSC 340?"), read(X9), assertion(X9, 340), nl,
    write("CSC 471?"), read(X10), assertion(X10, 471), nl,
    write("CSC 452?"), read(X11), assertion(X11, 452), nl,
    write("CSC 462?"), read(X12), assertion(X12, 462), nl,
    write("CSC 490?"), read(X13), assertion(X13, 490), nl.

if passed_CSC130 and notTaken_CSC230 then take_CSC230.
if passed_CSC130 and notTaken_CSC261 then take_CSC261.
if passed_CSC130 and notTaken_CSC250 then take_CSC250.
if passed_CSC230 and passed_CSC250 and notTaken_CSC330 then take_CSC330.
if passed_CSC230 and passed_CSC261 and notTaken_CSC362 then take_CSC362.
if passed_CSC250 and notTaken_CSC350 then take_CSC350.
if passed_CSC330 and notTaken_CSC339 then take_CSC339.
if passed_CSC330 and notTaken_CSC471 then take_CSC471.
if passed_CSC330 and notTaken_CSC340 then take_CSC340.
if passed_CSC340 and passed_CSC362 and notTaken_CSC462 then take_CSC462.
if passed_CSC350 and notTaken_CSC452 then take_CSC452.

advisor:- ask_question, forward.