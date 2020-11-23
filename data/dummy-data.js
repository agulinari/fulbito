import Match from '../models/match';
import MatchDetail from '../models/match-detail';
import Player from '../models/player';
import Team from '../models/team';
import PlayerMatchStats from '../models/player-match-stats';

export const MATCHES = [
    new Match('m1', 'Primer partido del año', '15/11/2020', 'Pedernera', 
    'Ferro', 'Allboys', require('../assets/Ferro.png'), require('../assets/Allboys.png'), 10, 5),
    new Match('m2', 'La revancha', '30/11/2020', 'Pedernera',
    'Ferro', 'Allboys', require('../assets/Ferro.png'), require('../assets/Allboys.png'), 9, 7),
    new Match('m3', 'Goleada inesperada', '04/12/2020', 'Pedernera',
    'Ferro', 'Allboys', require('../assets/Ferro.png'), require('../assets/Allboys.png'), 6, 7),
    new Match('m4', 'Empate aburrido', '11/12/2020', 'Pedernera',
    'Ferro', 'Allboys', require('../assets/Ferro.png'), require('../assets/Allboys.png'), 5, 5),
    new Match('m5', 'El poeta del gol', '17/12/2020', 'Pedernera',
    'Ferro', 'Allboys', require('../assets/Ferro.png'), require('../assets/Allboys.png'), 3, 6),
    new Match('m6', 'Un pulpo en el arco', '25/12/2020', 'Pedernera',
    'Ferro', 'Allboys', require('../assets/Ferro.png'), require('../assets/Allboys.png'), 12, 11)
];

export const PLAYERS = [
    new Player('p1', require('../assets/avatar.png'), 'Leo', 'EL lobo del oeste'),
    new Player('p2', require('../assets/avatar.png'), 'Lina', 'Tirador de mogolicas'),
    new Player('p3', require('../assets/avatar.png'), 'Benja', 'La bestia del gol'),
    new Player('p4', require('../assets/avatar.png'), 'Fede', 'Sale haciendo jueguito'),
    new Player('p5', require('../assets/avatar.png'), 'Quique', 'El muro impenetrable'),
    new Player('p6', require('../assets/avatar.png'), 'Gabi', 'El goleador fantasma'),
    new Player('p7', require('../assets/avatar.png'), 'Nacho', 'Nachito veloz'),
    new Player('p8', require('../assets/avatar.png'), 'Gonza', 'El mago'),
    new Player('p9', require('../assets/avatar.png'), 'Juan', 'El doctor del futbol'),
    new Player('p10', require('../assets/avatar.png'), 'Bruno', 'El simulador'),
    new Player('p11', require('../assets/avatar.png'), 'Pato', 'La leyenda del gol'),
    new Player('p12', require('../assets/avatar.png'), 'Pablo', 'El terminator'),
    new Player('p13', require('../assets/avatar.png'), 'Picci', 'El arquero estrella'),
];

export const MATCHES_DETAIL = [
    new MatchDetail('m1', 'Primer partido del año', '15/11/2020', 'Pedernera',
        new Team('Ferro', require('../assets/Ferro.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Leo', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Lina', 6, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Benja', 7, ['goleador']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Fede', 6, ['antifairplay']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Quique', 8, [])
            ]
        ),
        new Team('Allboys', require('../assets/Allboys.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gabi', 5, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gonza', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Juan', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Nacho', 5, ['terminator']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Bruno', 4, ['fantasma'])
            ]
        ),
        10,
        5,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m2', 'La revancha', '30/11/2020', 'Pedernera',
        new Team('Ferro', require('../assets/Ferro.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Leo', 7, ['goleador']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Lina', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Benja', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', require('../assets/Allboys.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gonza', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Juan', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Pablo', 5, ['terminator']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']

    ),
    new MatchDetail('m3', 'Goleada inesperada', '04/12/2020', 'Pedernera',
        new Team('Ferro', require('../assets/Ferro.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Leo', 7, ['goleador']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Lina', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Benja', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', require('../assets/Allboys.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gonza', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Juan', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Pablo', 5, ['terminator']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m4', 'Empate aburrido', '11/12/2020', 'Pedernera',
        new Team('Ferro', require('../assets/Ferro.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Leo', 7, ['goleador']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Lina', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Benja', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', require('../assets/Allboys.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gonza', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Juan', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Pablo', 5, ['terminator']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m5', 'El poeta del gol', '17/12/2020', 'Pedernera',
        new Team('Ferro', require('../assets/Ferro.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Leo', 7, ['goleador']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Lina', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Benja', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', require('../assets/Allboys.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gonza', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Juan', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Pablo', 5, ['terminator']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    ),
    new MatchDetail('m6', 'Un pulpo en el arco', '25/12/2020', 'Pedernera',
        new Team('Ferro', require('../assets/Ferro.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Leo', 7, ['goleador']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Lina', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Benja', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Fede', 5, ['antifairplay']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Quique', 7, [])
            ]
        ),
        new Team('Allboys', require('../assets/Allboys.png'),
            [
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gabi', 6, ['fantasma']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Gonza', 8, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Juan', 7, []),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Pablo', 5, ['terminator']),
                new PlayerMatchStats(require('../assets/avatar.png'), 'Bruno', 3, [])
            ]
        ),
        9,
        7,
        ['Partido con muchas llegadas, se definio en la ultima jugada', 'Bah bah aksjd bahah']
    )
];