const TOTAL_SCORE = 151;

const thirdOf = (val) => (val / 3) | 0;

const total = TOTAL_SCORE;
const third = thirdOf(total);
const twoThirds = thirdOf(2 * total);

// min and max are including e.g. min: 0 and max: 50 means between 0 and 50 including those.
const scoreTable = [
    { min: 0, max: third, msg: "YOU'RE STILL A POKEMON TRAINEE. GO TO THE GYM MORE." },
    {
        min: third + 1,
        max: twoThirds,
        msg: 'NOT BAD. KEEP TRAINING AND MAYBE YOU CAN DEFEAT THE LEAGUE ONE DAY.',
    },
    {
        min: twoThirds + 1,
        max: total - 1,
        msg: "OK, I ADMIT YOU'RE PRETTY GOOD. WAY BETTER THAN THAT GARY DUDE.",
    },
    { min: total, max: total, msg: "SCREW ASH, YOU'RE THE REAL DEAL. BOW DOWN TO THE NEW POKEMON MASTER." },
];

export { TOTAL_SCORE, scoreTable };
