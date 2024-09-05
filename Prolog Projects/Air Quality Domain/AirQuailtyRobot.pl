:- dynamic fact/1.
:- dynamic p/2.
:- dynamic p/3.

:- op(800,fx,if).
:- op(700,xfx,then).
:- op(300,xfy,or).
:- op(200,xfy,and).

parent(w, r).
parent(w, ds).
parent(i, ds).
parent(i, ni).
parent(mv, uo).
parent(mv, ht).
parent(ni, uo).
parent(ds, db).
parent(uo, db).

p(w,  0.45).
p(i, 0.35).
p(mv,  0.42).



p(r, [w], 0.53).
p(r, [not(w)], 0.45).

p(ds, [i, w], 0.65).
p(ds, [i, not(w)], 0.95).
p(ds, [not(i), w], 0.68).
p(ds, [not(i), not(w)], 0.68).

p(ht, [mv], 0.58).
p(ht, [not(mv)], 0.58).

p(uo, [ni, mv], 0.59).
p(uo, [ni, not(mv)], 0.54).
p(uo, [not(ni), mv], 0.55).
p(uo, [not(ni), not(mv)], 0.54).

p(db, [ds, uo], 0.72).
p(db, [ds, not(uo)], 0.72).
p(db, [not(ds), uo], 0.71).
p(db, [not(ds), not(uo)], 0.72).

p(ni, [i], 0.48).
p(ni, [not(i)], 0.33).


go:- 
writeln('Is there an unusual odor?'),
read(Odor),
writeln('Is the sky filled with dark smoke?'),
read(Smoke),
writeln('Do you live near any Industrial Facilities?'),
read(Idustrial),
writeln('Does the area you live in, have high traffic?'),
read(Traffic),
writeln('Do you find it difficult to breathe?'),
read(DifficultBreathing),
writeln('Have there been reports of a forest fire in your area?'),
read(Report),
processUO(Odor,UO),
processS(Smoke, S),
processI(Idustrial, I),
processT(Traffic, T),
processDB(DifficultBreathing, DB),
processR(Report, R),
prob(i,[UO, S, I, T, DB, R], ProbI),
prob(mv, [UO, S, I, T, DB, R], ProbMV),
prob(w, [UO, S, I, T, DB, R], ProbW),
compr_Prob(ProbI, ProbMV, High, _Cause),
compr_Prob2(High, ProbW, _Highest, MainCause),
assert(fact(MainCause)), forward.


processUO(y, uo).
processUO(n, not(uo)).

processS(y, ds).
processS(n, not(ds)).

processI(y, ni).
processI(n, not(ni)).

processT(y, ht).
processT(n, not(ht)).

processDB(y, db).
processDB(n, not(db)).

processR(y, r).
processR(n, not(r)).

compr_Prob(ProbI, ProbMV, Higher, Cause):- 
ProbI >= ProbMV, Higher is ProbI, Cause = 'industial_facilities'.

compr_Prob(ProbI, ProbMV, Higher, Cause):- 
ProbMV > ProbI, Higher is ProbMV, Cause = 'motor_vechicles'.

compr_Prob2(ProbHigh, ProbW, Higher, Cause):- 
ProbHigh >= ProbW, Higher is ProbHigh, Cause = 'motor_vechicles'.

compr_Prob2(ProbHigh, ProbW, Higher, Cause):- 
ProbW > ProbHigh, Higher is ProbW, Cause = 'wildfires'.

if wildfires then air_quality_poor.
if wildfires then wear_respirator.
if wildfires then evacuate_area.

if motor_vechicles then air_quality_moderate.
if motor_vechicles then avoid_idling.
if motor_vechicles then drive_wise.

if industial_facilities then air_quality_moderate.
if industial_facilities then be_more_efficient_energy.
if industial_facilities then source_control.