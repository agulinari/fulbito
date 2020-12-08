import Match from '../models/match';
import MatchDetail from '../models/match-detail';
import Player from '../models/player';
import Team from '../models/team';
import PlayerMatchStats from '../models/player-match-stats';

export const MATCHES = [
    new Match('m1', 'Primer partido del año', '15/11/2020', 'Pedernera', 
    'Ferro', 'Allboys', 'ferro', 'allboys', 10, 5),
    new Match('m2', 'La revancha', '30/11/2020', 'Pedernera',
    'Ferro', 'Allboys', 'ferro', 'allboys', 9, 7),
    new Match('m3', 'Goleada inesperada', '04/12/2020', 'Pedernera',
    'Ferro', 'Allboys', 'ferro', 'allboys', 6, 7),
    new Match('m4', 'Empate aburrido', '11/12/2020', 'Pedernera',
    'Ferro', 'Allboys', 'ferro', 'allboys', 5, 5),
    new Match('m5', 'El poeta del gol', '17/12/2020', 'Pedernera',
    'Ferro', 'Allboys', 'ferro', 'allboys', 3, 6),
    new Match('m6', 'Un pulpo en el arco', '25/12/2020', 'Pedernera',
    'Ferro', 'Allboys', 'ferro', 'allboys', 12, 11)
];

export const PLAYERS = [
    new Player('p1', 'avatar', 'Leo', 'EL lobo del oeste'),
    new Player('p2', 'avatar', 'Lina', 'Tirador de mogolicas'),
    new Player('p3', 'avatar', 'Benja', 'La bestia del gol'),
    new Player('p4', 'avatar', 'Fede', 'Sale haciendo jueguito'),
    new Player('p5', 'avatar', 'Quique', 'El muro impenetrable'),
    new Player('p6', 'avatar', 'Gabi', 'El goleador fantasma'),
    new Player('p7', 'avatar', 'Nacho', 'Nachito veloz'),
    new Player('p8', 'avatar', 'Gonza', 'El mago'),
    new Player('p9', 'avatar', 'Juan', 'El doctor del futbol'),
    new Player('p10', 'avatar', 'Bruno', 'El simulador'),
    new Player('p11', 'avatar', 'Pato', 'La leyenda del gol'),
    new Player('p12', 'avatar', 'Pablo', 'El terminator'),
    new Player('p13', 'avatar', 'Picci', 'El arquero estrella'),
];

export const MATCHES_DETAIL = [
    new MatchDetail('m1', 'Primer partido del año', '15/11/2020', 'Pedernera',
        new Team('Ferro', 'ferro',
            [
                new PlayerMatchStats('avatar', 'Leo', 7, []),
                new PlayerMatchStats('avatar', 'Lina', 6, []),
                new PlayerMatchStats('avatar', 'Benja', 7, ['goleador']),
                new PlayerMatchStats('avatar', 'Fede', 6, ['antifairplay']),
                new PlayerMatchStats('avatar', 'Quique', 8, [])
            ]
        ),
        new Team('Allboys', 'allboys',
            [
                new PlayerMatchStats('avatar', 'Gabi', 5, []),
                new PlayerMatchStats('avatar', 'Gonza', 7, []),
                new PlayerMatchStats('avatar', 'Juan', 7, []),
                new PlayerMatchStats('avatar', 'Nacho', 5, ['terminator']),
                new PlayerMatchStats('avatar', 'Bruno', 4, ['fantasma'])
            ]
        ),
        10,
        5,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m2', 'La revancha', '30/11/2020', 'Pedernera',
        new Team('Ferro', 'ferro',
            [
                new PlayerMatchStats('avatar', 'Leo', 7, ['goleador']),
                new PlayerMatchStats('avatar', 'Lina', 7, []),
                new PlayerMatchStats('avatar', 'Benja', 8, []),
                new PlayerMatchStats('avatar', 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats('avatar', 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', 'allboys',
            [
                new PlayerMatchStats('avatar', 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats('avatar', 'Gonza', 8, []),
                new PlayerMatchStats('avatar', 'Juan', 7, []),
                new PlayerMatchStats('avatar', 'Pablo', 5, ['terminator']),
                new PlayerMatchStats('avatar', 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']

    ),
    new MatchDetail('m3', 'Goleada inesperada', '04/12/2020', 'Pedernera',
        new Team('Ferro', 'ferro',
            [
                new PlayerMatchStats('avatar', 'Leo', 7, ['goleador']),
                new PlayerMatchStats('avatar', 'Lina', 7, []),
                new PlayerMatchStats('avatar', 'Benja', 8, []),
                new PlayerMatchStats('avatar', 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats('avatar', 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', 'allboys',
            [
                new PlayerMatchStats('avatar', 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats('avatar', 'Gonza', 8, []),
                new PlayerMatchStats('avatar', 'Juan', 7, []),
                new PlayerMatchStats('avatar', 'Pablo', 5, ['terminator']),
                new PlayerMatchStats('avatar', 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m4', 'Empate aburrido', '11/12/2020', 'Pedernera',
        new Team('Ferro', 'ferro',
            [
                new PlayerMatchStats('avatar', 'Leo', 7, ['goleador']),
                new PlayerMatchStats('avatar', 'Lina', 7, []),
                new PlayerMatchStats('avatar', 'Benja', 8, []),
                new PlayerMatchStats('avatar', 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats('avatar', 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', 'allboys',
            [
                new PlayerMatchStats('avatar', 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats('avatar', 'Gonza', 8, []),
                new PlayerMatchStats('avatar', 'Juan', 7, []),
                new PlayerMatchStats('avatar', 'Pablo', 5, ['terminator']),
                new PlayerMatchStats('avatar', 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m5', 'El poeta del gol', '17/12/2020', 'Pedernera',
        new Team('Ferro', 'ferro',
            [
                new PlayerMatchStats('avatar', 'Leo', 7, ['goleador']),
                new PlayerMatchStats('avatar', 'Lina', 7, []),
                new PlayerMatchStats('avatar', 'Benja', 8, []),
                new PlayerMatchStats('avatar', 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats('avatar', 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', 'allboys',
            [
                new PlayerMatchStats('avatar', 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats('avatar', 'Gonza', 8, []),
                new PlayerMatchStats('avatar', 'Juan', 7, []),
                new PlayerMatchStats('avatar', 'Pablo', 5, ['terminator']),
                new PlayerMatchStats('avatar', 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m6', 'Un pulpo en el arco', '25/12/2020', 'Pedernera',
        new Team('Ferro', 'ferro',
            [
                new PlayerMatchStats('avatar', 'Leo', 7, ['goleador']),
                new PlayerMatchStats('avatar', 'Lina', 7, []),
                new PlayerMatchStats('avatar', 'Benja', 8, []),
                new PlayerMatchStats('avatar', 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats('avatar', 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', 'allboys',
            [
                new PlayerMatchStats('avatar', 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats('avatar', 'Gonza', 8, []),
                new PlayerMatchStats('avatar', 'Juan', 7, []),
                new PlayerMatchStats('avatar', 'Pablo', 5, ['terminator']),
                new PlayerMatchStats('avatar', 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    )
];