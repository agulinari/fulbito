import Match from '../models/match';
import Player from '../models/player';
import Team from '../models/team';
import PlayerMatchStats from '../models/player-match-stats';


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

export const MATCHES = [
    new Match('m1', 'Primer partido del año', '15/11/2020', 'Pedernera',
        new Team('Ferro', 'ferro', 10,
            [
                new PlayerMatchStats('p1', 'avatar', 'Leo', 7),
                new PlayerMatchStats('p2','avatar', 'Lina', 6),
                new PlayerMatchStats('p3','avatar', 'Benja', 7),
                new PlayerMatchStats('p4','avatar', 'Fede', 6),
                new PlayerMatchStats('p5','avatar', 'Quique', 8)
            ]
        ),
        new Team('Allboys', 'allboys', 5,
            [
                new PlayerMatchStats('p6','avatar', 'Gabi', 5),
                new PlayerMatchStats('p7','avatar', 'Gonza', 7),
                new PlayerMatchStats('p8','avatar', 'Juan', 7),
                new PlayerMatchStats('p9','avatar', 'Nacho', 5),
                new PlayerMatchStats('p10','avatar', 'Bruno', 4)
            ]
        )
    ),
    new Match('m2', 'La revancha', '30/11/2020', 'Pedernera',
        new Team('Ferro', 'ferro', 9,
            [
                new PlayerMatchStats('p1', 'avatar', 'Leo', 7),
                new PlayerMatchStats('p2','avatar', 'Lina', 7),
                new PlayerMatchStats('p3','avatar', 'Benja', 8),
                new PlayerMatchStats('p4','avatar', 'Fede', 5),
                new PlayerMatchStats('p5','avatar', 'Quique', 7)
            ]
        ),
        new Team('Allboys', 'allboys', 7,
            [
                new PlayerMatchStats('p6','avatar', 'Gabi', 6),
                new PlayerMatchStats('p7','avatar', 'Gonza', 8),
                new PlayerMatchStats('p8','avatar', 'Juan', 7),
                new PlayerMatchStats('p11','avatar', 'Pablo', 5),
                new PlayerMatchStats('p10','avatar', 'Bruno', 3)
            ]
        )
    )
];